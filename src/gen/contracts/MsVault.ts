// biome-ignore format: auto-generated file
// Auto-generated from tmp/src/contracts. Do not edit manually.

import type { Schema } from "../../encoding/codec";
import { decode, encode } from "../../encoding/codec";

function toBase64(data: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(data).toString("base64");
  }
  let binary = "";
  data.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function fromBase64(str: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(str, "base64"));
  }
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export type MSVAULT2 = Record<string, never>;


export interface AssetBalance {
  asset: any;
  balance: bigint;
}

export interface Vault {
  vaultName: Uint8Array;
  qubicBalance: bigint;
  numberOfOwners: number;
  requiredApprovals: number;
  isActive: number;
}

export interface VaultAssetPart {
  numberOfAssetTypes: number;
}

export interface MsVaultFeeVote {
  registeringFee: bigint;
  releaseFee: bigint;
  releaseResetFee: bigint;
  holdingFee: bigint;
  depositFee: bigint;
  burnFee: bigint;
}

export interface MSVaultLogger {
  _contractIndex: number;
  _type: number;
  vaultId: bigint;
  ownerID: Uint8Array;
  amount: bigint;
  destination: Uint8Array;
  _terminator: number;
}

export interface isValidVaultId_input {
  vaultId: bigint;
}

export interface isValidVaultId_output {
  result: number;
}

export type isValidVaultId_locals = Record<string, never>;


export interface findOwnerIndexInVault_input {
  vault: any;
  ownerID: Uint8Array;
}

export interface findOwnerIndexInVault_output {
  index: bigint;
}

export interface findOwnerIndexInVault_locals {
  i: bigint;
}

export interface isOwnerOfVault_input {
  vault: any;
  ownerID: Uint8Array;
}

export interface isOwnerOfVault_output {
  result: number;
}

export interface isOwnerOfVault_locals {
  fi_in: any;
  fi_out: any;
  fi_locals: any;
}

export interface resetReleaseRequests_input {
  vault: any;
}

export interface resetReleaseRequests_output {
  vault: any;
}

export interface resetReleaseRequests_locals {
  i: bigint;
}

export interface isShareHolder_input {
  candidate: Uint8Array;
}

export type isShareHolder_locals = Record<string, never>;


export interface isShareHolder_output {
  result: bigint;
}

export interface getManagedAssetBalance_input {
  asset: any;
  owner: Uint8Array;
}

export interface getManagedAssetBalance_output {
  balance: bigint;
}

export interface registerVault_input {
  vaultName: Uint8Array;
  requiredApprovals: bigint;
}

export interface registerVault_output {
  status: bigint;
}

export interface registerVault_locals {
  logger: any;
  ownerCount: bigint;
  i: bigint;
  ii: bigint;
  j: bigint;
  k: bigint;
  count: bigint;
  found: bigint;
  slotIndex: bigint;
  newVault: any;
  tempVault: any;
  proposedOwner: Uint8Array;
  newQubicVault: any;
  newAssetVault: any;
  rr_in: any;
  rr_out: any;
  rr_locals: any;
}

export interface deposit_input {
  vaultId: bigint;
}

export interface deposit_output {
  status: bigint;
}

export interface deposit_locals {
  logger: any;
  vault: any;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
  amountToDeposit: bigint;
}

export interface releaseTo_input {
  vaultId: bigint;
  amount: bigint;
  destination: Uint8Array;
}

export interface releaseTo_output {
  status: bigint;
}

export interface releaseTo_locals {
  vault: any;
  logger: any;
  ownerIndex: bigint;
  approvals: bigint;
  totalOwners: bigint;
  releaseApproved: number;
  i: bigint;
  io_in: any;
  io_out: any;
  io_locals: any;
  fi_in: any;
  fi_out: any;
  fi_locals: any;
  rr_in: any;
  rr_out: any;
  rr_locals: any;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
}

export interface resetRelease_input {
  vaultId: bigint;
}

export interface resetRelease_output {
  status: bigint;
}

export interface resetRelease_locals {
  vault: any;
  logger: any;
  ownerIndex: bigint;
  io_in: any;
  io_out: any;
  io_locals: any;
  fi_in: any;
  fi_out: any;
  fi_locals: any;
  found: number;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
}

export interface voteFeeChange_input {
  newRegisteringFee: bigint;
  newReleaseFee: bigint;
  newReleaseResetFee: bigint;
  newHoldingFee: bigint;
  newDepositFee: bigint;
  burnFee: bigint;
}

export interface voteFeeChange_output {
  status: bigint;
}

export interface voteFeeChange_locals {
  logger: any;
  i: bigint;
  sumVote: bigint;
  needNewRecord: number;
  nShare: bigint;
  fs: any;
  currentAddr: Uint8Array;
  realScore: bigint;
  currentVote: any;
  uniqueVote: any;
  found: number;
  uniqueIndex: bigint;
  j: bigint;
  currentRank: bigint;
  ish_in: any;
  ish_out: any;
  ish_locals: any;
}

export interface getVaults_input {
  publicKey: Uint8Array;
}

