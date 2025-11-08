import { describe, expect, it } from 'bun:test';
import { createHttpClient } from '../src/transport/http-client';
import { ArchiveClient } from '../src/clients/archive-client';
import { HttpApiClient } from '../src/clients/http-api-client';
import { StatsClient } from '../src/clients/stats-client';
import { QueryServiceClient } from '../src/clients/query-client';

describe('Clients', () => {
  it('ArchiveClient parses tick data', async () => {
    const fetchImpl = async () =>
      new Response(
        JSON.stringify({ tickData: { computorIndex: 1, epoch: 2, tickNumber: 3, timestamp: '123', signatureHex: '0x' } }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
    const client = new ArchiveClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const result = await client.getTickData(1);
    expect(result.tickData?.tickNumber).toBe(3);
  });

  it('HttpApiClient parses balance', async () => {
    const fetchImpl = async () =>
      new Response(
        JSON.stringify({ balance: { identity: 'ABC', available: '100', pending: '0' } }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
    const client = new HttpApiClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const result = await client.getBalance('A'.repeat(60));
    expect(result.balance.identity).toBe('ABC');
  });

  it('HttpApiClient fetches asset issuances', async () => {
    const fetchImpl = async () =>
      new Response(
        JSON.stringify({ issuances: [{ name: 'ASSET', issuerIdentity: 'A'.repeat(60) }] }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
    const client = new HttpApiClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const result = await client.getAssetIssuances();
    expect(result.issuances?.[0]?.name).toBe('ASSET');
  });

  it('StatsClient parses latest stats', async () => {
    const fetchImpl = async () =>
      new Response(JSON.stringify({ data: { circulatingSupply: '1000' } }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    const client = new StatsClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const result = await client.getLatestStats();
    expect(result.data?.circulatingSupply).toBe('1000');
  });

  it('QueryServiceClient parses transactions for identity', async () => {
    const fetchImpl = async () =>
      new Response(
        JSON.stringify({
          validForTick: 1,
          transactions: [
            {
              hash: 'hash',
              amount: '10',
              source: 'A',
              destination: 'B',
              tickNumber: 1,
              timestamp: '1',
              moneyFlew: false
            }
          ]
        }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
    const client = new QueryServiceClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const result = await client.getTransactionsForIdentity('A'.repeat(60));
    expect(result.transactions?.length).toBe(1);
  });

  it('QueryServiceClient aggregates transfers with pagination', async () => {
    const responses = [
      JSON.stringify({
        hits: { total: 2 },
        transactions: [
          { hash: '1', amount: '10', source: 'A', destination: 'B', tickNumber: 1, timestamp: '1' }
        ]
      }),
      JSON.stringify({
        hits: { total: 2 },
        transactions: [
          { hash: '2', amount: '5', source: 'A', destination: 'C', tickNumber: 2, timestamp: '2' }
        ]
      })
    ];
    const fetchImpl = async () =>
      new Response(responses.shift() ?? '{}', { status: 200, headers: { 'content-type': 'application/json' } });
    const client = new QueryServiceClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const transfers = await client.getTransfersByIdentity('A'.repeat(60), { pageSize: 1 });
    expect(transfers?.length).toBe(2);
  });

  it('QueryServiceClient fetches transaction by hash', async () => {
    const fetchImpl = async () =>
      new Response(JSON.stringify({ transaction: { hash: 'tx123', moneyFlew: true } }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    const client = new QueryServiceClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const result = await client.getTransactionByHash('tx123');
    expect(result.transaction?.hash).toBe('tx123');
    expect(result.transaction?.moneyFlew).toBe(true);
  });

  it('HttpApiClient handles ownership, possessions, assets, tick info and broadcasts', async () => {
    const responses = [
      {
        path: '/v1/assets/ownerships',
        body: { owners: [{ identity: 'A'.repeat(60), assetName: 'ASSET', units: '10' }] }
      },
      {
        path: '/v1/assets/possessions',
        body: { possessors: [{ identity: 'A'.repeat(60), assetName: 'ASSET', units: '5' }] }
      },
      {
        path: `/v1/assets/${'A'.repeat(60)}/owned`,
        body: { assets: [{ name: 'ASSET', issuerIdentity: 'X', supply: '100' }] }
      },
      {
        path: '/v1/tick-info',
        body: { tickInfo: { tick: 10, epoch: 2 } }
      },
      {
        path: '/v1/broadcast-transaction',
        body: { transactionId: 'tx123', peersBroadcasted: 3 }
      }
    ];

    const fetchImpl = async (input: RequestInfo, init?: RequestInit) => {
      const url = String(input);
      const next = responses.shift();
      if (!next) throw new Error('unexpected request');
      expect(url).toContain(next.path);
      if (next.path === '/v1/broadcast-transaction') {
        expect(init?.method).toBe('POST');
        expect(init?.body).toContain('encodedTransaction');
      }
      return new Response(JSON.stringify(next.body), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    };

    const client = new HttpApiClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const ownerships = await client.getAssetOwnerships('ASSET', 'ISSUER');
    const possessions = await client.getAssetPossessions('ASSET', 'ISSUER');
    const assets = await client.getAssetsByIdentity('A'.repeat(60));
    const tickInfo = await client.getTickInfo();
    const broadcast = await client.broadcastTransaction('encoded');

    expect(ownerships.owners?.[0]?.assetName).toBe('ASSET');
    expect(possessions.possessors?.[0]?.units).toBe('5');
    expect(assets.assets?.[0]?.issuerIdentity).toBe('X');
    expect(tickInfo.tickInfo?.tick).toBe(10);
    expect(broadcast.transactionId).toBe('tx123');
  });

  it('HttpApiClient queries smart contracts', async () => {
    const fetchImpl = async (_input: RequestInfo, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body));
      expect(body.contractIndex).toBe(4);
      expect(body.inputType).toBe(1);
      expect(body.inputSize).toBe(2);
      expect(body.requestData).toBe(Buffer.from([1, 2]).toString('base64'));
      return new Response(JSON.stringify({ responseData: 'AA==' }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    };
    const client = new HttpApiClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const result = await client.querySmartContract({
      contractIndex: 4,
      inputType: 1,
      inputSize: 2,
      requestData: Buffer.from([1, 2]).toString('base64')
    });
    expect(result.responseData).toBe('AA==');
  });

  it('StatsClient parses rich list', async () => {
    const fetchImpl = async () =>
      new Response(
        JSON.stringify({
          richList: [{ identity: 'A'.repeat(60), balance: '100' }],
          pagination: { next: 'cursor' }
        }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
    const client = new StatsClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const result = await client.getRichList();
    expect(result.richList?.[0]?.balance).toBe('100');
    expect(result.pagination?.next).toBe('cursor');
  });

  it('ArchiveClient handles transaction/status/tick/status/latest tick', async () => {
    const responses = [
      {
        path: '/v1/transactions/tx123',
        body: {
          transaction: {
            sourceId: 'A',
            destId: 'B',
            amount: '1',
            tickNumber: 1,
            txId: 'tx123'
          }
        }
      },
      {
        path: '/v1/tx-status/tx123',
        body: { txId: 'tx123', moneyFlew: true }
      },
      {
        path: '/v1/ticks/5/transactions',
        body: { transactions: [{ txId: 'tx789' }] }
      },
      {
        path: '/v1/status',
        body: {
          lastProcessedTick: { tickNumber: 10, epoch: 1 },
          skippedTicks: [{ startTick: 1, endTick: 2 }]
        }
      },
      {
        path: '/v1/latestTick',
        body: { tickNumber: '42', epoch: '2' }
      }
    ];

    const fetchImpl = async (input: RequestInfo) => {
      const url = String(input);
      const next = responses.shift();
      if (!next) throw new Error('unexpected request');
      expect(url).toContain(next.path);
      return new Response(JSON.stringify(next.body), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    };

    const client = new ArchiveClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));
    const tx = await client.getTransaction('tx123');
    const status = await client.getTransactionStatus('tx123');
    const transactions = await client.getTickTransactions(5);
    const archiveStatus = await client.getStatus();
    const latest = await client.getLatestTick();

    expect(tx.transaction?.txId).toBe('tx123');
    expect(status.moneyFlew).toBe(true);
    expect(transactions.transactions?.[0]?.txId).toBe('tx789');
    expect(archiveStatus.lastProcessedTick?.tickNumber).toBe(10);
    expect(latest.tickNumber).toBe(42);
    expect(latest.epoch).toBe(2);
  });
});
