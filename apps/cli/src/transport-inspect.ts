import { createHttpClient, MemoryLRUCache } from '@qubickit/core';

const table = (input: unknown) => console.table(input);

export async function runTransportInspectCommand() {
  const baseUrl = process.env.QUBIC_HTTP_HOST ?? 'https://rpc.qubic.org';
  const cacheSize = Number(process.env.QUBIC_CACHE_SIZE ?? '500');
  const http = createHttpClient({
    baseUrl,
    cache: new MemoryLRUCache(cacheSize)
  });

  const diagnostics = http.getDiagnostics();
  console.log('Active host:', diagnostics.activeHost);
  table(diagnostics.hosts.map(({ host, failureCount, circuitOpen }) => ({ host, failureCount, circuitOpen })));
  console.log('Recent requests:');
  table(diagnostics.recentRequests.map((entry) => ({
    host: entry.host,
    method: entry.method,
    status: entry.status,
    ms: entry.durationMs,
    ok: entry.ok
  }))); 
}
