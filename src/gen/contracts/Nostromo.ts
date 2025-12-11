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

export type NOST2 = Record<string, never>;


export interface registerInTier_input {
  tierLevel: number;
}

export interface registerInTier_output {
  tierLevel: number;
}

export type logoutFromTier_input = Record<string, never>;


export interface logoutFromTier_output {
  result: number;
}

export interface createProject_input {
  tokenName: bigint;
  supply: bigint;
  startYear: number;
  startMonth: number;
  startDay: number;
  startHour: number;
  endYear: number;
  endMonth: number;
  endDay: number;
  endHour: number;
}

export interface createProject_output {
  indexOfProject: number;
}

export interface voteInProject_input {
  indexOfProject: number;
  decision: number;
}

export type voteInProject_output = Record<string, never>;


export interface createFundraising_input {
  tokenPrice: bigint;
  soldAmount: bigint;
  requiredFunds: bigint;
  indexOfProject: number;
  firstPhaseStartYear: number;
  firstPhaseStartMonth: number;
  firstPhaseStartDay: number;
  firstPhaseStartHour: number;
  firstPhaseEndYear: number;
  firstPhaseEndMonth: number;
  firstPhaseEndDay: number;
  firstPhaseEndHour: number;
  secondPhaseStartYear: number;
  secondPhaseStartMonth: number;
  secondPhaseStartDay: number;
  secondPhaseStartHour: number;
  secondPhaseEndYear: number;
  secondPhaseEndMonth: number;
  secondPhaseEndDay: number;
  secondPhaseEndHour: number;
  thirdPhaseStartYear: number;
  thirdPhaseStartMonth: number;
  thirdPhaseStartDay: number;
  thirdPhaseStartHour: number;
  thirdPhaseEndYear: number;
  thirdPhaseEndMonth: number;
  thirdPhaseEndDay: number;
  thirdPhaseEndHour: number;
  listingStartYear: number;
  listingStartMonth: number;
  listingStartDay: number;
  listingStartHour: number;
  cliffEndYear: number;
  cliffEndMonth: number;
  cliffEndDay: number;
  cliffEndHour: number;
  vestingEndYear: number;
  vestingEndMonth: number;
  vestingEndDay: number;
  vestingEndHour: number;
  threshold: number;
  TGE: number;
  stepOfVesting: number;
}

export type createFundraising_output = Record<string, never>;


export interface investInProject_input {
  indexOfFundraising: number;
}

export type investInProject_output = Record<string, never>;


export interface claimToken_input {
  amount: bigint;
  indexOfFundraising: number;
}

export interface claimToken_output {
  claimedAmount: bigint;
}

export interface upgradeTier_input {
  newTierLevel: number;
}

export type upgradeTier_output = Record<string, never>;


export interface TransferShareManagementRights_input {
  asset: any;
  numberOfShares: bigint;
  newManagingContractIndex: number;
}

export interface TransferShareManagementRights_output {
  transferredNumberOfShares: bigint;
}

export type getStats_input = Record<string, never>;


export type getStats_output = Record<string, never>;


export interface getTierLevelByUser_input {
  userId: Uint8Array;
}

export interface getTierLevelByUser_output {
  tierLevel: number;
}

export interface getUserVoteStatus_input {
  userId: Uint8Array;
}

export interface getUserVoteStatus_output {
  numberOfVotedProjects: number;
}

export interface checkTokenCreatability_input {
  tokenName: bigint;
}

export interface checkTokenCreatability_output {
  result: number;
}

export interface getNumberOfInvestedProjects_input {
  userId: Uint8Array;
}

export interface getNumberOfInvestedProjects_output {
  numberOfInvestedProjects: number;
}

export interface investInfo {
  investedAmount: bigint;
  claimedAmount: bigint;
  indexOfFundraising: number;
}

export interface projectInfo {
  creator: Uint8Array;
  tokenName: bigint;
  supplyOfToken: bigint;
  startDate: number;
  endDate: number;
  numberOfYes: number;
  numberOfNo: number;
  isCreatedFundarasing: number;
}

