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

export interface QEARNLogger {
  _contractIndex: number;
  sourcePublicKey: Uint8Array;
  destinationPublicKey: Uint8Array;
  amount: bigint;
  _type: number;
  _terminator: number;
}

export type QEARN2 = Record<string, never>;


export interface getLockInfoPerEpoch_input {
  Epoch: number;
}

export interface getLockInfoPerEpoch_output {
  lockedAmount: bigint;
  bonusAmount: bigint;
  currentLockedAmount: bigint;
  currentBonusAmount: bigint;
  yield: bigint;
}

export interface getUserLockedInfo_input {
  user: Uint8Array;
  epoch: number;
}

export interface getUserLockedInfo_output {
  lockedAmount: bigint;
}

export interface getStateOfRound_input {
  epoch: number;
}

export interface getStateOfRound_output {
  state: number;
}

export interface getUserLockStatus_input {
  user: Uint8Array;
}

export interface getUserLockStatus_output {
  status: bigint;
}

export interface getEndedStatus_input {
  user: Uint8Array;
}

export interface getEndedStatus_output {
  fullyUnlockedAmount: bigint;
  fullyRewardedAmount: bigint;
  earlyUnlockedAmount: bigint;
  earlyRewardedAmount: bigint;
}

export type lock_input = Record<string, never>;


export interface lock_output {
  returnCode: number;
}

export interface unlock_input {
  amount: bigint;
  lockedEpoch: number;
}

export interface unlock_output {
  returnCode: number;
}

export interface getStatsPerEpoch_input {
  epoch: number;
}

export interface getStatsPerEpoch_output {
  earlyUnlockedAmount: bigint;
  earlyUnlockedPercent: bigint;
  totalLockedAmount: bigint;
  averageAPY: bigint;
}

export type getBurnedAndBoostedStats_input = Record<string, never>;


export interface getBurnedAndBoostedStats_output {
  burnedAmount: bigint;
  averageBurnedPercent: bigint;
  boostedAmount: bigint;
  averageBoostedPercent: bigint;
  rewardedAmount: bigint;
  averageRewardedPercent: bigint;
}

export interface getBurnedAndBoostedStatsPerEpoch_input {
  epoch: number;
}

export interface getBurnedAndBoostedStatsPerEpoch_output {
  burnedAmount: bigint;
  burnedPercent: bigint;
  boostedAmount: bigint;
  boostedPercent: bigint;
  rewardedAmount: bigint;
  rewardedPercent: bigint;
}

export interface RoundInfo {
  _totalLockedAmount: bigint;
  _epochBonusAmount: bigint;
}

export interface EpochIndexInfo {
  startIndex: number;
  endIndex: number;
}

export interface LockInfo {
  _lockedAmount: bigint;
  ID: Uint8Array;
  _lockedEpoch: number;
}

export interface HistoryInfo {
  _unlockedAmount: bigint;
  _rewardedAmount: bigint;
  _unlockedID: Uint8Array;
}

export interface StatsInfo {
  burnedAmount: bigint;
  boostedAmount: bigint;
  rewardedAmount: bigint;
}

export interface getStateOfRound_locals {
  firstEpoch: number;
}

export interface getStatsPerEpoch_locals {
  entity: any;
}

export interface getBurnedAndBoostedStats_locals {
  _t: number;
}

export interface getUserLockedInfo_locals {
  _t: number;
  startIndex: number;
  endIndex: number;
}

export interface getUserLockStatus_locals {
  bn: bigint;
  _t: number;
  _r: number;
  endIndex: number;
  lockedWeeks: number;
}

export interface getEndedStatus_locals {
  _t: number;
}

export interface lock_locals {
  newLocker: any;
  updatedRoundInfo: any;
  tmpIndex: any;
  log: any;
  t: number;
  endIndex: number;
}

