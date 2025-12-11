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

export type QSWAP2 = Record<string, never>;


export interface QSWAPAddLiquidityMessage {
  _contractIndex: number;
  _type: number;
  assetIssuer: Uint8Array;
  assetName: bigint;
  userIncreaseLiquidity: bigint;
  quAmount: bigint;
  assetAmount: bigint;
  _terminator: number;
}

export interface QSWAPRemoveLiquidityMessage {
  _contractIndex: number;
  _type: number;
  quAmount: bigint;
  assetAmount: bigint;
  _terminator: number;
}

export interface QSWAPSwapMessage {
  _contractIndex: number;
  _type: number;
  assetIssuer: Uint8Array;
  assetName: bigint;
  assetAmountIn: bigint;
  assetAmountOut: bigint;
  _terminator: number;
}

export interface QSWAPFailedDistributionMessage {
  _contractIndex: number;
  _type: number;
  dst: Uint8Array;
  amount: bigint;
  _terminator: number;
}

export type Fees_input = Record<string, never>;


export interface Fees_output {
  assetIssuanceFee: number;
  poolCreationFee: number;
  transferFee: number;
  swapFee: number;
  shareholderFee: number;
  investRewardsFee: number;
  qxFee: number;
  burnFee: number;
}

export type InvestRewardsInfo_input = Record<string, never>;


export interface InvestRewardsInfo_output {
  investRewardsFee: number;
  investRewardsId: Uint8Array;
}

export interface SetInvestRewardsInfo_input {
  newInvestRewardsId: Uint8Array;
}

export interface SetInvestRewardsInfo_output {
  success: any;
}

export interface GetPoolBasicState_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
}

export interface GetPoolBasicState_output {
  poolExists: bigint;
  reservedQuAmount: bigint;
  reservedAssetAmount: bigint;
  totalLiquidity: bigint;
}

export interface GetLiquidityOf_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  account: Uint8Array;
}

export interface GetLiquidityOf_output {
  liquidity: bigint;
}

export interface QuoteExactQuInput_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  quAmountIn: bigint;
}

export interface QuoteExactQuInput_output {
  assetAmountOut: bigint;
}

export interface QuoteExactQuOutput_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  quAmountOut: bigint;
}

export interface QuoteExactQuOutput_output {
  assetAmountIn: bigint;
}

export interface QuoteExactAssetInput_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  assetAmountIn: bigint;
}

export interface QuoteExactAssetInput_output {
  quAmountOut: bigint;
}

export interface QuoteExactAssetOutput_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  assetAmountOut: bigint;
}

export interface QuoteExactAssetOutput_output {
  quAmountIn: bigint;
}

export interface IssueAsset_input {
  assetName: bigint;
  numberOfShares: bigint;
  unitOfMeasurement: bigint;
  numberOfDecimalPlaces: number;
}

export interface IssueAsset_output {
  issuedNumberOfShares: bigint;
}

export interface CreatePool_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
}

export interface CreatePool_output {
  success: any;
}

export interface TransferShareOwnershipAndPossession_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  newOwnerAndPossessor: Uint8Array;
  amount: bigint;
}

export interface TransferShareOwnershipAndPossession_output {
  transferredAmount: bigint;
}

export interface AddLiquidity_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  assetAmountDesired: bigint;
  quAmountMin: bigint;
  assetAmountMin: bigint;
}

export interface AddLiquidity_output {
  userIncreaseLiquidity: bigint;
  quAmount: bigint;
  assetAmount: bigint;
}

export interface RemoveLiquidity_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  burnLiquidity: bigint;
  quAmountMin: bigint;
  assetAmountMin: bigint;
}

export interface RemoveLiquidity_output {
  quAmount: bigint;
  assetAmount: bigint;
}

export interface SwapExactQuForAsset_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  assetAmountOutMin: bigint;
}

export interface SwapExactQuForAsset_output {
  assetAmountOut: bigint;
}

export interface SwapQuForExactAsset_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  assetAmountOut: bigint;
}

