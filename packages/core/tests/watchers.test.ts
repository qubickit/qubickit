import { describe, expect, it } from 'bun:test';
import { TickWatcher } from '../src/watchers/tick-watcher';
import type { ArchiveClient } from '../src/clients/archive-client';
import type { EventStreamMessage } from '../src/transport/event-stream';

class FakeArchiveClient implements Pick<ArchiveClient, 'getTickData'> {
  async getTickData(tickNumber: number) {
    return {
      tickData: {
        computorIndex: 0,
        epoch: 0,
        tickNumber,
        timestamp: Date.now().toString()
      }
    };
  }
}

describe('TickWatcher', () => {
  it('emits ticks using archive client polling', async () => {
    const watcher = new TickWatcher(new FakeArchiveClient() as ArchiveClient, { intervalMs: 5 });
    const seen: number[] = [];
    const unsubscribe = watcher.onTick((tick) => seen.push(tick));
    watcher.start();
    await new Promise((resolve) => setTimeout(resolve, 25));
    watcher.stop();
    unsubscribe();
    expect(seen.length).toBeGreaterThanOrEqual(3);
    expect(seen[0]).toBe(1);
  });

  it('uses latestTickProvider when supplied', async () => {
    const providerValues = [3, 5];
    const archive = {
      async getTickData() {
        throw new Error('should not call archive');
      }
    };
    const watcher = new TickWatcher(archive as unknown as ArchiveClient, {
      intervalMs: 5,
      latestTickProvider: async () => providerValues.shift() ?? 5
    });
    const seen: number[] = [];
    watcher.onTick((tick) => seen.push(tick));
    watcher.start();
    await new Promise((resolve) => setTimeout(resolve, 35));
    watcher.stop();
    expect(seen).toEqual([1, 2, 3, 4, 5]);
  });

  it('emits ticks from event stream subscription', async () => {
    const events: EventStreamMessage[] = [{ data: '1' }, { data: '3' }];
    class StubSubscription {
      closed = false;
      async *[Symbol.asyncIterator]() {
        for (const event of events) {
          await new Promise((resolve) => setTimeout(resolve, 0));
          yield event;
        }
      }
      close() {
        this.closed = true;
      }
    }

    const watcher = new TickWatcher(new FakeArchiveClient() as ArchiveClient, {
      eventStream: {
        createSubscription: () => new StubSubscription(),
        parseEvent: (event) => Number(event.data)
      }
    });

    const seen: number[] = [];
    watcher.onTick((tick) => seen.push(tick));
    watcher.start();
    await new Promise((resolve) => setTimeout(resolve, 20));
    watcher.stop();
    expect(seen).toEqual([1, 2, 3]);
  });
});
