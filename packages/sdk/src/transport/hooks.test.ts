import { describe, expect, it, vi } from 'vitest';

import { createTransportHooksRegistry, runWithTransportHooks } from './hooks';

describe('transport hooks', () => {
  it('runs lifecycle hooks around executor', async () => {
    const registry = createTransportHooksRegistry<{ query: string }, number>();
    const calls: string[] = [];

    registry.register({
      beforeRequest: ({ method, params, attempt }) => {
        calls.push(`before:${method}:${params.query}:#${attempt}`);
      },
      afterResponse: ({ result }) => {
        calls.push(`after:${result}`);
      }
    });

    const result = await runWithTransportHooks(
      registry,
      () => Promise.resolve(42),
      {
        method: 'stats.ping',
        params: { query: 'tick' },
        attempt: 2
      }
    );

    expect(result).toBe(42);
    expect(calls).toEqual(['before:stats.ping:tick:#2', 'after:42']);
  });

  it('invokes error hooks when executor throws', async () => {
    const registry = createTransportHooksRegistry();
    const onError = vi.fn();
    registry.register({
      onError
    });

    await expect(
      runWithTransportHooks(
        registry,
        () => Promise.reject(new Error('boom')),
        {
          method: 'query.failed',
          params: {}
        }
      )
    ).rejects.toThrow('boom');

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toMatchObject({
      method: 'query.failed'
    });
  });

  it('respects abort signals before executing', async () => {
    const registry = createTransportHooksRegistry();
    const controller = new AbortController();
    controller.abort('stop');

    await expect(
      runWithTransportHooks(
        registry,
        () => Promise.resolve(),
        {
          method: 'query.soon',
          params: {},
          signal: controller.signal
        }
      )
    ).rejects.toThrow(/stop|aborted/i);
  });
});
