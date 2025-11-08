import { z } from 'zod';

const AssetSchema = z.object({
  name: z.string(),
  issuerIdentity: z.string().optional(),
  supply: z.string().optional()
});

export const AssetIssuancesSchema = z.object({
  issuances: z.array(AssetSchema).optional()
});

const OwnershipEntry = z.object({
  identity: z.string(),
  assetName: z.string(),
  units: z.string()
});

export const AssetOwnershipsSchema = z.object({
  owners: z.array(OwnershipEntry).optional()
});

const PossessionEntry = z.object({
  identity: z.string(),
  assetName: z.string(),
  units: z.string()
});

export const AssetPossessionsSchema = z.object({
  possessors: z.array(PossessionEntry).optional()
});

export const AssetsByIdentitySchema = z.object({
  assets: z.array(AssetSchema).optional()
});