export interface fundaraisingInfo {
  tokenPrice: bigint;
  soldAmount: bigint;
  requiredFunds: bigint;
  raisedFunds: bigint;
  indexOfProject: number;
  firstPhaseStartDate: number;
  firstPhaseEndDate: number;
  secondPhaseStartDate: number;
  secondPhaseEndDate: number;
  thirdPhaseStartDate: number;
  thirdPhaseEndDate: number;
  listingStartDate: number;
  cliffEndDate: number;
  vestingEndDate: number;
  threshold: number;
  TGE: number;
  stepOfVesting: number;
  isCreatedToken: number;
}

export interface registerInTier_locals {
  tierStakedAmount: bigint;
  poolWeight: number;
}

export interface logoutFromTier_locals {
  earnedAmount: bigint;
  elementIndex: number;
  tierLevel: number;
}

export interface createProject_locals {
  newProject: any;
  tierLevel: number;
}

export interface voteInProject_locals {
  votedProject: any;
  flag: number;
}

export interface createFundraising_locals {
  tmpProject: any;
  newFundraising: any;
}

export interface investInProject_locals {
  tmpInvestData: any;
  tmpFundraising: any;
  tierLevel: number;
}

export interface claimToken_locals {
  tmpInvestData: any;
}

export interface upgradeTier_locals {
  deltaAmount: bigint;
  currentTierLevel: number;
}

export interface getProjectByIndex_input {
  indexOfProject: number;
}

export interface getProjectByIndex_output {
  project: any;
}

export interface getFundarasingByIndex_input {
  indexOfFundarasing: number;
}

export interface getFundarasingByIndex_output {
  fundarasing: any;
}

export interface getProjectIndexListByCreator_input {
  creator: Uint8Array;
}

export type getProjectIndexListByCreator_output = Record<string, never>;


export type getProjectIndexListByCreator_locals = Record<string, never>;


export interface getInfoUserInvested_input {
  investorId: Uint8Array;
}

export type getInfoUserInvested_output = Record<string, never>;


export type getInfoUserInvested_locals = Record<string, never>;


export interface getMaxClaimAmount_input {
  investorId: Uint8Array;
  indexOfFundraising: number;
}

export interface getMaxClaimAmount_output {
  amount: bigint;
}

export interface getMaxClaimAmount_locals {
  tmpInvestData: any;
  flag: number;
}

export interface END_EPOCH_locals {
  tmpFundraising: any;
  tmpInvest: any;
  userId: Uint8Array;
  idx: bigint;
}

