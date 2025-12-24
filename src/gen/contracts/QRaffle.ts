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

export interface QRAFFLELogger {
  _contractIndex: number;
  _type: number;
  _terminator: number;
}

export interface QRAFFLEEndEpochLogger {
  _contractIndex: number;
  _type: number;
  _epoch: number;
  _memberCount: number;
  _totalAmount: bigint;
  _winnerAmount: bigint;
  _winnerIndex: number;
  _terminator: number;
}

export interface QRAFFLERevenueLogger {
  _contractIndex: number;
  _type: number;
  _burnAmount: bigint;
  _charityAmount: bigint;
  _shareholderAmount: bigint;
  _registerAmount: bigint;
  _feeAmount: bigint;
  _winnerAmount: bigint;
  _terminator: number;
}

export interface QRAFFLETokenRaffleLogger {
  _contractIndex: number;
  _type: number;
  _raffleIndex: number;
  _assetName: bigint;
  _memberCount: number;
  _entryAmount: bigint;
  _winnerIndex: number;
  _winnerAmount: bigint;
  _terminator: number;
}

export interface QRAFFLEProposalLogger {
  _contractIndex: number;
  _type: number;
  _proposalIndex: number;
  _proposer: Uint8Array;
  _yesVotes: number;
  _noVotes: number;
  _assetName: bigint;
  _entryAmount: bigint;
  _terminator: number;
}

export interface QRAFFLEEmptyTokenRaffleLogger {
  _contractIndex: number;
  _type: number;
  _tokenRaffleIndex: number;
  _terminator: number;
}

export type QRAFFLE2 = Record<string, never>;


export interface registerInSystem_input {
  useQXMR: number;
}

export interface registerInSystem_output {
  returnCode: number;
}

export type logoutInSystem_input = Record<string, never>;


export interface logoutInSystem_output {
  returnCode: number;
}

export interface submitEntryAmount_input {
  amount: bigint;
}

export interface submitEntryAmount_output {
  returnCode: number;
}

export interface submitProposal_input {
  tokenIssuer: Uint8Array;
  tokenName: bigint;
  entryAmount: bigint;
}

export interface submitProposal_output {
  returnCode: number;
}

export interface voteInProposal_input {
  indexOfProposal: number;
  yes: number;
}

export interface voteInProposal_output {
  returnCode: number;
}

export type depositInQuRaffle_input = Record<string, never>;


export interface depositInQuRaffle_output {
  returnCode: number;
}

export interface depositInTokenRaffle_input {
  indexOfTokenRaffle: number;
}

export interface depositInTokenRaffle_output {
  returnCode: number;
}

export interface TransferShareManagementRights_input {
  tokenIssuer: Uint8Array;
  tokenName: bigint;
  numberOfShares: bigint;
  newManagingContractIndex: number;
}

export interface TransferShareManagementRights_output {
  transferredNumberOfShares: bigint;
}

export interface getRegisters_input {
  offset: number;
  limit: number;
}

export interface getRegisters_output {
  returnCode: number;
}

export type getAnalytics_input = Record<string, never>;


export interface getAnalytics_output {
  currentQuRaffleAmount: bigint;
  totalBurnAmount: bigint;
  totalCharityAmount: bigint;
  totalShareholderAmount: bigint;
  totalRegisterAmount: bigint;
  totalFeeAmount: bigint;
  totalWinnerAmount: bigint;
  largestWinnerAmount: bigint;
  numberOfRegisters: number;
  numberOfProposals: number;
  numberOfQuRaffleMembers: number;
  numberOfActiveTokenRaffle: number;
  numberOfEndedTokenRaffle: number;
  numberOfEntryAmountSubmitted: number;
  returnCode: number;
}

export interface getActiveProposal_input {
  indexOfProposal: number;
}

export interface getActiveProposal_output {
  tokenIssuer: Uint8Array;
  proposer: Uint8Array;
  tokenName: bigint;
  entryAmount: bigint;
  nYes: number;
  nNo: number;
  returnCode: number;
}

export interface getEndedTokenRaffle_input {
  indexOfRaffle: number;
}

