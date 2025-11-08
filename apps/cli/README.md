# Qubic CLI Notes

## Transport Telemetry
Use the core transport diagnostics to inspect host health:

```ts
import { createHttpClient, MemoryLRUCache } from '@qubickit/core';

const http = createHttpClient({
  baseUrl: process.env.QUBIC_HTTP_HOST ?? 'https://rpc.qubic.org',
  cache: new MemoryLRUCache(500)
});

const diagnostics = http.getDiagnostics();
console.table(diagnostics.hosts);
```

## Distributed Caching
To share cache hits across CLI instances, implement a Redis-backed `CacheAdapter` and pass it to `createHttpClient`. See `packages/core/src/cache/redis-cache.ts` for a reference adapter that works with `ioredis` or `redis` clients.
