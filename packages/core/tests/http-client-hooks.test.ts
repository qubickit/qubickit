import { describe, expect, it } from 'bun:test';
import { createHttpClient } from '../src/transport/http-client';

const makeResponse = (data: unknown) =>
  new Response(JSON.stringify(data), { status: 200, headers: { 'content-type': 'application/json' } });

describe('HttpClient hooks & timeout', () => {
  it('fires request/response hooks', async () => {
    const calls: string[] = [];
    const client = createHttpClient({
      baseUrl: 'https://example.com',
      hooks: {
        onRequest: ({ url }) => calls.push(`req:${url}`),
        onResponse: ({ url }) => calls.push(`res:${url}`)
      },
      fetchImpl: async () => makeResponse({ ok: true })
    });

    const result = await client.request<{ ok: boolean }>({ path: '/foo' });
    expect(result.ok).toBe(true);
    expect(calls).toEqual(['req:https://example.com/foo', 'res:https://example.com/foo']);
  });

  it('throws timeout error', async () => {
    const client = createHttpClient({
      baseUrl: 'https://example.com',
      timeoutMs: 10,
      fetchImpl: async (_input, init) =>
        new Promise((resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(Object.assign(new Error('Aborted'), { name: 'AbortError' }));
          });
          setTimeout(() => resolve(new Response('ok')), 1000);
        })
    });

    await expect(client.request({ path: '/slow' })).rejects.toThrow('Request timed out');
  });
});
