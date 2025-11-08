import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { createMemoryCacheAdapter } from './cache';

describe('createMemoryCacheAdapter', () => {
  const schema = z.object({ id: z.string() });

  it('stores values and respects validation', async () => {
    const cache = createMemoryCacheAdapter({ schema });
    await cache.set('session', { id: 'alpha' });
    expect(await cache.get('session')).toEqual({ id: 'alpha' });
    expect(await cache.has('session')).toBe(true);
  });

  it('expires entries based on ttl', async () => {
    let now = 0;
    const cache = createMemoryCacheAdapter({
      schema,
      defaultTtlMs: 50,
      clock: () => now
    });

    await cache.set('session', { id: 'alpha' });
    now = 25;
    expect(await cache.get('session')).toEqual({ id: 'alpha' });
    now = 60;
    expect(await cache.get('session')).toBeUndefined();
    expect(await cache.has('session')).toBe(false);
    expect(await cache.size()).toBe(0);
  });

  it('clears and deletes entries', async () => {
    const cache = createMemoryCacheAdapter({ schema });
    await cache.set('a', { id: 'one' });
    await cache.delete('a');
    expect(await cache.get('a')).toBeUndefined();
    await cache.set('b', { id: 'two' });
    await cache.clear();
    expect(await cache.size()).toBe(0);
  });
});
