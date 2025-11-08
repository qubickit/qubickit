import type { CacheAdapter } from './cache-adapter';

export class MemoryLRUCache<T = unknown> implements CacheAdapter<T> {
  private store = new Map<string, T>();

  constructor(private readonly maxEntries = 100) {
    if (maxEntries <= 0) throw new Error('maxEntries must be greater than 0');
  }

  get(key: string): T | undefined {
    if (!this.store.has(key)) return undefined;
    const value = this.store.get(key) as T;
    this.store.delete(key);
    this.store.set(key, value);
    return value;
  }

  set(key: string, value: T) {
    if (this.store.has(key)) {
      this.store.delete(key);
    } else if (this.store.size >= this.maxEntries) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) this.store.delete(oldestKey);
    }
    this.store.set(key, value);
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}
