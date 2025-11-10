import { describe, expect, it, vi } from 'vitest';
import { broadcastEncodedTransaction, buildUnsignedTransaction } from '@qubickit/core';

import type { QubicSdk } from '../sdk';
import { createTransportHooksRegistry } from '../transport/hooks';
import { TransferService } from './service';
import { z } from 'zod';
import { createMemoryCacheAdapter, createMemoryStorageAdapter } from '../adapters';

vi.mock('@qubickit/core', () => ({
  broadcastEncodedTransaction: vi.fn(async () => ({ transactionId: 'mock-tx', status: { moneyFlew: true } })),
  buildUnsignedTransaction: vi.fn(() => new Uint8Array([0])),
  encodeSignedTransaction: vi.fn(() => ({ txId: 'mock-tx', encoded: 'encoded' })),
  signTransaction: vi.fn(async () => ({ signedBytes: new Uint8Array([1]) })),
  normalizeAmount: vi.fn(() => '1'),
  identityToPublicKey: vi.fn(() => new Uint8Array(32)),
  createIdentityPackage: vi.fn(async (_seed: string, index: number = 0) => ({
    privateKey: new Uint8Array(32).fill(index),
    publicKey: new Uint8Array(32).fill(index),
    publicKeyWithChecksum: new Uint8Array(36).fill(index),
    identity: `IDENTITY-${index}`
  }))
}));

const seed = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyabcd';
const destination = 'BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARMID';

const adapters = {
  storage: createMemoryStorageAdapter({ schema: z.unknown() }),
  cache: createMemoryCacheAdapter({ schema: z.unknown() })
};

const createSdk = () =>
  ({
    core: {
      http: {
        broadcastTransaction: vi.fn().mockResolvedValue({ transactionId: '0xtx' }),
        getBalance: vi.fn()
      },
      archive: {
        getLatestTick: vi.fn().mockResolvedValue({ tickNumber: 1 }),
        getTransactionStatus: vi.fn().mockResolvedValue({ moneyFlew: true })
      },
      query: {
        getTransactionByHash: vi.fn().mockResolvedValue({ transaction: { moneyFlew: true } })
      },
      watchers: {
        ticks: {
          start: vi.fn(),
          stop: vi.fn(),
          onTick: vi.fn(() => () => undefined)
        }
      }
    },
    adapters,
    hooks: createTransportHooksRegistry(),
    wallet: {
      resumeSession: vi.fn()
    },
    createSessionClient: vi.fn()
  }) as unknown as QubicSdk;

describe('TransferService', () => {
  it('drafts transfers without broadcast', async () => {
    const service = new TransferService(createSdk());
    const result = await service.send({
      destination,
      amount: 1,
      signer: { seed },
      dryRun: true
    });
    expect(result.status).toBe('draft');
  });

  it('broadcasts transfers and monitors settlement', async () => {
    const sdk = createSdk();
    sdk.core.archive.getTransactionStatus = vi.fn().mockResolvedValue({ moneyFlew: true });
    const service = new TransferService(sdk);
    const result = await service.send({
      destination,
      amount: 1,
      signer: { seed },
      monitor: true
    });
    expect(result.status).toBe('settled');
    expect(broadcastEncodedTransaction).toHaveBeenCalled();
  });

  it('applies default tick offset when none provided', async () => {
    const sdk = createSdk();
    sdk.core.archive.getLatestTick = vi.fn().mockResolvedValue({ tickNumber: 100 });
    const service = new TransferService(sdk, { defaultTickOffset: 5 });
    await service.send({
      destination,
      amount: 1,
      signer: { seed },
      dryRun: true
    });
    expect(buildUnsignedTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ tick: 105 })
    );
  });

  it('allows overriding tick offset per request', async () => {
    const sdk = createSdk();
    sdk.core.archive.getLatestTick = vi.fn().mockResolvedValue({ tickNumber: 50 });
    const service = new TransferService(sdk);
    await service.send({
      destination,
      amount: 1,
      signer: { seed },
      metadata: { tickOffset: 20 },
      dryRun: true
    });
    expect(buildUnsignedTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ tick: 70 })
    );
  });

  it('prefers explicit tick number over offsets', async () => {
    const sdk = createSdk();
    sdk.core.archive.getLatestTick = vi.fn().mockResolvedValue({ tickNumber: 10 });
    const service = new TransferService(sdk, { defaultTickOffset: 100 });
    await service.send({
      destination,
      amount: 1,
      signer: { seed },
      metadata: { tickNumber: 999, tickOffset: 5 },
      dryRun: true
    });
    expect(buildUnsignedTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ tick: 999 })
    );
  });
});