export interface SwapQuForExactAsset_output {
  quAmountIn: bigint;
}

export interface SwapExactAssetForQu_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  assetAmountIn: bigint;
  quAmountOutMin: bigint;
}

export interface SwapExactAssetForQu_output {
  quAmountOut: bigint;
}

export interface SwapAssetForExactQu_input {
  assetIssuer: Uint8Array;
  assetName: bigint;
  assetAmountInMax: bigint;
  quAmountOut: bigint;
}

export interface SwapAssetForExactQu_output {
  assetAmountIn: bigint;
}

export interface TransferShareManagementRights_input {
  asset: any;
  numberOfShares: bigint;
  newManagingContractIndex: number;
}

export interface TransferShareManagementRights_output {
  transferredNumberOfShares: bigint;
}

export interface PoolBasicState {
  poolID: Uint8Array;
  reservedQuAmount: bigint;
  reservedAssetAmount: bigint;
  totalLiquidity: bigint;
}

export interface LiquidityInfo {
  entity: Uint8Array;
  liquidity: bigint;
}

export type Fees_locals = Record<string, never>;


export interface GetPoolBasicState_locals {
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  i0: number;
}

export interface GetLiquidityOf_locals {
  poolID: Uint8Array;
  liqElementIndex: bigint;
}

export interface QuoteExactQuInput_locals {
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  i0: number;
}

export interface QuoteExactQuOutput_locals {
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  i0: number;
}

export interface QuoteExactAssetInput_locals {
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  quAmountOutWithFee: bigint;
  i0: number;
}

export interface QuoteExactAssetOutput_locals {
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  i0: number;
}

export type IssueAsset_locals = Record<string, never>;


export interface CreatePool_locals {
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  poolCreationFee: number;
}

export interface AddLiquidity_locals {
  addLiquidityMessage: any;
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  tmpLiquidity: any;
  userLiquidityElementIndex: bigint;
  quAmountDesired: bigint;
  quTransferAmount: bigint;
  assetTransferAmount: bigint;
  quOptimalAmount: bigint;
  assetOptimalAmount: bigint;
  increaseLiquidity: bigint;
  reservedAssetAmountBefore: bigint;
  reservedAssetAmountAfter: bigint;
  tmpIncLiq0: any;
  tmpIncLiq1: any;
  i0: number;
}

export interface RemoveLiquidity_locals {
  removeLiquidityMessage: any;
  poolID: Uint8Array;
  poolBasicState: any;
  userLiquidityElementIndex: bigint;
  poolSlot: bigint;
  userLiquidity: any;
  burnQuAmount: bigint;
  burnAssetAmount: bigint;
  i0: number;
}

export interface SwapExactQuForAsset_locals {
  swapMessage: any;
  poolID: Uint8Array;
  poolSlot: bigint;
  quAmountIn: bigint;
  poolBasicState: any;
  assetAmountOut: bigint;
  i0: number;
  swapFee: any;
  feeToInvestRewards: any;
  feeToShareholders: any;
  feeToQx: any;
  feeToBurn: any;
}

export interface SwapQuForExactAsset_locals {
  swapMessage: any;
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  quAmountIn: bigint;
  transferredAssetAmount: bigint;
  i0: number;
  swapFee: any;
  feeToInvestRewards: any;
  feeToShareholders: any;
  feeToQx: any;
  feeToBurn: any;
}

export interface SwapExactAssetForQu_locals {
  swapMessage: any;
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  quAmountOut: bigint;
  quAmountOutWithFee: bigint;
  transferredAssetAmountBefore: bigint;
  transferredAssetAmountAfter: bigint;
  i0: number;
  swapFee: any;
  feeToInvestRewards: any;
  feeToShareholders: any;
  feeToQx: any;
  feeToBurn: any;
}

export interface SwapAssetForExactQu_locals {
  swapMessage: any;
  poolID: Uint8Array;
  poolSlot: bigint;
  poolBasicState: any;
  assetAmountIn: bigint;
  transferredAssetAmountBefore: bigint;
  transferredAssetAmountAfter: bigint;
  i0: number;
  swapFee: any;
  feeToInvestRewards: any;
  feeToShareholders: any;
  feeToQx: any;
  feeToBurn: any;
}

