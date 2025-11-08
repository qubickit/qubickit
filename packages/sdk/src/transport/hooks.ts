import { assertNotAborted } from '../internal/abort';

export type MaybePromise<T> = T | Promise<T>;

export interface TransportRequestContext<TParams = unknown> {
  method: string;
  params: TParams;
  attempt: number;
  signal?: AbortSignal;
  metadata?: Record<string, unknown>;
}

export interface TransportSuccessContext<TParams = unknown, TResult = unknown>
  extends TransportRequestContext<TParams> {
  result: TResult;
  durationMs: number;
}

export interface TransportErrorContext<TParams = unknown> extends TransportRequestContext<TParams> {
  error: unknown;
}

export interface TransportHook<TParams = unknown, TResult = unknown> {
  beforeRequest?(context: TransportRequestContext<TParams>): MaybePromise<void>;
  afterResponse?(context: TransportSuccessContext<TParams, TResult>): MaybePromise<void>;
  onError?(context: TransportErrorContext<TParams>): MaybePromise<void>;
}

export interface TransportHooksRegistry<TParams = unknown, TResult = unknown> {
  readonly size: number;
  register(hook: TransportHook<TParams, TResult>): () => void;
  runBefore(context: TransportRequestContext<TParams>): Promise<void>;
  runAfter(context: TransportSuccessContext<TParams, TResult>): Promise<void>;
  runError(context: TransportErrorContext<TParams>): Promise<void>;
}

export interface TransportCallOptions<TParams = unknown> {
  method: string;
  params: TParams;
  attempt?: number;
  signal?: AbortSignal;
  metadata?: Record<string, unknown>;
}

const now = () => Date.now();

export function createTransportHooksRegistry<TParams = unknown, TResult = unknown>(): TransportHooksRegistry<
  TParams,
  TResult
> {
  const hooks = new Set<TransportHook<TParams, TResult>>();

  async function dispatch<K extends keyof TransportHook<TParams, TResult>>(
    phase: K,
    context: Parameters<NonNullable<TransportHook<TParams, TResult>[K]>>[0]
  ) {
    for (const hook of hooks) {
      const handler = hook[phase];
      if (typeof handler === 'function') {
        await handler(context as never);
      }
    }
  }

  return {
    get size() {
      return hooks.size;
    },
    register(hook) {
      hooks.add(hook);
      return () => {
        hooks.delete(hook);
      };
    },
    runBefore(context) {
      return dispatch('beforeRequest', context);
    },
    runAfter(context) {
      return dispatch('afterResponse', context);
    },
    runError(context) {
      return dispatch('onError', context);
    }
  };
}

export async function runWithTransportHooks<TParams = unknown, TResult = unknown>(
  registry: TransportHooksRegistry<TParams, TResult>,
  executor: () => Promise<TResult>,
  options: TransportCallOptions<TParams>
): Promise<TResult> {
  const attempt = options.attempt ?? 1;
  assertNotAborted(options.signal);
  const baseContext: TransportRequestContext<TParams> = {
    method: options.method,
    params: options.params,
    attempt,
    signal: options.signal,
    metadata: options.metadata
  };
  await registry.runBefore(baseContext);
  const startedAt = now();
  try {
    const result = await executor();
    await registry.runAfter({
      ...baseContext,
      result,
      durationMs: now() - startedAt
    });
    return result;
  } catch (error) {
    await registry.runError({
      ...baseContext,
      error
    });
    throw error;
  }
}
