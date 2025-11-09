import { ArchiveClient } from '../clients/archive-client';
import type { EventStreamMessage } from '../transport/event-stream';

export type TickListener = (tickNumber: number) => void;

export interface TickWatcherOptions {
  intervalMs?: number;
  latestTickProvider?: () => Promise<number>;
  eventStream?: {
    createSubscription: () => TickStreamSubscription;
    parseEvent?: (event: EventStreamMessage) => number | number[] | undefined;
  };
}

export type TickStreamSubscription = AsyncIterable<EventStreamMessage> & {
  close?: () => void;
};

export class TickWatcher {
  private timer: ReturnType<typeof setInterval> | null = null;
  private lastTick = 0;
  private readonly listeners = new Set<TickListener>();
  private streamSubscription: TickStreamSubscription | null = null;
  private streamTask: Promise<void> | null = null;
  private initializing: Promise<void> | null = null;

  constructor(private readonly archiveClient: ArchiveClient, private readonly options: TickWatcherOptions = {}) {}

  start() {
    if (this.streamSubscription || this.timer || this.initializing) return;
    this.initializing = this.initializeLastTick()
      .catch((error) => {
        console.warn('TickWatcher initialization failed', error);
      })
      .finally(() => {
        this.initializing = null;
        this.beginWatching();
      });
  }

  stop() {
    if (this.streamSubscription) {
      this.streamSubscription.close?.();
      this.streamSubscription = null;
    }
    this.streamTask = null;
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }

  onTick(listener: TickListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private async poll() {
    try {
      const latest = this.options.latestTickProvider
        ? await this.options.latestTickProvider()
        : (await this.archiveClient.getTickData(this.lastTick + 1)).tickData?.tickNumber ?? this.lastTick;
      if (latest) this.emitTicks(latest);
    } catch (error) {
      console.warn('TickWatcher poll failed', error);
    }
  }

  private beginWatching() {
    if (this.options.eventStream) {
      this.startStream();
    } else {
      this.startPolling();
    }
  }

  private startStream() {
    if (this.streamSubscription) return;
    if (!this.options.eventStream) {
      this.startPolling();
      return;
    }
    this.streamSubscription = this.options.eventStream.createSubscription();
    this.streamTask = this.consumeStream(this.streamSubscription);
  }

  private startPolling() {
    if (this.timer) return;
    const interval = this.options.intervalMs ?? 5_000;
    this.timer = setInterval(() => this.poll(), interval);
  }

  private async consumeStream(subscription: TickStreamSubscription) {
    const parser = this.options.eventStream?.parseEvent ?? defaultEventParser;
    try {
      for await (const event of subscription) {
        const parsed = parser(event);
        if (parsed === undefined) continue;
        const ticks = Array.isArray(parsed) ? parsed : [parsed];
        for (const tick of ticks) {
          if (typeof tick === 'number') {
            this.emitTicks(tick);
          }
        }
      }
    } catch (error) {
      console.warn('TickWatcher stream failed', error);
    } finally {
      if (this.streamSubscription === subscription) {
        this.streamSubscription = null;
        this.streamTask = null;
      }
      if (this.options.eventStream && !this.timer) {
        this.startPolling();
      }
    }
  }

  private async initializeLastTick() {
    let latest: number | undefined;
    if (this.options.latestTickProvider) {
      try {
        latest = await this.options.latestTickProvider();
      } catch (error) {
        console.warn('TickWatcher latestTickProvider failed', error);
      }
    }
    if (typeof latest !== 'number') {
      try {
        const response = await this.archiveClient.getLatestTick();
        latest = response.tickNumber;
      } catch (error) {
        console.warn('TickWatcher getLatestTick failed', error);
        try {
          const status = await this.archiveClient.getStatus();
          latest = status.lastProcessedTick?.tickNumber;
        } catch (statusError) {
          console.warn('TickWatcher getStatus fallback failed', statusError);
        }
      }
    }
    if (typeof latest === 'number' && latest > 0) {
      this.lastTick = latest - 1;
    }
  }

  private emitTicks(latest: number) {
    if (latest <= this.lastTick) return;
    for (let tick = this.lastTick + 1; tick <= latest; tick += 1) {
      this.listeners.forEach((listener) => listener(tick));
    }
    this.lastTick = latest;
  }
}

const defaultEventParser = (event: EventStreamMessage): number | number[] | undefined => {
  const data = event.data?.trim();
  if (!data) return undefined;
  if (/^\d+$/.test(data)) return Number(data);
  try {
    const payload = JSON.parse(data);
    if (typeof payload === 'number') return payload;
    if (typeof payload?.tickNumber === 'number') return payload.tickNumber;
    if (Array.isArray(payload?.ticks)) {
      const ticks = payload.ticks as unknown[];
      return ticks.filter((tick): tick is number => typeof tick === 'number');
    }
  } catch {
    return undefined;
  }
  return undefined;
};