export interface getEndedTokenRaffle_output {
  epochWinner: Uint8Array;
  tokenIssuer: Uint8Array;
  tokenName: bigint;
  entryAmount: bigint;
  numberOfMembers: number;
  winnerIndex: number;
  epoch: number;
  returnCode: number;
}

export interface getEpochRaffleIndexes_input {
  epoch: number;
}

export interface getEpochRaffleIndexes_output {
  StartIndex: number;
  EndIndex: number;
  returnCode: number;
}

export interface getEndedQuRaffle_input {
  epoch: number;
}

export interface getEndedQuRaffle_output {
  epochWinner: Uint8Array;
  receivedAmount: bigint;
  entryAmount: bigint;
  numberOfMembers: number;
  winnerIndex: number;
  returnCode: number;
}

export interface getActiveTokenRaffle_input {
  indexOfTokenRaffle: number;
}

export interface getActiveTokenRaffle_output {
  tokenIssuer: Uint8Array;
  tokenName: bigint;
  entryAmount: bigint;
  numberOfMembers: number;
  returnCode: number;
}

export interface getQuRaffleEntryAmountPerUser_input {
  user: Uint8Array;
}

export interface getQuRaffleEntryAmountPerUser_output {
  entryAmount: bigint;
  returnCode: number;
}

export type getQuRaffleEntryAverageAmount_input = Record<string, never>;


export interface getQuRaffleEntryAverageAmount_output {
  entryAverageAmount: bigint;
  returnCode: number;
}

export interface ProposalInfo {
  token: any;
  proposer: Uint8Array;
  entryAmount: bigint;
  nYes: number;
  nNo: number;
}

export interface VotedId {
  user: Uint8Array;
  status: number;
}

export interface ActiveTokenRaffleInfo {
  token: any;
  entryAmount: bigint;
}

export interface QuRaffleInfo {
  epochWinner: Uint8Array;
  receivedAmount: bigint;
  entryAmount: bigint;
  numberOfMembers: number;
  winnerIndex: number;
}

export interface TokenRaffleInfo {
  epochWinner: Uint8Array;
  token: any;
  entryAmount: bigint;
  numberOfMembers: number;
  winnerIndex: number;
  epoch: number;
}

export interface registerInSystem_locals {
  log: any;
}

export interface logoutInSystem_locals {
  refundAmount: bigint;
  tokenType: number;
  log: any;
}

export interface submitEntryAmount_locals {
  log: any;
}

export interface submitProposal_locals {
  proposal: any;
  log: any;
}

export interface voteInProposal_locals {
  proposal: any;
  votedId: any;
  i: number;
  log: any;
}

export interface depositInQuRaffle_locals {
  i: number;
  log: any;
}

export interface depositInTokenRaffle_locals {
  i: number;
  log: any;
}

export interface TransferShareManagementRights_locals {
  asset: any;
  log: any;
}

export interface getRegisters_locals {
  user: Uint8Array;
  idx: bigint;
  i: number;
}

export interface getEpochRaffleIndexes_locals {
  i: number;
}

export interface getQuRaffleEntryAverageAmount_locals {
  entryAmount: bigint;
  totalEntryAmount: bigint;
  idx: bigint;
}

export interface END_EPOCH_locals {
  proposal: any;
  qraffle: any;
  tRaffle: any;
  acTokenRaffle: any;
  iter: any;
  QraffleAsset: any;
  idx: bigint;
  log: any;
  emptyTokenRafflelog: any;
  endEpochLog: any;
  revenueLog: any;
  tokenRaffleLog: any;
  proposalLog: any;
}

