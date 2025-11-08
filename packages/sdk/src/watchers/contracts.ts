import type { SessionClient } from '../session';
import { WatchChannel } from './channel';
import { waitFor } from './utils';

type ContractTransaction = {
  hash?: string;
  source?: string;
  destination?: string;
  [key: string]: unknown;
};

export interface ContractWatcherTelemetry {
  onPoll?(contract: string): void;
  onEvent?(event: ContractEvent): void;
  onError?(error: unknown): void;
}

export interface ContractWatcherOptions {
  contractIdentity: string;
  identity?: string;
  intervalMs?: number;
  signal?: AbortSignal;
  telemetry?: ContractWatcherTelemetry;
  matcher?: (tx: ContractTransaction) => boolean;
}

export interface ContractEvent {
  contractIdentity: string;
  transaction: ContractTransaction;
}

export interface ContractWatchHandle {
  channel: WatchChannel<ContractEvent>;
  stop(): void;
}

const defaultMatcher = (contractIdentity: string, tx: ContractTransaction) => {
  if (!tx) return false;
  if (tx.destination === contractIdentity) return true;
  if (tx.source === contractIdentity) return true;
  return false;
};

export function createContractWatcher(session: SessionClient, options: ContractWatcherOptions): ContractWatchHandle {
  const channel = new WatchChannel<ContractEvent>();
  let stopped = false;
  const seen = new Set<string>();
  const matcher =
    options.matcher ??
    ((tx: ContractTransaction) => {
      return defaultMatcher(options.contractIdentity, tx);
    });

  const poll = async () => {
    while (!stopped) {
      try {
        options.telemetry?.onPoll?.(options.contractIdentity);
        const identity = options.identity ?? options.contractIdentity;
        const result = await session.listTransactions(identity, {
          limit: 50,
          cacheTtlMs: 0
        });
        const transactions = (result.transactions as ContractTransaction[]) ?? [];
        for (const tx of transactions) {
          if (!tx?.hash || seen.has(tx.hash)) continue;
          if (!matcher(tx)) continue;
          seen.add(tx.hash);
          const event: ContractEvent = {
            contractIdentity: options.contractIdentity,
            transaction: tx
          };
          channel.emitData(event);
          options.telemetry?.onEvent?.(event);
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
