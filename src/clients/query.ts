import {
	applyAuthHeader,
	buildUrl,
	mergeHeaders,
	type QubicClientConfig,
	type RequestOptions,
	resolveConfig,
} from "../config.ts";
import { QubicError } from "../errors.ts";
import type {
	pbGetComputorListsForEpochRequest,
	pbGetComputorListsForEpochResponse,
	pbGetLastProcessedTickResponse,
	pbGetProcessedTickIntervalsRequest,
	pbGetProcessedTickIntervalsResponse,
	pbGetTickDataRequest,
	pbGetTickDataResponse,
	pbGetTransactionByHashRequest,
	pbGetTransactionByHashResponse,
	pbGetTransactionsForIdentityRequest,
	pbGetTransactionsForIdentityResponse,
	pbGetTransactionsForTickRequest,
	pbGetTransactionsForTickResponse,
} from "../gen/query-types.ts";
import type { Transport } from "../transport.ts";

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
		body: pbGetProcessedTickIntervalsRequest,
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
		body: unknown,
		options: RequestOptions = {},
	): Promise<T> => {
		const url = buildUrl(resolved.baseUrl, path);
		const headers = applyAuthHeader(
			mergeHeaders(resolved.headers, options.headers),
			resolved,
		);
		headers["content-type"] = headers["content-type"] ?? "application/json";
		if (resolved.userAgent) {
			headers["user-agent"] = resolved.userAgent;
		}

		const response = await resolved.transport.request<T>({
			url,
			method: "POST",
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
				body,
				options,
			),
		getLastProcessedTick: (options) =>
			request<pbGetLastProcessedTickResponse>(
				"/getLastProcessedTick",
				{},
				options,
			),
		getProcessedTickIntervals: (body, options) =>
			request<pbGetProcessedTickIntervalsResponse>(
				"/getProcessedTickIntervals",
				body,
				options,
			),
		getTickData: (body, options) =>
			request<pbGetTickDataResponse>("/getTickData", body, options),
		getTransactionByHash: (body, options) =>
			request<pbGetTransactionByHashResponse>(
				"/getTransactionByHash",
				body,
				options,
			),
		getTransactionsForIdentity: (body, options) =>
			request<pbGetTransactionsForIdentityResponse>(
				"/getTransactionsForIdentity",
				body,
				options,
			),
		getTransactionsForTick: (body, options) =>
			request<pbGetTransactionsForTickResponse>(
				"/getTransactionsForTick",
				body,
				options,
			),
	};
}
