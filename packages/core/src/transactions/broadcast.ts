import { HttpApiClient } from '../clients/http-api-client';
import { ArchiveClient } from '../clients/archive-client';
import { monitorTransactionStatus, type MonitorOptions } from './monitor';

export interface BroadcastOptions extends MonitorOptions {
  monitor?: boolean;
}

export interface BroadcastResult {
  peersBroadcasted: number;
  encodedTransaction?: string;
  transactionId: string;
  status?: Awaited<ReturnType<typeof monitorTransactionStatus>>;
}

export const broadcastEncodedTransaction = async (
  httpClient: HttpApiClient,
  archiveClient: ArchiveClient,
  encodedTransaction: string,
  options: BroadcastOptions = {}
): Promise<BroadcastResult> => {
  const result = await httpClient.broadcastTransaction(encodedTransaction);
  if (!options.monitor) return result as BroadcastResult;
  if (!result.transactionId) throw new Error('Broadcast response missing transactionId');
  const status = await monitorTransactionStatus(archiveClient, result.transactionId, options);
  return { ...result, status };
};
