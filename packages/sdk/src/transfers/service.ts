import {
  broadcastEncodedTransaction,
  buildUnsignedTransaction,
  encodeSignedTransaction,
  normalizeAmount,
  signTransaction,
  createIdentityPackage,
  type NetworkMetadata
} from '@qubickit/core';
import { z } from 'zod';

import type { QubicSdk } from '../sdk';
import { CommandQueue } from '../queue';
import type { PersistenceAdapter } from '../persistence';
import { createMemoryPersistenceAdapter } from '../persistence';
import { identityToPublicKey } from '../utils/identity';
import type { WalletSessionHandle } from '../wallet';

const destinationSchema = z.string().min(1);

export interface TransferSignerSeed {
  seed: string;
  derivationIndex?: number;
}

export interface TransferSignerSession {
  sessionToken: string;
}

export type TransferSigner = TransferSignerSeed | TransferSignerSession;

export interface TransferRequest {
  destination: string;
  amount: string | number | bigint;
  signer: TransferSigner;
  metadata?: Partial<NetworkMetadata> & { procedureId?: number };
  inputType?: number;
  input?: Uint8Array;
  dryRun?: boolean;
  monitor?: boolean;
  queueOnFail?: boolean;
}

export interface TransferTelemetry {
  onDraft?(info: { txId: string }): void;
  onBroadcast?(info: { txId: string }): void;
  onSettled?(info: { txId: string }): void;
  onError?(info: { error: unknown }): void;
}

export interface TransferSendOptions {
  telemetry?: TransferTelemetry;
  queueOnFail?: boolean;
}

export interface TransferResult {
  txId: string;
  encoded: string;
  status: 'draft' | 'broadcasted' | 'settled';
  receipt?: unknown;
}

export interface TransferServiceOptions {
  persistence?: PersistenceAdapter<any>;
}

export class TransferService {
  private readonly queue: CommandQueue<TransferRequest>;

  constructor(private readonly sdk: QubicSdk, options: TransferServiceOptions = {}) {
    const persistence = options.persistence ?? createMemoryPersistenceAdapter<TransferRequest>();
    this.queue = new CommandQueue({
      persistence
    });
  }

  getQueue() {
    return this.queue;
  }

  async send(request: TransferRequest, options: TransferSendOptions = {}): Promise<TransferResult> {
    destinationSchema.parse(request.destination);
    const signer = await this.resolveSigner(request.signer);
    const destinationPublicKey = identityToPublicKey(request.destination);
    const tickNumber = request.metadata?.tickNumber ?? (await this.sdk.core.archive.getLatestTick()).latestTick ?? 0;
    const normalizedAmount = BigInt(normalizeAmount(request.amount));

    const unsignedBytes = buildUnsignedTransaction({
      sourcePublicKey: signer.identityPackage.publicKey,
      destinationPublicKey,
      amount: normalizedAmount,
      tick: tickNumber,
      inputType: request.inputType ?? request.metadata?.procedureId ?? 0,
      input: request.input ?? new Uint8Array()
    });

    const { signedBytes } = await signTransaction(signer.identityPackage, unsignedBytes);
    const { txId, encoded } = encodeSignedTransaction(unsignedBytes, signedBytes);
    options.telemetry?.onDraft?.({ txId });

    if (request.dryRun) {
      return { txId, encoded, status: 'draft' };
    }

    try {
      const result = await this.broadcast(txId, encoded, request);
      options.telemetry?.onBroadcast?.({ txId });
      if (result.status) {
        options.telemetry?.onSettled?.({ txId });
        return { txId, encoded, status: 'settled', receipt: result.status };
      }
      return { txId, encoded, status: 'broadcasted', receipt: result };
    } catch (error) {
      options.telemetry?.onError?.({ error });
      if (options.queueOnFail ?? request.queueOnFail ?? true) {
        await this.queue.enqueue('transfer', request);
      }
      throw error;
    }
  }

  async resumePending(options: TransferSendOptions = {}) {
    let command = await this.queue.nextPending();
    while (command) {
      try {
        await this.send(command.payload, { ...options, queueOnFail: false });
        await this.queue.complete(command.id);
      } catch (error) {
        await this.queue.fail(command.id, error);
      }
      command = await this.queue.nextPending();
    }
  }

  private async broadcast(txId: string, encoded: string, request: TransferRequest) {
    return broadcastEncodedTransaction(this.sdk.core.http, this.sdk.core.archive, encoded, {
      monitor: request.monitor ?? true,
      queryClient: this.sdk.core.query
    });
  }

  private async resolveSigner(signer: TransferSigner): Promise<{ identityPackage: WalletSessionHandle['identityPackage'] }> {
    if ('sessionToken' in signer) {
      const session = await this.sdk.wallet.resumeSession(signer.sessionToken);
      return { identityPackage: session.identityPackage };
    }
    const identityPackage = await createIdentityPackage(signer.seed, signer.derivationIndex ?? 0);
    return { identityPackage };
  }
}
