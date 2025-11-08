export interface PersistenceAdapter<TValue> {
  list(): Promise<Array<[string, TValue]>>;
  read(id: string): Promise<TValue | undefined>;
  write(id: string, value: TValue): Promise<void>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}