export interface getVaults_output {
  numberOfVaults: bigint;
}

export interface getVaults_locals {
  count: bigint;
  v: any;
}

export interface getReleaseStatus_input {
  vaultId: bigint;
}

export interface getReleaseStatus_output {
  status: bigint;
}

export interface getReleaseStatus_locals {
  vault: any;
  i: bigint;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
}

export interface getBalanceOf_input {
  vaultId: bigint;
}

export interface getBalanceOf_output {
  status: bigint;
  balance: bigint;
}

export interface getBalanceOf_locals {
  vault: any;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
}

export interface getVaultName_input {
  vaultId: bigint;
}

export interface getVaultName_output {
  status: bigint;
  vaultName: Uint8Array;
}

export interface getVaultName_locals {
  vault: any;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
}

export type getRevenueInfo_input = Record<string, never>;


export interface getRevenueInfo_output {
  numberOfActiveVaults: bigint;
  totalRevenue: bigint;
  totalDistributedToShareholders: bigint;
  burnedAmount: bigint;
}

export type getFees_input = Record<string, never>;


export interface getFees_output {
  registeringFee: bigint;
  releaseFee: bigint;
  releaseResetFee: bigint;
  holdingFee: bigint;
  depositFee: bigint;
  burnFee: bigint;
}

export interface getVaultOwners_input {
  vaultId: bigint;
}

export interface getVaultOwners_locals {
  iv_in: any;
  iv_out: any;
  iv_locals: any;
  v: any;
  i: bigint;
}

export interface getVaultOwners_output {
  status: bigint;
  numberOfOwners: bigint;
  requiredApprovals: bigint;
}

export type getFeeVotes_input = Record<string, never>;


export interface getFeeVotes_output {
  status: bigint;
  numberOfFeeVotes: bigint;
}

export interface getFeeVotes_locals {
  i: bigint;
}

export type getFeeVotesOwner_input = Record<string, never>;


export interface getFeeVotesOwner_output {
  status: bigint;
  numberOfFeeVotes: bigint;
}

export interface getFeeVotesOwner_locals {
  i: bigint;
}

export type getFeeVotesScore_input = Record<string, never>;


export interface getFeeVotesScore_output {
  status: bigint;
  numberOfFeeVotes: bigint;
}

export interface getFeeVotesScore_locals {
  i: bigint;
}

export type getUniqueFeeVotes_input = Record<string, never>;


export interface getUniqueFeeVotes_output {
  status: bigint;
  numberOfUniqueFeeVotes: bigint;
}

export interface getUniqueFeeVotes_locals {
  i: bigint;
}

export type getUniqueFeeVotesRanking_input = Record<string, never>;


export interface getUniqueFeeVotesRanking_output {
  status: bigint;
  numberOfUniqueFeeVotes: bigint;
}

export interface getUniqueFeeVotesRanking_locals {
  i: bigint;
}

export interface depositAsset_input {
  vaultId: bigint;
  asset: any;
  amount: bigint;
}

export interface depositAsset_output {
  status: bigint;
}

export interface depositAsset_locals {
  logger: any;
  qubicVault: any;
  assetVault: any;
  ab: any;
  assetIndex: bigint;
  i: bigint;
  userAssetBalance: bigint;
  tempShares: bigint;
  transferResult: bigint;
  transferedShares: bigint;
  transferredNumberOfShares: bigint;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
}

export interface revokeAssetManagementRights_input {
  asset: any;
  numberOfShares: bigint;
}

export interface revokeAssetManagementRights_output {
  transferredNumberOfShares: bigint;
  status: bigint;
}

export interface revokeAssetManagementRights_locals {
  logger: any;
  managedBalance: bigint;
  result: bigint;
}

export interface releaseAssetTo_input {
  vaultId: bigint;
  asset: any;
  amount: bigint;
  destination: Uint8Array;
}

export interface releaseAssetTo_output {
  status: bigint;
}

export interface releaseAssetTo_locals {
  qubicVault: any;
  assetVault: any;
  logger: any;
  ownerIndex: bigint;
  approvals: bigint;
  releaseApproved: number;
  ab: any;
  i: bigint;
  assetIndex: bigint;
  io_in: any;
  io_out: any;
  io_locals: any;
  fi_in: any;
  fi_out: any;
  fi_locals: any;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
  remainingShares: bigint;
  releaseResult: bigint;
}

export interface resetAssetRelease_input {
  vaultId: bigint;
}

export interface resetAssetRelease_output {
  status: bigint;
}

export interface resetAssetRelease_locals {
  qubicVault: any;
  assetVault: any;
  ownerIndex: bigint;
  logger: any;
  io_in: any;
  io_out: any;
  io_locals: any;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
  fi_in: any;
  fi_out: any;
  fi_locals: any;
  i: bigint;
}

export interface getAssetReleaseStatus_input {
  vaultId: bigint;
}

export interface getAssetReleaseStatus_output {
  status: bigint;
}

export interface getAssetReleaseStatus_locals {
  qubicVault: any;
  assetVault: any;
  i: bigint;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
}

export interface getVaultAssetBalances_input {
  vaultId: bigint;
}

