import { describe, expect, it, vi } from 'bun:test';
import { createHttpClient } from '../src/transport/http-client';
import { QubicCircuitOpenError } from '../src/errors';

describe('HttpClient', () => {
  it('builds URLs with query params', async () => {
    const responses: Response[] = [
      new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } })
    ];

    const fetchImpl = async (input: RequestInfo, init?: RequestInit) => {
      expect(String(input)).toContain('foo=bar');
      expect(init?.method).toBe('GET');
      return responses.shift()!;
    };

    const client = createHttpClient({ baseUrl: 'https://example.com', fetchImpl });
    const result = await client.request<{ ok: boolean }>({ path: '/test', query: { foo: 'bar' } });
    expect(result.ok).toBe(true);
  });

  it('retries once on 500 responses', async () => {
    const fetchImpl = async () => {
      if (!fetchImpl['called']) {
        fetchImpl['called'] = true;
        return new Response('fail', { status: 500 });
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
    };

    const client = createHttpClient({ baseUrl: 'https://example.com', fetchImpl: fetchImpl as typeof fetch });
    const result = await client.request<{ ok: boolean }>({ path: '/' });
    expect(result.ok).toBe(true);
  });
});

describe('HttpClient resilience features', () => {
  it('fails over to fallback host on server errors', async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo) => {
      const url = String(input);
      if (url.startsWith('https://primary.example.com')) {
        return new Response('fail', { status: 500 });
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    });

    const client = createHttpClient({
      baseUrl: 'https://primary.example.com',
      fallbackHosts: ['https://secondary.example.com'],
      fetchImpl,
      retry: { attempts: 0, delayMs: 0 }
    });

    const result = await client.request<{ ok: boolean }>({ path: '/foo' });
    expect(result.ok).toBe(true);
    expect(fetchImpl).toHaveBeenCalledTimes(2);

    const history = client.getRequestHistory();
    expect(history).toHaveLength(2);
    expect(history[0]?.ok).toBe(false);
    expect(history[1]?.ok).toBe(true);
  });

  it('opens the circuit after repeated failures', async () => {
    const fetchImpl = vi.fn(async () => new Response('fail', { status: 500 }));
    const client = createHttpClient({
      baseUrl: 'https://primary.example.com',
      fetchImpl,
      retry: { attempts: 0, delayMs: 0 },
      circuitBreaker: { failureThreshold: 2, recoveryTimeMs: 1_000 }
    });

    await expect(client.request({ path: '/fail' })).rejects.toThrow();
    await expect(client.request({ path: '/fail' })).rejects.toThrow();
    expect(fetchImpl).toHaveBeenCalledTimes(2);

    await expect(client.request({ path: '/fail' })).rejects.toThrow(QubicCircuitOpenError);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('emits metrics hooks for success and failure', async () => {
    const successes: string[] = [];
    const failures: string[] = [];
    let failFirstCall = true;
    const fetchImpl = vi.fn(async (input: RequestInfo) => {
      const url = String(input);
      if (failFirstCall && url.includes('primary')) {
        failFirstCall = false;
        return new Response('fail', { status: 500 });
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    });

    const client = createHttpClient({
      baseUrl: 'https://primary.example.com',
      fallbackHosts: ['https://secondary.example.com'],
      fetchImpl,
      retry: { attempts: 0, delayMs: 0 },
      metrics: {
        onSuccess: (info) => successes.push(info.url),
        onFailure: (info) => failures.push(info.url)
      },
      requestHistorySize: 5
    });

    await client.request<{ ok: boolean }>({ path: '/foo' });

    expect(successes).toHaveLength(1);
    expect(successes[0]).toContain('secondary');
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('primary');
    expect(client.getRequestHistory()).toHaveLength(2);
  });

  it('supports custom cache adapters', async () => {
    const fetchImpl = vi.fn(async () => {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    });

    const cache = {
      store: new Map<string, unknown>(),
      get(key: string) {
        return this.store.get(key);
      },
      set(key: string, value: unknown) {
        this.store.set(key, value);
      },
      clear() {
        this.store.clear();
      }
    };

    const client = createHttpClient({
      baseUrl: 'https://example.com',
      fetchImpl,
      cache
    });

    const first = await client.request<{ ok: boolean }>({ path: '/cached', useCache: true });
    const second = await client.request<{ ok: boolean }>({ path: '/cached', useCache: true });
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('exposes diagnostics snapshot', async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo) => {
      const url = String(input);
      if (url.includes('primary')) {
        return new Response('fail', { status: 500 });
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    });

    const client = createHttpClient({
      baseUrl: 'https://primary.example.com',
      fallbackHosts: ['https://secondary.example.com'],
      fetchImpl,
      retry: { attempts: 0, delayMs: 0 },
      circuitBreaker: { failureThreshold: 1, recoveryTimeMs: 10_000 }
    });

    await client.request<{ ok: boolean }>({ path: '/diag' });
    const diagnostics = client.getDiagnostics();
    expect(diagnostics.hosts.length).toBe(2);
    expect(diagnostics.recentRequests.length).toBe(2);
    expect(diagnostics.hosts[0]?.circuitOpen).toBe(true);
  });
});
