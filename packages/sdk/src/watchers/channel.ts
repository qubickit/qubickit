import { TypedEventEmitter } from '../events/emitter';
import { Observable, type SubscribeOptions, type Subscription } from '../events/observable';

export type WatcherStatus = 'idle' | 'running' | 'stopped';

export interface WatcherEventMap<TPayload> extends Record<string, unknown> {
  data: TPayload;
  error: unknown;
  status: WatcherStatus;
}

export class WatchChannel<TPayload> {
  private readonly emitter = new TypedEventEmitter<WatcherEventMap<TPayload>>();

  emitData(payload: TPayload) {
    this.emitter.emit('data', payload);
  }

  emitError(error: unknown) {
    this.emitter.emit('error', error);
  }

  updateStatus(status: WatcherStatus) {
    this.emitter.emit('status', status);
  }

  subscribe(listener: (value: TPayload) => void, options?: SubscribeOptions): Subscription {
    return this.emitter.on('data', listener, options);
  }

  onError(listener: (error: unknown) => void, options?: SubscribeOptions): Subscription {
    return this.emitter.on('error', listener, options);
  }

  onStatus(listener: (status: WatcherStatus) => void, options?: SubscribeOptions): Subscription {
    return this.emitter.on('status', listener, options);
  }

  asObservable(): Observable<TPayload> {
    return this.emitter.observable('data');
  }

  stop() {
    this.updateStatus('stopped');
    this.emitter.removeAllListeners();
  }
}
