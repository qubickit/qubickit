import type { QubicSdk } from '../sdk';
import { WatchChannel } from './channel';

interface TickWatcherLike {
  start(): void;
  stop(): void;
  onTick(listener: (tick: number) => void): () => void;
}

export interface TickWatcherTelemetry {
  onTick?(tick: number): void;
  onStatusChange?(status: 'starting' | 'running' | 'stopped'): void;
  onError?(error: unknown): void;
}

export interface TickStreamOptions {
  telemetry?: TickWatcherTelemetry;
  watcher?: TickWatcherLike;
}

export interface TickStream {
  channel: WatchChannel<number>;
  stop(): void;
}

export function createTickStream(sdk: QubicSdk, options: TickStreamOptions = {}): TickStream {
  const channel = new WatchChannel<number>();
  const watcher = options.watcher ?? (sdk.core.watchers.ticks as TickWatcherLike);

  const emitStatus = (status: 'starting' | 'running' | 'stopped') => {
    options.telemetry?.onStatusChange?.(status);
    channel.updateStatus(status === 'stopped' ? 'stopped' : 'running');
  };

  const unsubscribe = watcher.onTick((tick: number) => {
    channel.emitData(tick);
    options.telemetry?.onTick?.(tick);
  });

  emitStatus('starting');
  watcher.start();
  emitStatus('running');

  return {
    channel,
    stop() {
      watcher.stop();
      unsubscribe();
      emitStatus('stopped');
      channel.stop();
    }
  };
}
