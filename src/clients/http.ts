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
	pbAssetIssuance,
	pbAssetIssuances,
	pbAssetOwnership,
	pbAssetOwnerships,
	pbAssetPossession,
	pbAssetPossessions,
	pbBroadcastTransactionRequest,
	pbBroadcastTransactionResponse,
	pbGetActiveIposResponse,
	pbGetBalanceResponse,
	pbGetBlockHeightResponse,
	pbGetTickInfoResponse,
	pbIssuedAssetsResponse,
	pbOwnedAssetsResponse,
	pbPossessedAssetsResponse,
	pbQuerySmartContractRequest,
	pbQuerySmartContractResponse,
} from "../gen/http-types";
import type { Transport } from "../transport";

export interface HttpCallOptions extends RequestOptions {
	query?: Record<string, string | number | boolean | undefined>;
	body?: unknown;
}

export interface HttpClient {
	request<T = unknown>(
		path: string,
		method: string,
		options?: HttpCallOptions,
	): Promise<T>;
	get<T = unknown>(path: string, options?: HttpCallOptions): Promise<T>;
	post<T = unknown>(
		path: string,
		body?: unknown,
		options?: HttpCallOptions,
	): Promise<T>;
	put<T = unknown>(
		path: string,
		body?: unknown,
		options?: HttpCallOptions,
	): Promise<T>;
	patch<T = unknown>(
		path: string,
		body?: unknown,
		options?: HttpCallOptions,
	): Promise<T>;
	delete<T = unknown>(path: string, options?: HttpCallOptions): Promise<T>;
	transport: Transport;

	// Typed convenience methods for the public HTTP API
	getAssetIssuances(
		params?: { issuerIdentity?: string; assetName?: string },
		options?: HttpCallOptions,
	): Promise<pbAssetIssuances>;
	getAssetIssuanceByIndex(
		index: number,
		options?: HttpCallOptions,
	): Promise<pbAssetIssuance>;
	getAssetOwnerships(
		params?: {
			issuerIdentity?: string;
			assetName?: string;
			ownerIdentity?: string;
			ownershipManagingContract?: number;
		},
		options?: HttpCallOptions,
	): Promise<pbAssetOwnerships>;
	getAssetOwnershipByIndex(
		index: number,
		options?: HttpCallOptions,
	): Promise<pbAssetOwnership>;
	getAssetPossessions(
		params?: {
			issuerIdentity?: string;
			assetName?: string;
			ownerIdentity?: string;
			possessorIdentity?: string;
			ownershipManagingContract?: number;
			possessionManagingContract?: number;
		},
		options?: HttpCallOptions,
	): Promise<pbAssetPossessions>;
	getAssetPossessionByIndex(
		index: number,
		options?: HttpCallOptions,
	): Promise<pbAssetPossession>;
	getIssuedAssets(
		identity: string,
		options?: HttpCallOptions,
	): Promise<pbIssuedAssetsResponse>;
	getOwnedAssets(
		identity: string,
		options?: HttpCallOptions,
	): Promise<pbOwnedAssetsResponse>;
	getPossessedAssets(
		identity: string,
		options?: HttpCallOptions,
	): Promise<pbPossessedAssetsResponse>;
	getBalance(
		id: string,
		options?: HttpCallOptions,
	): Promise<pbGetBalanceResponse>;
	getBlockHeight(options?: HttpCallOptions): Promise<pbGetBlockHeightResponse>;
	getTickInfo(options?: HttpCallOptions): Promise<pbGetTickInfoResponse>;
	getActiveIpos(options?: HttpCallOptions): Promise<pbGetActiveIposResponse>;
	broadcastTransaction(
		body: pbBroadcastTransactionRequest,
		options?: HttpCallOptions,
	): Promise<pbBroadcastTransactionResponse>;
	querySmartContract(
		body: pbQuerySmartContractRequest,
		options?: HttpCallOptions,
	): Promise<pbQuerySmartContractResponse>;
}

