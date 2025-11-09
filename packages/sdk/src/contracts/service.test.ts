import { describe, expect, it, vi } from 'vitest';

import type { QubicSdk } from '../sdk';
import { ContractRegistry } from './registry';
import { ContractService } from './service';
import { ContractMetadataSchema } from './schemas';
import { TransferService } from '../transfers/service';
import { createTransportHooksRegistry } from '../transport/hooks';
import { WalletManager } from '../wallet';

describe('ContractService', () => {
  const entry = ContractMetadataSchema.parse({
    name: 'Demo',
    contractIndex: 1,
    address: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    procedures: [{ id: 1, name: 'demo' }]
  });

  const createSdk = () => {
    const sdk: Partial<QubicSdk> = {
      core: {
        http: {
          querySmartContract: vi.fn()
        } as QubicSdk['core']['http'],
        archive: {} as QubicSdk['core']['archive'],
        stats: {} as QubicSdk['core']['stats'],
        query: {} as QubicSdk['core']['query'],
        transports: {} as QubicSdk['core']['transports'],
        watchers: {
          ticks: {
            start: vi.fn(),
            stop: vi.fn(),
            onTick: vi.fn(() => () => undefined)
          }
        } as QubicSdk['core']['watchers']
      },
      adapters: {} as QubicSdk['adapters'],
      hooks: createTransportHooksRegistry(),
      wallet: new WalletManager(),
      createSessionClient: vi.fn()
    };
    return sdk as QubicSdk;
  };

  const seed = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyabcd';

  it('calls contracts via http client', async () => {
    const sdk = createSdk();
    sdk.core.http.querySmartContract = vi.fn().mockResolvedValue({ ok: true });
    const registry = new ContractRegistry([entry]);
    const transfers = {
      send: vi.fn()
    } as unknown as TransferService;
    const service = new ContractService(sdk, registry, transfers);
    await service.call({ contract: 1, functionName: 'Fees' });
    expect(sdk.core.http.querySmartContract).toHaveBeenCalled();
  });

  it('invokes procedures via typed helpers', async () => {
    const sdk = createSdk();
    const registry = new ContractRegistry([entry]);
    const transfers = {
      send: vi.fn().mockResolvedValue({ txId: 'abc' })
    } as unknown as TransferService;
    const service = new ContractService(sdk, registry, transfers);
    await service.invoke({
      contract: 'Demo',
      procedureName: 'IssueAsset',
      signer: { seed },
      amount: '0'
    } as any);
    expect(transfers.send).toHaveBeenCalled();
  });
});
