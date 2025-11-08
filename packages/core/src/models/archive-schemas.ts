import { z } from 'zod';

export const TickDataResponseSchema = z.object({
  tickData: z
    .object({
      computorIndex: z.number().int(),
      epoch: z.number().int(),
      tickNumber: z.number().int(),
      timestamp: z.string(),
      varStruct: z.string().optional(),
      timeLock: z.string().optional(),
      transactionIds: z.array(z.string()).optional(),
      contractFees: z.array(z.string()).optional(),
      signatureHex: z.string().optional()
    })
    .optional()
});

export const TransactionDataSchema = z.object({
  transaction: z
    .object({
      sourceId: z.string(),
      destId: z.string(),
      amount: z.string(),
      tickNumber: z.number().int().optional(),
      inputType: z.number().int().optional(),
      inputSize: z.number().int().optional(),
      inputHex: z.string().optional(),
      signatureHex: z.string().optional(),
      txId: z.string()
    })
    .optional(),
  timestamp: z.string().optional(),
  moneyFlew: z.boolean().optional()
});

export const TransactionResponseSchema = z.object({
  transactionData: TransactionDataSchema.optional(),
  transaction: TransactionDataSchema.shape.transaction,
  timestamp: z.string().optional(),
  moneyFlew: z.boolean().optional()
});

export const TransactionStatusSchema = z.object({
  txId: z.string(),
  moneyFlew: z.boolean()
});

const TickRangeSchema = z.object({
  startTick: z.number().int().nonnegative(),
  endTick: z.number().int().nonnegative()
});

const ProcessedIntervalSchema = z.object({
  initialProcessedTick: z.number().int().nonnegative(),
  lastProcessedTick: z.number().int().nonnegative()
});

export const StatusSchema = z.object({
  lastProcessedTick: z
    .object({ tickNumber: z.number().int().nonnegative(), epoch: z.number().int().nonnegative().optional() })
    .optional(),
  lastProcessedTicksPerEpoch: z.record(z.number().int().nonnegative()).optional(),
  skippedTicks: z.array(TickRangeSchema).optional(),
  processedTickIntervalsPerEpoch: z
    .array(z.object({ epoch: z.number().int().nonnegative(), intervals: z.array(ProcessedIntervalSchema) }))
    .optional(),
  emptyTicksPerEpoch: z.record(z.number().int().nonnegative()).optional()
});

export const LatestTickSchema = z
  .object({
    tickNumber: z.union([z.number(), z.string()]),
    epoch: z.union([z.number(), z.string()]).optional()
  })
  .transform((value) => ({
    tickNumber: typeof value.tickNumber === 'string' ? Number(value.tickNumber) : value.tickNumber,
    epoch: value.epoch === undefined ? undefined : typeof value.epoch === 'string' ? Number(value.epoch) : value.epoch
  }));
