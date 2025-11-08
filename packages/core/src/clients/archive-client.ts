import { HttpClient } from '../transport/http-client';
import {
  TickDataResponseSchema,
  TransactionResponseSchema,
  TransactionStatusSchema,
  StatusSchema,
  LatestTickSchema
} from '../models/archive-schemas';
import { TickTransactionsSchema } from '../models/tick-schemas';
import { parseWithSchema } from '../utils/validation';

export class ArchiveClient {
  constructor(private readonly http: HttpClient) {}

  async getTickData(tickNumber: number) {
    const response = await this.http.request({
      path: `/v1/ticks/${tickNumber}/tick-data`,
      useCache: true
    });
    return parseWithSchema(TickDataResponseSchema, response);
  }

  async getTransaction(txId: string) {
    const response = await this.http.request({
      path: `/v1/transactions/${txId}`
    });
    return parseWithSchema(TransactionResponseSchema, response);
  }

  async getTransactionStatus(txId: string) {
    const response = await this.http.request({
      path: `/v1/tx-status/${txId}`
    });
    return parseWithSchema(TransactionStatusSchema, response);
  }

  async getTickTransactions(tickNumber: number) {
    const response = await this.http.request({
      path: `/v1/ticks/${tickNumber}/transactions`,
      useCache: true
    });
    return parseWithSchema(TickTransactionsSchema, response);
  }

  async getStatus() {
    const response = await this.http.request({
      path: `/v1/status`,
      useCache: true
    });
    return parseWithSchema(StatusSchema, response);
  }

  async getLatestTick() {
    const response = await this.http.request({ path: `/v1/latestTick`, useCache: true });
    return parseWithSchema(LatestTickSchema, response);
  }
}
