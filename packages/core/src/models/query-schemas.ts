import { z } from 'zod';

export const QueryTransactionSchema = z.object({
  hash: z.string(),
  amount: z.string().optional(),
  source: z.string().optional(),
  destination: z.string().optional(),
  tickNumber: z.number().optional(),
  timestamp: z.string().optional(),
  inputType: z.number().optional(),
  inputSize: z.number().optional(),
  inputData: z.string().optional(),
  signature: z.string().optional(),
  moneyFlew: z.boolean().optional()
});

export const TransactionByHashResponseSchema = z.object({
  transaction: QueryTransactionSchema.optional()
});

export const TransactionsForIdentitySchema = z.object({
  validForTick: z.number().optional(),
  hits: z
    .object({
      total: z.number().optional(),
      from: z.number().optional(),
      size: z.number().optional()
    })
    .optional(),
  transactions: z.array(QueryTransactionSchema)
});
