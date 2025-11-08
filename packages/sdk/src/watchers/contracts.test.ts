import { describe, expect, it, vi } from 'vitest';

import { createContractWatcher } from './contracts';
import type { SessionClient } from '../session';

describe('createContractWatcher', () => {
  it('emits contract events for matching transactions', async () => {
    vi.useFakeTimers();
    const listTransactions = vi
      .fn<SessionClient['listTransactions']>()
      .mockResolvedValueOnce({
        transactions: [
          { hash: 'skip', destination: 'OTHER' },
          { hash: 'match', destination: 'CONTRACT' }
        ]
      } as any)
      .mockResolvedValue({ transactions: [] } as any);

    const session = { listTransactions } as unknown as SessionClient;
    const watcher = createContractWatcher(session, {
      contractIdentity: 'CONTRACT',
      intervalMs: 10
    });

    const seen: string[] = [];
    watcher.channel.subscribe(({ transaction }) => {
      if (transaction?.hash) seen.push(transaction.hash);
    });

    await vi.advanceTimersByTimeAsync(25);
    watcher.stop();
    vi.useRealTimers();

    expect(seen).toEqual(['match']);
  });
});
