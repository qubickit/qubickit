import {
  createMemoryCacheAdapter,
  createQubicSdk,
  type QubicSdk,
  WalletProfileSchema,
  WalletManager
} from '@qubickit/sdk';
import { createFilePersistenceAdapter } from '@qubickit/sdk/persistence';
import { WalletSessionRecordSchema } from '@qubickit/sdk/wallet';
import { z } from 'zod';
import type { CliConfig } from './config';
import { createJsonFileStorageAdapter } from './storage/json-storage';

export function createCliSdk(config: CliConfig): QubicSdk {
  const walletStorage = createJsonFileStorageAdapter({
    filePath: config.walletStorePath,
    schema: WalletProfileSchema
  });

  const sessionStorage = createFilePersistenceAdapter({
    filePath: config.sessionStorePath,
    schema: WalletSessionRecordSchema,
    pretty: true
  });

  const cache = createMemoryCacheAdapter({
    schema: z.unknown(),
    namespace: 'cli-cache',
    defaultTtlMs: 5_000
  });

  return createQubicSdk({
    hosts: {
      archive: config.archiveHost,
      http: config.httpHost,
      stats: config.statsHost,
      query: config.queryHost
    },
    cache,
    wallet: new WalletManager({
      storage: walletStorage,
      sessionPersistence: sessionStorage
    })
  });
}
