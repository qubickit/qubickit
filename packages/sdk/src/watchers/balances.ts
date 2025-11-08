import type { QubicSdk } from '../sdk';
import { WatchChannel } from './channel';
import { waitFor } from './utils';

type BalanceResponse = Awaited<ReturnType<QubicSdk['core']['http']['getBalance']>>;

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
  let previousFingerprint: string | undefined;

  const poll = async () => {
    while (!stopped) {
      try {
        options.telemetry?.onPoll?.(options.identity);
        const response = await sdk.core.http.getBalance(options.identity);
        const fingerprint = JSON.stringify(response.balance ?? response);
        if (fingerprint !== previousFingerprint) {
          previousFingerprint = fingerprint;
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

  poll();

  return {
    channel,
    stop() {
      stopped = true;
      channel.stop();
    }
  };
}
