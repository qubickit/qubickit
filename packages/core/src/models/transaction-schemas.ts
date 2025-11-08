import { z } from 'zod';

const uint8ArraySchema = z.instanceof(Uint8Array, { message: 'value must be Uint8Array' });

export const timeLockSchema = z
  .object({
    startTick: z.number().int().nonnegative(),
    endTick: z.number().int().nonnegative()
  })
  .refine((value) => value.endTick >= value.startTick, { message: '`endTick` must be >= `startTick`' });

export const varStructEntrySchema = z.object({
  key: z.number().int().nonnegative().max(0xffff),
  value: z.union([uint8ArraySchema, z.string()])
});

export const varStructSchema = z.array(varStructEntrySchema);
