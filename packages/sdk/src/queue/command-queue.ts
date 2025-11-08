import { randomUUID } from '../internal/random';
import { Observable } from '../events/observable';
import type { PersistenceAdapter } from '../persistence';

export type CommandStatus = 'pending' | 'processing' | 'failed' | 'completed';

export interface CommandRecord<TPayload> {
  id: string;
  type: string;
  payload: TPayload;
  status: CommandStatus;
  attempts: number;
  lastError?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CommandQueueOptions<TPayload> {
  persistence: PersistenceAdapter<CommandRecord<TPayload>>;
}

export class CommandQueue<TPayload> {
  private readonly events = new Observable<CommandRecord<TPayload>>((observer) => {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  });
  private readonly observers = new Set<{ next(value: CommandRecord<TPayload>): void }>();

  constructor(private readonly options: CommandQueueOptions<TPayload>) {}

  async enqueue(type: string, payload: TPayload): Promise<CommandRecord<TPayload>> {
    const record: CommandRecord<TPayload> = {
      id: randomUUID(),
      type,
      payload,
      status: 'pending',
      attempts: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await this.options.persistence.write(record.id, record);
    this.emit(record);
    return record;
  }

  async list(status?: CommandStatus): Promise<CommandRecord<TPayload>[]> {
    const entries = await this.options.persistence.list();
    const commands = entries.map(([, value]) => value);
    return status ? commands.filter((command) => command.status === status) : commands;
  }

  async nextPending(): Promise<CommandRecord<TPayload> | undefined> {
    const pending = await this.list('pending');
    if (!pending.length) return undefined;
    const record = pending[0]!;
    record.status = 'processing';
    record.updatedAt = Date.now();
    record.attempts += 1;
    await this.options.persistence.write(record.id, record);
    this.emit(record);
    return record;
  }

  async complete(id: string) {
    const record = await this.options.persistence.read(id);
    if (!record) return;
    record.status = 'completed';
    record.updatedAt = Date.now();
    await this.options.persistence.write(id, record);
    this.emit(record);
  }

  async fail(id: string, error: unknown) {
    const record = await this.options.persistence.read(id);
    if (!record) return;
    record.status = 'failed';
    record.updatedAt = Date.now();
    record.lastError = error instanceof Error ? error.message : String(error);
    await this.options.persistence.write(id, record);
    this.emit(record);
  }

  observe() {
    return this.events;
  }

  private emit(value: CommandRecord<TPayload>) {
    for (const observer of this.observers) {
      observer.next(value);
    }
  }
}