const schemas: Record<string, Schema> = {
  QRAFFLELogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "_terminator", type: "i8" },
]},
  QRAFFLEEndEpochLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "_epoch", type: "u32" },
  { name: "_memberCount", type: "u32" },
  { name: "_totalAmount", type: "u64" },
  { name: "_winnerAmount", type: "u64" },
  { name: "_winnerIndex", type: "u32" },
  { name: "_terminator", type: "i8" },
]},
  QRAFFLERevenueLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "_burnAmount", type: "u64" },
  { name: "_charityAmount", type: "u64" },
  { name: "_shareholderAmount", type: "u64" },
  { name: "_registerAmount", type: "u64" },
  { name: "_feeAmount", type: "u64" },
  { name: "_winnerAmount", type: "u64" },
  { name: "_terminator", type: "i8" },
]},
  QRAFFLETokenRaffleLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "_raffleIndex", type: "u32" },
  { name: "_assetName", type: "u64" },
  { name: "_memberCount", type: "u32" },
  { name: "_entryAmount", type: "u64" },
  { name: "_winnerIndex", type: "u32" },
  { name: "_winnerAmount", type: "u64" },
  { name: "_terminator", type: "i8" },
]},
  QRAFFLEProposalLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "_proposalIndex", type: "u32" },
  { name: "_proposer", type: "id" },
  { name: "_yesVotes", type: "u32" },
  { name: "_noVotes", type: "u32" },
  { name: "_assetName", type: "u64" },
  { name: "_entryAmount", type: "u64" },
  { name: "_terminator", type: "i8" },
]},
  QRAFFLEEmptyTokenRaffleLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "_tokenRaffleIndex", type: "u32" },
  { name: "_terminator", type: "i8" },
]},
  QRAFFLE2: { kind: "struct", fields: [
]},
  registerInSystem_input: { kind: "struct", fields: [
  { name: "useQXMR", type: "u8" },
]},
  registerInSystem_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  logoutInSystem_input: { kind: "struct", fields: [
]},
  logoutInSystem_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  submitEntryAmount_input: { kind: "struct", fields: [
  { name: "amount", type: "u64" },
]},
  submitEntryAmount_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  submitProposal_input: { kind: "struct", fields: [
  { name: "tokenIssuer", type: "id" },
  { name: "tokenName", type: "u64" },
  { name: "entryAmount", type: "u64" },
]},
  submitProposal_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  voteInProposal_input: { kind: "struct", fields: [
  { name: "indexOfProposal", type: "u32" },
  { name: "yes", type: "u8" },
]},
  voteInProposal_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  depositInQuRaffle_input: { kind: "struct", fields: [
]},
  depositInQuRaffle_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  depositInTokenRaffle_input: { kind: "struct", fields: [
  { name: "indexOfTokenRaffle", type: "u32" },
]},
  depositInTokenRaffle_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  TransferShareManagementRights_input: { kind: "struct", fields: [
  { name: "tokenIssuer", type: "id" },
  { name: "tokenName", type: "u64" },
  { name: "numberOfShares", type: "i64" },
  { name: "newManagingContractIndex", type: "u32" },
]},
  TransferShareManagementRights_output: { kind: "struct", fields: [
  { name: "transferredNumberOfShares", type: "i64" },
]},
  getRegisters_input: { kind: "struct", fields: [
  { name: "offset", type: "u32" },
  { name: "limit", type: "u32" },
]},
  getRegisters_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  getAnalytics_input: { kind: "struct", fields: [
]},
  getAnalytics_output: { kind: "struct", fields: [
  { name: "currentQuRaffleAmount", type: "u64" },
  { name: "totalBurnAmount", type: "u64" },
  { name: "totalCharityAmount", type: "u64" },
  { name: "totalShareholderAmount", type: "u64" },
  { name: "totalRegisterAmount", type: "u64" },
  { name: "totalFeeAmount", type: "u64" },
  { name: "totalWinnerAmount", type: "u64" },
  { name: "largestWinnerAmount", type: "u64" },
  { name: "numberOfRegisters", type: "u32" },
  { name: "numberOfProposals", type: "u32" },
  { name: "numberOfQuRaffleMembers", type: "u32" },
  { name: "numberOfActiveTokenRaffle", type: "u32" },
  { name: "numberOfEndedTokenRaffle", type: "u32" },
  { name: "numberOfEntryAmountSubmitted", type: "u32" },
  { name: "returnCode", type: "i32" },
]},
  getActiveProposal_input: { kind: "struct", fields: [
  { name: "indexOfProposal", type: "u32" },
]},
  getActiveProposal_output: { kind: "struct", fields: [
  { name: "tokenIssuer", type: "id" },
  { name: "proposer", type: "id" },
  { name: "tokenName", type: "u64" },
  { name: "entryAmount", type: "u64" },
  { name: "nYes", type: "u32" },
  { name: "nNo", type: "u32" },
  { name: "returnCode", type: "i32" },
]},
  getEndedTokenRaffle_input: { kind: "struct", fields: [
  { name: "indexOfRaffle", type: "u32" },
]},
  getEndedTokenRaffle_output: { kind: "struct", fields: [
  { name: "epochWinner", type: "id" },
  { name: "tokenIssuer", type: "id" },
  { name: "tokenName", type: "u64" },
  { name: "entryAmount", type: "u64" },
  { name: "numberOfMembers", type: "u32" },
  { name: "winnerIndex", type: "u32" },
  { name: "epoch", type: "u32" },
  { name: "returnCode", type: "i32" },
]},
  getEpochRaffleIndexes_input: { kind: "struct", fields: [
  { name: "epoch", type: "u32" },
]},
  getEpochRaffleIndexes_output: { kind: "struct", fields: [
  { name: "StartIndex", type: "u32" },
  { name: "EndIndex", type: "u32" },
  { name: "returnCode", type: "i32" },
]},
  getEndedQuRaffle_input: { kind: "struct", fields: [
  { name: "epoch", type: "u32" },
]},
  getEndedQuRaffle_output: { kind: "struct", fields: [
  { name: "epochWinner", type: "id" },
  { name: "receivedAmount", type: "u64" },
  { name: "entryAmount", type: "u64" },
  { name: "numberOfMembers", type: "u32" },
  { name: "winnerIndex", type: "u32" },
  { name: "returnCode", type: "i32" },
]},
  getActiveTokenRaffle_input: { kind: "struct", fields: [
  { name: "indexOfTokenRaffle", type: "u32" },
]},
  getActiveTokenRaffle_output: { kind: "struct", fields: [
  { name: "tokenIssuer", type: "id" },
  { name: "tokenName", type: "u64" },
  { name: "entryAmount", type: "u64" },
  { name: "numberOfMembers", type: "u32" },
  { name: "returnCode", type: "i32" },
]},
  getQuRaffleEntryAmountPerUser_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
]},
  getQuRaffleEntryAmountPerUser_output: { kind: "struct", fields: [
  { name: "entryAmount", type: "u64" },
  { name: "returnCode", type: "i32" },
]},
  getQuRaffleEntryAverageAmount_input: { kind: "struct", fields: [
]},
  getQuRaffleEntryAverageAmount_output: { kind: "struct", fields: [
  { name: "entryAverageAmount", type: "u64" },
  { name: "returnCode", type: "i32" },
]},
  ProposalInfo: { kind: "struct", fields: [
  { name: "token", type: { bytes: 40 } },
  { name: "proposer", type: "id" },
  { name: "entryAmount", type: "u64" },
  { name: "nYes", type: "u32" },
  { name: "nNo", type: "u32" },
]},
  VotedId: { kind: "struct", fields: [
  { name: "user", type: "id" },
  { name: "status", type: "u8" },
]},
  ActiveTokenRaffleInfo: { kind: "struct", fields: [
  { name: "token", type: { bytes: 40 } },
  { name: "entryAmount", type: "u64" },
]},
  QuRaffleInfo: { kind: "struct", fields: [
  { name: "epochWinner", type: "id" },
  { name: "receivedAmount", type: "u64" },
  { name: "entryAmount", type: "u64" },
  { name: "numberOfMembers", type: "u32" },
  { name: "winnerIndex", type: "u32" },
]},
  TokenRaffleInfo: { kind: "struct", fields: [
  { name: "epochWinner", type: "id" },
  { name: "token", type: { bytes: 40 } },
  { name: "entryAmount", type: "u64" },
  { name: "numberOfMembers", type: "u32" },
  { name: "winnerIndex", type: "u32" },
  { name: "epoch", type: "u32" },
]},
  registerInSystem_locals: { kind: "struct", fields: [
  { name: "log", type: { bytes: 0 } },
]},
  logoutInSystem_locals: { kind: "struct", fields: [
  { name: "refundAmount", type: "i64" },
  { name: "tokenType", type: "u8" },
  { name: "log", type: { bytes: 0 } },
]},
  submitEntryAmount_locals: { kind: "struct", fields: [
  { name: "log", type: { bytes: 0 } },
]},
  submitProposal_locals: { kind: "struct", fields: [
  { name: "proposal", type: { bytes: 0 } },
  { name: "log", type: { bytes: 0 } },
]},
  voteInProposal_locals: { kind: "struct", fields: [
  { name: "proposal", type: { bytes: 0 } },
  { name: "votedId", type: { bytes: 0 } },
  { name: "i", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  depositInQuRaffle_locals: { kind: "struct", fields: [
  { name: "i", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  depositInTokenRaffle_locals: { kind: "struct", fields: [
  { name: "i", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  TransferShareManagementRights_locals: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "log", type: { bytes: 0 } },
]},
  getRegisters_locals: { kind: "struct", fields: [
  { name: "user", type: "id" },
  { name: "idx", type: "i64" },
  { name: "i", type: "u32" },
]},
  getEpochRaffleIndexes_locals: { kind: "struct", fields: [
  { name: "i", type: "i32" },
]},
  getQuRaffleEntryAverageAmount_locals: { kind: "struct", fields: [
  { name: "entryAmount", type: "u64" },
  { name: "totalEntryAmount", type: "u64" },
  { name: "idx", type: "i64" },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "proposal", type: { bytes: 0 } },
  { name: "qraffle", type: { bytes: 0 } },
  { name: "tRaffle", type: { bytes: 0 } },
  { name: "acTokenRaffle", type: { bytes: 0 } },
  { name: "iter", type: { bytes: 0 } },
  { name: "QraffleAsset", type: { bytes: 40 } },
  { name: "idx", type: "i64" },
  { name: "log", type: { bytes: 0 } },
  { name: "emptyTokenRafflelog", type: { bytes: 0 } },
  { name: "endEpochLog", type: { bytes: 0 } },
  { name: "revenueLog", type: { bytes: 0 } },
  { name: "tokenRaffleLog", type: { bytes: 0 } },
  { name: "proposalLog", type: { bytes: 0 } },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "QRaffle",
  contractIndex: 19,
  functions: [
    { name: "getRegisters", selector: 1, input: "getRegisters_input", output: "getRegisters_output", inputSchema: schemas["getRegisters_input"], outputSchema: schemas["getRegisters_output"] },
    { name: "getAnalytics", selector: 2, input: "getAnalytics_input", output: "getAnalytics_output", inputSchema: schemas["getAnalytics_input"], outputSchema: schemas["getAnalytics_output"] },
    { name: "getActiveProposal", selector: 3, input: "getActiveProposal_input", output: "getActiveProposal_output", inputSchema: schemas["getActiveProposal_input"], outputSchema: schemas["getActiveProposal_output"] },
    { name: "getEndedTokenRaffle", selector: 4, input: "getEndedTokenRaffle_input", output: "getEndedTokenRaffle_output", inputSchema: schemas["getEndedTokenRaffle_input"], outputSchema: schemas["getEndedTokenRaffle_output"] },
    { name: "getEndedQuRaffle", selector: 5, input: "getEndedQuRaffle_input", output: "getEndedQuRaffle_output", inputSchema: schemas["getEndedQuRaffle_input"], outputSchema: schemas["getEndedQuRaffle_output"] },
    { name: "getActiveTokenRaffle", selector: 6, input: "getActiveTokenRaffle_input", output: "getActiveTokenRaffle_output", inputSchema: schemas["getActiveTokenRaffle_input"], outputSchema: schemas["getActiveTokenRaffle_output"] },
    { name: "getEpochRaffleIndexes", selector: 7, input: "getEpochRaffleIndexes_input", output: "getEpochRaffleIndexes_output", inputSchema: schemas["getEpochRaffleIndexes_input"], outputSchema: schemas["getEpochRaffleIndexes_output"] },
    { name: "getQuRaffleEntryAmountPerUser", selector: 8, input: "getQuRaffleEntryAmountPerUser_input", output: "getQuRaffleEntryAmountPerUser_output", inputSchema: schemas["getQuRaffleEntryAmountPerUser_input"], outputSchema: schemas["getQuRaffleEntryAmountPerUser_output"] },
    { name: "getQuRaffleEntryAverageAmount", selector: 9, input: "getQuRaffleEntryAverageAmount_input", output: "getQuRaffleEntryAverageAmount_output", inputSchema: schemas["getQuRaffleEntryAverageAmount_input"], outputSchema: schemas["getQuRaffleEntryAverageAmount_output"] },
  ],
  procedures: [
    { name: "registerInSystem", selector: 1, input: "registerInSystem_input", output: "registerInSystem_output", inputSchema: schemas["registerInSystem_input"], outputSchema: schemas["registerInSystem_output"] },
    { name: "logoutInSystem", selector: 2, input: "logoutInSystem_input", output: "logoutInSystem_output", inputSchema: schemas["logoutInSystem_input"], outputSchema: schemas["logoutInSystem_output"] },
    { name: "submitEntryAmount", selector: 3, input: "submitEntryAmount_input", output: "submitEntryAmount_output", inputSchema: schemas["submitEntryAmount_input"], outputSchema: schemas["submitEntryAmount_output"] },
    { name: "submitProposal", selector: 4, input: "submitProposal_input", output: "submitProposal_output", inputSchema: schemas["submitProposal_input"], outputSchema: schemas["submitProposal_output"] },
    { name: "voteInProposal", selector: 5, input: "voteInProposal_input", output: "voteInProposal_output", inputSchema: schemas["voteInProposal_input"], outputSchema: schemas["voteInProposal_output"] },
    { name: "depositInQuRaffle", selector: 6, input: "depositInQuRaffle_input", output: "depositInQuRaffle_output", inputSchema: schemas["depositInQuRaffle_input"], outputSchema: schemas["depositInQuRaffle_output"] },
    { name: "depositInTokenRaffle", selector: 7, input: "depositInTokenRaffle_input", output: "depositInTokenRaffle_output", inputSchema: schemas["depositInTokenRaffle_input"], outputSchema: schemas["depositInTokenRaffle_output"] },
    { name: "TransferShareManagementRights", selector: 8, input: "TransferShareManagementRights_input", output: "TransferShareManagementRights_output", inputSchema: schemas["TransferShareManagementRights_input"], outputSchema: schemas["TransferShareManagementRights_output"] },
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
  async getRegisters(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getRegisters_input): Promise<getRegisters_output> {
    const payload = encodeInput("getRegisters_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getRegisters_output", raw) as getRegisters_output;
  },
  async getAnalytics(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getAnalytics_input): Promise<getAnalytics_output> {
    const payload = encodeInput("getAnalytics_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getAnalytics_output", raw) as getAnalytics_output;
  },
  async getActiveProposal(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getActiveProposal_input): Promise<getActiveProposal_output> {
    const payload = encodeInput("getActiveProposal_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getActiveProposal_output", raw) as getActiveProposal_output;
  },
  async getEndedTokenRaffle(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getEndedTokenRaffle_input): Promise<getEndedTokenRaffle_output> {
    const payload = encodeInput("getEndedTokenRaffle_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getEndedTokenRaffle_output", raw) as getEndedTokenRaffle_output;
  },
  async getEndedQuRaffle(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getEndedQuRaffle_input): Promise<getEndedQuRaffle_output> {
    const payload = encodeInput("getEndedQuRaffle_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getEndedQuRaffle_output", raw) as getEndedQuRaffle_output;
  },
  async getActiveTokenRaffle(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getActiveTokenRaffle_input): Promise<getActiveTokenRaffle_output> {
    const payload = encodeInput("getActiveTokenRaffle_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getActiveTokenRaffle_output", raw) as getActiveTokenRaffle_output;
  },
  async getEpochRaffleIndexes(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getEpochRaffleIndexes_input): Promise<getEpochRaffleIndexes_output> {
    const payload = encodeInput("getEpochRaffleIndexes_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getEpochRaffleIndexes_output", raw) as getEpochRaffleIndexes_output;
  },
  async getQuRaffleEntryAmountPerUser(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getQuRaffleEntryAmountPerUser_input): Promise<getQuRaffleEntryAmountPerUser_output> {
    const payload = encodeInput("getQuRaffleEntryAmountPerUser_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getQuRaffleEntryAmountPerUser_output", raw) as getQuRaffleEntryAmountPerUser_output;
  },
  async getQuRaffleEntryAverageAmount(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getQuRaffleEntryAverageAmount_input): Promise<getQuRaffleEntryAverageAmount_output> {
    const payload = encodeInput("getQuRaffleEntryAverageAmount_input", input);
    const request = {
      contractIndex,
      inputType: 9,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getQuRaffleEntryAverageAmount_output", raw) as getQuRaffleEntryAverageAmount_output;
  },
};

export const procedures = {
  registerInSystem(input: registerInSystem_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("registerInSystem_input", input);
    return { inputType: 1, payload };
  },
  logoutInSystem(input: logoutInSystem_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("logoutInSystem_input", input);
    return { inputType: 2, payload };
  },
  submitEntryAmount(input: submitEntryAmount_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("submitEntryAmount_input", input);
    return { inputType: 3, payload };
  },
  submitProposal(input: submitProposal_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("submitProposal_input", input);
    return { inputType: 4, payload };
  },
  voteInProposal(input: voteInProposal_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("voteInProposal_input", input);
    return { inputType: 5, payload };
  },
  depositInQuRaffle(input: depositInQuRaffle_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("depositInQuRaffle_input", input);
    return { inputType: 6, payload };
  },
  depositInTokenRaffle(input: depositInTokenRaffle_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("depositInTokenRaffle_input", input);
    return { inputType: 7, payload };
  },
  TransferShareManagementRights(input: TransferShareManagementRights_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferShareManagementRights_input", input);
    return { inputType: 8, payload };
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
      getRegisters: async (input: getRegisters_input): Promise<getRegisters_output> => functions.getRegisters(client, contractIndex, input),
      getAnalytics: async (input: getAnalytics_input): Promise<getAnalytics_output> => functions.getAnalytics(client, contractIndex, input),
      getActiveProposal: async (input: getActiveProposal_input): Promise<getActiveProposal_output> => functions.getActiveProposal(client, contractIndex, input),
      getEndedTokenRaffle: async (input: getEndedTokenRaffle_input): Promise<getEndedTokenRaffle_output> => functions.getEndedTokenRaffle(client, contractIndex, input),
      getEndedQuRaffle: async (input: getEndedQuRaffle_input): Promise<getEndedQuRaffle_output> => functions.getEndedQuRaffle(client, contractIndex, input),
      getActiveTokenRaffle: async (input: getActiveTokenRaffle_input): Promise<getActiveTokenRaffle_output> => functions.getActiveTokenRaffle(client, contractIndex, input),
      getEpochRaffleIndexes: async (input: getEpochRaffleIndexes_input): Promise<getEpochRaffleIndexes_output> => functions.getEpochRaffleIndexes(client, contractIndex, input),
      getQuRaffleEntryAmountPerUser: async (input: getQuRaffleEntryAmountPerUser_input): Promise<getQuRaffleEntryAmountPerUser_output> => functions.getQuRaffleEntryAmountPerUser(client, contractIndex, input),
      getQuRaffleEntryAverageAmount: async (input: getQuRaffleEntryAverageAmount_input): Promise<getQuRaffleEntryAverageAmount_output> => functions.getQuRaffleEntryAverageAmount(client, contractIndex, input),
    },
    procedures: {
      registerInSystem: (input: registerInSystem_input) => procedures.registerInSystem(input),
      logoutInSystem: (input: logoutInSystem_input) => procedures.logoutInSystem(input),
      submitEntryAmount: (input: submitEntryAmount_input) => procedures.submitEntryAmount(input),
      submitProposal: (input: submitProposal_input) => procedures.submitProposal(input),
      voteInProposal: (input: voteInProposal_input) => procedures.voteInProposal(input),
      depositInQuRaffle: (input: depositInQuRaffle_input) => procedures.depositInQuRaffle(input),
      depositInTokenRaffle: (input: depositInTokenRaffle_input) => procedures.depositInTokenRaffle(input),
      TransferShareManagementRights: (input: TransferShareManagementRights_input) => procedures.TransferShareManagementRights(input),
    },
  };
}
