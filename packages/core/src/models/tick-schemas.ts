import { z } from 'zod';

export const TickTransactionsSchema = z.object({
  transactions: z.array(z.object({ txId: z.string() })).optional()
});
