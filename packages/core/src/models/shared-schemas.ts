import { z } from 'zod';

export const identitySchema = z
  .string()
  .length(60, 'Identity must be 60 uppercase characters')
  .regex(/^[A-Z0-9]+$/, 'Identity must be base32 uppercase');

export const contractIndexSchema = z.number().int().nonnegative();

export const tickRangeSchema = z
  .object({
    from: z.number().int().nonnegative(),
    to: z.number().int().nonnegative()
  })
  .refine((range) => range.to >= range.from, { message: '`to` must be greater than or equal to `from`' });