const schemas: Record<string, Schema> = {
  NOST2: { kind: "struct", fields: [
]},
  registerInTier_input: { kind: "struct", fields: [
  { name: "tierLevel", type: "u32" },
]},
  registerInTier_output: { kind: "struct", fields: [
  { name: "tierLevel", type: "u32" },
]},
  logoutFromTier_input: { kind: "struct", fields: [
]},
  logoutFromTier_output: { kind: "struct", fields: [
  { name: "result", type: "u8" },
]},
  createProject_input: { kind: "struct", fields: [
  { name: "tokenName", type: "u64" },
  { name: "supply", type: "u64" },
  { name: "startYear", type: "u32" },
  { name: "startMonth", type: "u32" },
  { name: "startDay", type: "u32" },
  { name: "startHour", type: "u32" },
  { name: "endYear", type: "u32" },
  { name: "endMonth", type: "u32" },
  { name: "endDay", type: "u32" },
  { name: "endHour", type: "u32" },
]},
  createProject_output: { kind: "struct", fields: [
  { name: "indexOfProject", type: "u32" },
]},
  voteInProject_input: { kind: "struct", fields: [
  { name: "indexOfProject", type: "u32" },
  { name: "decision", type: "u8" },
]},
  voteInProject_output: { kind: "struct", fields: [
]},
  createFundraising_input: { kind: "struct", fields: [
  { name: "tokenPrice", type: "u64" },
  { name: "soldAmount", type: "u64" },
  { name: "requiredFunds", type: "u64" },
  { name: "indexOfProject", type: "u32" },
  { name: "firstPhaseStartYear", type: "u32" },
  { name: "firstPhaseStartMonth", type: "u32" },
  { name: "firstPhaseStartDay", type: "u32" },
  { name: "firstPhaseStartHour", type: "u32" },
  { name: "firstPhaseEndYear", type: "u32" },
  { name: "firstPhaseEndMonth", type: "u32" },
  { name: "firstPhaseEndDay", type: "u32" },
  { name: "firstPhaseEndHour", type: "u32" },
  { name: "secondPhaseStartYear", type: "u32" },
  { name: "secondPhaseStartMonth", type: "u32" },
  { name: "secondPhaseStartDay", type: "u32" },
  { name: "secondPhaseStartHour", type: "u32" },
  { name: "secondPhaseEndYear", type: "u32" },
  { name: "secondPhaseEndMonth", type: "u32" },
  { name: "secondPhaseEndDay", type: "u32" },
  { name: "secondPhaseEndHour", type: "u32" },
  { name: "thirdPhaseStartYear", type: "u32" },
  { name: "thirdPhaseStartMonth", type: "u32" },
  { name: "thirdPhaseStartDay", type: "u32" },
  { name: "thirdPhaseStartHour", type: "u32" },
  { name: "thirdPhaseEndYear", type: "u32" },
  { name: "thirdPhaseEndMonth", type: "u32" },
  { name: "thirdPhaseEndDay", type: "u32" },
  { name: "thirdPhaseEndHour", type: "u32" },
  { name: "listingStartYear", type: "u32" },
  { name: "listingStartMonth", type: "u32" },
  { name: "listingStartDay", type: "u32" },
  { name: "listingStartHour", type: "u32" },
  { name: "cliffEndYear", type: "u32" },
  { name: "cliffEndMonth", type: "u32" },
  { name: "cliffEndDay", type: "u32" },
  { name: "cliffEndHour", type: "u32" },
  { name: "vestingEndYear", type: "u32" },
  { name: "vestingEndMonth", type: "u32" },
  { name: "vestingEndDay", type: "u32" },
  { name: "vestingEndHour", type: "u32" },
  { name: "threshold", type: "u8" },
  { name: "TGE", type: "u8" },
  { name: "stepOfVesting", type: "u8" },
]},
  createFundraising_output: { kind: "struct", fields: [
]},
  investInProject_input: { kind: "struct", fields: [
  { name: "indexOfFundraising", type: "u32" },
]},
  investInProject_output: { kind: "struct", fields: [
]},
  claimToken_input: { kind: "struct", fields: [
  { name: "amount", type: "u64" },
  { name: "indexOfFundraising", type: "u32" },
]},
  claimToken_output: { kind: "struct", fields: [
  { name: "claimedAmount", type: "u64" },
]},
  upgradeTier_input: { kind: "struct", fields: [
  { name: "newTierLevel", type: "u32" },
]},
  upgradeTier_output: { kind: "struct", fields: [
]},
  TransferShareManagementRights_input: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "numberOfShares", type: "i64" },
  { name: "newManagingContractIndex", type: "u32" },
]},
  TransferShareManagementRights_output: { kind: "struct", fields: [
  { name: "transferredNumberOfShares", type: "i64" },
]},
  getStats_input: { kind: "struct", fields: [
]},
  getStats_output: { kind: "struct", fields: [
]},
  getTierLevelByUser_input: { kind: "struct", fields: [
  { name: "userId", type: "id" },
]},
  getTierLevelByUser_output: { kind: "struct", fields: [
  { name: "tierLevel", type: "u8" },
]},
  getUserVoteStatus_input: { kind: "struct", fields: [
  { name: "userId", type: "id" },
]},
  getUserVoteStatus_output: { kind: "struct", fields: [
  { name: "numberOfVotedProjects", type: "u32" },
]},
  checkTokenCreatability_input: { kind: "struct", fields: [
  { name: "tokenName", type: "u64" },
]},
  checkTokenCreatability_output: { kind: "struct", fields: [
  { name: "result", type: "u8" },
]},
  getNumberOfInvestedProjects_input: { kind: "struct", fields: [
  { name: "userId", type: "id" },
]},
  getNumberOfInvestedProjects_output: { kind: "struct", fields: [
  { name: "numberOfInvestedProjects", type: "u32" },
]},
  investInfo: { kind: "struct", fields: [
  { name: "investedAmount", type: "u64" },
  { name: "claimedAmount", type: "u64" },
  { name: "indexOfFundraising", type: "u32" },
]},
  projectInfo: { kind: "struct", fields: [
  { name: "creator", type: "id" },
  { name: "tokenName", type: "u64" },
  { name: "supplyOfToken", type: "u64" },
  { name: "startDate", type: "u32" },
  { name: "endDate", type: "u32" },
  { name: "numberOfYes", type: "u32" },
  { name: "numberOfNo", type: "u32" },
  { name: "isCreatedFundarasing", type: "u8" },
]},
  fundaraisingInfo: { kind: "struct", fields: [
  { name: "tokenPrice", type: "u64" },
  { name: "soldAmount", type: "u64" },
  { name: "requiredFunds", type: "u64" },
  { name: "raisedFunds", type: "u64" },
  { name: "indexOfProject", type: "u32" },
  { name: "firstPhaseStartDate", type: "u32" },
  { name: "firstPhaseEndDate", type: "u32" },
  { name: "secondPhaseStartDate", type: "u32" },
  { name: "secondPhaseEndDate", type: "u32" },
  { name: "thirdPhaseStartDate", type: "u32" },
  { name: "thirdPhaseEndDate", type: "u32" },
  { name: "listingStartDate", type: "u32" },
  { name: "cliffEndDate", type: "u32" },
  { name: "vestingEndDate", type: "u32" },
  { name: "threshold", type: "u8" },
  { name: "TGE", type: "u8" },
  { name: "stepOfVesting", type: "u8" },
  { name: "isCreatedToken", type: "u8" },
]},
  registerInTier_locals: { kind: "struct", fields: [
  { name: "tierStakedAmount", type: "u64" },
  { name: "poolWeight", type: "u32" },
]},
  logoutFromTier_locals: { kind: "struct", fields: [
  { name: "earnedAmount", type: "u64" },
  { name: "elementIndex", type: "u32" },
  { name: "tierLevel", type: "u8" },
]},
  createProject_locals: { kind: "struct", fields: [
  { name: "newProject", type: { bytes: 0 } },
  { name: "tierLevel", type: "u8" },
]},
  voteInProject_locals: { kind: "struct", fields: [
  { name: "votedProject", type: { bytes: 0 } },
  { name: "flag", type: "u8" },
]},
  createFundraising_locals: { kind: "struct", fields: [
  { name: "tmpProject", type: { bytes: 0 } },
  { name: "newFundraising", type: { bytes: 0 } },
]},
  investInProject_locals: { kind: "struct", fields: [
  { name: "tmpInvestData", type: { bytes: 0 } },
  { name: "tmpFundraising", type: { bytes: 0 } },
  { name: "tierLevel", type: "u8" },
]},
  claimToken_locals: { kind: "struct", fields: [
  { name: "tmpInvestData", type: { bytes: 0 } },
]},
  upgradeTier_locals: { kind: "struct", fields: [
  { name: "deltaAmount", type: "u64" },
  { name: "currentTierLevel", type: "u8" },
]},
  getProjectByIndex_input: { kind: "struct", fields: [
  { name: "indexOfProject", type: "u32" },
]},
  getProjectByIndex_output: { kind: "struct", fields: [
  { name: "project", type: { bytes: 0 } },
]},
  getFundarasingByIndex_input: { kind: "struct", fields: [
  { name: "indexOfFundarasing", type: "u32" },
]},
  getFundarasingByIndex_output: { kind: "struct", fields: [
  { name: "fundarasing", type: { bytes: 0 } },
]},
  getProjectIndexListByCreator_input: { kind: "struct", fields: [
  { name: "creator", type: "id" },
]},
  getProjectIndexListByCreator_output: { kind: "struct", fields: [
]},
  getProjectIndexListByCreator_locals: { kind: "struct", fields: [
]},
  getInfoUserInvested_input: { kind: "struct", fields: [
  { name: "investorId", type: "id" },
]},
  getInfoUserInvested_output: { kind: "struct", fields: [
]},
  getInfoUserInvested_locals: { kind: "struct", fields: [
]},
  getMaxClaimAmount_input: { kind: "struct", fields: [
  { name: "investorId", type: "id" },
  { name: "indexOfFundraising", type: "u32" },
]},
  getMaxClaimAmount_output: { kind: "struct", fields: [
  { name: "amount", type: "u64" },
]},
  getMaxClaimAmount_locals: { kind: "struct", fields: [
  { name: "tmpInvestData", type: { bytes: 0 } },
  { name: "flag", type: "u8" },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "tmpFundraising", type: { bytes: 0 } },
  { name: "tmpInvest", type: { bytes: 0 } },
  { name: "userId", type: "id" },
  { name: "idx", type: "i64" },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "Nostromo",
  contractIndex: 14,
  functions: [
    { name: "getStats", selector: 1, input: "getStats_input", output: "getStats_output", inputSchema: schemas["getStats_input"], outputSchema: schemas["getStats_output"] },
    { name: "getTierLevelByUser", selector: 2, input: "getTierLevelByUser_input", output: "getTierLevelByUser_output", inputSchema: schemas["getTierLevelByUser_input"], outputSchema: schemas["getTierLevelByUser_output"] },
    { name: "getUserVoteStatus", selector: 3, input: "getUserVoteStatus_input", output: "getUserVoteStatus_output", inputSchema: schemas["getUserVoteStatus_input"], outputSchema: schemas["getUserVoteStatus_output"] },
    { name: "checkTokenCreatability", selector: 4, input: "checkTokenCreatability_input", output: "checkTokenCreatability_output", inputSchema: schemas["checkTokenCreatability_input"], outputSchema: schemas["checkTokenCreatability_output"] },
    { name: "getNumberOfInvestedProjects", selector: 5, input: "getNumberOfInvestedProjects_input", output: "getNumberOfInvestedProjects_output", inputSchema: schemas["getNumberOfInvestedProjects_input"], outputSchema: schemas["getNumberOfInvestedProjects_output"] },
    { name: "getProjectByIndex", selector: 6, input: "getProjectByIndex_input", output: "getProjectByIndex_output", inputSchema: schemas["getProjectByIndex_input"], outputSchema: schemas["getProjectByIndex_output"] },
    { name: "getFundarasingByIndex", selector: 7, input: "getFundarasingByIndex_input", output: "getFundarasingByIndex_output", inputSchema: schemas["getFundarasingByIndex_input"], outputSchema: schemas["getFundarasingByIndex_output"] },
    { name: "getProjectIndexListByCreator", selector: 8, input: "getProjectIndexListByCreator_input", output: "getProjectIndexListByCreator_output", inputSchema: schemas["getProjectIndexListByCreator_input"], outputSchema: schemas["getProjectIndexListByCreator_output"] },
    { name: "getInfoUserInvested", selector: 9, input: "getInfoUserInvested_input", output: "getInfoUserInvested_output", inputSchema: schemas["getInfoUserInvested_input"], outputSchema: schemas["getInfoUserInvested_output"] },
    { name: "getMaxClaimAmount", selector: 10, input: "getMaxClaimAmount_input", output: "getMaxClaimAmount_output", inputSchema: schemas["getMaxClaimAmount_input"], outputSchema: schemas["getMaxClaimAmount_output"] },
  ],
  procedures: [
    { name: "registerInTier", selector: 1, input: "registerInTier_input", output: "registerInTier_output", inputSchema: schemas["registerInTier_input"], outputSchema: schemas["registerInTier_output"] },
    { name: "logoutFromTier", selector: 2, input: "logoutFromTier_input", output: "logoutFromTier_output", inputSchema: schemas["logoutFromTier_input"], outputSchema: schemas["logoutFromTier_output"] },
    { name: "createProject", selector: 3, input: "createProject_input", output: "createProject_output", inputSchema: schemas["createProject_input"], outputSchema: schemas["createProject_output"] },
    { name: "voteInProject", selector: 4, input: "voteInProject_input", output: "voteInProject_output", inputSchema: schemas["voteInProject_input"], outputSchema: schemas["voteInProject_output"] },
    { name: "createFundraising", selector: 5, input: "createFundraising_input", output: "createFundraising_output", inputSchema: schemas["createFundraising_input"], outputSchema: schemas["createFundraising_output"] },
    { name: "investInProject", selector: 6, input: "investInProject_input", output: "investInProject_output", inputSchema: schemas["investInProject_input"], outputSchema: schemas["investInProject_output"] },
    { name: "claimToken", selector: 7, input: "claimToken_input", output: "claimToken_output", inputSchema: schemas["claimToken_input"], outputSchema: schemas["claimToken_output"] },
    { name: "upgradeTier", selector: 8, input: "upgradeTier_input", output: "upgradeTier_output", inputSchema: schemas["upgradeTier_input"], outputSchema: schemas["upgradeTier_output"] },
    { name: "TransferShareManagementRights", selector: 9, input: "TransferShareManagementRights_input", output: "TransferShareManagementRights_output", inputSchema: schemas["TransferShareManagementRights_input"], outputSchema: schemas["TransferShareManagementRights_output"] },
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
  async getStats(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getStats_input): Promise<getStats_output> {
    const payload = encodeInput("getStats_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getStats_output", raw) as getStats_output;
  },
  async getTierLevelByUser(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getTierLevelByUser_input): Promise<getTierLevelByUser_output> {
    const payload = encodeInput("getTierLevelByUser_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getTierLevelByUser_output", raw) as getTierLevelByUser_output;
  },
  async getUserVoteStatus(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getUserVoteStatus_input): Promise<getUserVoteStatus_output> {
    const payload = encodeInput("getUserVoteStatus_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getUserVoteStatus_output", raw) as getUserVoteStatus_output;
  },
  async checkTokenCreatability(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: checkTokenCreatability_input): Promise<checkTokenCreatability_output> {
    const payload = encodeInput("checkTokenCreatability_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("checkTokenCreatability_output", raw) as checkTokenCreatability_output;
  },
  async getNumberOfInvestedProjects(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getNumberOfInvestedProjects_input): Promise<getNumberOfInvestedProjects_output> {
    const payload = encodeInput("getNumberOfInvestedProjects_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getNumberOfInvestedProjects_output", raw) as getNumberOfInvestedProjects_output;
  },
  async getProjectByIndex(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getProjectByIndex_input): Promise<getProjectByIndex_output> {
    const payload = encodeInput("getProjectByIndex_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getProjectByIndex_output", raw) as getProjectByIndex_output;
  },
  async getFundarasingByIndex(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getFundarasingByIndex_input): Promise<getFundarasingByIndex_output> {
    const payload = encodeInput("getFundarasingByIndex_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getFundarasingByIndex_output", raw) as getFundarasingByIndex_output;
  },
  async getProjectIndexListByCreator(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getProjectIndexListByCreator_input): Promise<getProjectIndexListByCreator_output> {
    const payload = encodeInput("getProjectIndexListByCreator_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getProjectIndexListByCreator_output", raw) as getProjectIndexListByCreator_output;
  },
  async getInfoUserInvested(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getInfoUserInvested_input): Promise<getInfoUserInvested_output> {
    const payload = encodeInput("getInfoUserInvested_input", input);
    const request = {
      contractIndex,
      inputType: 9,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getInfoUserInvested_output", raw) as getInfoUserInvested_output;
  },
  async getMaxClaimAmount(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getMaxClaimAmount_input): Promise<getMaxClaimAmount_output> {
    const payload = encodeInput("getMaxClaimAmount_input", input);
    const request = {
      contractIndex,
      inputType: 10,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getMaxClaimAmount_output", raw) as getMaxClaimAmount_output;
  },
};

export const procedures = {
  registerInTier(input: registerInTier_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("registerInTier_input", input);
    return { inputType: 1, payload };
  },
  logoutFromTier(input: logoutFromTier_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("logoutFromTier_input", input);
    return { inputType: 2, payload };
  },
  createProject(input: createProject_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("createProject_input", input);
    return { inputType: 3, payload };
  },
  voteInProject(input: voteInProject_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("voteInProject_input", input);
    return { inputType: 4, payload };
  },
  createFundraising(input: createFundraising_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("createFundraising_input", input);
    return { inputType: 5, payload };
  },
  investInProject(input: investInProject_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("investInProject_input", input);
    return { inputType: 6, payload };
  },
  claimToken(input: claimToken_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("claimToken_input", input);
    return { inputType: 7, payload };
  },
  upgradeTier(input: upgradeTier_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("upgradeTier_input", input);
    return { inputType: 8, payload };
  },
  TransferShareManagementRights(input: TransferShareManagementRights_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferShareManagementRights_input", input);
    return { inputType: 9, payload };
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
      getStats: async (input: getStats_input): Promise<getStats_output> => functions.getStats(client, contractIndex, input),
      getTierLevelByUser: async (input: getTierLevelByUser_input): Promise<getTierLevelByUser_output> => functions.getTierLevelByUser(client, contractIndex, input),
      getUserVoteStatus: async (input: getUserVoteStatus_input): Promise<getUserVoteStatus_output> => functions.getUserVoteStatus(client, contractIndex, input),
      checkTokenCreatability: async (input: checkTokenCreatability_input): Promise<checkTokenCreatability_output> => functions.checkTokenCreatability(client, contractIndex, input),
      getNumberOfInvestedProjects: async (input: getNumberOfInvestedProjects_input): Promise<getNumberOfInvestedProjects_output> => functions.getNumberOfInvestedProjects(client, contractIndex, input),
      getProjectByIndex: async (input: getProjectByIndex_input): Promise<getProjectByIndex_output> => functions.getProjectByIndex(client, contractIndex, input),
      getFundarasingByIndex: async (input: getFundarasingByIndex_input): Promise<getFundarasingByIndex_output> => functions.getFundarasingByIndex(client, contractIndex, input),
      getProjectIndexListByCreator: async (input: getProjectIndexListByCreator_input): Promise<getProjectIndexListByCreator_output> => functions.getProjectIndexListByCreator(client, contractIndex, input),
      getInfoUserInvested: async (input: getInfoUserInvested_input): Promise<getInfoUserInvested_output> => functions.getInfoUserInvested(client, contractIndex, input),
      getMaxClaimAmount: async (input: getMaxClaimAmount_input): Promise<getMaxClaimAmount_output> => functions.getMaxClaimAmount(client, contractIndex, input),
    },
    procedures: {
      registerInTier: (input: registerInTier_input) => procedures.registerInTier(input),
      logoutFromTier: (input: logoutFromTier_input) => procedures.logoutFromTier(input),
      createProject: (input: createProject_input) => procedures.createProject(input),
      voteInProject: (input: voteInProject_input) => procedures.voteInProject(input),
      createFundraising: (input: createFundraising_input) => procedures.createFundraising(input),
      investInProject: (input: investInProject_input) => procedures.investInProject(input),
      claimToken: (input: claimToken_input) => procedures.claimToken(input),
      upgradeTier: (input: upgradeTier_input) => procedures.upgradeTier(input),
      TransferShareManagementRights: (input: TransferShareManagementRights_input) => procedures.TransferShareManagementRights(input),
    },
  };
}
