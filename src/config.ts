import { fetchTransport, type Transport } from "./transport.ts";

export interface QubicClientConfig {
	baseUrl: string;
	transport?: Transport;
	headers?: Record<string, string>;
	timeoutMs?: number;
	apiKey?: string;
	authHeaderName?: string;
	authScheme?: string;
	userAgent?: string;
}

export interface RequestOptions {
	headers?: Record<string, string>;
	timeoutMs?: number;
	signal?: unknown;
}

export type ResolvedConfig = QubicClientConfig & {
	transport: Transport;
	headers: Record<string, string>;
	timeoutMs: number;
	userAgent: string;
};

export function resolveConfig(config: QubicClientConfig): ResolvedConfig {
	const transport = config.transport ?? fetchTransport();
	return {
		...config,
		transport,
		headers: config.headers ?? {},
		timeoutMs: config.timeoutMs ?? 30_000,
		userAgent: config.userAgent ?? "qubickit/0.0.0",
	};
}

export function mergeHeaders(
	base: Record<string, string>,
	extra?: Record<string, string>,
): Record<string, string> {
	return { ...base, ...(extra ?? {}) };
}

export function buildUrl(baseUrl: string, path: string): string {
	if (/^https?:\/\//i.test(path)) {
		return path;
	}
	const trimmedBase = baseUrl.replace(/\/+$/, "");
	const trimmedPath = path.replace(/^\/+/, "");
	return `${trimmedBase}/${trimmedPath}`;
}

export function applyAuthHeader(
	headers: Record<string, string>,
	config: QubicClientConfig,
): Record<string, string> {
	if (config.apiKey && config.authHeaderName) {
		const value = config.authScheme
			? `${config.authScheme} ${config.apiKey}`
			: config.apiKey;
		return { ...headers, [config.authHeaderName]: value };
	}
	return headers;
}
