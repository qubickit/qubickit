import { describe, expect, it, vi } from 'vitest';

import type { QubicSdk } from '../sdk';
import { createTransportHooksRegistry } from '../transport/hooks';
import { TransferService } from './service';

const seed = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyabcd';
const destination = 'BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARMID';

const createSdk = () =>
  ({
    core: {
      http: {
        broadcastTransaction: vi.fn().mockResolvedValue({ transactionId: '0xtx' }),
        getBalance: vi.fn()
      },
      archive: {
        getLatestTick: vi.fn().mockResolvedValue({ latestTick: 1 }),
        getTransactionStatus: vi.fn().mockResolvedValue({ moneyFlew: true })
      },
      query: {
        getTransactionByHash: vi.fn().mockResolvedValue({ transaction: { moneyFlew: true } })
      },
      watchers: {
        ticks: {
          start: vi.fn(),
          stop: vi.fn(),
          onTick: vi.fn(() => () => undefined)
        }
      }
    },
    adapters: { storage: {} as any, cache: {} as any },
    hooks: createTransportHooksRegistry(),
    wallet: {
      resumeSession: vi.fn()
    },
    createSessionClient: vi.fn()
  }) as unknown as QubicSdk;

describe('TransferService', () => {
  it('drafts transfers without broadcast', async () => {
    const service = new TransferService(createSdk());
    const result = await service.send({
      destination,
      amount: 1,
      signer: { seed },
      dryRun: true
    });
    expect(result.status).toBe('draft');
  });

  it('broadcasts transfers and monitors settlement', async () => {
    const sdk = createSdk();
    sdk.core.archive.getTransactionStatus = vi.fn().mockResolvedValue({ moneyFlew: true });
    const service = new TransferService(sdk);
    const result = await service.send({
      destination,
      amount: 1,
      signer: { seed },
      monitor: true
    });
    expect(result.status).toBe('settled');
    expect(sdk.core.http.broadcastTransaction).toHaveBeenCalled();
  });
});
