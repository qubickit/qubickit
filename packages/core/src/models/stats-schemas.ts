import { z } from 'zod';

export const LatestStatsSchema = z.object({
  data: z
    .object({
      circulatingSupply: z.string().optional(),
      epoch: z.number().int().optional(),
      activeIdentities: z.number().int().optional()
    })
    .optional()
});
export type LatestStatsResponse = z.infer<typeof LatestStatsSchema>;

export const RichListSchema = z.object({
  pagination: z
    .object({
      next: z.string().optional(),
      prev: z.string().optional()
    })
    .optional(),
  richList: z
    .array(
      z.object({
        identity: z.string(),
        balance: z.string()
      })
    )
    .optional()
});
export type RichListResponse = z.infer<typeof RichListSchema>;
