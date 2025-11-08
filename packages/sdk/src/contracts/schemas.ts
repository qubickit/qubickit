import { z } from 'zod';

export const ContractProcedureSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().min(1),
  description: z.string().optional()
});

export const ContractMetadataSchema = z.object({
  filename: z.string().optional(),
  name: z.string().min(1),
  label: z.string().optional(),
  githubUrl: z.string().url().optional(),
  contractIndex: z.number().int().nonnegative(),
  address: z.string().min(1),
  procedures: z.array(ContractProcedureSchema).default([])
});

export type ContractMetadata = z.infer<typeof ContractMetadataSchema>;

export const ContractRegistrySnapshotSchema = z.object({
  smart_contracts: z.array(ContractMetadataSchema)
});

export type ContractRegistrySnapshot = z.infer<typeof ContractRegistrySnapshotSchema>;
