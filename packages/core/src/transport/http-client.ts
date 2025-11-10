import {
  QubicCircuitOpenError,
  QubicHttpError,
  QubicTimeoutError,
} from "../errors";
import type { CacheAdapter } from "../cache/cache-adapter";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpClientOptions {
  baseUrl: string;
  fallbackHosts?: string[];
  defaultHeaders?: Record<string, string>;
  fetchImpl?: typeof fetch;
  retry?: {
    attempts: number;
    delayMs: number;
  };
  cache?: CacheAdapter;
  timeoutMs?: number;
  hooks?: {
    onRequest?: (info: { url: string; init: RequestInit }) => void;
    onResponse?: (info: { url: string; response: Response }) => void;
  };
  circuitBreaker?: CircuitBreakerOptions;
  metrics?: {
    onSuccess?: (info: RequestMetricsInfo) => void;
    onFailure?: (info: RequestMetricsInfo & { error: unknown }) => void;
  };
  requestHistorySize?: number;
}

export interface CircuitBreakerOptions {
  failureThreshold: number;
  recoveryTimeMs: number;
}

export interface RequestMetricsInfo {
  url: string;
  method: HttpMethod;
  status?: number;
  durationMs: number;
  host: string;
}

export interface RequestHistoryEntry extends RequestMetricsInfo {
  ok: boolean;
  error?: string;
  timestamp: number;
}

export interface HttpClientDiagnostics {
  activeHost: string;
  hosts: Array<{
    host: string;
    failureCount: number;
    circuitOpen: boolean;
    circuitOpenUntil: number | null;
  }>;
  recentRequests: RequestHistoryEntry[];
}

export interface RequestOptions<TBody = unknown> {
  path: string;
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  body?: TBody;
  signal?: AbortSignal;
  cacheKey?: string;
  useCache?: boolean;
}

const createFetchWrapper = (impl?: typeof fetch): typeof fetch => {
  const base = impl ?? fetch;
  const wrapped = ((...args: Parameters<typeof fetch>) =>
    base(...args)) as typeof fetch;
  Object.assign(wrapped, base);
  return wrapped;
};

export class HttpClient {
  private readonly fetchImpl: typeof fetch;
  private readonly retryAttempts: number;
  private readonly retryDelay: number;
  private readonly hosts: string[];
  private activeHostIndex = 0;
  private readonly hostStates = new Map<string, HostState>();
  private readonly circuitBreaker?: CircuitBreakerOptions;
  private readonly metricsHooks?: HttpClientOptions["metrics"];
  private readonly requestHistory: RequestHistoryEntry[] = [];
  private readonly historySize: number;

  constructor(private readonly options: HttpClientOptions) {
    this.fetchImpl = createFetchWrapper(options.fetchImpl);
    this.retryAttempts = options.retry?.attempts ?? 2;
    this.retryDelay = options.retry?.delayMs ?? 250;
    this.hosts = [options.baseUrl, ...(options.fallbackHosts ?? [])];
    this.hosts.forEach((host) =>
      this.hostStates.set(host, { failureCount: 0, circuitOpenUntil: null })
    );
    this.circuitBreaker = options.circuitBreaker;
    this.metricsHooks = options.metrics;
    this.historySize = options.requestHistorySize ?? 50;
  }

