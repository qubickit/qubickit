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
export type TickDataResponse = z.infer<typeof TickDataResponseSchema>;

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
export type TransactionData = z.infer<typeof TransactionDataSchema>;

export const TransactionResponseSchema = z.object({
  transactionData: TransactionDataSchema.optional(),
  transaction: TransactionDataSchema.shape.transaction,
  timestamp: z.string().optional(),
  moneyFlew: z.boolean().optional()
});
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;

export const TransactionStatusSchema = z.object({
  txId: z.string(),
  moneyFlew: z.boolean()
});
export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;

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
export type ArchiveStatus = z.infer<typeof StatusSchema>;

export const LatestTickSchema = z
  .object({
    tickNumber: z.union([z.number(), z.string()]).optional(),
    latestTick: z.union([z.number(), z.string()]).optional(),
    epoch: z.union([z.number(), z.string()]).optional()
  })
  .transform((value) => {
    const source = value.tickNumber ?? value.latestTick;
    if (source === undefined) {
      throw new Error('Latest tick payload missing tick number.');
    }
    const epochValue = value.epoch === undefined ? undefined : value.epoch;
    return {
      tickNumber: typeof source === 'string' ? Number(source) : source,
      epoch: epochValue === undefined ? undefined : typeof epochValue === 'string' ? Number(epochValue) : epochValue
    };
  });
export type LatestTick = z.infer<typeof LatestTickSchema>;
