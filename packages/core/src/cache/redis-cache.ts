import type { CacheAdapter } from './cache-adapter';

export interface RedisLikeClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode?: string, duration?: number): Promise<unknown>;
  del?(key: string): Promise<unknown>;
}

export interface RedisCacheOptions {
  keyPrefix?: string;
  ttlSeconds?: number;
  serializer?: {
    serialize: <T>(value: T) => string;
    deserialize: <T>(value: string) => T;
  };
}

const defaultSerializer = {
  serialize: JSON.stringify,
  deserialize: JSON.parse
};

export class RedisCacheAdapter<T = unknown> implements CacheAdapter<T> {
  private readonly serializer: NonNullable<RedisCacheOptions['serializer']>;

  constructor(private readonly client: RedisLikeClient, private readonly options: RedisCacheOptions = {}) {
    this.serializer = options.serializer ?? defaultSerializer;
  }

  async get(key: string): Promise<T | undefined> {
    const raw = await this.client.get(this.buildKey(key));
    if (raw === null) return undefined;
    return this.serializer.deserialize<T>(raw);
  }

  async set(key: string, value: T): Promise<void> {
    const payload = this.serializer.serialize(value);
    if (this.options.ttlSeconds) {
      await this.client.set(this.buildKey(key), payload, 'EX', this.options.ttlSeconds);
    } else {
      await this.client.set(this.buildKey(key), payload);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del?.(this.buildKey(key));
  }

  private buildKey(key: string): string {
    return this.options.keyPrefix ? `${this.options.keyPrefix}:${key}` : key;
  }
}
