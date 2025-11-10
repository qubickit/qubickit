import { HttpClient, MemoryLRUCache } from '@qubickit/core';
export interface TransportInspectCommandOptions {
  host?: string;
  fallback?: string[];
  cacheSize?: string | number;
  path?: string;
  requests?: string | number;
  probe?: boolean;
  quiet?: boolean;
}

const DEFAULT_HTTP_HOST = process.env.QUBIC_HTTP_HOST ?? 'https://rpc.qubic.org';
const DEFAULT_FALLBACK_HOSTS =
  process.env.QUBIC_FALLBACK_HOSTS?.split(',').map((entry) => entry.trim()).filter(Boolean) ?? [];

const toNumber = (
  value: string | number | undefined,
  fallback: number,
  label: string,
  options: { min?: number } = {}
) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${label}: "${value}" is not a number.`);
  }
  if (options.min !== undefined && parsed < options.min) {
    throw new Error(`Invalid ${label}: expected >= ${options.min}, received ${parsed}.`);
  }
  return parsed;
};

export async function runTransportInspectCommand(rawOptions: TransportInspectCommandOptions = {}) {
  const host = rawOptions.host ?? DEFAULT_HTTP_HOST;
  const fallbackHosts = (rawOptions.fallback?.length ? rawOptions.fallback : DEFAULT_FALLBACK_HOSTS).filter(Boolean);
  const cacheSize = toNumber(rawOptions.cacheSize, 500, 'cache size', { min: 1 });
  const probePath = rawOptions.path ?? '/v1/status';
  const probeCount = toNumber(rawOptions.requests, 1, 'requests', { min: 0 });
  const shouldProbe = rawOptions.probe !== false && probeCount > 0;
  const http = new HttpClient({
    baseUrl: host,
    fallbackHosts,
    cache: new MemoryLRUCache(cacheSize),
    requestHistorySize: Math.max(cacheSize, 50)
  });

  if (shouldProbe) {
    for (let attempt = 1; attempt <= probeCount; attempt += 1) {
      try {
        await http.request({ path: probePath, cacheKey: undefined, useCache: false });
        if (!rawOptions.quiet) {
          console.error(`[transport] probe ${attempt}/${probeCount} ${probePath} ✓`);
        }
      } catch (error) {
        console.error(`[transport] probe ${attempt}/${probeCount} failed: ${formatError(error)}`);
      }
    }
  }

  const diagnostics = http.getDiagnostics();
  console.log('\nActive host:', diagnostics.activeHost);
  if (fallbackHosts.length) {
    console.log('Fallback hosts:', fallbackHosts.join(', '));
  } else {
    console.log('Fallback hosts: (none configured)');
  }

  const hostTable = diagnostics.hosts.map((entry) => ({
    host: entry.host,
    failures: entry.failureCount,
    circuit: entry.circuitOpen ? 'open' : 'closed',
    reopenAt: entry.circuitOpenUntil ? new Date(entry.circuitOpenUntil).toLocaleTimeString() : '-'
  }));

  console.log('\nHost status');
  console.table(hostTable);

  const recent = diagnostics.recentRequests.slice(-15);
  if (recent.length === 0) {
    console.log('No recent requests captured. Use --path/--requests to hit an endpoint before inspecting.');
    return;
  }

  const historyTable = recent.map((entry) => ({
    time: new Date(entry.timestamp).toLocaleTimeString(),
    host: entry.host,
    method: entry.method,
    status: entry.status ?? '-',
    ms: entry.durationMs,
    ok: entry.ok
  }));

  console.log('\nRecent requests');
  console.table(historyTable);
}

const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return typeof error === 'string' ? error : JSON.stringify(error);
};