export interface unlock_locals {
  updatedRoundInfo: any;
  updatedUserInfo: any;
  unlockerInfo: any;
  tmpStats: any;
  log: any;
  amountOfUnlocking: bigint;
  amountOfReward: bigint;
  amountOfburn: bigint;
  rewardPercent: bigint;
  transferAmount: bigint;
  divCalcu: bigint;
  earlyUnlockingPercent: number;
  burnPercent: number;
  indexOfinvocator: number;
  _t: number;
  countOfLastVacancy: number;
  countOfLockedEpochs: number;
  startIndex: number;
  endIndex: number;
}

export interface BEGIN_EPOCH_locals {
  INITIALIZE_HISTORY: any;
  INITIALIZE_USER: any;
  INITIALIZE_ROUNDINFO: any;
  INITIALIZE_STATS: any;
  t: number;
  status: number;
  pre_epoch_balance: bigint;
  current_balance: bigint;
  entity: any;
  locked_epoch: number;
}

export interface END_EPOCH_locals {
  INITIALIZE_HISTORY: any;
  INITIALIZE_USER: any;
  INITIALIZE_ROUNDINFO: any;
  tmpEpochIndex: any;
  tmpStats: any;
  log: any;
  _rewardPercent: bigint;
  _rewardAmount: bigint;
  _burnAmount: bigint;
  transferAmount: bigint;
  lockedEpoch: number;
  startEpoch: number;
  _t: number;
  st: number;
  en: number;
  endIndex: number;
}

