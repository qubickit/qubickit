import { QubicError, toQubicError } from "./errors";

export type HttpMethod =
	| "GET"
	| "POST"
	| "PUT"
	| "DELETE"
	| "PATCH"
	| "OPTIONS";

export interface TransportRequest {
	url: string;
	method: HttpMethod;
	headers?: Record<string, string>;
	body?: unknown;
	timeoutMs?: number;
	signal?: unknown;
}

export interface TransportResponse<T = unknown> {
	status: number;
	headers: Record<string, string>;
	data: T;
	raw?: unknown;
}

export interface Transport {
	request<T = unknown>(
		options: TransportRequest,
	): Promise<TransportResponse<T>>;
}

type FetchLike = (input: string, init?: any) => Promise<FetchResponseLike>;

interface FetchResponseLike {
	status: number;
	headers: HeadersLike;
	json(): Promise<any>;
	text(): Promise<string>;
}

interface HeadersLike {
	forEach(callback: (value: string, key: string) => void): void;
	get?: (name: string) => string | null;
}

/**
 * Default transport backed by `fetch`, usable in both Node (18+) and browsers.
 * A custom fetch implementation can be injected for environments without a global fetch.
 */
export function fetchTransport(
	fetchImpl: FetchLike | undefined = (globalThis as any).fetch,
): Transport {
	if (!fetchImpl) {
		throw new QubicError(
			"No fetch implementation available; supply one in config",
		);
	}

	return {
		async request<T>(options: TransportRequest): Promise<TransportResponse<T>> {
			const { url, method, timeoutMs, signal } = options;
			const headers: Record<string, string> = { ...(options.headers ?? {}) };
			let controller: any;
			let timeoutId: any;
			let effectiveSignal = signal as any;

			if (
				timeoutMs &&
				!effectiveSignal &&
				typeof (globalThis as any).AbortController === "function"
			) {
				controller = new (globalThis as any).AbortController();
				effectiveSignal = controller.signal;
				timeoutId = setTimeout(() => controller.abort(), timeoutMs);
			}

			const body = normalizeBody(options.body, headers);

			try {
				const response = await fetchImpl(url, {
					method,
					headers,
					body,
					signal: effectiveSignal,
				});

				const parsed = await parseResponseBody<T>(response);
				const responseHeaders = collectHeaders(response.headers);
				const ok = response.status >= 200 && response.status < 300;

				if (!ok) {
					throw new QubicError("Request failed", {
						status: response.status,
						details: parsed,
					});
				}

				return {
					status: response.status,
					headers: responseHeaders,
					data: parsed,
					raw: response,
				};
			} catch (error) {
				throw toQubicError("Transport request failed", {
					status: (error as any)?.status,
					cause: error,
					details: (error as any)?.details ?? (error as any)?.message,
				});
			} finally {
				if (timeoutId) {
					clearTimeout(timeoutId);
				}
			}
		},
	};
}

function normalizeBody(body: unknown, headers: Record<string, string>): any {
	if (body === undefined || body === null) {
		return undefined;
	}

	if (
		typeof body === "string" ||
		body instanceof ArrayBuffer ||
		ArrayBuffer.isView(body)
	) {
		return body as any;
	}

	if (!headers["content-type"]) {
		headers["content-type"] = "application/json";
	}

	return JSON.stringify(body);
}

async function parseResponseBody<T>(response: FetchResponseLike): Promise<T> {
	const contentType = response.headers.get
		? response.headers.get("content-type")
		: null;
	if (contentType?.toLowerCase().includes("application/json")) {
		return response.json() as Promise<T>;
	}

	const text = await response.text();
	try {
		return JSON.parse(text) as T;
	} catch {
		return text as unknown as T;
	}
}

function collectHeaders(headers: HeadersLike): Record<string, string> {
	const collected: Record<string, string> = {};
	headers.forEach((value, key) => {
		collected[key.toLowerCase()] = value;
	});
	return collected;
}
