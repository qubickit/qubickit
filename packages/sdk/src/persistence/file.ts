import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { z, type ZodTypeAny } from 'zod';

import type { PersistenceAdapter } from './types';

export interface FilePersistenceAdapterOptions<TSchema extends ZodTypeAny> {
  filePath: string;
  schema: TSchema;
  pretty?: boolean;
}

type StoreShape<TValue> = Record<string, TValue>;

export function createFilePersistenceAdapter<TSchema extends ZodTypeAny>(
  options: FilePersistenceAdapterOptions<TSchema>
): PersistenceAdapter<z.infer<TSchema>> {
  const schema = options.schema;
  const readStore = async (): Promise<StoreShape<z.infer<TSchema>>> => {
    try {
      const buffer = await readFile(options.filePath, 'utf8');
      const parsed = JSON.parse(buffer);
      const store: StoreShape<z.infer<TSchema>> = {};
      for (const [key, value] of Object.entries(parsed)) {
        store[key] = schema.parse(value);
      }
      return store;
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        return {};
      }
      throw error;
    }
  };

  const writeStore = async (store: StoreShape<z.infer<TSchema>>) => {
    await mkdir(dirname(options.filePath), { recursive: true });
    const json = JSON.stringify(store, null, options.pretty ? 2 : undefined);
    await writeFile(options.filePath, json, 'utf8');
  };

  return {
    async list() {
      const store = await readStore();
      return Object.entries(store);
    },
    async read(id) {
      const store = await readStore();
      return store[id];
    },
    async write(id, value) {
      const store = await readStore();
      store[id] = schema.parse(value);
      await writeStore(store);
    },
    async delete(id) {
      const store = await readStore();
      delete store[id];
      await writeStore(store);
    },
    async clear() {
      await writeStore({});
    }
  };
}