const schemas: Record<string, Schema> = {
  QEARNLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "sourcePublicKey", type: "id" },
  { name: "destinationPublicKey", type: "id" },
  { name: "amount", type: "i64" },
  { name: "_type", type: "u32" },
  { name: "_terminator", type: "i8" },
]},
  QEARN2: { kind: "struct", fields: [
]},
  getLockInfoPerEpoch_input: { kind: "struct", fields: [
  { name: "Epoch", type: "u32" },
]},
  getLockInfoPerEpoch_output: { kind: "struct", fields: [
  { name: "lockedAmount", type: "u64" },
  { name: "bonusAmount", type: "u64" },
  { name: "currentLockedAmount", type: "u64" },
  { name: "currentBonusAmount", type: "u64" },
  { name: "yield", type: "u64" },
]},
  getUserLockedInfo_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
  { name: "epoch", type: "u32" },
]},
  getUserLockedInfo_output: { kind: "struct", fields: [
  { name: "lockedAmount", type: "u64" },
]},
  getStateOfRound_input: { kind: "struct", fields: [
  { name: "epoch", type: "u32" },
]},
  getStateOfRound_output: { kind: "struct", fields: [
  { name: "state", type: "u32" },
]},
  getUserLockStatus_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
]},
  getUserLockStatus_output: { kind: "struct", fields: [
  { name: "status", type: "u64" },
]},
  getEndedStatus_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
]},
  getEndedStatus_output: { kind: "struct", fields: [
  { name: "fullyUnlockedAmount", type: "u64" },
  { name: "fullyRewardedAmount", type: "u64" },
  { name: "earlyUnlockedAmount", type: "u64" },
  { name: "earlyRewardedAmount", type: "u64" },
]},
  lock_input: { kind: "struct", fields: [
]},
  lock_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  unlock_input: { kind: "struct", fields: [
  { name: "amount", type: "u64" },
  { name: "lockedEpoch", type: "u32" },
]},
  unlock_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  getStatsPerEpoch_input: { kind: "struct", fields: [
  { name: "epoch", type: "u32" },
]},
  getStatsPerEpoch_output: { kind: "struct", fields: [
  { name: "earlyUnlockedAmount", type: "u64" },
  { name: "earlyUnlockedPercent", type: "u64" },
  { name: "totalLockedAmount", type: "u64" },
  { name: "averageAPY", type: "u64" },
]},
  getBurnedAndBoostedStats_input: { kind: "struct", fields: [
]},
  getBurnedAndBoostedStats_output: { kind: "struct", fields: [
  { name: "burnedAmount", type: "u64" },
  { name: "averageBurnedPercent", type: "u64" },
  { name: "boostedAmount", type: "u64" },
  { name: "averageBoostedPercent", type: "u64" },
  { name: "rewardedAmount", type: "u64" },
  { name: "averageRewardedPercent", type: "u64" },
]},
  getBurnedAndBoostedStatsPerEpoch_input: { kind: "struct", fields: [
  { name: "epoch", type: "u32" },
]},
  getBurnedAndBoostedStatsPerEpoch_output: { kind: "struct", fields: [
  { name: "burnedAmount", type: "u64" },
  { name: "burnedPercent", type: "u64" },
  { name: "boostedAmount", type: "u64" },
  { name: "boostedPercent", type: "u64" },
  { name: "rewardedAmount", type: "u64" },
  { name: "rewardedPercent", type: "u64" },
]},
  RoundInfo: { kind: "struct", fields: [
  { name: "_totalLockedAmount", type: "u64" },
  { name: "_epochBonusAmount", type: "u64" },
]},
  EpochIndexInfo: { kind: "struct", fields: [
  { name: "startIndex", type: "u32" },
  { name: "endIndex", type: "u32" },
]},
  LockInfo: { kind: "struct", fields: [
  { name: "_lockedAmount", type: "u64" },
  { name: "ID", type: "id" },
  { name: "_lockedEpoch", type: "u32" },
]},
  HistoryInfo: { kind: "struct", fields: [
  { name: "_unlockedAmount", type: "u64" },
  { name: "_rewardedAmount", type: "u64" },
  { name: "_unlockedID", type: "id" },
]},
  StatsInfo: { kind: "struct", fields: [
  { name: "burnedAmount", type: "u64" },
  { name: "boostedAmount", type: "u64" },
  { name: "rewardedAmount", type: "u64" },
]},
  getStateOfRound_locals: { kind: "struct", fields: [
  { name: "firstEpoch", type: "u32" },
]},
  getStatsPerEpoch_locals: { kind: "struct", fields: [
  { name: "entity", type: { bytes: 0 } },
]},
  getBurnedAndBoostedStats_locals: { kind: "struct", fields: [
  { name: "_t", type: "u32" },
]},
  getUserLockedInfo_locals: { kind: "struct", fields: [
  { name: "_t", type: "u32" },
  { name: "startIndex", type: "u32" },
  { name: "endIndex", type: "u32" },
]},
  getUserLockStatus_locals: { kind: "struct", fields: [
  { name: "bn", type: "u64" },
  { name: "_t", type: "u32" },
  { name: "_r", type: "u32" },
  { name: "endIndex", type: "u32" },
  { name: "lockedWeeks", type: "u8" },
]},
  getEndedStatus_locals: { kind: "struct", fields: [
  { name: "_t", type: "u32" },
]},
  lock_locals: { kind: "struct", fields: [
  { name: "newLocker", type: { bytes: 0 } },
  { name: "updatedRoundInfo", type: { bytes: 0 } },
  { name: "tmpIndex", type: { bytes: 0 } },
  { name: "log", type: { bytes: 0 } },
  { name: "t", type: "u32" },
  { name: "endIndex", type: "u32" },
]},
  unlock_locals: { kind: "struct", fields: [
  { name: "updatedRoundInfo", type: { bytes: 0 } },
  { name: "updatedUserInfo", type: { bytes: 0 } },
  { name: "unlockerInfo", type: { bytes: 0 } },
  { name: "tmpStats", type: { bytes: 0 } },
  { name: "log", type: { bytes: 0 } },
  { name: "amountOfUnlocking", type: "u64" },
  { name: "amountOfReward", type: "u64" },
  { name: "amountOfburn", type: "u64" },
  { name: "rewardPercent", type: "u64" },
  { name: "transferAmount", type: "i64" },
  { name: "divCalcu", type: "i64" },
  { name: "earlyUnlockingPercent", type: "u32" },
  { name: "burnPercent", type: "u32" },
  { name: "indexOfinvocator", type: "u32" },
  { name: "_t", type: "u32" },
  { name: "countOfLastVacancy", type: "u32" },
  { name: "countOfLockedEpochs", type: "u32" },
  { name: "startIndex", type: "u32" },
  { name: "endIndex", type: "u32" },
]},
  BEGIN_EPOCH_locals: { kind: "struct", fields: [
  { name: "INITIALIZE_HISTORY", type: { bytes: 0 } },
  { name: "INITIALIZE_USER", type: { bytes: 0 } },
  { name: "INITIALIZE_ROUNDINFO", type: { bytes: 0 } },
  { name: "INITIALIZE_STATS", type: { bytes: 0 } },
  { name: "t", type: "u32" },
  { name: "status", type: "u8" },
  { name: "pre_epoch_balance", type: "u64" },
  { name: "current_balance", type: "u64" },
  { name: "entity", type: { bytes: 0 } },
  { name: "locked_epoch", type: "u32" },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "INITIALIZE_HISTORY", type: { bytes: 0 } },
  { name: "INITIALIZE_USER", type: { bytes: 0 } },
  { name: "INITIALIZE_ROUNDINFO", type: { bytes: 0 } },
  { name: "tmpEpochIndex", type: { bytes: 0 } },
  { name: "tmpStats", type: { bytes: 0 } },
  { name: "log", type: { bytes: 0 } },
  { name: "_rewardPercent", type: "u64" },
  { name: "_rewardAmount", type: "u64" },
  { name: "_burnAmount", type: "u64" },
  { name: "transferAmount", type: "i64" },
  { name: "lockedEpoch", type: "u32" },
  { name: "startEpoch", type: "u32" },
  { name: "_t", type: "u32" },
  { name: "st", type: "i32" },
  { name: "en", type: "i32" },
  { name: "endIndex", type: "u32" },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "Qearn",
  contractIndex: 9,
  functions: [
    { name: "getLockInfoPerEpoch", selector: 1, input: "getLockInfoPerEpoch_input", output: "getLockInfoPerEpoch_output", inputSchema: schemas["getLockInfoPerEpoch_input"], outputSchema: schemas["getLockInfoPerEpoch_output"] },
    { name: "getUserLockedInfo", selector: 2, input: "getUserLockedInfo_input", output: "getUserLockedInfo_output", inputSchema: schemas["getUserLockedInfo_input"], outputSchema: schemas["getUserLockedInfo_output"] },
    { name: "getStateOfRound", selector: 3, input: "getStateOfRound_input", output: "getStateOfRound_output", inputSchema: schemas["getStateOfRound_input"], outputSchema: schemas["getStateOfRound_output"] },
    { name: "getUserLockStatus", selector: 4, input: "getUserLockStatus_input", output: "getUserLockStatus_output", inputSchema: schemas["getUserLockStatus_input"], outputSchema: schemas["getUserLockStatus_output"] },
    { name: "getEndedStatus", selector: 5, input: "getEndedStatus_input", output: "getEndedStatus_output", inputSchema: schemas["getEndedStatus_input"], outputSchema: schemas["getEndedStatus_output"] },
    { name: "getStatsPerEpoch", selector: 6, input: "getStatsPerEpoch_input", output: "getStatsPerEpoch_output", inputSchema: schemas["getStatsPerEpoch_input"], outputSchema: schemas["getStatsPerEpoch_output"] },
    { name: "getBurnedAndBoostedStats", selector: 7, input: "getBurnedAndBoostedStats_input", output: "getBurnedAndBoostedStats_output", inputSchema: schemas["getBurnedAndBoostedStats_input"], outputSchema: schemas["getBurnedAndBoostedStats_output"] },
    { name: "getBurnedAndBoostedStatsPerEpoch", selector: 8, input: "getBurnedAndBoostedStatsPerEpoch_input", output: "getBurnedAndBoostedStatsPerEpoch_output", inputSchema: schemas["getBurnedAndBoostedStatsPerEpoch_input"], outputSchema: schemas["getBurnedAndBoostedStatsPerEpoch_output"] },
  ],
  procedures: [
    { name: "lock", selector: 1, input: "lock_input", output: "lock_output", inputSchema: schemas["lock_input"], outputSchema: schemas["lock_output"] },
    { name: "unlock", selector: 2, input: "unlock_input", output: "unlock_output", inputSchema: schemas["unlock_input"], outputSchema: schemas["unlock_output"] },
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
  async getLockInfoPerEpoch(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getLockInfoPerEpoch_input): Promise<getLockInfoPerEpoch_output> {
    const payload = encodeInput("getLockInfoPerEpoch_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getLockInfoPerEpoch_output", raw) as getLockInfoPerEpoch_output;
  },
  async getUserLockedInfo(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getUserLockedInfo_input): Promise<getUserLockedInfo_output> {
    const payload = encodeInput("getUserLockedInfo_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getUserLockedInfo_output", raw) as getUserLockedInfo_output;
  },
  async getStateOfRound(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getStateOfRound_input): Promise<getStateOfRound_output> {
    const payload = encodeInput("getStateOfRound_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getStateOfRound_output", raw) as getStateOfRound_output;
  },
  async getUserLockStatus(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getUserLockStatus_input): Promise<getUserLockStatus_output> {
    const payload = encodeInput("getUserLockStatus_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getUserLockStatus_output", raw) as getUserLockStatus_output;
  },
  async getEndedStatus(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getEndedStatus_input): Promise<getEndedStatus_output> {
    const payload = encodeInput("getEndedStatus_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getEndedStatus_output", raw) as getEndedStatus_output;
  },
  async getStatsPerEpoch(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getStatsPerEpoch_input): Promise<getStatsPerEpoch_output> {
    const payload = encodeInput("getStatsPerEpoch_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getStatsPerEpoch_output", raw) as getStatsPerEpoch_output;
  },
  async getBurnedAndBoostedStats(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getBurnedAndBoostedStats_input): Promise<getBurnedAndBoostedStats_output> {
    const payload = encodeInput("getBurnedAndBoostedStats_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getBurnedAndBoostedStats_output", raw) as getBurnedAndBoostedStats_output;
  },
  async getBurnedAndBoostedStatsPerEpoch(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getBurnedAndBoostedStatsPerEpoch_input): Promise<getBurnedAndBoostedStatsPerEpoch_output> {
    const payload = encodeInput("getBurnedAndBoostedStatsPerEpoch_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getBurnedAndBoostedStatsPerEpoch_output", raw) as getBurnedAndBoostedStatsPerEpoch_output;
  },
};

export const procedures = {
  lock(input: lock_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("lock_input", input);
    return { inputType: 1, payload };
  },
  unlock(input: unlock_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("unlock_input", input);
    return { inputType: 2, payload };
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
      getLockInfoPerEpoch: async (input: getLockInfoPerEpoch_input): Promise<getLockInfoPerEpoch_output> => functions.getLockInfoPerEpoch(client, contractIndex, input),
      getUserLockedInfo: async (input: getUserLockedInfo_input): Promise<getUserLockedInfo_output> => functions.getUserLockedInfo(client, contractIndex, input),
      getStateOfRound: async (input: getStateOfRound_input): Promise<getStateOfRound_output> => functions.getStateOfRound(client, contractIndex, input),
      getUserLockStatus: async (input: getUserLockStatus_input): Promise<getUserLockStatus_output> => functions.getUserLockStatus(client, contractIndex, input),
      getEndedStatus: async (input: getEndedStatus_input): Promise<getEndedStatus_output> => functions.getEndedStatus(client, contractIndex, input),
      getStatsPerEpoch: async (input: getStatsPerEpoch_input): Promise<getStatsPerEpoch_output> => functions.getStatsPerEpoch(client, contractIndex, input),
      getBurnedAndBoostedStats: async (input: getBurnedAndBoostedStats_input): Promise<getBurnedAndBoostedStats_output> => functions.getBurnedAndBoostedStats(client, contractIndex, input),
      getBurnedAndBoostedStatsPerEpoch: async (input: getBurnedAndBoostedStatsPerEpoch_input): Promise<getBurnedAndBoostedStatsPerEpoch_output> => functions.getBurnedAndBoostedStatsPerEpoch(client, contractIndex, input),
    },
    procedures: {
      lock: (input: lock_input) => procedures.lock(input),
      unlock: (input: unlock_input) => procedures.unlock(input),
    },
  };
}
