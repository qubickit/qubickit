import {
	applyAuthHeader,
	buildUrl,
	mergeHeaders,
	type QubicClientConfig,
	type RequestOptions,
	resolveConfig,
} from "../config";
import { QubicError } from "../errors";
import type {
	pbGetComputorListsForEpochRequest,
	pbGetComputorListsForEpochResponse,
	pbGetLastProcessedTickResponse,
	pbGetProcessedTickIntervalsResponse,
	pbGetTickDataRequest,
	pbGetTickDataResponse,
	pbGetTransactionByHashRequest,
	pbGetTransactionByHashResponse,
	pbGetTransactionsForIdentityRequest,
	pbGetTransactionsForIdentityResponse,
	pbGetTransactionsForTickRequest,
	pbGetTransactionsForTickResponse,
} from "../gen/query-types";
import type { Transport } from "../transport";

export interface QueryClient {
	transport: Transport;
	getComputorListsForEpoch(
		body: pbGetComputorListsForEpochRequest,
		options?: RequestOptions,
	): Promise<pbGetComputorListsForEpochResponse>;
	getLastProcessedTick(
		options?: RequestOptions,
	): Promise<pbGetLastProcessedTickResponse>;
	getProcessedTickIntervals(
		options?: RequestOptions,
	): Promise<pbGetProcessedTickIntervalsResponse>;
	getTickData(
		body: pbGetTickDataRequest,
		options?: RequestOptions,
	): Promise<pbGetTickDataResponse>;
	getTransactionByHash(
		body: pbGetTransactionByHashRequest,
		options?: RequestOptions,
	): Promise<pbGetTransactionByHashResponse>;
	getTransactionsForIdentity(
		body: pbGetTransactionsForIdentityRequest,
		options?: RequestOptions,
	): Promise<pbGetTransactionsForIdentityResponse>;
	getTransactionsForTick(
		body: pbGetTransactionsForTickRequest,
		options?: RequestOptions,
	): Promise<pbGetTransactionsForTickResponse>;
}

export function createQueryClient(config: QubicClientConfig): QueryClient {
	const resolved = resolveConfig(config);

	const request = async <T>(
		path: string,
		method: "GET" | "POST",
		body: unknown,
		options: RequestOptions = {},
	): Promise<T> => {
		const url = buildUrl(resolved.baseUrl, path);
		const headers = applyAuthHeader(
			mergeHeaders(resolved.headers, options.headers),
			resolved,
		);
		if (method === "POST" && body !== undefined && !headers["content-type"]) {
			headers["content-type"] = "application/json";
		}
		if (resolved.userAgent) {
			headers["user-agent"] = resolved.userAgent;
		}

		const response = await resolved.transport.request<T>({
			url,
			method,
			headers,
			body,
			timeoutMs: options.timeoutMs ?? resolved.timeoutMs,
			signal: options.signal,
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new QubicError("Query request failed", {
			status: response.status,
			details: response.data,
		});
	};

	return {
		transport: resolved.transport,
		getComputorListsForEpoch: (body, options) =>
			request<pbGetComputorListsForEpochResponse>(
				"/getComputorListsForEpoch",
				"POST",
				body,
				options,
			),
		getLastProcessedTick: (options) =>
			request<pbGetLastProcessedTickResponse>(
				"/getLastProcessedTick",
				"GET",
				undefined,
				options,
			),
		getProcessedTickIntervals: (options) =>
			request<pbGetProcessedTickIntervalsResponse>(
				"/getProcessedTickIntervals",
				"GET",
				undefined,
				options,
			),
		getTickData: (body, options) =>
			request<pbGetTickDataResponse>("/getTickData", "POST", body, options),
		getTransactionByHash: (body, options) =>
			request<pbGetTransactionByHashResponse>(
				"/getTransactionByHash",
				"POST",
				body,
				options,
			),
		getTransactionsForIdentity: (body, options) =>
			request<pbGetTransactionsForIdentityResponse>(
				"/getTransactionsForIdentity",
				"POST",
				body,
				options,
			),
		getTransactionsForTick: (body, options) =>
			request<pbGetTransactionsForTickResponse>(
				"/getTransactionsForTick",
				"POST",
				body,
				options,
			),
	};
}
