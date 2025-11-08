import { z, type ZodTypeAny } from 'zod';

export type CacheValue<TSchema extends ZodTypeAny> = z.infer<TSchema>;

export interface CacheAdapterOptions<TSchema extends ZodTypeAny> {
  schema: TSchema;
  namespace?: string;
  defaultTtlMs?: number;
  clock?: () => number;
}

export interface CacheAdapter<TSchema extends ZodTypeAny> {
  readonly namespace: string;
  get(key: string): Promise<CacheValue<TSchema> | undefined>;
  set(key: string, value: CacheValue<TSchema>, ttlMs?: number): Promise<void>;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  size(): Promise<number>;
}

interface CacheEntry<T> {
  value: T;
  expiresAt?: number;
}

export function createMemoryCacheAdapter<TSchema extends ZodTypeAny>(
  options: CacheAdapterOptions<TSchema>
): CacheAdapter<TSchema> {
  if (!options?.schema) {
    throw new Error('Cache adapter requires a Zod schema.');
  }
  const namespace = options.namespace ?? 'sdk-memory-cache';
  const { schema, defaultTtlMs } = options;
  const clock = options.clock ?? (() => Date.now());
  const entries = new Map<string, CacheEntry<CacheValue<TSchema>>>();

  const validate = (value: CacheValue<TSchema>) => schema.parse(value);

  const isExpired = (entry: CacheEntry<CacheValue<TSchema>>, now: number) =>
    typeof entry.expiresAt === 'number' && entry.expiresAt <= now;

  const prune = (now: number) => {
    for (const [key, entry] of entries.entries()) {
      if (isExpired(entry, now)) {
        entries.delete(key);
      }
    }
  };

  return {
    namespace,
    async get(key) {
      const now = clock();
      const entry = entries.get(key);
      if (!entry) {
        return undefined;
      }
      if (isExpired(entry, now)) {
        entries.delete(key);
        return undefined;
      }
      return entry.value;
    },
    async set(key, value, ttlMs) {
      const now = clock();
      const parsed = validate(value);
      const ttl = typeof ttlMs === 'number' ? ttlMs : defaultTtlMs;
      const expiresAt = typeof ttl === 'number' ? now + ttl : undefined;
      entries.set(key, { value: parsed, expiresAt });
    },
    async has(key) {
      const now = clock();
      const entry = entries.get(key);
      if (!entry) {
        return false;
      }
      if (isExpired(entry, now)) {
        entries.delete(key);
        return false;
      }
      return true;
    },
    async delete(key) {
      entries.delete(key);
    },
    async clear() {
      entries.clear();
    },
    async size() {
      const now = clock();
      prune(now);
      return entries.size;
    }
  };
}
