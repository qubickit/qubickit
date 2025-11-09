import { z } from 'zod';

import type { QubicSdk } from '../sdk';
import { createMemoryCacheAdapter, type CacheAdapter } from '../adapters';
import { runWithTransportHooks } from '../transport/hooks';
import { WalletManager, type WalletSessionHandle } from '../wallet';
import { createBalanceWatcher, type BalanceWatchHandle, type BalanceWatcherOptions } from '../watchers/balances';
import { createContractWatcher, type ContractWatchHandle, type ContractWatcherOptions } from '../watchers/contracts';
import { createTransferWatcher, type TransferWatchHandle, type TransferWatcherOptions } from '../watchers/transfers';

const cacheSchema = z.unknown();

type QueryTransactionsOptions = NonNullable<
  Parameters<QubicSdk['core']['query']['getTransactionsForIdentity']>[1]
>;
type HttpBalanceResponse = Awaited<ReturnType<QubicSdk['core']['http']['getBalance']>>;
type HttpBalanceFn = (
  identity: string,
  options?: {
    useCache?: boolean;
  }
) => Promise<HttpBalanceResponse>;

export type SessionSource = 'query' | 'archive';

export interface SessionClientOptions {
  cache?: CacheAdapter<typeof cacheSchema>;
  wallet?: WalletManager;
  fallbackOrder?: SessionSource[];
  defaultCacheTtlMs?: number;
  throttleMs?: number;
}

const identitySchema = z.string().min(1);

export interface TransactionListOptions {
  limit?: number;
  from?: number;
  cacheTtlMs?: number;
}

export interface TransactionsForIdentityResponse {
  transactions?: Array<Record<string, unknown>>;
  hits?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface SessionRequestTelemetry {
  onSuccess?(info: { method: string; durationMs: number }): void | Promise<void>;
  onFailure?(info: { method: string; error: unknown }): void | Promise<void>;
}

export class SessionClient {
  private readonly cache: CacheAdapter<typeof cacheSchema>;
  private readonly wallet?: WalletManager;
  private readonly fallbackOrder: SessionSource[];
  private readonly defaultCacheTtlMs: number;
  private readonly throttleMs: number;
  private readonly lastCall = new Map<string, number>();

  constructor(private readonly sdk: QubicSdk, options: SessionClientOptions = {}) {
    this.cache =
      options.cache ??
      createMemoryCacheAdapter({
        schema: cacheSchema,
        namespace: 'sdk-session-cache',
        defaultTtlMs: options.defaultCacheTtlMs ?? 10_000
      });
    this.wallet = options.wallet;
    this.fallbackOrder = options.fallbackOrder ?? ['query', 'archive'];
    this.defaultCacheTtlMs = options.defaultCacheTtlMs ?? 10_000;
    this.throttleMs = options.throttleMs ?? 0;
  }

  async getTransactionByHash(
    hash: string,
    options?: { cacheTtlMs?: number; fallback?: SessionSource[]; telemetry?: SessionRequestTelemetry }
  ) {
    const cacheKey = `tx:${hash}`;
    const cached = (await this.cache.get(cacheKey)) as TransactionsForIdentityResponse | undefined;
    if (cached) {
      return cached;
    }
    const fallback = options?.fallback ?? this.fallbackOrder;
    const errors: unknown[] = [];
    for (const source of fallback) {
      try {
        const result = await this.callSource(source, 'getTransactionByHash', hash, options?.telemetry);
        await this.cache.set(cacheKey, result, options?.cacheTtlMs ?? this.defaultCacheTtlMs);
        return result;
      } catch (error) {
        errors.push(error);
      }
    }
    throw new AggregateError(errors, 'All session sources failed.');
  }

  async listTransactions(identity: string, options: TransactionListOptions = {}): Promise<TransactionsForIdentityResponse> {
    identitySchema.parse(identity);
    const cacheKey = `identity:${identity}:from:${options.from ?? 0}:limit:${options.limit ?? 25}`;
    const cached = (await this.cache.get(cacheKey)) as TransactionsForIdentityResponse | undefined;
    if (cached) {
      return cached;
    }
    const queryOptions: QueryTransactionsOptions = {};
    if (typeof options.limit === 'number') {
      queryOptions.limit = options.limit;
    }
    if (typeof options.from === 'number') {
      queryOptions.from = options.from;
    }

    const result = (await runWithTransportHooks(
      this.sdk.hooks,
      () => this.sdk.core.query.getTransactionsForIdentity(identity, queryOptions),
      {
        method: 'query.getTransactionsForIdentity',
        params: { identity, options: queryOptions }
      }
    )) as TransactionsForIdentityResponse;
    await this.cache.set(cacheKey, result, options.cacheTtlMs ?? this.defaultCacheTtlMs);
    return result;
  }

