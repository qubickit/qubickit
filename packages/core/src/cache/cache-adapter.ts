export interface CacheAdapter<T = unknown> {
  get(key: string): T | undefined | Promise<T | undefined>;
  set(key: string, value: T): void | Promise<void>;
  delete?(key: string): void | Promise<void>;
  clear?(): void | Promise<void>;
}
