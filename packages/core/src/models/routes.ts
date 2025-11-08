export const ARCHIVE_PATHS = [
  '/v1/epochs/{epoch}/computors',
  '/v1/healthcheck',
  '/v1/identities/{identity}/transfer-transactions',
  '/v1/latestTick',
  '/v1/status',
  '/v1/ticks/{tickNumber}/approved-transactions',
  '/v1/ticks/{tickNumber}/chain-hash',
  '/v1/ticks/{tickNumber}/quorum-tick-data',
  '/v1/ticks/{tickNumber}/store-hash',
  '/v1/ticks/{tickNumber}/tick-data',
  '/v1/ticks/{tickNumber}/transactions',
  '/v1/ticks/{tickNumber}/transfer-transactions',
  '/v1/transactions/{txId}',
  '/v1/tx-status/{txId}',
  '/v2/epochs/{epoch}/empty-ticks',
  '/v2/epochs/{epoch}/ticks',
  '/v2/identities/{identity}/transfers',
  '/v2/ticks/{tickNumber}/hash',
  '/v2/ticks/{tickNumber}/quorum-data',
  '/v2/ticks/{tickNumber}/store-hash',
  '/v2/ticks/{tickNumber}/transactions',
  '/v2/transactions/{txId}',
  '/v2/transactions/{txId}/sendmany'
] as const;
export type ArchivePath = (typeof ARCHIVE_PATHS)[number];

export const HTTP_PATHS = [
  '/v1/assets/issuances',
  '/v1/assets/issuances/{index}',
  '/v1/assets/ownerships',
  '/v1/assets/ownerships/{index}',
  '/v1/assets/possessions',
  '/v1/assets/possessions/{index}',
  '/v1/assets/{identity}/issued',
  '/v1/assets/{identity}/owned',
  '/v1/assets/{identity}/possessed',
  '/v1/balances/{id}',
  '/v1/block-height',
  '/v1/broadcast-transaction',
  '/v1/querySmartContract',
  '/v1/tick-info'
] as const;
export type HttpPath = (typeof HTTP_PATHS)[number];

export const STATS_PATHS = [
  '/v1/issuers/{issuerIdentity}/assets/{assetName}/owners',
  '/v1/latest-stats',
  '/v1/rich-list'
] as const;
export type StatsPath = (typeof STATS_PATHS)[number];

export const QUERY_SERVICE_PATHS = [
  '/getComputorListsForEpoch',
  '/getLastProcessedTick',
  '/getProcessedTicksIntervals',
  '/getTickData',
  '/getTransactionByHash',
  '/getTransactionsForIdentity',
  '/getTransactionsForTick'
] as const;
export type QueryServicePath = (typeof QUERY_SERVICE_PATHS)[number];