  async *streamTransactions(identity: string, options: { pageSize?: number; from?: number } = {}) {
    identitySchema.parse(identity);
    let from = options.from ?? 0;
    const limit = options.pageSize ?? 100;
    while (true) {
      const page = await this.listTransactions(identity, { limit, from, cacheTtlMs: 0 });
      const transactions = page.transactions ?? [];
      if (!transactions.length) {
        break;
      }
      for (const tx of transactions) {
        yield tx;
      }
      from += transactions.length;
      if (transactions.length < limit) {
        break;
      }
    }
  }

  async getBalance(identity: string, options?: { cacheTtlMs?: number }) {
    const cacheKey = `balance:${identity}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    const httpGetBalance = this.sdk.core.http.getBalance.bind(this.sdk.core.http) as HttpBalanceFn;
    const result = await runWithTransportHooks(
      this.sdk.hooks,
      () => httpGetBalance(identity, { useCache: false }),
      {
        method: 'http.getBalance',
        params: { identity }
      }
    );
    await this.cache.set(cacheKey, result, options?.cacheTtlMs ?? this.defaultCacheTtlMs);
    return result;
  }

  async withWalletSession<T>(token: string, handler: (session: WalletSessionHandle) => Promise<T>) {
    if (!this.wallet) {
      throw new Error('Wallet manager is not configured for this SessionClient.');
    }
    const session = await this.wallet.resumeSession(token);
    try {
      return await handler(session);
    } finally {
      this.wallet.resumeSession(token, { extendMs: 0 }).catch(() => undefined);
    }
  }

  watchTransfers(identity: string, options: Omit<TransferWatcherOptions, 'identity'> = {}): TransferWatchHandle {
    return createTransferWatcher(this, { identity, ...options });
  }

  watchBalance(identity: string, options: Omit<BalanceWatcherOptions, 'identity'> = {}): BalanceWatchHandle {
    return createBalanceWatcher(this.sdk, { identity, ...options });
  }

  watchContract(
    contractIdentity: string,
    options: Omit<ContractWatcherOptions, 'contractIdentity'> = {}
  ): ContractWatchHandle {
    return createContractWatcher(this, { contractIdentity, ...options });
  }

  private async callSource(
    source: SessionSource,
    method: 'getTransactionByHash',
    identifier: string,
    telemetry?: SessionRequestTelemetry
  ) {
    const startedAt = Date.now();
    try {
      if (source === 'query') {
        const queryClient = this.sdk.core.query as {
          getTransactionByHash?: (hash: string) => Promise<unknown>;
        };
        if (typeof queryClient.getTransactionByHash !== 'function') {
          throw new Error('Query client does not support getTransactionByHash.');
        }
        await this.throttle('query.getTransactionByHash');
        const result = await runWithTransportHooks(
          this.sdk.hooks,
          () => queryClient.getTransactionByHash!(identifier),
          {
            method: 'query.getTransactionByHash',
            params: { hash: identifier }
          }
        );
        await telemetry?.onSuccess?.({ method: method, durationMs: Date.now() - startedAt });
        return result;
      }
      await this.throttle('archive.getTransaction');
      const result = await runWithTransportHooks(
        this.sdk.hooks,
        () => this.sdk.core.archive.getTransaction(identifier),
        {
          method: 'archive.getTransaction',
          params: { hash: identifier }
        }
      );
      await telemetry?.onSuccess?.({ method: method, durationMs: Date.now() - startedAt });
      return result;
    } catch (error) {
      await telemetry?.onFailure?.({ method, error });
      throw error;
    }
  }

  private async throttle(method: string) {
    if (this.throttleMs <= 0) {
      return;
    }
    const now = Date.now();
    const last = this.lastCall.get(method) ?? 0;
    const delta = now - last;
    if (delta < this.throttleMs) {
      await new Promise((resolve) => setTimeout(resolve, this.throttleMs - delta));
    }
    this.lastCall.set(method, Date.now());
  }
}
