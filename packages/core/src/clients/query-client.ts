import { HttpClient } from '../transport/http-client';
import {
  TransactionByHashResponseSchema,
  TransactionsForIdentitySchema
} from '../models/query-schemas';
import { identitySchema } from '../models/shared-schemas';
import { parseWithSchema } from '../utils/validation';

export class QueryServiceClient {
  constructor(private readonly http: HttpClient) {}

  async getTransactionByHash(hash: string) {
    const response = await this.http.request({
      path: `/getTransactionByHash`,
      method: 'POST',
      body: { hash }
    });
    return parseWithSchema(TransactionByHashResponseSchema, response);
  }

  async getTransactionsForIdentity(identity: string, options?: { limit?: number; from?: number }) {
    identitySchema.parse(identity);
    const response = await this.http.request({
      path: `/getTransactionsForIdentity`,
      method: 'POST',
      body: {
        identity,
        limit: options?.limit,
        from: options?.from
      }
    });
    return parseWithSchema(TransactionsForIdentitySchema, response);
  }

  async getTransfersByIdentity(identity: string, options?: { pageSize?: number; autoPaginate?: boolean }) {
    const limit = options?.pageSize ?? 50;
    let from = 0;
    const transactions: Awaited<ReturnType<QueryServiceClient['getTransactionsForIdentity']>>['transactions'] = [];

    while (true) {
      const response = await this.getTransactionsForIdentity(identity, { limit, from });
      const batch = response.transactions ?? [];
      transactions.push(...batch);
      const total = response.hits?.total;
      if (options?.autoPaginate === false) break;
      if (total !== undefined && from + batch.length >= total) break;
      if (batch.length < limit) break;
      from += limit;
    }

    return transactions;
  }
}
