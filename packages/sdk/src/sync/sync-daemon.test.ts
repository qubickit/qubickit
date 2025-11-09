import { describe, expect, it, vi } from 'vitest';

import { SyncDaemon } from './sync-daemon';
import type { SessionClient } from '../session';

const createSession = () =>
  ({
    listTransactions: vi.fn().mockResolvedValue({ transactions: [] }),
    getBalance: vi.fn().mockResolvedValue({ balance: { amount: '1' } })
  }) as unknown as SessionClient;

const logger = {
  info: vi.fn(),
  debug: vi.fn(),
  warn: vi.fn(),
  error: vi.fn()
};

const metrics = {
  record: vi.fn()
};

describe('SyncDaemon', () => {
  it('runs sync cycles for identities', async () => {
    vi.useFakeTimers();
    const session = createSession();
    const daemon = new SyncDaemon(session, logger, metrics, { intervalMs: 10, identities: ['ID'] });
    daemon.start();
    await vi.advanceTimersByTimeAsync(15);
    daemon.stop();
    vi.useRealTimers();
    expect(session.listTransactions).toHaveBeenCalled();
    expect(session.getBalance).toHaveBeenCalled();
  });
});
