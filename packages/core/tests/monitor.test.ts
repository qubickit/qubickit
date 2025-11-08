import { describe, expect, it } from 'bun:test';
import { monitorTransactionStatus } from '../src/transactions/monitor';
import type { ArchiveClient } from '../src/clients/archive-client';
import type { QueryServiceClient } from '../src/clients/query-client';

describe('monitorTransactionStatus', () => {
  const createArchiveClient = (statuses: Array<{ moneyFlew: boolean; txId: string }>) => {
    let calls = 0;
    const client: Pick<ArchiveClient, 'getTransactionStatus'> = {
      async getTransactionStatus() {
        const status = statuses[Math.min(calls, statuses.length - 1)];
        calls += 1;
        return status;
      }
    };
    return client;
  };

  it('resolves when money flows', async () => {
    const archive = createArchiveClient([
      { moneyFlew: false, txId: 'tx1' },
      { moneyFlew: true, txId: 'tx1' }
    ]);
    const result = await monitorTransactionStatus(archive as ArchiveClient, 'tx1', {
      pollIntervalMs: 1,
      timeoutMs: 50
    });
    expect(result.moneyFlew).toBe(true);
  });

  it('throws on timeout', async () => {
    const archive = createArchiveClient([{ moneyFlew: false, txId: 'tx1' }]);
    await expect(
      monitorTransactionStatus(archive as ArchiveClient, 'tx1', { pollIntervalMs: 1, timeoutMs: 10 })
    ).rejects.toThrow('did not settle');
  });

  it('falls back to query client for settlement confirmation', async () => {
    const archive = createArchiveClient([{ moneyFlew: false, txId: 'tx1' }]);
    let queryCalls = 0;
    const queryClient: Pick<QueryServiceClient, 'getTransactionByHash'> = {
      async getTransactionByHash() {
        queryCalls += 1;
        if (queryCalls >= 2) {
          return { transaction: { moneyFlew: true } };
        }
        return { transaction: { moneyFlew: false } };
      }
    };

    const originalRandom = Math.random;
    Math.random = () => 0;
    const result = await monitorTransactionStatus(archive as ArchiveClient, 'tx1', {
      pollIntervalMs: 1,
      maxIntervalMs: 2,
      timeoutMs: 50,
      queryClient: queryClient as QueryServiceClient
    });
    Math.random = originalRandom;

    expect(result.moneyFlew).toBe(true);
    expect(queryCalls).toBeGreaterThanOrEqual(2);
  });
});
