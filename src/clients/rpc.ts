import {
	applyAuthHeader,
	buildUrl,
	mergeHeaders,
	type QubicClientConfig,
	type RequestOptions,
	resolveConfig,
} from "../config.ts";
import { QubicError } from "../errors.ts";
import type { Transport } from "../transport.ts";

export interface RpcCall {
	method: string;
	params?: unknown;
	id?: string | number;
}

export interface RpcClient {
	call<T = unknown>(
		method: string,
		params?: unknown,
		options?: RequestOptions,
	): Promise<T>;
	batch<T = unknown>(
		calls: RpcCall[],
		options?: RequestOptions,
	): Promise<Array<T | QubicError>>;
	transport: Transport;
}

interface RpcRequestPayload {
	jsonrpc: "2.0";
	method: string;
	params?: unknown;
	id: string | number;
}

interface RpcResponsePayload<T = unknown> {
	jsonrpc: "2.0";
	id: string | number | null;
	result?: T;
	error?: {
		code: number;
		message: string;
		data?: unknown;
	};
}

export function createRpcClient(config: QubicClientConfig): RpcClient {
	const resolved = resolveConfig(config);
	let nextId = 1;

	const buildHeaders = (options?: RequestOptions) => {
		const headers = applyAuthHeader(
			mergeHeaders(resolved.headers, options?.headers),
			resolved,
		);
		headers["content-type"] = headers["content-type"] ?? "application/json";
		if (resolved.userAgent) {
			headers["user-agent"] = resolved.userAgent;
		}
		return headers;
	};

	const call = async <T>(
		method: string,
		params?: unknown,
		options?: RequestOptions,
	): Promise<T> => {
		const payload: RpcRequestPayload = {
			jsonrpc: "2.0",
			method,
			params,
			id: nextId++,
		};
		const response = await resolved.transport.request<RpcResponsePayload<T>>({
			url: buildUrl(resolved.baseUrl, ""),
			method: "POST",
			headers: buildHeaders(options),
			body: payload,
			timeoutMs: options?.timeoutMs ?? resolved.timeoutMs,
			signal: options?.signal,
		});

		const body = response.data;
		if (body.error) {
			throw new QubicError(body.error.message, {
				status: response.status,
				code: String(body.error.code),
				details: body.error.data,
			});
		}
		return body.result as T;
	};

	const batch = async <T>(
		calls: RpcCall[],
		options?: RequestOptions,
	): Promise<Array<T | QubicError>> => {
		const payloads: RpcRequestPayload[] = calls.map((callDef) => ({
			jsonrpc: "2.0",
			method: callDef.method,
			params: callDef.params,
			id: callDef.id ?? nextId++,
		}));

		const response = await resolved.transport.request<RpcResponsePayload<T>[]>({
			url: buildUrl(resolved.baseUrl, ""),
			method: "POST",
			headers: buildHeaders(options),
			body: payloads,
			timeoutMs: options?.timeoutMs ?? resolved.timeoutMs,
			signal: options?.signal,
		});

		const resultsById = new Map<
			string | number | null,
			RpcResponsePayload<T>
		>();
		for (const entry of response.data) {
			resultsById.set(entry.id, entry);
		}

		return payloads.map((payload) => {
			const entry = resultsById.get(payload.id);
			if (!entry) {
				return new QubicError("Missing RPC response entry", {
					details: payload.id,
				});
			}
			if (entry.error) {
				return new QubicError(entry.error.message, {
					code: String(entry.error.code),
					details: entry.error.data,
				});
			}
			return entry.result as T;
		});
	};

	return {
		call,
		batch,
		transport: resolved.transport,
	};
}
