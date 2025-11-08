import { z, type ZodTypeAny } from 'zod';

import type { PersistenceAdapter } from './types';

type IDBFactoryLike = {
  open(name: string, version?: number): IDBOpenDBRequestLike;
};

type IDBOpenDBRequestLike = {
  result: IDBDatabaseLike;
  onupgradeneeded: (() => void) | null;
  onerror: (() => void) | null;
  onsuccess: (() => void) | null;
  error?: unknown;
};

type IDBDatabaseLike = {
  objectStoreNames: { contains(name: string): boolean };
  createObjectStore(name: string): void;
  transaction(name: string, mode: IDBTransactionModeLike): IDBTransactionLike;
};

type IDBTransactionLike = {
  objectStore(name: string): IDBObjectStoreLike;
  oncomplete: (() => void) | null;
  onerror: (() => void) | null;
  error?: unknown;
};

type IDBObjectStoreLike = {
  put(value: unknown, key: string): void;
  delete(key: string): void;
  clear(): void;
  get(key: string): IDBRequestLike;
  getAll(): IDBRequestLike;
  getAllKeys(): IDBRequestLike;
};

type IDBRequestLike = {
  result: any;
  onerror: (() => void) | null;
  onsuccess: (() => void) | null;
  error?: unknown;
};

type IDBTransactionModeLike = 'readonly' | 'readwrite';

export interface IndexedDbPersistenceAdapterOptions<TSchema extends ZodTypeAny> {
  databaseName?: string;
  storeName?: string;
  schema: TSchema;
}

const getIndexedDb = (): IDBFactoryLike => {
  const factory = (globalThis as { indexedDB?: IDBFactoryLike }).indexedDB;
  if (!factory) {
    throw new Error('IndexedDB is not available in this environment.');
  }
  return factory;
};

export function createIndexedDbPersistenceAdapter<TSchema extends ZodTypeAny>(
  options: IndexedDbPersistenceAdapterOptions<TSchema>
): PersistenceAdapter<z.infer<TSchema>> {
  const dbName = options.databaseName ?? 'qubickit-sdk';
  const storeName = options.storeName ?? 'persistence';
  const schema = options.schema;

  const getDb = () =>
    new Promise<IDBDatabaseLike>((resolve, reject) => {
      const request = getIndexedDb().open(dbName, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });

  const run = async <T>(mode: IDBTransactionModeLike, handler: (store: IDBObjectStoreLike) => void) => {
    const db = await getDb();
    return new Promise<T>((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      handler(store);
      tx.oncomplete = () => resolve(undefined as T);
      tx.onerror = () => reject(tx.error);
    });
  };

  const getAll = async () => {
    const db = await getDb();
    return new Promise<Array<[string, z.infer<TSchema>]>>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const keysRequest = store.getAllKeys();
      const valuesRequest = store.getAll();
      tx.onerror = () => reject(tx.error);
      tx.oncomplete = () => {
        const keys = (keysRequest.result as string[]) ?? [];
        const values = (valuesRequest.result as unknown[]) ?? [];
        resolve(keys.map((key, index) => [key, schema.parse(values[index])] as [string, z.infer<TSchema>]));
      };
    });
  };

  return {
    async list() {
      return getAll();
    },
    async read(id) {
      const db = await getDb();
      return new Promise<z.infer<TSchema> | undefined>((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.get(id);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          resolve(request.result ? schema.parse(request.result) : undefined);
        };
      });
    },
    async write(id, value) {
      await run<void>('readwrite', (store) => {
        store.put(schema.parse(value), id);
      });
    },
    async delete(id) {
      await run<void>('readwrite', (store) => {
        store.delete(id);
      });
    },
    async clear() {
      await run<void>('readwrite', (store) => {
        store.clear();
      });
    }
  };
}
