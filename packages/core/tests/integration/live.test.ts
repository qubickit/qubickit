import { describe, expect, it } from 'bun:test';
import { createHttpClient } from '../../src/transport/http-client';
import { ArchiveClient } from '../../src/clients/archive-client';
import { HttpApiClient } from '../../src/clients/http-api-client';
import { QueryServiceClient } from '../../src/clients/query-client';

const shouldRun = process.env.RUN_QUBIC_INTEGRATION_TESTS === 'true';

const archiveHost = process.env.QUBIC_ARCHIVE_HOST ?? 'https://rpc.qubic.org';
const httpHost = process.env.QUBIC_HTTP_HOST ?? archiveHost;
const queryHost = process.env.QUBIC_QUERY_HOST ?? 'https://api.qubic.org';
const testIdentity = process.env.QUBIC_TEST_IDENTITY;

if (!shouldRun) {
  describe('Live integration (skipped)', () => {
    it.skip('set RUN_QUBIC_INTEGRATION_TESTS=true to run live assertions', () => {});
  });
} else {
  describe('Live integration', () => {
    const archiveClient = new ArchiveClient(createHttpClient({ baseUrl: archiveHost, timeoutMs: 10_000 }));
    const httpClient = new HttpApiClient(createHttpClient({ baseUrl: httpHost, timeoutMs: 10_000 }));
    const queryClient = new QueryServiceClient(createHttpClient({ baseUrl: queryHost, timeoutMs: 10_000 }));

    it('fetches status and latest tick data', async () => {
      const status = await archiveClient.getStatus();
      expect(status?.lastProcessedTick?.tickNumber).toBeGreaterThan(0);

      const latest = await archiveClient.getLatestTick();
      expect(latest.tickNumber).toBeGreaterThan(0);

      const tickData = await archiveClient.getTickData(latest.tickNumber);
      expect(tickData.tickData?.tickNumber).toBe(latest.tickNumber);
    });

    it('fetches tick info snapshot', async () => {
      const tickInfo = await httpClient.getTickInfo();
      expect(tickInfo.tickInfo?.tick).toBeGreaterThan(0);
    });

    it('fetches transactions for latest tick', async () => {
      const latest = await archiveClient.getLatestTick();
      const transactions = await archiveClient.getTickTransactions(latest.tickNumber);
      expect(transactions.transactions).toBeDefined();
    });

    if (testIdentity) {
      describe('Identity scoped endpoints', () => {
        it('fetches transfers for provided identity', async () => {
          const transfers = await queryClient.getTransactionsForIdentity(testIdentity!, { limit: 5 });
          expect(transfers.transactions).toBeDefined();
        });

        it('fetches balance for provided identity', async () => {
          const balance = await httpClient.getBalance(testIdentity!);
          expect(balance.balance.identity).toBe(testIdentity);
        });
      });
    }
  });
}
