import { HttpClient } from '../transport/http-client';
import { LatestStatsSchema, RichListSchema } from '../models/stats-schemas';
import { parseWithSchema } from '../utils/validation';

export class StatsClient {
  constructor(private readonly http: HttpClient) {}

  async getLatestStats() {
    const response = await this.http.request({
      path: `/v1/latest-stats`,
      useCache: true
    });
    return parseWithSchema(LatestStatsSchema, response);
  }

  async getRichList() {
    const response = await this.http.request({
      path: `/v1/rich-list`,
      useCache: true
    });
    return parseWithSchema(RichListSchema, response);
  }
}
