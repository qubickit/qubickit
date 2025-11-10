import {
  createMemoryCacheAdapter,
  createQubicSdk,
  type QubicSdk,
  WalletProfileSchema,
  WalletManager
} from '@qubickit/sdk';
import { z } from 'zod';
import type { CliConfig } from './config';
import { createJsonFileStorageAdapter } from './storage/json-storage';

export function createCliSdk(config: CliConfig): QubicSdk {
  const walletStorage = createJsonFileStorageAdapter({
    filePath: config.walletStorePath,
    schema: WalletProfileSchema
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
      storage: walletStorage
    })
  });
}
