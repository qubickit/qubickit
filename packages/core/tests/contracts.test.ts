import { describe, expect, it } from 'bun:test';
import { HttpApiClient } from '../src/clients/http-api-client';
import { createHttpClient } from '../src/transport/http-client';
import { querySmartContract } from '../src/contracts/query';

const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });

describe('Contract helpers', () => {
  it('encodes payloads and defaults input type', async () => {
    const bodies: Array<Record<string, unknown>> = [];
    const fetchImpl = async (_input: RequestInfo, init?: RequestInit) => {
      bodies.push(JSON.parse(String(init?.body ?? '{}')));
      return jsonResponse({ responseData: 'AA==' });
    };
    const httpClient = new HttpApiClient(createHttpClient({ baseUrl: 'https://example.com', fetchImpl }));

    const payload = new Uint8Array([1, 2, 3]);
    await querySmartContract(httpClient, { contractIndex: 2, payload });
    await querySmartContract(httpClient, { contractIndex: 3, inputType: 5 });

    expect(bodies[0]).toEqual({
      contractIndex: 2,
      inputType: 0,
      inputSize: payload.byteLength,
      requestData: Buffer.from(payload).toString('base64')
    });
    expect(bodies[1]).toEqual({ contractIndex: 3, inputType: 5, inputSize: 0 });
  });
});
