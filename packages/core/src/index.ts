import { DEFAULT_HOSTS, type HostKey, type HostRegistry } from './config/hosts';
import { createHttpClient, HttpClient, type HttpClientOptions } from './transport/http-client';
import { ArchiveClient } from './clients/archive-client';
import { HttpApiClient } from './clients/http-api-client';
import { StatsClient } from './clients/stats-client';
import { QueryServiceClient } from './clients/query-client';
import { TickWatcher } from './watchers/tick-watcher';
export { DEFAULT_HOSTS } from './config/hosts';
export type { HostKey, HostRegistry } from './config/hosts';
export { HttpClient } from './transport/http-client';
export type { HttpClientOptions, HttpMethod, RequestOptions } from './transport/http-client';
export { ArchiveClient } from './clients/archive-client';
export { HttpApiClient } from './clients/http-api-client';
export { StatsClient } from './clients/stats-client';
export { QueryServiceClient } from './clients/query-client';
export { QubicHttpError, QubicValidationError, QubicTimeoutError, QubicCircuitOpenError } from './errors';
export {
  createTransactionDraft,
  attachNetworkMetadata,
  buildUnsignedTransaction,
  signTransaction,
  encodeSignedTransaction
} from './serde/transaction-builder';
export {
  serializeTimeLock,
  deserializeTimeLock,
  serializeVarStruct,
  deserializeVarStruct
} from './serde/metadata';
export { createIdentityPackage, publicKeyToIdentity, identityToPublicKey } from './wallet/identity';
export { monitorTransactionStatus } from './transactions/monitor';
export { broadcastEncodedTransaction } from './transactions/broadcast';
export { querySmartContract } from './contracts/query';
export type {
  ArchivePath,
  HttpPath,
  StatsPath,
  QueryServicePath
} from './models/routes';
export { normalizeAmount } from './utils/amount';
export { parseTickRange } from './utils/ticks';
export { toBase64, fromBase64 } from './utils/base64';
export type { CacheAdapter } from './cache/cache-adapter';
export { ResponseCache } from './cache/response-cache';
export { MemoryLRUCache } from './cache/memory-lru';
export { RedisCacheAdapter } from './cache/redis-cache';
export { EventStreamClient, EventStreamSubscription } from './transport/event-stream';

export interface CoreTransportOptions {
  hosts?: Partial<HostRegistry>;
  defaultHeaders?: Record<string, string>;
  timeoutMs?: number;
  hooks?: HttpClientOptions['hooks'];
}

export type CoreTransports = Record<HostKey, HttpClient>;

export function createCoreTransports(options: CoreTransportOptions = {}): CoreTransports {
  const mergedHosts: HostRegistry = {
    ...DEFAULT_HOSTS,
    ...options.hosts
  };

  return Object.entries(mergedHosts).reduce((acc, [key, baseUrl]) => {
    acc[key as HostKey] = createHttpClient({
      baseUrl,
      defaultHeaders: options.defaultHeaders,
      timeoutMs: options.timeoutMs,
      hooks: options.hooks
    });
    return acc;
  }, {} as CoreTransports);
}

export interface QubicCore {
  transports: CoreTransports;
  archive: ArchiveClient;
  http: HttpApiClient;
  stats: StatsClient;
  query: QueryServiceClient;
  watchers: {
    ticks: TickWatcher;
  };
}

export function createQubicCore(options: CoreTransportOptions = {}): QubicCore {
  const transports = createCoreTransports(options);
  const archive = new ArchiveClient(transports.archive);
  return {
    transports,
    archive,
    http: new HttpApiClient(transports.http),
    stats: new StatsClient(transports.stats),
    query: new QueryServiceClient(transports.query),
    watchers: {
      ticks: new TickWatcher(archive)
    }
  };
}
