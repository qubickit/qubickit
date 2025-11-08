import { assertNotAborted, subscribeToAbort } from '../internal/abort';

export interface Observer<T> {
  next(value: T): void;
  error?(error: unknown): void;
  complete?(): void;
}

export interface Subscription {
  unsubscribe(): void;
}

export interface SubscribeOptions {
  signal?: AbortSignal;
}

type Teardown = () => void;

export class Observable<T> {
  constructor(private readonly subscribeFn: (observer: Observer<T>) => Teardown | void) {}

  subscribe(listener: Observer<T> | ((value: T) => void), options?: SubscribeOptions): Subscription {
    assertNotAborted(options?.signal);
    const observer = typeof listener === 'function' ? { next: listener } : listener;
    const teardown = this.subscribeFn(observer) ?? (() => undefined);
    const abortCleanup = subscribeToAbort(options?.signal, () => {
      teardown();
      observer.complete?.();
    });

    return {
      unsubscribe() {
        abortCleanup();
        teardown();
      }
    };
  }

  toAsyncIterator(options?: SubscribeOptions): AsyncIterableIterator<T> {
    const queue: T[] = [];
    const errors: unknown[] = [];
    let complete = false;
    let notify: (() => void) | undefined;

    const subscription = this.subscribe(
      {
        next(value) {
          queue.push(value);
          notify?.();
        },
        error(error) {
          errors.push(error);
          notify?.();
        },
        complete() {
          complete = true;
          notify?.();
        }
      },
      options
    );

    const pump = async (): Promise<IteratorResult<T>> => {
      if (errors.length) {
        const error = errors.shift();
        subscription.unsubscribe();
        throw error;
      }
      if (queue.length) {
        return { value: queue.shift()!, done: false };
      }
      if (complete) {
        subscription.unsubscribe();
        return { value: undefined as never, done: true };
      }
      await new Promise<void>((resolve) => {
        notify = resolve;
      });
      notify = undefined;
      return pump();
    };

    const iterator: AsyncIterableIterator<T> = {
      async next() {
        return pump();
      },
      async return() {
        complete = true;
        subscription.unsubscribe();
        notify?.();
        return { value: undefined as never, done: true };
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };

    return iterator;
  }
}
