import { z } from 'zod';

const LegacyBalanceSchema = z
  .object({
    available: z.string(),
    pending: z.string().optional(),
    identity: z.string()
  })
  .passthrough();

const ModernBalanceSchema = z
  .object({
    id: z.string().optional(),
    balance: z.string().optional(),
    validForTick: z.number().int().optional(),
    latestIncomingTransferTick: z.number().int().optional(),
    latestOutgoingTransferTick: z.number().int().optional(),
    incomingAmount: z.string().optional(),
    outgoingAmount: z.string().optional(),
    numberOfIncomingTransfers: z.number().int().optional(),
    numberOfOutgoingTransfers: z.number().int().optional()
  })
  .passthrough();

export const BalanceResponseSchema = z.object({
  balance: z.union([LegacyBalanceSchema, ModernBalanceSchema])
});

export const BroadcastTransactionResponseSchema = z.object({
  peersBroadcasted: z.number().int(),
  encodedTransaction: z.string().optional(),
  transactionId: z.string()
});
