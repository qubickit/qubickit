import { z, type ZodTypeAny } from 'zod';

export type StorageValue<TSchema extends ZodTypeAny> = z.infer<TSchema>;

export interface StorageAdapterOptions<TSchema extends ZodTypeAny> {
  schema: TSchema;
  namespace?: string;
}

export interface StorageAdapter<TSchema extends ZodTypeAny> {
  readonly namespace: string;
  read(key: string): Promise<StorageValue<TSchema> | undefined>;
  write(key: string, value: StorageValue<TSchema>): Promise<StorageValue<TSchema>>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  entries(): Promise<Array<[string, StorageValue<TSchema>]>>;
}

export function createMemoryStorageAdapter<TSchema extends ZodTypeAny>(
  options: StorageAdapterOptions<TSchema>
): StorageAdapter<TSchema> {
  if (!options?.schema) {
    throw new Error('Storage adapter requires a Zod schema.');
  }
  const store = new Map<string, StorageValue<TSchema>>();
  const namespace = options.namespace ?? 'sdk-memory-storage';
  const { schema } = options;

  const validate = (value: StorageValue<TSchema>) => schema.parse(value);

  return {
    namespace,
    async read(key) {
      const value = store.get(key);
      if (typeof value === 'undefined') {
        return undefined;
      }
      return validate(value);
    },
    async write(key, value) {
      const parsed = validate(value);
      store.set(key, parsed);
      return parsed;
    },
    async delete(key) {
      store.delete(key);
    },
    async clear() {
      store.clear();
    },
    async entries() {
      return Array.from(store.entries()).map(([key, value]) => [key, validate(value)]);
    }
  };
}
