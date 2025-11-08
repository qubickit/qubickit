import { describe, expect, it } from 'bun:test';
import { createHttpClient } from '../src/transport/http-client';
import { ResponseCache } from '../src/cache/response-cache';
import { MemoryLRUCache } from '../src/cache/memory-lru';
import { RedisCacheAdapter } from '../src/cache/redis-cache';

describe('HttpClient cache', () => {
  it('returns cached response for GET', async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls += 1;
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    };

    const cache = new ResponseCache(1000);
    const client = createHttpClient({ baseUrl: 'https://example.com', fetchImpl, cache });
    const first = await client.request<{ ok: boolean }>({ path: '/foo', useCache: true });
    const second = await client.request<{ ok: boolean }>({ path: '/foo', useCache: true });

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    expect(calls).toBe(1);
  });

  it('caches falsy payloads', async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls += 1;
      return new Response(JSON.stringify(0), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    };

    const cache = new ResponseCache(1000);
    const client = createHttpClient({ baseUrl: 'https://example.com', fetchImpl, cache });
    const first = await client.request<number>({ path: '/zero', useCache: true });
    const second = await client.request<number>({ path: '/zero', useCache: true });

    expect(first).toBe(0);
    expect(second).toBe(0);
    expect(calls).toBe(1);
  });
});

describe('ResponseCache', () => {
  it('evicts oldest entry even when the key is empty', () => {
    const cache = new ResponseCache<number>(1000, 1);
    cache.set('', 1);
    cache.set('next', 2);

    expect(cache.get('')).toBeUndefined();
    expect(cache.get('next')).toBe(2);
  });

  it('expires entries after ttl', async () => {
    const cache = new ResponseCache<number>(5, 10);
    cache.set('soon', 1);
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(cache.get('soon')).toBeUndefined();
  });

  it('clears all entries', () => {
    const cache = new ResponseCache<number>(1000);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.clear();
    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBeUndefined();
  });
});

describe('MemoryLRUCache', () => {
  it('evicts least recently used entries', () => {
    const cache = new MemoryLRUCache<string>(2);
    cache.set('a', '1');
    cache.set('b', '2');
    cache.get('a');
    cache.set('c', '3');
    expect(cache.get('a')).toBe('1');
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('c')).toBe('3');
  });
});

describe('RedisCacheAdapter', () => {
  it('stores values through async client', async () => {
    const store = new Map<string, string>();
    const client = {
      async get(key: string) {
        return store.get(key) ?? null;
      },
      async set(key: string, value: string) {
        store.set(key, value);
      },
      async del(key: string) {
        store.delete(key);
      }
    };

    const cache = new RedisCacheAdapter(client, { keyPrefix: 'test' });
    await cache.set('a', { ok: true });
    const value = await cache.get('a');
    expect(value).toEqual({ ok: true });
    await cache.delete('a');
    expect(await cache.get('a')).toBeUndefined();
  });
});
