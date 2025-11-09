import { describe, expect, it } from 'vitest';

import { createMemoryPersistenceAdapter } from '../persistence';
import { CommandQueue } from './command-queue';

type TransferCommand = { id: number };

describe('CommandQueue', () => {
  it('enqueues and processes commands', async () => {
    const persistence = createMemoryPersistenceAdapter<TransferCommand>();
    const queue = new CommandQueue<TransferCommand>({ persistence });
    await queue.enqueue('transfer', { id: 1 });
    const next = await queue.nextPending();
    expect(next?.type).toBe('transfer');
    if (next) {
      await queue.complete(next.id);
    }
    const completed = await queue.list('completed');
    expect(completed).toHaveLength(1);
  });
});
