import type { QubicSdk } from '../sdk';
import { WatchChannel } from './channel';
import { waitFor } from './utils';

type BalanceResponse = Awaited<ReturnType<QubicSdk['core']['http']['getBalance']>>;
type FreshBalanceFn = (
  identity: string,
  options?: {
    useCache?: boolean;
  }
) => Promise<BalanceResponse>;
type BalanceSnapshot = Pick<BalanceResponse, 'balance'>;

export interface BalanceWatcherTelemetry {
  onPoll?(identity: string): void;
  onUpdate?(balance: BalanceResponse): void;
  onError?(error: unknown): void;
}

export interface BalanceWatcherOptions {
  identity: string;
  intervalMs?: number;
  signal?: AbortSignal;
  telemetry?: BalanceWatcherTelemetry;
}

export interface BalanceWatchHandle {
  channel: WatchChannel<BalanceResponse>;
  stop(): void;
}

export function createBalanceWatcher(sdk: QubicSdk, options: BalanceWatcherOptions): BalanceWatchHandle {
  const channel = new WatchChannel<BalanceResponse>();
  let stopped = false;
  let previousSnapshot: BalanceSnapshot | undefined;
  const getFreshBalance = sdk.core.http.getBalance.bind(sdk.core.http) as FreshBalanceFn;

  const initialize = async () => {
    try {
      const response = await getFreshBalance(options.identity, { useCache: false });
      previousSnapshot = { balance: response.balance };
    } catch (error) {
      channel.emitError(error);
      options.telemetry?.onError?.(error);
    }
  };

  const poll = async () => {
    while (!stopped) {
      try {
        options.telemetry?.onPoll?.(options.identity);
        const response = await getFreshBalance(options.identity, { useCache: false });
        if (!isSameBalance(previousSnapshot?.balance, response.balance)) {
          previousSnapshot = { balance: response.balance };
          channel.emitData(response);
          options.telemetry?.onUpdate?.(response);
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

  void (async () => {
    await initialize();
    if (!stopped) {
      poll();
    }
  })();

  return {
    channel,
    stop() {
      stopped = true;
      channel.stop();
    }
  };
}

const isSameBalance = (
  previous: BalanceResponse['balance'] | undefined,
  current: BalanceResponse['balance'] | undefined
): boolean => {
  if (!previous && !current) return true;
  if (!previous || !current) return false;
  if ('available' in previous && 'available' in current) {
    return previous.available === current.available && previous.pending === current.pending;
  }
  if ('balance' in previous && 'balance' in current) {
    return (
      previous.balance === current.balance &&
      previous.incomingAmount === current.incomingAmount &&
      previous.outgoingAmount === current.outgoingAmount &&
      previous.numberOfIncomingTransfers === current.numberOfIncomingTransfers &&
      previous.numberOfOutgoingTransfers === current.numberOfOutgoingTransfers
    );
  }
  return JSON.stringify(previous) === JSON.stringify(current);
};
