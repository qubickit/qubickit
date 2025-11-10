import { HttpClient } from '../transport/http-client';
import {
  TickDataResponseSchema,
  TransactionResponseSchema,
  TransactionStatusSchema,
  StatusSchema,
  LatestTickSchema,
  type TickDataResponse,
  type TransactionResponse,
  type TransactionStatus,
  type ArchiveStatus,
  type LatestTick
} from '../models/archive-schemas';
import { TickTransactionsSchema, type TickTransactionsResponse } from '../models/tick-schemas';
import { parseWithSchema } from '../utils/validation';

export class ArchiveClient {
  constructor(private readonly http: HttpClient) {}

  async getTickData(tickNumber: number): Promise<TickDataResponse> {
    const response = await this.http.request({
      path: `/v1/ticks/${tickNumber}/tick-data`,
      useCache: true
    });
    return parseWithSchema(TickDataResponseSchema, response);
  }

  async getTransaction(txId: string): Promise<TransactionResponse> {
    const response = await this.http.request({
      path: `/v1/transactions/${txId}`
    });
    return parseWithSchema(TransactionResponseSchema, response);
  }

  async getTransactionStatus(txId: string): Promise<TransactionStatus> {
    const response = await this.http.request({
      path: `/v1/tx-status/${txId}`
    });
    return parseWithSchema(TransactionStatusSchema, response);
  }

  async getTickTransactions(tickNumber: number): Promise<TickTransactionsResponse> {
    const response = await this.http.request({
      path: `/v1/ticks/${tickNumber}/transactions`,
      useCache: true
    });
    return parseWithSchema(TickTransactionsSchema, response);
  }

  async getStatus(): Promise<ArchiveStatus> {
    const response = await this.http.request({
      path: `/v1/status`,
      useCache: true
    });
    return parseWithSchema(StatusSchema, response);
  }

  async getLatestTick(): Promise<LatestTick> {
    const response = await this.http.request({ path: `/v1/latestTick`, useCache: true });
    return parseWithSchema(LatestTickSchema, response);
  }
}
