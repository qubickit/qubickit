import { HttpClient } from '../transport/http-client';
import {
  BalanceResponseSchema,
  BroadcastTransactionResponseSchema
} from '../models/http-schemas';
import {
  AssetIssuancesSchema,
  AssetOwnershipsSchema,
  AssetPossessionsSchema,
  AssetsByIdentitySchema
} from '../models/assets-schemas';
import { identitySchema } from '../models/shared-schemas';
import { z } from 'zod';
import { parseWithSchema } from '../utils/validation';

export class HttpApiClient {
  constructor(private readonly http: HttpClient) {}

  async getBalance(identity: string) {
    identitySchema.parse(identity);
    const response = await this.http.request({
      path: `/v1/balances/${identity}`,
      useCache: true
    });
    return parseWithSchema(BalanceResponseSchema, response);
  }

  async broadcastTransaction(encodedTransaction: string) {
    const response = await this.http.request({
      path: `/v1/broadcast-transaction`,
      method: 'POST',
      body: { encodedTransaction }
    });
    return parseWithSchema(BroadcastTransactionResponseSchema, response);
  }

  async getAssetIssuances() {
    const response = await this.http.request({ path: `/v1/assets/issuances`, useCache: true });
    return parseWithSchema(AssetIssuancesSchema, response);
  }

  async getAssetOwnerships(assetName: string, issuerIdentity?: string) {
    const response = await this.http.request({
      path: `/v1/assets/ownerships`,
      query: { name: assetName, issuer: issuerIdentity },
      useCache: true
    });
    return parseWithSchema(AssetOwnershipsSchema, response);
  }

  async getAssetPossessions(assetName: string, issuerIdentity?: string) {
    const response = await this.http.request({
      path: `/v1/assets/possessions`,
      query: { name: assetName, issuer: issuerIdentity },
      useCache: true
    });
    return parseWithSchema(AssetPossessionsSchema, response);
  }

  async getAssetsByIdentity(identity: string) {
    identitySchema.parse(identity);
    const response = await this.http.request({
      path: `/v1/assets/${identity}/owned`,
      useCache: true
    });
    return parseWithSchema(AssetsByIdentitySchema, response);
  }

  async getTickInfo() {
    const response = await this.http.request({ path: `/v1/tick-info`, useCache: true });
    return z.object({
      tickInfo: z.object({ tick: z.number().optional(), epoch: z.number().optional() })
    }).parse(response);
  }

  async querySmartContract(body: {
    contractIndex: number;
    inputType?: number;
    inputSize?: number;
    requestData?: string;
  }) {
    const response = await this.http.request({
      path: `/v1/querySmartContract`,
      method: 'POST',
      body
    });
    return z.object({ responseData: z.string().optional() }).parse(response);
  }
}