export function createHttpClient(config: QubicClientConfig): HttpClient {
	const resolved = resolveConfig(config);

	const request = async <T>(
		path: string,
		method: string,
		options: HttpCallOptions = {},
	): Promise<T> => {
		const url = appendQuery(buildUrl(resolved.baseUrl, path), options.query);
		const headers = applyAuthHeader(
			mergeHeaders(resolved.headers, options.headers),
			resolved,
		);
		if (resolved.userAgent) {
			headers["user-agent"] = resolved.userAgent;
		}

		const response = await resolved.transport.request<T>({
			url,
			method: method.toUpperCase() as any,
			headers,
			body: options.body,
			timeoutMs: options.timeoutMs ?? resolved.timeoutMs,
			signal: options.signal,
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new QubicError("HTTP request failed", {
			status: response.status,
			details: response.data,
		});
	};

	return {
		request,
		get: (path, options) => request(path, "GET", options),
		delete: (path, options) => request(path, "DELETE", options),
		post: (path, body, options) => request(path, "POST", { ...options, body }),
		put: (path, body, options) => request(path, "PUT", { ...options, body }),
		patch: (path, body, options) =>
			request(path, "PATCH", { ...options, body }),
		transport: resolved.transport,

		// Domain-specific helpers
		getAssetIssuances: (params, options) =>
			request<pbAssetIssuances>("/assets/issuances", "GET", {
				...options,
				query: params,
			}),
		getAssetIssuanceByIndex: (index, options) =>
			request<pbAssetIssuance>(`/assets/issuances/${index}`, "GET", options),
		getAssetOwnerships: (params, options) =>
			request<pbAssetOwnerships>("/assets/ownerships", "GET", {
				...options,
				query: params,
			}),
		getAssetOwnershipByIndex: (index, options) =>
			request<pbAssetOwnership>(`/assets/ownerships/${index}`, "GET", options),
		getAssetPossessions: (params, options) =>
			request<pbAssetPossessions>("/assets/possessions", "GET", {
				...options,
				query: params,
			}),
		getAssetPossessionByIndex: (index, options) =>
			request<pbAssetPossession>(
				`/assets/possessions/${index}`,
				"GET",
				options,
			),
		getIssuedAssets: (identity, options) =>
			request<pbIssuedAssetsResponse>(
				`/assets/${identity}/issued`,
				"GET",
				options,
			),
		getOwnedAssets: (identity, options) =>
			request<pbOwnedAssetsResponse>(
				`/assets/${identity}/owned`,
				"GET",
				options,
			),
		getPossessedAssets: (identity, options) =>
			request<pbPossessedAssetsResponse>(
				`/assets/${identity}/possessed`,
				"GET",
				options,
			),
		getBalance: (id, options) =>
			request<pbGetBalanceResponse>(`/balances/${id}`, "GET", options),
		getBlockHeight: (options) =>
			request<pbGetBlockHeightResponse>("/block-height", "GET", options),
		getTickInfo: (options) =>
			request<pbGetTickInfoResponse>("/tick-info", "GET", options),
		getActiveIpos: (options) =>
			request<pbGetActiveIposResponse>("/ipos/active", "GET", options),
		broadcastTransaction: (body, options) =>
			request<pbBroadcastTransactionResponse>(
				"/broadcast-transaction",
				"POST",
				{
					...options,
					body,
				},
			),
		querySmartContract: (body, options) =>
			request<pbQuerySmartContractResponse>("/querySmartContract", "POST", {
				...options,
				body,
			}),
	};
}

function appendQuery(url: string, query?: HttpCallOptions["query"]): string {
	if (!query) return url;
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(query)) {
		if (value === undefined) continue;
		params.append(key, String(value));
	}
	const qs = params.toString();
	return qs ? `${url}?${qs}` : url;
}
