import { HttpClient } from '../transport/http-client';
import {
  BalanceResponseSchema,
  BroadcastTransactionResponseSchema,
  QuerySmartContractResponseSchema,
  TickInfoResponseSchema,
  type BalanceResponse,
  type BroadcastTransactionResponse,
  type QuerySmartContractResponse,
  type TickInfoResponse
} from '../models/http-schemas';
import {
  AssetIssuancesSchema,
  AssetOwnershipsSchema,
  AssetPossessionsSchema,
  AssetsByIdentitySchema,
  type AssetIssuancesResponse,
  type AssetOwnershipsResponse,
  type AssetPossessionsResponse,
  type AssetsByIdentityResponse
} from '../models/assets-schemas';
import { identitySchema } from '../models/shared-schemas';
import { parseWithSchema } from '../utils/validation';

export class HttpApiClient {
  constructor(private readonly http: HttpClient) {}

  async getBalance(identity: string, options: { useCache?: boolean } = {}): Promise<BalanceResponse> {
    identitySchema.parse(identity);
    const response = await this.http.request({
      path: `/v1/balances/${identity}`,
      useCache: options.useCache ?? true
    });
    return parseWithSchema(BalanceResponseSchema, response);
  }

  async broadcastTransaction(encodedTransaction: string): Promise<BroadcastTransactionResponse> {
    const response = await this.http.request({
      path: `/v1/broadcast-transaction`,
      method: 'POST',
      body: { encodedTransaction }
    });
    return parseWithSchema(BroadcastTransactionResponseSchema, response);
  }

  async getAssetIssuances(): Promise<AssetIssuancesResponse> {
    const response = await this.http.request({ path: `/v1/assets/issuances`, useCache: true });
    return parseWithSchema(AssetIssuancesSchema, response);
  }

  async getAssetOwnerships(assetName: string, issuerIdentity?: string): Promise<AssetOwnershipsResponse> {
    const response = await this.http.request({
      path: `/v1/assets/ownerships`,
      query: { name: assetName, issuer: issuerIdentity },
      useCache: true
    });
    return parseWithSchema(AssetOwnershipsSchema, response);
  }

  async getAssetPossessions(assetName: string, issuerIdentity?: string): Promise<AssetPossessionsResponse> {
    const response = await this.http.request({
      path: `/v1/assets/possessions`,
      query: { name: assetName, issuer: issuerIdentity },
      useCache: true
    });
    return parseWithSchema(AssetPossessionsSchema, response);
  }

  async getAssetsByIdentity(identity: string): Promise<AssetsByIdentityResponse> {
    identitySchema.parse(identity);
    const response = await this.http.request({
      path: `/v1/assets/${identity}/owned`,
      useCache: true
    });
    return parseWithSchema(AssetsByIdentitySchema, response);
  }

  async getTickInfo(): Promise<TickInfoResponse> {
    const response = await this.http.request({ path: `/v1/tick-info`, useCache: true });
    return parseWithSchema(TickInfoResponseSchema, response);
  }

  async querySmartContract(body: {
    contractIndex: number;
    inputType?: number;
    inputSize?: number;
    requestData?: string;
  }): Promise<QuerySmartContractResponse> {
    const response = await this.http.request({
      path: `/v1/querySmartContract`,
      method: 'POST',
      body
    });
    return parseWithSchema(QuerySmartContractResponseSchema, response);
  }
}
