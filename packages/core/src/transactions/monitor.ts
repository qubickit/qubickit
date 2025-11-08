import { ArchiveClient } from '../clients/archive-client';
import { QueryServiceClient } from '../clients/query-client';

export interface MonitorOptions {
  pollIntervalMs?: number;
  timeoutMs?: number;
  maxIntervalMs?: number;
  queryClient?: QueryServiceClient;
}

export const monitorTransactionStatus = async (
  archiveClient: ArchiveClient,
  txId: string,
  options: MonitorOptions = {}
) => {
  const start = Date.now();
  const baseInterval = options.pollIntervalMs ?? 5_000;
  const timeout = options.timeoutMs ?? 120_000;
  const maxInterval = options.maxIntervalMs ?? 30_000;
  let attempt = 0;

  while (Date.now() - start < timeout) {
    const status = await archiveClient.getTransactionStatus(txId);
    if (status.moneyFlew) return status;

    if (options.queryClient) {
      const fallback = await fetchViaQuery(options.queryClient, txId);
      if (fallback?.moneyFlew) return fallback;
    }

    const delay = Math.min(maxInterval, baseInterval * 2 ** attempt);
    const jitter = Math.random() * 0.1 * delay;
    await sleep(delay + jitter);
    attempt += 1;
  }

  throw new Error(`Transaction ${txId} did not settle within timeout`);
};

const fetchViaQuery = async (queryClient: QueryServiceClient, txId: string) => {
  const response = await queryClient.getTransactionByHash(txId);
  if (response.transaction?.moneyFlew) {
    return {
      txId,
      moneyFlew: true
    };
  }
  return undefined;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
