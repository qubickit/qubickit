import { describe, expect, it, vi } from 'vitest';

import { WatchChannel } from './channel';

describe('WatchChannel', () => {
  it('emits data and status changes', () => {
    const channel = new WatchChannel<number>();
    const dataHandler = vi.fn();
    const statusHandler = vi.fn();
    channel.subscribe(dataHandler);
    channel.onStatus(statusHandler);

    channel.updateStatus('running');
    channel.emitData(1);
    channel.emitData(2);

    expect(statusHandler).toHaveBeenCalledWith('running');
    expect(dataHandler).toHaveBeenCalledTimes(2);
    channel.stop();
  });

  it('provides observable stream', async () => {
    const channel = new WatchChannel<number>();
    const iterator = channel.asObservable().toAsyncIterator();
    const first = iterator.next();
    channel.emitData(9);
    await expect(first).resolves.toEqual({ value: 9, done: false });
    await iterator.return?.();
  });
});
