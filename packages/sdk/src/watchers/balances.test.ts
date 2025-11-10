import { describe, expect, it, vi } from 'vitest';

import { createBalanceWatcher } from './balances';
import type { QubicSdk } from '../sdk';

const createMockSdk = () =>
  ({
    core: {
      http: {
        getBalance: vi.fn()
      },
      watchers: {
        ticks: {
          start: vi.fn(),
          stop: vi.fn(),
          onTick: vi.fn(() => () => undefined)
        }
      }
    },
    adapters: {} as QubicSdk['adapters'],
    hooks: {},
    wallet: {
      resumeSession: vi.fn()
    },
    createSessionClient: vi.fn()
  }) as unknown as QubicSdk;

describe('createBalanceWatcher', () => {
  it('emits changes when balance updates', async () => {
    vi.useFakeTimers();
    const sdk = createMockSdk();
    const responses = [{ balance: { amount: '1' } }, { balance: { amount: '1' } }, { balance: { amount: '2' } }];
    sdk.core.http.getBalance = vi.fn().mockImplementation(() => Promise.resolve(responses.shift() ?? responses[0]));

    const watcher = createBalanceWatcher(sdk, { identity: 'ID', intervalMs: 10 });
    const values: string[] = [];
    watcher.channel.subscribe((payload) => {
      values.push(payload.balance?.amount ?? '');
    });

    await vi.advanceTimersByTimeAsync(35);
    watcher.stop();
    vi.useRealTimers();
    expect(values).toEqual(['1', '2']);
  });
});
