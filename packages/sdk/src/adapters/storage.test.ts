import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { createMemoryStorageAdapter } from './storage';

describe('createMemoryStorageAdapter', () => {
  const schema = z.object({
    id: z.string(),
    createdAt: z.number()
  });

  it('persists and retrieves values with validation', async () => {
    const storage = createMemoryStorageAdapter({ schema });
    await storage.write('session', { id: 'alpha', createdAt: 1 });
    const value = await storage.read('session');
    expect(value).toEqual({ id: 'alpha', createdAt: 1 });
    expect(await storage.entries()).toEqual([['session', { id: 'alpha', createdAt: 1 }]]);
  });

  it('rejects invalid payloads', async () => {
    const storage = createMemoryStorageAdapter({ schema });
    await expect(storage.write('session', { id: 'bad' } as any)).rejects.toThrow(/createdAt/);
  });

  it('supports delete and clear operations', async () => {
    const storage = createMemoryStorageAdapter({ schema });
    await storage.write('a', { id: 'one', createdAt: 1 });
    await storage.delete('a');
    expect(await storage.read('a')).toBeUndefined();
    await storage.write('b', { id: 'two', createdAt: 2 });
    await storage.clear();
    expect(await storage.entries()).toEqual([]);
  });
});
