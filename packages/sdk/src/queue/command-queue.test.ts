import { describe, expect, it } from 'vitest';

import { createMemoryPersistenceAdapter } from '../persistence';
import { CommandQueue } from './command-queue';

describe('CommandQueue', () => {
  it('enqueues and processes commands', async () => {
    const persistence = createMemoryPersistenceAdapter<any>();
    const queue = new CommandQueue({ persistence });
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
