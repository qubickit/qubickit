import type { StorageAdapter } from '@qubickit/sdk';
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { dirname } from 'node:path';
import { z, type ZodTypeAny } from 'zod';

interface JsonFileStorageOptions<TSchema extends ZodTypeAny> {
  filePath: string;
  schema: TSchema;
}

export function createJsonFileStorageAdapter<TSchema extends ZodTypeAny>(
  options: JsonFileStorageOptions<TSchema>
): StorageAdapter<TSchema> {
  const readStore = async (): Promise<Record<string, z.infer<TSchema>>> => {
    try {
      const buffer = await readFile(options.filePath, 'utf8');
      const parsed = JSON.parse(buffer) as Record<string, unknown>;
      return Object.entries(parsed).reduce<Record<string, z.infer<TSchema>>>((acc, [key, value]) => {
        acc[key] = options.schema.parse(value);
        return acc;
      }, {});
    } catch (error) {
      if (isNoEntry(error)) {
        return {};
      }
      throw error;
    }
  };

  const writeStore = async (store: Record<string, z.infer<TSchema>>) => {
    await mkdir(dirname(options.filePath), { recursive: true });
    const payload = JSON.stringify(store, null, 2);
    const tempPath = `${options.filePath}.${process.pid}.${Date.now()}.tmp`;
    await writeFile(tempPath, payload, 'utf8');
    await rename(tempPath, options.filePath);
  };

  return {
    namespace: `file:${options.filePath}`,
    async read(key: string) {
      const store = await readStore();
      return store[key];
    },
    async write(key: string, value: z.infer<TSchema>) {
      const store = await readStore();
      store[key] = options.schema.parse(value);
      await writeStore(store);
      return store[key]!;
    },
    async delete(key: string) {
      const store = await readStore();
      delete store[key];
      await writeStore(store);
    },
    async clear() {
      await writeStore({});
    },
    async entries() {
      const store = await readStore();
      return Object.entries(store);
    }
  };
}

const isNoEntry = (error: unknown): error is NodeJS.ErrnoException =>
  Boolean(error && typeof error === 'object' && 'code' in error && (error as NodeJS.ErrnoException).code === 'ENOENT');
