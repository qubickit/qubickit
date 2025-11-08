import type { PersistenceAdapter } from './types';

export interface MemoryPersistenceAdapterOptions<TValue> {
  initialState?: Array<[string, TValue]>;
}

export function createMemoryPersistenceAdapter<TValue>(
  options: MemoryPersistenceAdapterOptions<TValue> = {}
): PersistenceAdapter<TValue> {
  const store = new Map<string, TValue>(options.initialState);
  return {
    async list() {
      return Array.from(store.entries());
    },
    async read(id) {
      return store.get(id);
    },
    async write(id, value) {
      store.set(id, value);
    },
    async delete(id) {
      store.delete(id);
    },
    async clear() {
      store.clear();
    }
  };
}
