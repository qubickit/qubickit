import { describe, expect, it, vi } from 'vitest';

import { createTransferWatcher } from './transfers';
import type { SessionClient } from '../session';

describe('createTransferWatcher', () => {
  it('emits new transactions without duplicates', async () => {
    vi.useFakeTimers();
    const listTransactions = vi
      .fn<SessionClient['listTransactions']>()
      .mockResolvedValueOnce({ transactions: [{ hash: 'a', tickNumber: 1 }, { hash: 'b', tickNumber: 2 }] })
      .mockResolvedValueOnce({ transactions: [] })
      .mockResolvedValueOnce({ transactions: [{ hash: 'c', tickNumber: 3 }] })
      .mockResolvedValue({ transactions: [] });

    const session = { listTransactions } as unknown as SessionClient;
    const watcher = createTransferWatcher(session, { identity: 'ID', intervalMs: 10 });

    const events: string[] = [];
    watcher.channel.subscribe(({ transaction }) => {
      if (transaction.hash) {
        events.push(transaction.hash);
      }
    });

    await vi.advanceTimersByTimeAsync(50);
    watcher.stop();
    vi.useRealTimers();

    expect(events).toEqual(['a', 'b', 'c']);
    expect(listTransactions.mock.calls.length).toBeGreaterThanOrEqual(3);
    expect(listTransactions.mock.calls[2]?.[1]).toMatchObject({ from: 2 });
  });
});