export interface getVaultAssetBalances_output {
  status: bigint;
  numberOfAssetTypes: bigint;
}

export interface getVaultAssetBalances_locals {
  i: bigint;
  qubicVault: any;
  assetVault: any;
  iv_in: any;
  iv_out: any;
  iv_locals: any;
}

export interface END_EPOCH_locals {
  i: bigint;
  j: bigint;
  k: bigint;
  qubicVault: any;
  assetVault: any;
  amountToDistribute: bigint;
  feeToBurn: bigint;
  ab: any;
  qxAdress: Uint8Array;
}

const schemas: Record<string, Schema> = {
  MSVAULT2: { kind: "struct", fields: [
]},
  AssetBalance: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "balance", type: "u64" },
]},
  Vault: { kind: "struct", fields: [
  { name: "vaultName", type: "id" },
  { name: "qubicBalance", type: "u64" },
  { name: "numberOfOwners", type: "u8" },
  { name: "requiredApprovals", type: "u8" },
  { name: "isActive", type: "u8" },
]},
  VaultAssetPart: { kind: "struct", fields: [
  { name: "numberOfAssetTypes", type: "u8" },
]},
  MsVaultFeeVote: { kind: "struct", fields: [
  { name: "registeringFee", type: "u64" },
  { name: "releaseFee", type: "u64" },
  { name: "releaseResetFee", type: "u64" },
  { name: "holdingFee", type: "u64" },
  { name: "depositFee", type: "u64" },
  { name: "burnFee", type: "u64" },
]},
  MSVaultLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "vaultId", type: "u64" },
  { name: "ownerID", type: "id" },
  { name: "amount", type: "u64" },
  { name: "destination", type: "id" },
  { name: "_terminator", type: "i8" },
]},
  isValidVaultId_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  isValidVaultId_output: { kind: "struct", fields: [
  { name: "result", type: "u8" },
]},
  isValidVaultId_locals: { kind: "struct", fields: [
]},
  findOwnerIndexInVault_input: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
  { name: "ownerID", type: "id" },
]},
  findOwnerIndexInVault_output: { kind: "struct", fields: [
  { name: "index", type: "i64" },
]},
  findOwnerIndexInVault_locals: { kind: "struct", fields: [
  { name: "i", type: "i64" },
]},
  isOwnerOfVault_input: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
  { name: "ownerID", type: "id" },
]},
  isOwnerOfVault_output: { kind: "struct", fields: [
  { name: "result", type: "u8" },
]},
  isOwnerOfVault_locals: { kind: "struct", fields: [
  { name: "fi_in", type: { bytes: 0 } },
  { name: "fi_out", type: { bytes: 0 } },
  { name: "fi_locals", type: { bytes: 0 } },
]},
  resetReleaseRequests_input: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
]},
  resetReleaseRequests_output: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
]},
  resetReleaseRequests_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
]},
  isShareHolder_input: { kind: "struct", fields: [
  { name: "candidate", type: "id" },
]},
  isShareHolder_locals: { kind: "struct", fields: [
]},
  isShareHolder_output: { kind: "struct", fields: [
  { name: "result", type: "u64" },
]},
  getManagedAssetBalance_input: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "owner", type: "id" },
]},
  getManagedAssetBalance_output: { kind: "struct", fields: [
  { name: "balance", type: "i64" },
]},
  registerVault_input: { kind: "struct", fields: [
  { name: "vaultName", type: "id" },
  { name: "requiredApprovals", type: "u64" },
]},
  registerVault_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  registerVault_locals: { kind: "struct", fields: [
  { name: "logger", type: { bytes: 0 } },
  { name: "ownerCount", type: "u64" },
  { name: "i", type: "u64" },
  { name: "ii", type: "i64" },
  { name: "j", type: "u64" },
  { name: "k", type: "u64" },
  { name: "count", type: "u64" },
  { name: "found", type: "u64" },
  { name: "slotIndex", type: "i64" },
  { name: "newVault", type: { bytes: 0 } },
  { name: "tempVault", type: { bytes: 0 } },
  { name: "proposedOwner", type: "id" },
  { name: "newQubicVault", type: { bytes: 0 } },
  { name: "newAssetVault", type: { bytes: 0 } },
  { name: "rr_in", type: { bytes: 0 } },
  { name: "rr_out", type: { bytes: 0 } },
  { name: "rr_locals", type: { bytes: 0 } },
]},
  deposit_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  deposit_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  deposit_locals: { kind: "struct", fields: [
  { name: "logger", type: { bytes: 0 } },
  { name: "vault", type: { bytes: 0 } },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
  { name: "amountToDeposit", type: "u64" },
]},
  releaseTo_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
  { name: "amount", type: "u64" },
  { name: "destination", type: "id" },
]},
  releaseTo_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  releaseTo_locals: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
  { name: "logger", type: { bytes: 0 } },
  { name: "ownerIndex", type: "i64" },
  { name: "approvals", type: "u64" },
  { name: "totalOwners", type: "u64" },
  { name: "releaseApproved", type: "u8" },
  { name: "i", type: "u64" },
  { name: "io_in", type: { bytes: 0 } },
  { name: "io_out", type: { bytes: 0 } },
  { name: "io_locals", type: { bytes: 0 } },
  { name: "fi_in", type: { bytes: 0 } },
  { name: "fi_out", type: { bytes: 0 } },
  { name: "fi_locals", type: { bytes: 0 } },
  { name: "rr_in", type: { bytes: 0 } },
  { name: "rr_out", type: { bytes: 0 } },
  { name: "rr_locals", type: { bytes: 0 } },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
]},
  resetRelease_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  resetRelease_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  resetRelease_locals: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
  { name: "logger", type: { bytes: 0 } },
  { name: "ownerIndex", type: "i64" },
  { name: "io_in", type: { bytes: 0 } },
  { name: "io_out", type: { bytes: 0 } },
  { name: "io_locals", type: { bytes: 0 } },
  { name: "fi_in", type: { bytes: 0 } },
  { name: "fi_out", type: { bytes: 0 } },
  { name: "fi_locals", type: { bytes: 0 } },
  { name: "found", type: "u8" },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
]},
  voteFeeChange_input: { kind: "struct", fields: [
  { name: "newRegisteringFee", type: "u64" },
  { name: "newReleaseFee", type: "u64" },
  { name: "newReleaseResetFee", type: "u64" },
  { name: "newHoldingFee", type: "u64" },
  { name: "newDepositFee", type: "u64" },
  { name: "burnFee", type: "u64" },
]},
  voteFeeChange_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  voteFeeChange_locals: { kind: "struct", fields: [
  { name: "logger", type: { bytes: 0 } },
  { name: "i", type: "u64" },
  { name: "sumVote", type: "u64" },
  { name: "needNewRecord", type: "u8" },
  { name: "nShare", type: "u64" },
  { name: "fs", type: { bytes: 0 } },
  { name: "currentAddr", type: "id" },
  { name: "realScore", type: "u64" },
  { name: "currentVote", type: { bytes: 0 } },
  { name: "uniqueVote", type: { bytes: 0 } },
  { name: "found", type: "u8" },
  { name: "uniqueIndex", type: "u64" },
  { name: "j", type: "u64" },
  { name: "currentRank", type: "u64" },
  { name: "ish_in", type: { bytes: 0 } },
  { name: "ish_out", type: { bytes: 0 } },
  { name: "ish_locals", type: { bytes: 0 } },
]},
  getVaults_input: { kind: "struct", fields: [
  { name: "publicKey", type: "id" },
]},
  getVaults_output: { kind: "struct", fields: [
  { name: "numberOfVaults", type: "u64" },
]},
  getVaults_locals: { kind: "struct", fields: [
  { name: "count", type: "u64" },
  { name: "v", type: { bytes: 0 } },
]},
  getReleaseStatus_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  getReleaseStatus_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  getReleaseStatus_locals: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
  { name: "i", type: "u64" },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
]},
  getBalanceOf_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  getBalanceOf_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "balance", type: "i64" },
]},
  getBalanceOf_locals: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
]},
  getVaultName_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  getVaultName_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "vaultName", type: "id" },
]},
  getVaultName_locals: { kind: "struct", fields: [
  { name: "vault", type: { bytes: 0 } },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
]},
  getRevenueInfo_input: { kind: "struct", fields: [
]},
  getRevenueInfo_output: { kind: "struct", fields: [
  { name: "numberOfActiveVaults", type: "u64" },
  { name: "totalRevenue", type: "u64" },
  { name: "totalDistributedToShareholders", type: "u64" },
  { name: "burnedAmount", type: "u64" },
]},
  getFees_input: { kind: "struct", fields: [
]},
  getFees_output: { kind: "struct", fields: [
  { name: "registeringFee", type: "u64" },
  { name: "releaseFee", type: "u64" },
  { name: "releaseResetFee", type: "u64" },
  { name: "holdingFee", type: "u64" },
  { name: "depositFee", type: "u64" },
  { name: "burnFee", type: "u64" },
]},
  getVaultOwners_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  getVaultOwners_locals: { kind: "struct", fields: [
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
  { name: "v", type: { bytes: 0 } },
  { name: "i", type: "u64" },
]},
  getVaultOwners_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "numberOfOwners", type: "u64" },
  { name: "requiredApprovals", type: "u64" },
]},
  getFeeVotes_input: { kind: "struct", fields: [
]},
  getFeeVotes_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "numberOfFeeVotes", type: "u64" },
]},
  getFeeVotes_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
]},
  getFeeVotesOwner_input: { kind: "struct", fields: [
]},
  getFeeVotesOwner_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "numberOfFeeVotes", type: "u64" },
]},
  getFeeVotesOwner_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
]},
  getFeeVotesScore_input: { kind: "struct", fields: [
]},
  getFeeVotesScore_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "numberOfFeeVotes", type: "u64" },
]},
  getFeeVotesScore_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
]},
  getUniqueFeeVotes_input: { kind: "struct", fields: [
]},
  getUniqueFeeVotes_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "numberOfUniqueFeeVotes", type: "u64" },
]},
  getUniqueFeeVotes_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
]},
  getUniqueFeeVotesRanking_input: { kind: "struct", fields: [
]},
  getUniqueFeeVotesRanking_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "numberOfUniqueFeeVotes", type: "u64" },
]},
  getUniqueFeeVotesRanking_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
]},
  depositAsset_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
  { name: "asset", type: { bytes: 40 } },
  { name: "amount", type: "u64" },
]},
  depositAsset_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  depositAsset_locals: { kind: "struct", fields: [
  { name: "logger", type: { bytes: 0 } },
  { name: "qubicVault", type: { bytes: 0 } },
  { name: "assetVault", type: { bytes: 0 } },
  { name: "ab", type: { bytes: 0 } },
  { name: "assetIndex", type: "i64" },
  { name: "i", type: "u64" },
  { name: "userAssetBalance", type: "i64" },
  { name: "tempShares", type: "i64" },
  { name: "transferResult", type: "i64" },
  { name: "transferedShares", type: "i64" },
  { name: "transferredNumberOfShares", type: "i64" },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
]},
  revokeAssetManagementRights_input: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "numberOfShares", type: "i64" },
]},
  revokeAssetManagementRights_output: { kind: "struct", fields: [
  { name: "transferredNumberOfShares", type: "i64" },
  { name: "status", type: "u64" },
]},
  revokeAssetManagementRights_locals: { kind: "struct", fields: [
  { name: "logger", type: { bytes: 0 } },
  { name: "managedBalance", type: "i64" },
  { name: "result", type: "i64" },
]},
  releaseAssetTo_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
  { name: "asset", type: { bytes: 40 } },
  { name: "amount", type: "u64" },
  { name: "destination", type: "id" },
]},
  releaseAssetTo_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  releaseAssetTo_locals: { kind: "struct", fields: [
  { name: "qubicVault", type: { bytes: 0 } },
  { name: "assetVault", type: { bytes: 0 } },
  { name: "logger", type: { bytes: 0 } },
  { name: "ownerIndex", type: "i64" },
  { name: "approvals", type: "u64" },
  { name: "releaseApproved", type: "u8" },
  { name: "ab", type: { bytes: 0 } },
  { name: "i", type: "u64" },
  { name: "assetIndex", type: "i64" },
  { name: "io_in", type: { bytes: 0 } },
  { name: "io_out", type: { bytes: 0 } },
  { name: "io_locals", type: { bytes: 0 } },
  { name: "fi_in", type: { bytes: 0 } },
  { name: "fi_out", type: { bytes: 0 } },
  { name: "fi_locals", type: { bytes: 0 } },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
  { name: "remainingShares", type: "i64" },
  { name: "releaseResult", type: "i64" },
]},
  resetAssetRelease_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  resetAssetRelease_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  resetAssetRelease_locals: { kind: "struct", fields: [
  { name: "qubicVault", type: { bytes: 0 } },
  { name: "assetVault", type: { bytes: 0 } },
  { name: "ownerIndex", type: "i64" },
  { name: "logger", type: { bytes: 0 } },
  { name: "io_in", type: { bytes: 0 } },
  { name: "io_out", type: { bytes: 0 } },
  { name: "io_locals", type: { bytes: 0 } },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
  { name: "fi_in", type: { bytes: 0 } },
  { name: "fi_out", type: { bytes: 0 } },
  { name: "fi_locals", type: { bytes: 0 } },
  { name: "i", type: "u64" },
]},
  getAssetReleaseStatus_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  getAssetReleaseStatus_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  getAssetReleaseStatus_locals: { kind: "struct", fields: [
  { name: "qubicVault", type: { bytes: 0 } },
  { name: "assetVault", type: { bytes: 0 } },
  { name: "i", type: "u64" },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
]},
  getVaultAssetBalances_input: { kind: "struct", fields: [
  { name: "vaultId", type: "u64" },
]},
  getVaultAssetBalances_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
  { name: "numberOfAssetTypes", type: "u64" },
]},
  getVaultAssetBalances_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
  { name: "qubicVault", type: { bytes: 0 } },
  { name: "assetVault", type: { bytes: 0 } },
  { name: "iv_in", type: { bytes: 0 } },
  { name: "iv_out", type: { bytes: 0 } },
  { name: "iv_locals", type: { bytes: 0 } },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
  { name: "j", type: "u64" },
  { name: "k", type: "u64" },
  { name: "qubicVault", type: { bytes: 0 } },
  { name: "assetVault", type: { bytes: 0 } },
  { name: "amountToDistribute", type: "i64" },
  { name: "feeToBurn", type: "u64" },
  { name: "ab", type: { bytes: 0 } },
  { name: "qxAdress", type: "id" },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "MsVault",
  contractIndex: 11,
  functions: [
    { name: "getVaults", selector: 5, input: "getVaults_input", output: "getVaults_output", inputSchema: schemas["getVaults_input"], outputSchema: schemas["getVaults_output"] },
    { name: "getReleaseStatus", selector: 6, input: "getReleaseStatus_input", output: "getReleaseStatus_output", inputSchema: schemas["getReleaseStatus_input"], outputSchema: schemas["getReleaseStatus_output"] },
    { name: "getBalanceOf", selector: 7, input: "getBalanceOf_input", output: "getBalanceOf_output", inputSchema: schemas["getBalanceOf_input"], outputSchema: schemas["getBalanceOf_output"] },
    { name: "getVaultName", selector: 8, input: "getVaultName_input", output: "getVaultName_output", inputSchema: schemas["getVaultName_input"], outputSchema: schemas["getVaultName_output"] },
    { name: "getRevenueInfo", selector: 9, input: "getRevenueInfo_input", output: "getRevenueInfo_output", inputSchema: schemas["getRevenueInfo_input"], outputSchema: schemas["getRevenueInfo_output"] },
    { name: "getFees", selector: 10, input: "getFees_input", output: "getFees_output", inputSchema: schemas["getFees_input"], outputSchema: schemas["getFees_output"] },
    { name: "getVaultOwners", selector: 11, input: "getVaultOwners_input", output: "getVaultOwners_output", inputSchema: schemas["getVaultOwners_input"], outputSchema: schemas["getVaultOwners_output"] },
    { name: "isShareHolder", selector: 12, input: "isShareHolder_input", output: "isShareHolder_output", inputSchema: schemas["isShareHolder_input"], outputSchema: schemas["isShareHolder_output"] },
    { name: "getFeeVotes", selector: 14, input: "getFeeVotes_input", output: "getFeeVotes_output", inputSchema: schemas["getFeeVotes_input"], outputSchema: schemas["getFeeVotes_output"] },
    { name: "getFeeVotesOwner", selector: 15, input: "getFeeVotesOwner_input", output: "getFeeVotesOwner_output", inputSchema: schemas["getFeeVotesOwner_input"], outputSchema: schemas["getFeeVotesOwner_output"] },
    { name: "getFeeVotesScore", selector: 16, input: "getFeeVotesScore_input", output: "getFeeVotesScore_output", inputSchema: schemas["getFeeVotesScore_input"], outputSchema: schemas["getFeeVotesScore_output"] },
    { name: "getUniqueFeeVotes", selector: 17, input: "getUniqueFeeVotes_input", output: "getUniqueFeeVotes_output", inputSchema: schemas["getUniqueFeeVotes_input"], outputSchema: schemas["getUniqueFeeVotes_output"] },
    { name: "getUniqueFeeVotesRanking", selector: 18, input: "getUniqueFeeVotesRanking_input", output: "getUniqueFeeVotesRanking_output", inputSchema: schemas["getUniqueFeeVotesRanking_input"], outputSchema: schemas["getUniqueFeeVotesRanking_output"] },
    { name: "getVaultAssetBalances", selector: 22, input: "getVaultAssetBalances_input", output: "getVaultAssetBalances_output", inputSchema: schemas["getVaultAssetBalances_input"], outputSchema: schemas["getVaultAssetBalances_output"] },
    { name: "getAssetReleaseStatus", selector: 23, input: "getAssetReleaseStatus_input", output: "getAssetReleaseStatus_output", inputSchema: schemas["getAssetReleaseStatus_input"], outputSchema: schemas["getAssetReleaseStatus_output"] },
    { name: "getManagedAssetBalance", selector: 24, input: "getManagedAssetBalance_input", output: "getManagedAssetBalance_output", inputSchema: schemas["getManagedAssetBalance_input"], outputSchema: schemas["getManagedAssetBalance_output"] },
  ],
  procedures: [
    { name: "registerVault", selector: 1, input: "registerVault_input", output: "registerVault_output", inputSchema: schemas["registerVault_input"], outputSchema: schemas["registerVault_output"] },
    { name: "deposit", selector: 2, input: "deposit_input", output: "deposit_output", inputSchema: schemas["deposit_input"], outputSchema: schemas["deposit_output"] },
    { name: "releaseTo", selector: 3, input: "releaseTo_input", output: "releaseTo_output", inputSchema: schemas["releaseTo_input"], outputSchema: schemas["releaseTo_output"] },
    { name: "resetRelease", selector: 4, input: "resetRelease_input", output: "resetRelease_output", inputSchema: schemas["resetRelease_input"], outputSchema: schemas["resetRelease_output"] },
    { name: "voteFeeChange", selector: 13, input: "voteFeeChange_input", output: "voteFeeChange_output", inputSchema: schemas["voteFeeChange_input"], outputSchema: schemas["voteFeeChange_output"] },
    { name: "depositAsset", selector: 19, input: "depositAsset_input", output: "depositAsset_output", inputSchema: schemas["depositAsset_input"], outputSchema: schemas["depositAsset_output"] },
    { name: "releaseAssetTo", selector: 20, input: "releaseAssetTo_input", output: "releaseAssetTo_output", inputSchema: schemas["releaseAssetTo_input"], outputSchema: schemas["releaseAssetTo_output"] },
    { name: "resetAssetRelease", selector: 21, input: "resetAssetRelease_input", output: "resetAssetRelease_output", inputSchema: schemas["resetAssetRelease_input"], outputSchema: schemas["resetAssetRelease_output"] },
    { name: "revokeAssetManagementRights", selector: 25, input: "revokeAssetManagementRights_input", output: "revokeAssetManagementRights_output", inputSchema: schemas["revokeAssetManagementRights_input"], outputSchema: schemas["revokeAssetManagementRights_output"] },
  ],
};

