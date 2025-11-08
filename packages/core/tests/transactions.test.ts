import { describe, expect, it } from 'bun:test';
import { HttpApiClient } from '../src/clients/http-api-client';
import { ArchiveClient } from '../src/clients/archive-client';
import { createHttpClient } from '../src/transport/http-client';
import { broadcastEncodedTransaction } from '../src/transactions/broadcast';

const jsonResponse = (data: unknown) =>
  new Response(JSON.stringify(data), { status: 200, headers: { 'content-type': 'application/json' } });

describe('broadcastEncodedTransaction', () => {
  it('broadcasts and monitors', async () => {
    const http = createHttpClient({
      baseUrl: 'https://example.com',
      fetchImpl: async (url) => {
        if (String(url).includes('broadcast')) {
          return jsonResponse({ transactionId: 'tx123', peersBroadcasted: 2 });
        }
        return jsonResponse({ moneyFlew: true, txId: 'tx123' });
      }
    });
    const httpClient = new HttpApiClient(http);
    const archiveClient = new ArchiveClient(http);
    const result = await broadcastEncodedTransaction(httpClient, archiveClient, 'abc', { monitor: true });
    expect(result.status.moneyFlew).toBe(true);
  });
});