  async request<TResponse = unknown, TBody = unknown>(
    options: RequestOptions<TBody>
  ): Promise<TResponse> {
    const cacheKey = options.cacheKey ?? this.cacheKeyFromOptions(options);
    if (options.useCache && cacheKey && this.options.cache) {
      const cached = await this.getCachedResponse<TResponse>(cacheKey);
      if (cached !== undefined) return cached;
    }

    const method = (options.method ?? "GET") as HttpMethod;
    const hostCount = this.hosts.length;
    let lastError: unknown;

    for (let i = 0; i < hostCount; i++) {
      const hostIndex = (this.activeHostIndex + i) % hostCount;
      const host = this.hosts[hostIndex]!;

      if (this.isCircuitOpen(host)) {
        lastError = new QubicCircuitOpenError(host);
        continue;
      }

      const url = this.buildUrl(host, options.path, options.query);
      const fetchOptions = this.buildFetchOptions(options);
      const timeoutController = new AbortController();
      const timeoutMs = this.options.timeoutMs ?? 30_000;
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      let abortedByTimeout = false;
      let abortedByUser = false;
      let userAbortCleanup: (() => void) | undefined;

      if (timeoutMs > 0) {
        timeoutId = setTimeout(() => {
          abortedByTimeout = true;
          timeoutController.abort();
        }, timeoutMs);
      }

      const userSignal = options.signal;
      if (userSignal) {
        const onUserAbort = () => {
          abortedByUser = true;
          timeoutController.abort(userSignal.reason);
        };
        if (userSignal.aborted) {
          onUserAbort();
        } else {
          userSignal.addEventListener("abort", onUserAbort, { once: true });
          userAbortCleanup = () =>
            userSignal.removeEventListener("abort", onUserAbort);
        }
      }

      fetchOptions.signal = timeoutController.signal;
      const start = Date.now();

      try {
        this.options.hooks?.onRequest?.({ url, init: fetchOptions });
        const response = await this.executeWithRetry<TResponse>(
          url,
          fetchOptions
        );
        this.options.hooks?.onResponse?.({ url, response: response.raw });

        this.recordSuccess({
          host,
          method,
          url,
          status: response.raw.status,
          start,
        });
        this.resetHostState(host);

        if (options.useCache && cacheKey && this.options.cache) {
          await this.setCachedResponse(cacheKey, response.value);
        }

        this.activeHostIndex = hostIndex;
        return response.value;
      } catch (error) {
        this.recordFailure({ host, method, url, start, error });
        this.handleFailure(host);

        if (!this.shouldFailover(error) || i === hostCount - 1) {
          if (error instanceof Error && error.name === "AbortError") {
            if (abortedByUser) {
              throw userSignal?.reason instanceof Error
                ? userSignal.reason
                : (userSignal?.reason ??
                    new QubicTimeoutError("Request aborted"));
            }
            if (abortedByTimeout) {
              throw new QubicTimeoutError();
            }
          }
          throw error;
        }

        lastError = error;
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        userAbortCleanup?.();
      }
    }

    throw lastError ?? new Error("All hosts are unavailable");
  }

  private buildFetchOptions<TBody>(
    options: RequestOptions<TBody>
  ): RequestInit {
    const headers: Record<string, string> = {
      "content-type": "application/json",
      ...this.options.defaultHeaders,
      ...options.headers,
    };

    const fetchOptions: RequestInit = {
      method: options.method ?? "GET",
      headers,
    };

    if (options.body !== undefined) {
      fetchOptions.body =
        typeof options.body === "string"
          ? options.body
          : JSON.stringify(options.body);
    }

    return fetchOptions;
  }

  private recordSuccess(params: {
    host: string;
    method: HttpMethod;
    url: string;
    status?: number;
    start: number;
  }) {
    const durationMs = Date.now() - params.start;
    const metrics: RequestMetricsInfo = {
      host: params.host,
      method: params.method,
      url: params.url,
      status: params.status,
      durationMs,
    };
    this.metricsHooks?.onSuccess?.(metrics);
    this.pushHistory({ ...metrics, ok: true, timestamp: Date.now() });
  }

  private recordFailure(params: {
    host: string;
    method: HttpMethod;
    url: string;
    start: number;
    error: unknown;
  }) {
    const durationMs = Date.now() - params.start;
    const status =
      params.error instanceof QubicHttpError ? params.error.status : undefined;
    const metrics: RequestMetricsInfo = {
      host: params.host,
      method: params.method,
      url: params.url,
      status,
      durationMs,
    };
    this.metricsHooks?.onFailure?.({ ...metrics, error: params.error });
    const errorMessage =
      params.error instanceof Error
        ? params.error.message
        : String(params.error);
    this.pushHistory({
      ...metrics,
      ok: false,
      error: errorMessage,
      timestamp: Date.now(),
    });
  }

  private pushHistory(entry: RequestHistoryEntry) {
    this.requestHistory.push(entry);
    if (this.requestHistory.length > this.historySize) {
      this.requestHistory.shift();
    }
  }

