import { createQubicCore, type CoreTransportOptions, type QubicCore } from '@qubickit/core';
import { z } from 'zod';

import {
  createMemoryCacheAdapter,
  createMemoryStorageAdapter,
  type CacheAdapter,
  type CacheValue,
  type StorageAdapter,
  type StorageValue
} from './adapters';
import { createTransportHooksRegistry, type TransportHooksRegistry } from './transport/hooks';
import { SessionClient, type SessionClientOptions } from './session';
import { WalletManager, type WalletManagerOptions } from './wallet';
import { createStaticContractRegistry, ContractRegistry, ContractService } from './contracts';
import { TransferService } from './transfers';

export interface QubicSdkAdapters {
  storage: StorageAdapter<ZodUnknown>;
  cache: CacheAdapter<ZodUnknown>;
}

type ZodUnknown = ReturnType<typeof z.unknown>;

export interface QubicSdkOptions extends CoreTransportOptions {
  storage?: StorageAdapter<ZodUnknown>;
  cache?: CacheAdapter<ZodUnknown>;
  transportHooks?: TransportHooksRegistry;
  wallet?: WalletManager | WalletManagerOptions;
}

export interface QubicSdk {
  readonly core: QubicCore;
  readonly adapters: QubicSdkAdapters;
  readonly hooks: TransportHooksRegistry;
  readonly wallet: WalletManager;
  readonly transfers: TransferService;
  readonly contracts: {
    registry: ContractRegistry;
    service: ContractService;
  };
  createSessionClient(options?: SessionClientOptions): SessionClient;
}

const defaultSchema = z.unknown();

export function createQubicSdk(options: QubicSdkOptions = {}): QubicSdk {
  const core = createQubicCore(options);
  const storage = options.storage ?? createMemoryStorageAdapter({ schema: defaultSchema, namespace: 'sdk-storage' });
  const cache = options.cache ?? createMemoryCacheAdapter({ schema: defaultSchema, namespace: 'sdk-cache' });
  const hooks = options.transportHooks ?? createTransportHooksRegistry();
  const wallet =
    options.wallet instanceof WalletManager ? options.wallet : new WalletManager(options.wallet ?? undefined);

  let sdk: QubicSdk;

  const base = {
    core,
    adapters: {
      storage,
      cache
    },
    hooks,
    wallet,
    createSessionClient(sessionOptions: SessionClientOptions = {}) {
      return new SessionClient(sdk, { wallet, ...sessionOptions });
    }
  };

  const transfers = new TransferService(base as unknown as QubicSdk);
  const contractRegistry = createStaticContractRegistry();
  const contractService = new ContractService(base as unknown as QubicSdk, contractRegistry, transfers);

  sdk = {
    ...base,
    transfers,
    contracts: {
      registry: contractRegistry,
      service: contractService
    }
  };

  return sdk;
}

export type { StorageAdapter, CacheAdapter, StorageValue, CacheValue };
