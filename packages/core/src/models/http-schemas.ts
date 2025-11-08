import { z } from 'zod';

export const BalanceResponseSchema = z.object({
  balance: z.object({
    available: z.string(),
    pending: z.string().optional(),
    identity: z.string()
  })
});

export const BroadcastTransactionResponseSchema = z.object({
  peersBroadcasted: z.number().int(),
  encodedTransaction: z.string().optional(),
  transactionId: z.string()
});