export function encodeInput(name: string, value: any): Uint8Array {
  if (!schemas[name]) throw new Error("missing schema for " + name);
  return encode(schemas[name], value);
}

export function decodeOutput(name: string, buf: Uint8Array): any {
  if (!schemas[name]) throw new Error("missing schema for " + name);
  return decode(schemas[name], buf);
}

export const functions = {
  async getVaults(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getVaults_input): Promise<getVaults_output> {
    const payload = encodeInput("getVaults_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getVaults_output", raw) as getVaults_output;
  },
  async getReleaseStatus(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getReleaseStatus_input): Promise<getReleaseStatus_output> {
    const payload = encodeInput("getReleaseStatus_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getReleaseStatus_output", raw) as getReleaseStatus_output;
  },
  async getBalanceOf(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getBalanceOf_input): Promise<getBalanceOf_output> {
    const payload = encodeInput("getBalanceOf_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getBalanceOf_output", raw) as getBalanceOf_output;
  },
  async getVaultName(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getVaultName_input): Promise<getVaultName_output> {
    const payload = encodeInput("getVaultName_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getVaultName_output", raw) as getVaultName_output;
  },
  async getRevenueInfo(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getRevenueInfo_input): Promise<getRevenueInfo_output> {
    const payload = encodeInput("getRevenueInfo_input", input);
    const request = {
      contractIndex,
      inputType: 9,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getRevenueInfo_output", raw) as getRevenueInfo_output;
  },
  async getFees(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getFees_input): Promise<getFees_output> {
    const payload = encodeInput("getFees_input", input);
    const request = {
      contractIndex,
      inputType: 10,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getFees_output", raw) as getFees_output;
  },
  async getVaultOwners(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getVaultOwners_input): Promise<getVaultOwners_output> {
    const payload = encodeInput("getVaultOwners_input", input);
    const request = {
      contractIndex,
      inputType: 11,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getVaultOwners_output", raw) as getVaultOwners_output;
  },
  async isShareHolder(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: isShareHolder_input): Promise<isShareHolder_output> {
    const payload = encodeInput("isShareHolder_input", input);
    const request = {
      contractIndex,
      inputType: 12,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("isShareHolder_output", raw) as isShareHolder_output;
  },
  async getFeeVotes(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getFeeVotes_input): Promise<getFeeVotes_output> {
    const payload = encodeInput("getFeeVotes_input", input);
    const request = {
      contractIndex,
      inputType: 14,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getFeeVotes_output", raw) as getFeeVotes_output;
  },
  async getFeeVotesOwner(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getFeeVotesOwner_input): Promise<getFeeVotesOwner_output> {
    const payload = encodeInput("getFeeVotesOwner_input", input);
    const request = {
      contractIndex,
      inputType: 15,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getFeeVotesOwner_output", raw) as getFeeVotesOwner_output;
  },
  async getFeeVotesScore(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getFeeVotesScore_input): Promise<getFeeVotesScore_output> {
    const payload = encodeInput("getFeeVotesScore_input", input);
    const request = {
      contractIndex,
      inputType: 16,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getFeeVotesScore_output", raw) as getFeeVotesScore_output;
  },
  async getUniqueFeeVotes(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getUniqueFeeVotes_input): Promise<getUniqueFeeVotes_output> {
    const payload = encodeInput("getUniqueFeeVotes_input", input);
    const request = {
      contractIndex,
      inputType: 17,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getUniqueFeeVotes_output", raw) as getUniqueFeeVotes_output;
  },
  async getUniqueFeeVotesRanking(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getUniqueFeeVotesRanking_input): Promise<getUniqueFeeVotesRanking_output> {
    const payload = encodeInput("getUniqueFeeVotesRanking_input", input);
    const request = {
      contractIndex,
      inputType: 18,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getUniqueFeeVotesRanking_output", raw) as getUniqueFeeVotesRanking_output;
  },
  async getVaultAssetBalances(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getVaultAssetBalances_input): Promise<getVaultAssetBalances_output> {
    const payload = encodeInput("getVaultAssetBalances_input", input);
    const request = {
      contractIndex,
      inputType: 22,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getVaultAssetBalances_output", raw) as getVaultAssetBalances_output;
  },
  async getAssetReleaseStatus(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getAssetReleaseStatus_input): Promise<getAssetReleaseStatus_output> {
    const payload = encodeInput("getAssetReleaseStatus_input", input);
    const request = {
      contractIndex,
      inputType: 23,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getAssetReleaseStatus_output", raw) as getAssetReleaseStatus_output;
  },
  async getManagedAssetBalance(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getManagedAssetBalance_input): Promise<getManagedAssetBalance_output> {
    const payload = encodeInput("getManagedAssetBalance_input", input);
    const request = {
      contractIndex,
      inputType: 24,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getManagedAssetBalance_output", raw) as getManagedAssetBalance_output;
  },
};

export const procedures = {
  registerVault(input: registerVault_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("registerVault_input", input);
    return { inputType: 1, payload };
  },
  deposit(input: deposit_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("deposit_input", input);
    return { inputType: 2, payload };
  },
  releaseTo(input: releaseTo_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("releaseTo_input", input);
    return { inputType: 3, payload };
  },
  resetRelease(input: resetRelease_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("resetRelease_input", input);
    return { inputType: 4, payload };
  },
  voteFeeChange(input: voteFeeChange_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("voteFeeChange_input", input);
    return { inputType: 13, payload };
  },
  depositAsset(input: depositAsset_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("depositAsset_input", input);
    return { inputType: 19, payload };
  },
  releaseAssetTo(input: releaseAssetTo_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("releaseAssetTo_input", input);
    return { inputType: 20, payload };
  },
  resetAssetRelease(input: resetAssetRelease_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("resetAssetRelease_input", input);
    return { inputType: 21, payload };
  },
  revokeAssetManagementRights(input: revokeAssetManagementRights_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("revokeAssetManagementRights_input", input);
    return { inputType: 25, payload };
  },
};

export function createClient(
  client: { querySmartContract: (req: any) => Promise<any> },
  options: { contractIndex?: number } = {},
) {
  const contractIndex = options.contractIndex ?? contract.contractIndex;
  if (contractIndex === undefined) throw new Error("contractIndex is required");
  return {
    contractIndex,
    functions: {
      getVaults: async (input: getVaults_input): Promise<getVaults_output> => functions.getVaults(client, contractIndex, input),
      getReleaseStatus: async (input: getReleaseStatus_input): Promise<getReleaseStatus_output> => functions.getReleaseStatus(client, contractIndex, input),
      getBalanceOf: async (input: getBalanceOf_input): Promise<getBalanceOf_output> => functions.getBalanceOf(client, contractIndex, input),
      getVaultName: async (input: getVaultName_input): Promise<getVaultName_output> => functions.getVaultName(client, contractIndex, input),
      getRevenueInfo: async (input: getRevenueInfo_input): Promise<getRevenueInfo_output> => functions.getRevenueInfo(client, contractIndex, input),
      getFees: async (input: getFees_input): Promise<getFees_output> => functions.getFees(client, contractIndex, input),
      getVaultOwners: async (input: getVaultOwners_input): Promise<getVaultOwners_output> => functions.getVaultOwners(client, contractIndex, input),
      isShareHolder: async (input: isShareHolder_input): Promise<isShareHolder_output> => functions.isShareHolder(client, contractIndex, input),
      getFeeVotes: async (input: getFeeVotes_input): Promise<getFeeVotes_output> => functions.getFeeVotes(client, contractIndex, input),
      getFeeVotesOwner: async (input: getFeeVotesOwner_input): Promise<getFeeVotesOwner_output> => functions.getFeeVotesOwner(client, contractIndex, input),
      getFeeVotesScore: async (input: getFeeVotesScore_input): Promise<getFeeVotesScore_output> => functions.getFeeVotesScore(client, contractIndex, input),
      getUniqueFeeVotes: async (input: getUniqueFeeVotes_input): Promise<getUniqueFeeVotes_output> => functions.getUniqueFeeVotes(client, contractIndex, input),
      getUniqueFeeVotesRanking: async (input: getUniqueFeeVotesRanking_input): Promise<getUniqueFeeVotesRanking_output> => functions.getUniqueFeeVotesRanking(client, contractIndex, input),
      getVaultAssetBalances: async (input: getVaultAssetBalances_input): Promise<getVaultAssetBalances_output> => functions.getVaultAssetBalances(client, contractIndex, input),
      getAssetReleaseStatus: async (input: getAssetReleaseStatus_input): Promise<getAssetReleaseStatus_output> => functions.getAssetReleaseStatus(client, contractIndex, input),
      getManagedAssetBalance: async (input: getManagedAssetBalance_input): Promise<getManagedAssetBalance_output> => functions.getManagedAssetBalance(client, contractIndex, input),
    },
    procedures: {
      registerVault: (input: registerVault_input) => procedures.registerVault(input),
      deposit: (input: deposit_input) => procedures.deposit(input),
      releaseTo: (input: releaseTo_input) => procedures.releaseTo(input),
      resetRelease: (input: resetRelease_input) => procedures.resetRelease(input),
      voteFeeChange: (input: voteFeeChange_input) => procedures.voteFeeChange(input),
      depositAsset: (input: depositAsset_input) => procedures.depositAsset(input),
      releaseAssetTo: (input: releaseAssetTo_input) => procedures.releaseAssetTo(input),
      resetAssetRelease: (input: resetAssetRelease_input) => procedures.resetAssetRelease(input),
      revokeAssetManagementRights: (input: revokeAssetManagementRights_input) => procedures.revokeAssetManagementRights(input),
    },
  };
}
