import { ArchiveClient } from '../clients/archive-client';
import { QueryServiceClient } from '../clients/query-client';

export interface MonitorOptions {
  pollIntervalMs?: number;
  timeoutMs?: number;
  maxIntervalMs?: number;
  queryClient?: QueryServiceClient;
  signal?: AbortSignal;
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

  const throwIfAborted = () => {
    if (options.signal?.aborted) {
      const reason = options.signal.reason ?? new Error('Operation aborted');
      throw reason instanceof Error ? reason : new Error(String(reason));
    }
  };

  throwIfAborted();

  while (Date.now() - start < timeout) {
    throwIfAborted();
    const status = await archiveClient.getTransactionStatus(txId);
    if (status.moneyFlew) return status;

    if (options.queryClient) {
      const fallback = await fetchViaQuery(options.queryClient, txId);
      if (fallback?.moneyFlew) return fallback;
    }

    const delayMs = Math.min(maxInterval, baseInterval * 2 ** attempt);
    const jitter = Math.random() * 0.1 * delayMs;
    await sleep(delayMs + jitter, options.signal);
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

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const cleanup = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    };

    const onAbort = () => {
      cleanup();
      const reason = signal?.reason ?? new Error('Operation aborted');
      reject(reason instanceof Error ? reason : new Error(String(reason)));
    };

    if (signal) {
      if (signal.aborted) {
        onAbort();
      } else {
        signal.addEventListener('abort', onAbort, { once: true });
      }
    }
  });
