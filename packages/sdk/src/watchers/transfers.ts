import { WatchChannel } from './channel';
import type { SessionClient } from '../session';
import { waitFor } from './utils';

type TransferTransaction = {
  hash?: string;
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
  let highestTick = 0;

  const remember = (hash: string, tick?: number) => {
    seenHashes.add(hash);
    seenQueue.push(hash);
    if (typeof tick === 'number') {
      highestTick = Math.max(highestTick, tick);
    }
    if (seenQueue.length > 200) {
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
        const response = await session.listTransactions(options.identity, {
          limit: options.limit ?? 25,
          cacheTtlMs: 0
        });
        const transactions = (response.transactions as TransferTransaction[]) ?? [];
        const newestFirst = [...transactions].sort((a, b) => {
          const aTick = a.tickNumber ?? 0;
          const bTick = b.tickNumber ?? 0;
          return bTick - aTick;
        });
        const fresh = newestFirst.filter((tx) => {
          if (!tx.hash) return false;
          if (seenHashes.has(tx.hash)) return false;
          if (typeof tx.tickNumber === 'number' && tx.tickNumber < highestTick) {
            return false;
          }
          return true;
        });
        for (const tx of fresh.reverse()) {
          if (!tx.hash) continue;
          const event: TransferEvent = { identity: options.identity, transaction: tx };
          channel.emitData(event);
          options.telemetry?.onData?.(event);
          remember(tx.hash, tx.tickNumber);
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
