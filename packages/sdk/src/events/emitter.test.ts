import { describe, expect, it, vi } from 'vitest';

import { TypedEventEmitter } from './emitter';

type TestEvents = {
  data: number;
  error: Error;
  status: string;
};

describe('TypedEventEmitter', () => {
  it('emits events to listeners', () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    const handler = vi.fn();
    const subscription = emitter.on('data', handler);
    emitter.emit('data', 1);
    expect(handler).toHaveBeenCalledWith(1);
    subscription.unsubscribe();
  });

  it('unsubscribes listeners when the signal aborts', () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    const handler = vi.fn();
    const controller = new AbortController();
    emitter.on('data', handler, { signal: controller.signal });
    emitter.emit('data', 1);
    expect(handler).toHaveBeenCalledTimes(1);
    controller.abort();
    emitter.emit('data', 2);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('creates observables for async iteration', async () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    const iterator = emitter.observable('data').toAsyncIterator();
    const nextPromise = iterator.next();
    emitter.emit('data', 7);
    await expect(nextPromise).resolves.toEqual({ value: 7, done: false });
    const donePromise = iterator.next();
    iterator.return?.();
    await expect(donePromise).resolves.toEqual({ value: undefined, done: true });
  });
});
