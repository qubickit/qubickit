import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
  createFilePersistenceAdapter,
  createMemoryPersistenceAdapter,
  createSecurePersistenceAdapter,
  type PersistenceAdapter
} from './index';

const schema = z.object({
  value: z.number()
});

describe('Persistence adapters', () => {
  describe('memory', () => {
    it('stores values in memory', async () => {
      const adapter = createMemoryPersistenceAdapter({ initialState: [['a', { value: 1 }]] });
      await adapter.write('b', { value: 2 });
      const entries = await adapter.list();
      expect(entries).toHaveLength(2);
    });
  });

  describe('file', () => {
    let dir: string;
    let adapter: PersistenceAdapter<{ value: number }>;

    beforeEach(async () => {
      dir = await mkdtemp(join(tmpdir(), 'sdk-file-persist-'));
      adapter = createFilePersistenceAdapter({
        filePath: join(dir, 'store.json'),
        schema,
        pretty: true
      });
    });

    afterEach(async () => {
      await rm(dir, { recursive: true, force: true });
    });

    it('persists values to disk', async () => {
      await adapter.write('a', { value: 1 });
      const adapter2 = createFilePersistenceAdapter({
        filePath: join(dir, 'store.json'),
        schema
      });
      const read = await adapter2.read('a');
      expect(read).toEqual({ value: 1 });
    });
  });

  describe('secure wrapper', () => {
    it('encrypts persisted payloads', async () => {
      const base = createMemoryPersistenceAdapter<string>();
      const secure = createSecurePersistenceAdapter({
        adapter: base,
        schema,
        passphrase: 'secret'
      });
      await secure.write('a', { value: 42 });
      const raw = await base.read('a');
      expect(typeof raw).toBe('string');
      await expect(secure.read('a')).resolves.toEqual({ value: 42 });
    });
  });
});