  private handleFailure(host: string) {
    if (!this.circuitBreaker) return;
    const state = this.getHostState(host);
    if (!state) return;
    state.failureCount += 1;
    if (state.failureCount >= this.circuitBreaker.failureThreshold) {
      state.circuitOpenUntil = Date.now() + this.circuitBreaker.recoveryTimeMs;
    }
  }

  private resetHostState(host: string) {
    const state = this.getHostState(host);
    if (!state) return;
    state.failureCount = 0;
    state.circuitOpenUntil = null;
  }

  private getHostState(host: string): HostState | undefined {
    return this.hostStates.get(host);
  }

  private isCircuitOpen(host: string): boolean {
    if (!this.circuitBreaker) return false;
    const state = this.getHostState(host);
    if (!state || !state.circuitOpenUntil) return false;
    if (Date.now() >= state.circuitOpenUntil) {
      state.circuitOpenUntil = null;
      state.failureCount = 0;
      return false;
    }
    return true;
  }

  private shouldFailover(error: unknown): boolean {
    if (error instanceof QubicCircuitOpenError) return true;
    if (error instanceof QubicTimeoutError) return true;
    if (error instanceof QubicHttpError) {
      return this.shouldRetry(error.status);
    }
    return true;
  }

  getRequestHistory(): RequestHistoryEntry[] {
    return [...this.requestHistory];
  }

  getDiagnostics(): HttpClientDiagnostics {
    const hosts = this.hosts.map((host) => {
      const state = this.getHostState(host);
      const circuitOpen = this.isCircuitOpen(host);
      return {
        host,
        failureCount: state?.failureCount ?? 0,
        circuitOpen,
        circuitOpenUntil: state?.circuitOpenUntil ?? null,
      };
    });

    return {
      activeHost: this.hosts[this.activeHostIndex]!,
      hosts,
      recentRequests: this.getRequestHistory(),
    };
  }

  private async executeWithRetry<T>(
    url: string,
    init: RequestInit,
    attempt = 0
  ): Promise<{ raw: Response; value: T }> {
    const response: Response = await this.fetchImpl(url, init);

    if (!response.ok) {
      if (attempt < this.retryAttempts && this.shouldRetry(response.status)) {
        await this.delay(this.retryDelay * (attempt + 1));
        return this.executeWithRetry<T>(url, init, attempt + 1);
      }

      const body = await this.safeParseBody(response);
      throw new QubicHttpError(response.status, body);
    }

    const value = (await this.safeParseBody(response)) as T;
    return { raw: response, value };
  }

  private buildUrl(
    baseUrl: string,
    pathname: string,
    query?: RequestOptions["query"]
  ): string {
    const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
    const url = new URL(normalized, baseUrl);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) continue;
        url.searchParams.set(key, String(value));
      }
    }
    return url.toString();
  }

  private shouldRetry(status: number): boolean {
    return status >= 500 || status === 408;
  }

  private async safeParseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private cacheKeyFromOptions(options: RequestOptions): string {
    const queryKey = options.query ? this.stableQueryString(options.query) : "";
    return `${options.method ?? "GET"}:${options.path}:${queryKey}`;
  }

  private stableQueryString(
    query: Record<string, string | number | boolean | undefined>
  ): string {
    const sortedEntries = Object.entries(query)
      .filter(([, value]) => value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b));
    const normalized: Record<string, string | number | boolean> = {};
    for (const [key, value] of sortedEntries) {
      normalized[key] = value as string | number | boolean;
    }
    return JSON.stringify(normalized);
  }

  private async getCachedResponse<T>(cacheKey: string): Promise<T | undefined> {
    if (!this.options.cache) return undefined;
    const value = this.options.cache.get(cacheKey);
    return value instanceof Promise ? value : (value as T | undefined);
  }

  private async setCachedResponse<T>(
    cacheKey: string,
    value: T
  ): Promise<void> {
    if (!this.options.cache) return;
    const result = this.options.cache.set(cacheKey, value);
    if (result instanceof Promise) await result;
  }
}

export const createHttpClient = (options: HttpClientOptions) =>
  new HttpClient(options);

interface HostState {
  failureCount: number;
  circuitOpenUntil: number | null;
}
