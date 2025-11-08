import { createHttpClient, RedisCacheAdapter } from '@qubickit/core';
import Redis from 'ioredis';

async function main() {
  const redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379');
  const cache = new RedisCacheAdapter(redis, { keyPrefix: 'qubic:http', ttlSeconds: 30 });

  const client = createHttpClient({
    baseUrl: process.env.QUBIC_HTTP_HOST ?? 'https://rpc.qubic.org',
    cache
  });

  const balance = await client.request({ path: '/v1/balances/TESTIDENTITY' });
  console.log(balance);
  await redis.quit();
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
