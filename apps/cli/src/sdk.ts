import {
  createMemoryCacheAdapter,
  createQubicSdk,
  type QubicSdk,
  WalletProfileSchema,
  type StorageAdapter
} from '@qubickit/sdk';
import { z } from 'zod';
import type { CliConfig } from './config';
import { createJsonFileStorageAdapter } from './storage/json-storage';

export function createCliSdk(config: CliConfig): QubicSdk {
  const walletStorage = createJsonFileStorageAdapter({
    filePath: config.walletStorePath,
    schema: WalletProfileSchema
  });
  const storage = walletStorage as unknown as StorageAdapter<ReturnType<typeof z.unknown>>;

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
    storage,
    cache
  });
}
