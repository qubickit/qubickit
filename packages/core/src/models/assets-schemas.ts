import { z } from 'zod';

const AssetSchema = z.object({
  name: z.string(),
  issuerIdentity: z.string().optional(),
  supply: z.string().optional()
});

export const AssetIssuancesSchema = z.object({
  issuances: z.array(AssetSchema).optional()
});
export type AssetIssuancesResponse = z.infer<typeof AssetIssuancesSchema>;

const OwnershipEntry = z.object({
  identity: z.string(),
  assetName: z.string(),
  units: z.string()
});

export const AssetOwnershipsSchema = z.object({
  owners: z.array(OwnershipEntry).optional()
});
export type AssetOwnershipsResponse = z.infer<typeof AssetOwnershipsSchema>;

const PossessionEntry = z.object({
  identity: z.string(),
  assetName: z.string(),
  units: z.string()
});

export const AssetPossessionsSchema = z.object({
  possessors: z.array(PossessionEntry).optional()
});
export type AssetPossessionsResponse = z.infer<typeof AssetPossessionsSchema>;

export const AssetsByIdentitySchema = z.object({
  assets: z.array(AssetSchema).optional()
});
export type AssetsByIdentityResponse = z.infer<typeof AssetsByIdentitySchema>;