export type TransferShareOwnershipAndPossession_locals = Record<string, never>;


export interface END_TICK_locals {
  toDistribute: bigint;
  toBurn: bigint;
  dividendPerComputor: bigint;
  transferredAmount: bigint;
  logMsg: any;
}

const schemas: Record<string, Schema> = {
  QSWAP2: { kind: "struct", fields: [
]},
  QSWAPAddLiquidityMessage: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "userIncreaseLiquidity", type: "i64" },
  { name: "quAmount", type: "i64" },
  { name: "assetAmount", type: "i64" },
  { name: "_terminator", type: "i8" },
]},
  QSWAPRemoveLiquidityMessage: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "quAmount", type: "i64" },
  { name: "assetAmount", type: "i64" },
  { name: "_terminator", type: "i8" },
]},
  QSWAPSwapMessage: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "assetAmountIn", type: "i64" },
  { name: "assetAmountOut", type: "i64" },
  { name: "_terminator", type: "i8" },
]},
  QSWAPFailedDistributionMessage: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "dst", type: "id" },
  { name: "amount", type: "u64" },
  { name: "_terminator", type: "i8" },
]},
  Fees_input: { kind: "struct", fields: [
]},
  Fees_output: { kind: "struct", fields: [
  { name: "assetIssuanceFee", type: "u32" },
  { name: "poolCreationFee", type: "u32" },
  { name: "transferFee", type: "u32" },
  { name: "swapFee", type: "u32" },
  { name: "shareholderFee", type: "u32" },
  { name: "investRewardsFee", type: "u32" },
  { name: "qxFee", type: "u32" },
  { name: "burnFee", type: "u32" },
]},
  InvestRewardsInfo_input: { kind: "struct", fields: [
]},
  InvestRewardsInfo_output: { kind: "struct", fields: [
  { name: "investRewardsFee", type: "u32" },
  { name: "investRewardsId", type: "id" },
]},
  SetInvestRewardsInfo_input: { kind: "struct", fields: [
  { name: "newInvestRewardsId", type: "id" },
]},
  SetInvestRewardsInfo_output: { kind: "struct", fields: [
  { name: "success", type: { bytes: 0 } },
]},
  GetPoolBasicState_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
]},
  GetPoolBasicState_output: { kind: "struct", fields: [
  { name: "poolExists", type: "i64" },
  { name: "reservedQuAmount", type: "i64" },
  { name: "reservedAssetAmount", type: "i64" },
  { name: "totalLiquidity", type: "i64" },
]},
  GetLiquidityOf_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "account", type: "id" },
]},
  GetLiquidityOf_output: { kind: "struct", fields: [
  { name: "liquidity", type: "i64" },
]},
  QuoteExactQuInput_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "quAmountIn", type: "i64" },
]},
  QuoteExactQuInput_output: { kind: "struct", fields: [
  { name: "assetAmountOut", type: "i64" },
]},
  QuoteExactQuOutput_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "quAmountOut", type: "i64" },
]},
  QuoteExactQuOutput_output: { kind: "struct", fields: [
  { name: "assetAmountIn", type: "i64" },
]},
  QuoteExactAssetInput_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "assetAmountIn", type: "i64" },
]},
  QuoteExactAssetInput_output: { kind: "struct", fields: [
  { name: "quAmountOut", type: "i64" },
]},
  QuoteExactAssetOutput_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "assetAmountOut", type: "i64" },
]},
  QuoteExactAssetOutput_output: { kind: "struct", fields: [
  { name: "quAmountIn", type: "i64" },
]},
  IssueAsset_input: { kind: "struct", fields: [
  { name: "assetName", type: "u64" },
  { name: "numberOfShares", type: "i64" },
  { name: "unitOfMeasurement", type: "u64" },
  { name: "numberOfDecimalPlaces", type: "i8" },
]},
  IssueAsset_output: { kind: "struct", fields: [
  { name: "issuedNumberOfShares", type: "i64" },
]},
  CreatePool_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
]},
  CreatePool_output: { kind: "struct", fields: [
  { name: "success", type: { bytes: 0 } },
]},
  TransferShareOwnershipAndPossession_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "newOwnerAndPossessor", type: "id" },
  { name: "amount", type: "i64" },
]},
  TransferShareOwnershipAndPossession_output: { kind: "struct", fields: [
  { name: "transferredAmount", type: "i64" },
]},
  AddLiquidity_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "assetAmountDesired", type: "i64" },
  { name: "quAmountMin", type: "i64" },
  { name: "assetAmountMin", type: "i64" },
]},
  AddLiquidity_output: { kind: "struct", fields: [
  { name: "userIncreaseLiquidity", type: "i64" },
  { name: "quAmount", type: "i64" },
  { name: "assetAmount", type: "i64" },
]},
  RemoveLiquidity_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "burnLiquidity", type: "i64" },
  { name: "quAmountMin", type: "i64" },
  { name: "assetAmountMin", type: "i64" },
]},
  RemoveLiquidity_output: { kind: "struct", fields: [
  { name: "quAmount", type: "i64" },
  { name: "assetAmount", type: "i64" },
]},
  SwapExactQuForAsset_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "assetAmountOutMin", type: "i64" },
]},
  SwapExactQuForAsset_output: { kind: "struct", fields: [
  { name: "assetAmountOut", type: "i64" },
]},
  SwapQuForExactAsset_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "assetAmountOut", type: "i64" },
]},
  SwapQuForExactAsset_output: { kind: "struct", fields: [
  { name: "quAmountIn", type: "i64" },
]},
  SwapExactAssetForQu_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "assetAmountIn", type: "i64" },
  { name: "quAmountOutMin", type: "i64" },
]},
  SwapExactAssetForQu_output: { kind: "struct", fields: [
  { name: "quAmountOut", type: "i64" },
]},
  SwapAssetForExactQu_input: { kind: "struct", fields: [
  { name: "assetIssuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "assetAmountInMax", type: "i64" },
  { name: "quAmountOut", type: "i64" },
]},
  SwapAssetForExactQu_output: { kind: "struct", fields: [
  { name: "assetAmountIn", type: "i64" },
]},
  TransferShareManagementRights_input: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "numberOfShares", type: "i64" },
  { name: "newManagingContractIndex", type: "u32" },
]},
  TransferShareManagementRights_output: { kind: "struct", fields: [
  { name: "transferredNumberOfShares", type: "i64" },
]},
  PoolBasicState: { kind: "struct", fields: [
  { name: "poolID", type: "id" },
  { name: "reservedQuAmount", type: "i64" },
  { name: "reservedAssetAmount", type: "i64" },
  { name: "totalLiquidity", type: "i64" },
]},
  LiquidityInfo: { kind: "struct", fields: [
  { name: "entity", type: "id" },
  { name: "liquidity", type: "i64" },
]},
  Fees_locals: { kind: "struct", fields: [
]},
  GetPoolBasicState_locals: { kind: "struct", fields: [
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "i0", type: "u32" },
]},
  GetLiquidityOf_locals: { kind: "struct", fields: [
  { name: "poolID", type: "id" },
  { name: "liqElementIndex", type: "i64" },
]},
  QuoteExactQuInput_locals: { kind: "struct", fields: [
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "i0", type: "u32" },
]},
  QuoteExactQuOutput_locals: { kind: "struct", fields: [
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "i0", type: "u32" },
]},
  QuoteExactAssetInput_locals: { kind: "struct", fields: [
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "quAmountOutWithFee", type: "i64" },
  { name: "i0", type: "u32" },
]},
  QuoteExactAssetOutput_locals: { kind: "struct", fields: [
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "i0", type: "u32" },
]},
  IssueAsset_locals: { kind: "struct", fields: [
]},
  CreatePool_locals: { kind: "struct", fields: [
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "poolCreationFee", type: "u32" },
]},
  AddLiquidity_locals: { kind: "struct", fields: [
  { name: "addLiquidityMessage", type: { bytes: 0 } },
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "tmpLiquidity", type: { bytes: 0 } },
  { name: "userLiquidityElementIndex", type: "i64" },
  { name: "quAmountDesired", type: "i64" },
  { name: "quTransferAmount", type: "i64" },
  { name: "assetTransferAmount", type: "i64" },
  { name: "quOptimalAmount", type: "i64" },
  { name: "assetOptimalAmount", type: "i64" },
  { name: "increaseLiquidity", type: "i64" },
  { name: "reservedAssetAmountBefore", type: "i64" },
  { name: "reservedAssetAmountAfter", type: "i64" },
  { name: "tmpIncLiq0", type: { bytes: 0 } },
  { name: "tmpIncLiq1", type: { bytes: 0 } },
  { name: "i0", type: "u32" },
]},
  RemoveLiquidity_locals: { kind: "struct", fields: [
  { name: "removeLiquidityMessage", type: { bytes: 0 } },
  { name: "poolID", type: "id" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "userLiquidityElementIndex", type: "i64" },
  { name: "poolSlot", type: "i64" },
  { name: "userLiquidity", type: { bytes: 0 } },
  { name: "burnQuAmount", type: "i64" },
  { name: "burnAssetAmount", type: "i64" },
  { name: "i0", type: "u32" },
]},
  SwapExactQuForAsset_locals: { kind: "struct", fields: [
  { name: "swapMessage", type: { bytes: 0 } },
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "quAmountIn", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "assetAmountOut", type: "i64" },
  { name: "i0", type: "u32" },
  { name: "swapFee", type: { bytes: 0 } },
  { name: "feeToInvestRewards", type: { bytes: 0 } },
  { name: "feeToShareholders", type: { bytes: 0 } },
  { name: "feeToQx", type: { bytes: 0 } },
  { name: "feeToBurn", type: { bytes: 0 } },
]},
  SwapQuForExactAsset_locals: { kind: "struct", fields: [
  { name: "swapMessage", type: { bytes: 0 } },
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "quAmountIn", type: "i64" },
  { name: "transferredAssetAmount", type: "i64" },
  { name: "i0", type: "u32" },
  { name: "swapFee", type: { bytes: 0 } },
  { name: "feeToInvestRewards", type: { bytes: 0 } },
  { name: "feeToShareholders", type: { bytes: 0 } },
  { name: "feeToQx", type: { bytes: 0 } },
  { name: "feeToBurn", type: { bytes: 0 } },
]},
  SwapExactAssetForQu_locals: { kind: "struct", fields: [
  { name: "swapMessage", type: { bytes: 0 } },
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "quAmountOut", type: "i64" },
  { name: "quAmountOutWithFee", type: "i64" },
  { name: "transferredAssetAmountBefore", type: "i64" },
  { name: "transferredAssetAmountAfter", type: "i64" },
  { name: "i0", type: "u32" },
  { name: "swapFee", type: { bytes: 0 } },
  { name: "feeToInvestRewards", type: { bytes: 0 } },
  { name: "feeToShareholders", type: { bytes: 0 } },
  { name: "feeToQx", type: { bytes: 0 } },
  { name: "feeToBurn", type: { bytes: 0 } },
]},
  SwapAssetForExactQu_locals: { kind: "struct", fields: [
  { name: "swapMessage", type: { bytes: 0 } },
  { name: "poolID", type: "id" },
  { name: "poolSlot", type: "i64" },
  { name: "poolBasicState", type: { bytes: 0 } },
  { name: "assetAmountIn", type: "i64" },
  { name: "transferredAssetAmountBefore", type: "i64" },
  { name: "transferredAssetAmountAfter", type: "i64" },
  { name: "i0", type: "u32" },
  { name: "swapFee", type: { bytes: 0 } },
  { name: "feeToInvestRewards", type: { bytes: 0 } },
  { name: "feeToShareholders", type: { bytes: 0 } },
  { name: "feeToQx", type: { bytes: 0 } },
  { name: "feeToBurn", type: { bytes: 0 } },
]},
  TransferShareOwnershipAndPossession_locals: { kind: "struct", fields: [
]},
  END_TICK_locals: { kind: "struct", fields: [
  { name: "toDistribute", type: "u64" },
  { name: "toBurn", type: "u64" },
  { name: "dividendPerComputor", type: "u64" },
  { name: "transferredAmount", type: "i64" },
  { name: "logMsg", type: { bytes: 0 } },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "Qswap",
  contractIndex: 13,
  functions: [
    { name: "Fees", selector: 1, input: "Fees_input", output: "Fees_output", inputSchema: schemas["Fees_input"], outputSchema: schemas["Fees_output"] },
    { name: "GetPoolBasicState", selector: 2, input: "GetPoolBasicState_input", output: "GetPoolBasicState_output", inputSchema: schemas["GetPoolBasicState_input"], outputSchema: schemas["GetPoolBasicState_output"] },
    { name: "GetLiquidityOf", selector: 3, input: "GetLiquidityOf_input", output: "GetLiquidityOf_output", inputSchema: schemas["GetLiquidityOf_input"], outputSchema: schemas["GetLiquidityOf_output"] },
    { name: "QuoteExactQuInput", selector: 4, input: "QuoteExactQuInput_input", output: "QuoteExactQuInput_output", inputSchema: schemas["QuoteExactQuInput_input"], outputSchema: schemas["QuoteExactQuInput_output"] },
    { name: "QuoteExactQuOutput", selector: 5, input: "QuoteExactQuOutput_input", output: "QuoteExactQuOutput_output", inputSchema: schemas["QuoteExactQuOutput_input"], outputSchema: schemas["QuoteExactQuOutput_output"] },
    { name: "QuoteExactAssetInput", selector: 6, input: "QuoteExactAssetInput_input", output: "QuoteExactAssetInput_output", inputSchema: schemas["QuoteExactAssetInput_input"], outputSchema: schemas["QuoteExactAssetInput_output"] },
    { name: "QuoteExactAssetOutput", selector: 7, input: "QuoteExactAssetOutput_input", output: "QuoteExactAssetOutput_output", inputSchema: schemas["QuoteExactAssetOutput_input"], outputSchema: schemas["QuoteExactAssetOutput_output"] },
    { name: "InvestRewardsInfo", selector: 8, input: "InvestRewardsInfo_input", output: "InvestRewardsInfo_output", inputSchema: schemas["InvestRewardsInfo_input"], outputSchema: schemas["InvestRewardsInfo_output"] },
  ],
  procedures: [
    { name: "IssueAsset", selector: 1, input: "IssueAsset_input", output: "IssueAsset_output", inputSchema: schemas["IssueAsset_input"], outputSchema: schemas["IssueAsset_output"] },
    { name: "TransferShareOwnershipAndPossession", selector: 2, input: "TransferShareOwnershipAndPossession_input", output: "TransferShareOwnershipAndPossession_output", inputSchema: schemas["TransferShareOwnershipAndPossession_input"], outputSchema: schemas["TransferShareOwnershipAndPossession_output"] },
    { name: "CreatePool", selector: 3, input: "CreatePool_input", output: "CreatePool_output", inputSchema: schemas["CreatePool_input"], outputSchema: schemas["CreatePool_output"] },
    { name: "AddLiquidity", selector: 4, input: "AddLiquidity_input", output: "AddLiquidity_output", inputSchema: schemas["AddLiquidity_input"], outputSchema: schemas["AddLiquidity_output"] },
    { name: "RemoveLiquidity", selector: 5, input: "RemoveLiquidity_input", output: "RemoveLiquidity_output", inputSchema: schemas["RemoveLiquidity_input"], outputSchema: schemas["RemoveLiquidity_output"] },
    { name: "SwapExactQuForAsset", selector: 6, input: "SwapExactQuForAsset_input", output: "SwapExactQuForAsset_output", inputSchema: schemas["SwapExactQuForAsset_input"], outputSchema: schemas["SwapExactQuForAsset_output"] },
    { name: "SwapQuForExactAsset", selector: 7, input: "SwapQuForExactAsset_input", output: "SwapQuForExactAsset_output", inputSchema: schemas["SwapQuForExactAsset_input"], outputSchema: schemas["SwapQuForExactAsset_output"] },
    { name: "SwapExactAssetForQu", selector: 8, input: "SwapExactAssetForQu_input", output: "SwapExactAssetForQu_output", inputSchema: schemas["SwapExactAssetForQu_input"], outputSchema: schemas["SwapExactAssetForQu_output"] },
    { name: "SwapAssetForExactQu", selector: 9, input: "SwapAssetForExactQu_input", output: "SwapAssetForExactQu_output", inputSchema: schemas["SwapAssetForExactQu_input"], outputSchema: schemas["SwapAssetForExactQu_output"] },
    { name: "SetInvestRewardsInfo", selector: 10, input: "SetInvestRewardsInfo_input", output: "SetInvestRewardsInfo_output", inputSchema: schemas["SetInvestRewardsInfo_input"], outputSchema: schemas["SetInvestRewardsInfo_output"] },
    { name: "TransferShareManagementRights", selector: 11, input: "TransferShareManagementRights_input", output: "TransferShareManagementRights_output", inputSchema: schemas["TransferShareManagementRights_input"], outputSchema: schemas["TransferShareManagementRights_output"] },
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
  async Fees(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: Fees_input): Promise<Fees_output> {
    const payload = encodeInput("Fees_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("Fees_output", raw) as Fees_output;
  },
  async GetPoolBasicState(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetPoolBasicState_input): Promise<GetPoolBasicState_output> {
    const payload = encodeInput("GetPoolBasicState_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetPoolBasicState_output", raw) as GetPoolBasicState_output;
  },
  async GetLiquidityOf(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetLiquidityOf_input): Promise<GetLiquidityOf_output> {
    const payload = encodeInput("GetLiquidityOf_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetLiquidityOf_output", raw) as GetLiquidityOf_output;
  },
  async QuoteExactQuInput(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: QuoteExactQuInput_input): Promise<QuoteExactQuInput_output> {
    const payload = encodeInput("QuoteExactQuInput_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("QuoteExactQuInput_output", raw) as QuoteExactQuInput_output;
  },
  async QuoteExactQuOutput(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: QuoteExactQuOutput_input): Promise<QuoteExactQuOutput_output> {
    const payload = encodeInput("QuoteExactQuOutput_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("QuoteExactQuOutput_output", raw) as QuoteExactQuOutput_output;
  },
  async QuoteExactAssetInput(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: QuoteExactAssetInput_input): Promise<QuoteExactAssetInput_output> {
    const payload = encodeInput("QuoteExactAssetInput_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("QuoteExactAssetInput_output", raw) as QuoteExactAssetInput_output;
  },
  async QuoteExactAssetOutput(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: QuoteExactAssetOutput_input): Promise<QuoteExactAssetOutput_output> {
    const payload = encodeInput("QuoteExactAssetOutput_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("QuoteExactAssetOutput_output", raw) as QuoteExactAssetOutput_output;
  },
  async InvestRewardsInfo(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: InvestRewardsInfo_input): Promise<InvestRewardsInfo_output> {
    const payload = encodeInput("InvestRewardsInfo_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("InvestRewardsInfo_output", raw) as InvestRewardsInfo_output;
  },
};

export const procedures = {
  IssueAsset(input: IssueAsset_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("IssueAsset_input", input);
    return { inputType: 1, payload };
  },
  TransferShareOwnershipAndPossession(input: TransferShareOwnershipAndPossession_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferShareOwnershipAndPossession_input", input);
    return { inputType: 2, payload };
  },
  CreatePool(input: CreatePool_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("CreatePool_input", input);
    return { inputType: 3, payload };
  },
  AddLiquidity(input: AddLiquidity_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("AddLiquidity_input", input);
    return { inputType: 4, payload };
  },
  RemoveLiquidity(input: RemoveLiquidity_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("RemoveLiquidity_input", input);
    return { inputType: 5, payload };
  },
  SwapExactQuForAsset(input: SwapExactQuForAsset_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SwapExactQuForAsset_input", input);
    return { inputType: 6, payload };
  },
  SwapQuForExactAsset(input: SwapQuForExactAsset_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SwapQuForExactAsset_input", input);
    return { inputType: 7, payload };
  },
  SwapExactAssetForQu(input: SwapExactAssetForQu_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SwapExactAssetForQu_input", input);
    return { inputType: 8, payload };
  },
  SwapAssetForExactQu(input: SwapAssetForExactQu_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SwapAssetForExactQu_input", input);
    return { inputType: 9, payload };
  },
  SetInvestRewardsInfo(input: SetInvestRewardsInfo_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SetInvestRewardsInfo_input", input);
    return { inputType: 10, payload };
  },
  TransferShareManagementRights(input: TransferShareManagementRights_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferShareManagementRights_input", input);
    return { inputType: 11, payload };
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
      Fees: async (input: Fees_input): Promise<Fees_output> => functions.Fees(client, contractIndex, input),
      GetPoolBasicState: async (input: GetPoolBasicState_input): Promise<GetPoolBasicState_output> => functions.GetPoolBasicState(client, contractIndex, input),
      GetLiquidityOf: async (input: GetLiquidityOf_input): Promise<GetLiquidityOf_output> => functions.GetLiquidityOf(client, contractIndex, input),
      QuoteExactQuInput: async (input: QuoteExactQuInput_input): Promise<QuoteExactQuInput_output> => functions.QuoteExactQuInput(client, contractIndex, input),
      QuoteExactQuOutput: async (input: QuoteExactQuOutput_input): Promise<QuoteExactQuOutput_output> => functions.QuoteExactQuOutput(client, contractIndex, input),
      QuoteExactAssetInput: async (input: QuoteExactAssetInput_input): Promise<QuoteExactAssetInput_output> => functions.QuoteExactAssetInput(client, contractIndex, input),
      QuoteExactAssetOutput: async (input: QuoteExactAssetOutput_input): Promise<QuoteExactAssetOutput_output> => functions.QuoteExactAssetOutput(client, contractIndex, input),
      InvestRewardsInfo: async (input: InvestRewardsInfo_input): Promise<InvestRewardsInfo_output> => functions.InvestRewardsInfo(client, contractIndex, input),
    },
    procedures: {
      IssueAsset: (input: IssueAsset_input) => procedures.IssueAsset(input),
      TransferShareOwnershipAndPossession: (input: TransferShareOwnershipAndPossession_input) => procedures.TransferShareOwnershipAndPossession(input),
      CreatePool: (input: CreatePool_input) => procedures.CreatePool(input),
      AddLiquidity: (input: AddLiquidity_input) => procedures.AddLiquidity(input),
      RemoveLiquidity: (input: RemoveLiquidity_input) => procedures.RemoveLiquidity(input),
      SwapExactQuForAsset: (input: SwapExactQuForAsset_input) => procedures.SwapExactQuForAsset(input),
      SwapQuForExactAsset: (input: SwapQuForExactAsset_input) => procedures.SwapQuForExactAsset(input),
      SwapExactAssetForQu: (input: SwapExactAssetForQu_input) => procedures.SwapExactAssetForQu(input),
      SwapAssetForExactQu: (input: SwapAssetForExactQu_input) => procedures.SwapAssetForExactQu(input),
      SetInvestRewardsInfo: (input: SetInvestRewardsInfo_input) => procedures.SetInvestRewardsInfo(input),
      TransferShareManagementRights: (input: TransferShareManagementRights_input) => procedures.TransferShareManagementRights(input),
    },
  };
}
