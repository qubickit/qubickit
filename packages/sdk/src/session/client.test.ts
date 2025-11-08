import { describe, expect, it, vi } from 'vitest';

import type { QubicSdk } from '../sdk';
import { createTransportHooksRegistry } from '../transport/hooks';
import { SessionClient } from './client';

const createMockSdk = () => {
  const query = {
    getTransactionByHash: vi.fn(),
    getTransactionsForIdentity: vi.fn()
  };
  const archive = {
    getTransaction: vi.fn()
  };
  const http = {
    getBalance: vi.fn()
  };
  const sdk = {
    core: {
      query,
      archive,
      http,
      watchers: {
        ticks: {
          start: vi.fn(),
          stop: vi.fn(),
          onTick: vi.fn(() => () => undefined)
        }
      }
    },
    adapters: {
      storage: {} as any,
      cache: {} as any
    },
    hooks: createTransportHooksRegistry(),
    wallet: {} as any,
    createSessionClient: vi.fn()
  } satisfies Partial<QubicSdk>;
  return { sdk: sdk as QubicSdk, query, archive, http };
};

describe('SessionClient', () => {
  it('falls back to archive when query fails', async () => {
    const { sdk, query, archive } = createMockSdk();
    query.getTransactionByHash.mockRejectedValueOnce(new Error('offline'));
    archive.getTransaction.mockResolvedValue({ hash: 'abc' });
    const client = new SessionClient(sdk, { defaultCacheTtlMs: 0 });
    const result = await client.getTransactionByHash('abc');
    expect(result).toEqual({ hash: 'abc' });
    expect(archive.getTransaction).toHaveBeenCalledWith('abc');
  });

  it('caches identity transactions', async () => {
    const { sdk, query } = createMockSdk();
    query.getTransactionsForIdentity.mockResolvedValue({ transactions: [{ hash: '1' }] });
    const client = new SessionClient(sdk, { defaultCacheTtlMs: 1000 });
    await client.listTransactions('IDENTITY');
    await client.listTransactions('IDENTITY');
    expect(query.getTransactionsForIdentity).toHaveBeenCalledTimes(1);
  });

  it('streams transactions across pages', async () => {
    const { sdk, query } = createMockSdk();
    query.getTransactionsForIdentity
      .mockResolvedValueOnce({ transactions: [{ hash: 'a' }] })
      .mockResolvedValueOnce({ transactions: [{ hash: 'b' }] })
      .mockResolvedValue({ transactions: [] });
    const client = new SessionClient(sdk, { defaultCacheTtlMs: 0 });
    const hashes: string[] = [];
    for await (const tx of client.streamTransactions('IDENTITY', { pageSize: 1 })) {
      hashes.push(tx.hash as string);
    }
    expect(hashes).toEqual(['a', 'b']);
  });

  it('caches balances', async () => {
    const { sdk, http } = createMockSdk();
    http.getBalance.mockResolvedValue({ balance: { amount: '1' } });
    const client = new SessionClient(sdk, { defaultCacheTtlMs: 1000 });
    await client.getBalance('IDENTITY');
    await client.getBalance('IDENTITY');
    expect(http.getBalance).toHaveBeenCalledTimes(1);
  });
});
