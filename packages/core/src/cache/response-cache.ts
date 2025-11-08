import type { CacheAdapter } from './cache-adapter';

export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class ResponseCache<T = unknown> implements CacheAdapter<T> {
  private store = new Map<string, CacheEntry<T>>();

  constructor(private readonly ttlMs: number, private readonly maxEntries = 100) {}

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T) {
    if (this.store.size >= this.maxEntries) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) this.store.delete(oldestKey);
    }
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}
