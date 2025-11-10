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
import { MultiWalletManager } from './wallet/multi-wallet-manager';
import { createStaticContractRegistry, ContractRegistry, ContractService } from './contracts';
import { TransferService, type TransferServiceOptions } from './transfers';
import {
  createBalanceWatcher,
  createTickStream,
  type BalanceWatchHandle,
  type BalanceWatcherOptions,
  type ContractWatchHandle,
  type ContractWatcherOptions,
  type TickStream,
  type TickStreamOptions,
  type TransferWatchHandle,
  type TransferWatcherOptions
} from './watchers';
import { createLogger, type SdkLogger } from './telemetry/logger';
import { createMetricsRecorder, type MetricsRecorder } from './telemetry/metrics';
import { SyncDaemon } from './sync/sync-daemon';

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
  logger?: Partial<SdkLogger>;
  metrics?: Partial<MetricsRecorder>;
  transfers?: TransferServiceOptions;
  sync?: {
    intervalMs?: number;
    identities?: string[];
  };
}

export interface QubicSdk {
  readonly core: QubicCore;
  readonly adapters: QubicSdkAdapters;
  readonly hooks: TransportHooksRegistry;
  readonly wallet: WalletManager;
  readonly multiWallet: MultiWalletManager;
  readonly transfers: TransferService;
  readonly contracts: {
    registry: ContractRegistry;
    service: ContractService;
  };
  readonly watchers: {
    ticks(options?: TickStreamOptions): TickStream;
    balance(identity: string, options?: Omit<BalanceWatcherOptions, 'identity'>): BalanceWatchHandle;
    transfers(
      identity: string,
      options?: Omit<TransferWatcherOptions, 'identity'>,
      sessionOptions?: SessionClientOptions
    ): TransferWatchHandle;
    contracts(
      contractIdentity: string,
      options?: Omit<ContractWatcherOptions, 'contractIdentity'>,
      sessionOptions?: SessionClientOptions
    ): ContractWatchHandle;
  };
  readonly telemetry: {
    logger: SdkLogger;
    metrics: MetricsRecorder;
  };
  readonly sync: SyncDaemon;
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
  const logger = createLogger(options.logger);
  const metrics = createMetricsRecorder(options.metrics);

  // eslint-disable-next-line prefer-const
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

  const transfers = new TransferService(base as QubicSdk, options.transfers);
  const contractRegistry = createStaticContractRegistry();
  const contractService = new ContractService(base as QubicSdk, contractRegistry, transfers);
  const multiWallet = new MultiWalletManager(wallet);
  const syncDaemon = new SyncDaemon(
    new SessionClient(base as QubicSdk),
    logger,
    metrics,
    options.sync
  );

  sdk = {
    ...base,
    telemetry: {
      logger,
      metrics
    },
    transfers,
    multiWallet,
    sync: syncDaemon,
    contracts: {
      registry: contractRegistry,
      service: contractService
    },
    watchers: {
      ticks(options) {
        return createTickStream(sdk, options);
      },
      balance(identity, options) {
        return createBalanceWatcher(sdk, { identity, ...options });
      },
      transfers(identity, options, sessionOptions) {
        const session = sdk.createSessionClient(sessionOptions);
        return session.watchTransfers(identity, options);
      },
      contracts(contractIdentity, options, sessionOptions) {
        const session = sdk.createSessionClient(sessionOptions);
        return session.watchContract(contractIdentity, options);
      }
    }
  };

  return sdk;
}

export type { StorageAdapter, CacheAdapter, StorageValue, CacheValue };
