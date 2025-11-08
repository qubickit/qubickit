import { describe, expect, it, vi } from 'vitest';

import type { QubicSdk } from '../sdk';
import { ContractRegistry } from './registry';
import { ContractService } from './service';
import { ContractMetadataSchema } from './schemas';
import { TransferService } from '../transfers/service';

describe('ContractService', () => {
  const entry = ContractMetadataSchema.parse({
    name: 'Demo',
    contractIndex: 1,
    address: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    procedures: [{ id: 1, name: 'demo' }]
  });

  const createSdk = () =>
    ({
      core: {
        http: {
          querySmartContract: vi.fn()
        },
        archive: {} as any,
        watchers: {
          ticks: {
            start: vi.fn(),
            stop: vi.fn(),
            onTick: vi.fn(() => () => undefined)
          }
        }
      },
      adapters: { storage: {} as any, cache: {} as any },
      hooks: {} as any,
      wallet: {} as any,
      createSessionClient: vi.fn()
    }) as unknown as QubicSdk;

  it('calls contracts via http client', async () => {
    const sdk = createSdk();
    sdk.core.http.querySmartContract = vi.fn().mockResolvedValue({ ok: true });
    const registry = new ContractRegistry([entry]);
    const transfers = {
      send: vi.fn()
    } as unknown as TransferService;
    const service = new ContractService(sdk, registry, transfers);
    await service.call({ contract: 1 });
    expect(sdk.core.http.querySmartContract).toHaveBeenCalled();
  });
});
