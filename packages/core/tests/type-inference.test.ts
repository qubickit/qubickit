import type { HttpApiClient } from '../src/clients/http-api-client';
import type { TickWatcher } from '../src/watchers/tick-watcher';
import { createQubicCore } from '../src';
import { querySmartContract } from '../src/contracts/query';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? ((<T>() => T extends B ? 1 : 2) extends (<T>() => T extends A ? 1 : 2) ? true : false)
  : false;
type Expect<T extends true> = T;

type BalanceResponse = Awaited<ReturnType<HttpApiClient['getBalance']>>;
type _BalanceAmount = Expect<Equal<BalanceResponse['balance']['available'], string>>;

type QueryResult = Awaited<ReturnType<typeof querySmartContract>>;
type _QueryResponse = Expect<Equal<QueryResult['responseData'] | undefined, string | undefined>>;

type Core = ReturnType<typeof createQubicCore>;
type _TransportKeys = Expect<Equal<keyof Core['transports'], 'archive' | 'http' | 'query' | 'stats'>>;
type _TickWatcherType = Expect<Equal<Core['watchers']['ticks'], TickWatcher>>;

export {};
