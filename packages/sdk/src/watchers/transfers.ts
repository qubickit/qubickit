import { WatchChannel } from './channel';
import type { SessionClient } from '../session';
import { waitFor } from './utils';

type TransferTransaction = {
  hash?: string;
  txId?: string;
  tickNumber?: number;
  [key: string]: unknown;
};

export interface TransferWatcherTelemetry {
  onPoll?(info: { identity: string }): void;
  onData?(event: TransferEvent): void;
  onError?(error: unknown): void;
}

export interface TransferWatcherOptions {
  identity: string;
  limit?: number;
  intervalMs?: number;
  telemetry?: TransferWatcherTelemetry;
  signal?: AbortSignal;
}

export interface TransferEvent {
  identity: string;
  transaction: TransferTransaction;
}

export interface TransferWatchHandle {
  channel: WatchChannel<TransferEvent>;
  stop(): void;
}

export function createTransferWatcher(session: SessionClient, options: TransferWatcherOptions): TransferWatchHandle {
  const channel = new WatchChannel<TransferEvent>();
  let stopped = false;
  const seenHashes = new Set<string>();
  const seenQueue: string[] = [];
  const maxSeen = 500;
  let highestTick = 0;
  let cursor = 0;
  let idlePolls = 0;
  const pageSize = Math.max(1, options.limit ?? 25);

  const remember = (hash: string, tick?: number) => {
    seenHashes.add(hash);
    seenQueue.push(hash);
    if (typeof tick === 'number') {
      highestTick = Math.max(highestTick, tick);
    }
    if (seenQueue.length > maxSeen) {
      const old = seenQueue.shift();
      if (old) {
        seenHashes.delete(old);
      }
    }
  };

  const poll = async () => {
    while (!stopped) {
      try {
        options.telemetry?.onPoll?.({ identity: options.identity });
        const requestOptions: Parameters<SessionClient['listTransactions']>[1] = {
          limit: pageSize,
          cacheTtlMs: 0
        };
        if (cursor > 0) {
          requestOptions.from = cursor;
        }
        const response = await session.listTransactions(options.identity, { ...requestOptions, signal: options.signal });
        const transactions = (response.transactions as TransferTransaction[]) ?? [];
        if (transactions.length === 0) {
          idlePolls += 1;
          if (idlePolls >= 5) {
            cursor = Math.max(0, cursor - pageSize);
            idlePolls = 0;
          }
        } else {
          idlePolls = 0;
          cursor += transactions.length;
          for (const tx of transactions) {
            const hash = extractTransactionHash(tx);
            if (!hash) continue;
            if (seenHashes.has(hash)) continue;
            if (typeof tx.tickNumber === 'number' && tx.tickNumber < highestTick) {
              continue;
            }
            const event: TransferEvent = { identity: options.identity, transaction: tx };
            channel.emitData(event);
            options.telemetry?.onData?.(event);
            remember(hash, tx.tickNumber);
          }
        }
      } catch (error) {
        channel.emitError(error);
        options.telemetry?.onError?.(error);
      }
      await waitFor(options.intervalMs ?? 5_000, options.signal).catch(() => {
        stopped = true;
      });
    }
  };

  poll();

  return {
    channel,
    stop() {
      stopped = true;
      channel.stop();
    }
  };
}

const extractTransactionHash = (tx: TransferTransaction): string | undefined => {
  if (typeof tx.hash === 'string') return tx.hash;
  if (typeof tx.txId === 'string') return tx.txId;
  return undefined;
};
