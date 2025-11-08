import { z } from 'zod';

import type { EncryptedPayload } from '../crypto/secret-box';

export const SeedSchema = z
  .string()
  .trim()
  .min(55, 'Seed must contain 55 characters.')
  .max(55, 'Seed must contain 55 characters.')
  .regex(/^[a-z]+$/, 'Seed must contain lowercase a-z characters.');

export const EncryptedSeedSchema: z.ZodType<EncryptedPayload> = z.object({
  algorithm: z.literal('AES-GCM'),
  ciphertext: z.string().min(1),
  iv: z.string().min(1),
  salt: z.string().min(1),
  iterations: z.number().int().positive(),
  createdAt: z.number().int().nonnegative()
});

export const WalletAccountSchema = z.object({
  accountId: z.string().min(1),
  label: z.string().min(1).optional(),
  derivationIndex: z.number().int().nonnegative(),
  identity: z.string().min(1),
  publicKey: z.string().min(1),
  createdAt: z.number().int().nonnegative()
});

export type WalletAccount = z.infer<typeof WalletAccountSchema>;

export const WalletProfileSchema = z.object({
  profileId: z.string().min(1),
  label: z.string().min(1).optional(),
  createdAt: z.number().int().nonnegative(),
  updatedAt: z.number().int().nonnegative(),
  encryptedSeed: EncryptedSeedSchema,
  accounts: z.array(WalletAccountSchema).default([])
});

export type WalletProfile = z.infer<typeof WalletProfileSchema>;

export const WalletStoreSchema = z.object({
  profileId: z.string().min(1),
  profile: WalletProfileSchema
});
