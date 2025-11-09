import { assertNotAborted, subscribeToAbort } from '../internal/abort';
import { Observable, type SubscribeOptions, type Subscription } from './observable';

export type EventMap = Record<string, unknown>;
export type EventListener<T> = (payload: T) => void;

export class TypedEventEmitter<TEvents extends EventMap> {
  private readonly listeners = new Map<keyof TEvents, Set<EventListener<TEvents[keyof TEvents]>>>();

  on<K extends keyof TEvents>(event: K, listener: EventListener<TEvents[K]>, options?: SubscribeOptions): Subscription {
    assertNotAborted(options?.signal);
    let eventListeners = this.listeners.get(event) as Set<EventListener<TEvents[K]>> | undefined;
    if (!eventListeners) {
      const newSet = new Set<EventListener<TEvents[keyof TEvents]>>();
      this.listeners.set(event, newSet);
      eventListeners = newSet as Set<EventListener<TEvents[K]>>;
    }
    eventListeners.add(listener);

    const unsubscribe = () => {
      eventListeners?.delete(listener);
      if (eventListeners && eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    };

    const abortCleanup = subscribeToAbort(options?.signal, () => {
      unsubscribe();
    });

    return {
      unsubscribe() {
        abortCleanup();
        unsubscribe();
      }
    };
  }

  once<K extends keyof TEvents>(event: K, listener: EventListener<TEvents[K]>, options?: SubscribeOptions): Subscription {
    const subscription = this.on(
      event,
      (payload) => {
        subscription.unsubscribe();
        listener(payload);
      },
      options
    );
    return subscription;
  }

  off<K extends keyof TEvents>(event: K, listener: EventListener<TEvents[K]>): void {
    const eventListeners = this.listeners.get(event) as Set<EventListener<TEvents[K]>> | undefined;
    eventListeners?.delete(listener);
    if (eventListeners && eventListeners.size === 0) {
      this.listeners.delete(event);
    }
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    const eventListeners = this.listeners.get(event) as Set<EventListener<TEvents[K]>> | undefined;
    if (!eventListeners) {
      return;
    }
    for (const listener of Array.from(eventListeners)) {
      listener(payload);
    }
  }

  removeAllListeners(event?: keyof TEvents): void {
    if (event) {
      this.listeners.delete(event);
      return;
    }
    this.listeners.clear();
  }

  listenerCount(event: keyof TEvents): number {
    return this.listeners.get(event)?.size ?? 0;
  }

  observable<K extends keyof TEvents>(event: K): Observable<TEvents[K]> {
    return new Observable<TEvents[K]>((observer) => {
      const subscription = this.on(event, (value) => observer.next(value));
      return () => subscription.unsubscribe();
    });
  }
}
