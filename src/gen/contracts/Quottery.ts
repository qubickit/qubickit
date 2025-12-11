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

export interface QUOTTERYLogger {
  _contractIndex: number;
  _type: number;
  _terminator: number;
}

export type QUOTTERY2 = Record<string, never>;


export type basicInfo_input = Record<string, never>;


export interface basicInfo_output {
  feePerSlotPerHour: bigint;
  gameOperatorFee: bigint;
  shareholderFee: bigint;
  minBetSlotAmount: bigint;
  burnFee: bigint;
  nIssuedBet: number;
  moneyFlow: bigint;
  moneyFlowThroughIssueBet: bigint;
  moneyFlowThroughJoinBet: bigint;
  moneyFlowThroughFinalizeBet: bigint;
  earnedAmountForShareHolder: bigint;
  paidAmountForShareHolder: bigint;
  earnedAmountForBetWinner: bigint;
  distributedAmount: bigint;
  burnedAmount: bigint;
  gameOperator: Uint8Array;
}

export interface getBetInfo_input {
  betId: number;
}

export interface getBetInfo_output {
  betId: number;
  nOption: number;
  creator: Uint8Array;
  betDesc: Uint8Array;
  optionDesc: any;
  oracleProviderId: any;
  oracleFees: any;
  openDate: number;
  closeDate: number;
  endDate: number;
  minBetAmount: bigint;
  maxBetSlotPerOption: number;
  currentBetState: any;
  betResultWonOption: any;
  betResultOPId: any;
}

export interface issueBet_input {
  betDesc: Uint8Array;
  optionDesc: any;
  oracleProviderId: any;
  oracleFees: any;
  closeDate: number;
  endDate: number;
  amountPerSlot: bigint;
  maxBetSlotPerOption: number;
  numberOfOption: number;
}

export type issueBet_output = Record<string, never>;


export interface joinBet_input {
  betId: number;
  numberOfSlot: number;
  option: number;
  _placeHolder: number;
}

export type joinBet_output = Record<string, never>;


export interface getBetOptionDetail_input {
  betId: number;
  betOption: number;
}

export type getBetOptionDetail_output = Record<string, never>;


export type getActiveBet_input = Record<string, never>;


export interface getActiveBet_output {
  count: number;
}

export interface getBetByCreator_input {
  creator: Uint8Array;
}

export interface getBetByCreator_output {
  count: number;
}

export interface cancelBet_input {
  betId: number;
}

export type cancelBet_output = Record<string, never>;


export interface publishResult_input {
  betId: number;
  option: number;
}

export type publishResult_output = Record<string, never>;


export interface cleanMemorySlot_input {
  slotId: bigint;
}

export type cleanMemorySlot_output = Record<string, never>;


export type cleanMemorySlot_locals = Record<string, never>;


export interface tryFinalizeBet_input {
  betId: number;
  slotId: bigint;
}

export type tryFinalizeBet_output = Record<string, never>;


export interface tryFinalizeBet_locals {
  log: any;
}

export type checkAndCleanMemorySlots_input = Record<string, never>;


export type checkAndCleanMemorySlots_output = Record<string, never>;


export interface checkAndCleanMemorySlots_locals {
  i: any;
  cms: any;
  _cleanMemorySlot_input: any;
  _cleanMemorySlot_output: any;
}

export interface getBetInfo_locals {
  slotId: bigint;
}

export interface getBetOptionDetail_locals {
  slotId: bigint;
  i0: number;
}

export interface getActiveBet_locals {
  slotId: bigint;
}

export interface getBetByCreator_locals {
  slotId: bigint;
}

export interface issueBet_locals {
  curDate: number;
  numberOP: number;
  fee: bigint;
  numberOfOption: number;
  betId: number;
  slotId: bigint;
  _checkAndCleanMemorySlots_input: any;
  _checkAndCleanMemorySlots_output: any;
  _checkAndCleanMemorySlots_locals: any;
  log: any;
}

export interface joinBet_locals {
  baseId0: bigint;
  availableSlotForBet: number;
  slotId: bigint;
  log: any;
}

export interface publishResult_locals {
  i0: number;
  baseId0: bigint;
  opId: number;
  log: any;
  tfb: any;
  _tryFinalizeBet_input: any;
  _tryFinalizeBet_output: any;
}

export interface cancelBet_locals {
  amountPerSlot: bigint;
  slotId: bigint;
  log: any;
  cms: any;
  _cleanMemorySlot_input: any;
  _cleanMemorySlot_output: any;
}

const schemas: Record<string, Schema> = {
  QUOTTERYLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "_terminator", type: "i8" },
]},
  QUOTTERY2: { kind: "struct", fields: [
]},
  basicInfo_input: { kind: "struct", fields: [
]},
  basicInfo_output: { kind: "struct", fields: [
  { name: "feePerSlotPerHour", type: "u64" },
  { name: "gameOperatorFee", type: "u64" },
  { name: "shareholderFee", type: "u64" },
  { name: "minBetSlotAmount", type: "u64" },
  { name: "burnFee", type: "u64" },
  { name: "nIssuedBet", type: "u32" },
  { name: "moneyFlow", type: "u64" },
  { name: "moneyFlowThroughIssueBet", type: "u64" },
  { name: "moneyFlowThroughJoinBet", type: "u64" },
  { name: "moneyFlowThroughFinalizeBet", type: "u64" },
  { name: "earnedAmountForShareHolder", type: "u64" },
  { name: "paidAmountForShareHolder", type: "u64" },
  { name: "earnedAmountForBetWinner", type: "u64" },
  { name: "distributedAmount", type: "u64" },
  { name: "burnedAmount", type: "u64" },
  { name: "gameOperator", type: "id" },
]},
  getBetInfo_input: { kind: "struct", fields: [
  { name: "betId", type: "u32" },
]},
  getBetInfo_output: { kind: "struct", fields: [
  { name: "betId", type: "u32" },
  { name: "nOption", type: "u32" },
  { name: "creator", type: "id" },
  { name: "betDesc", type: "id" },
  { name: "optionDesc", type: { bytes: 0 } },
  { name: "oracleProviderId", type: { bytes: 0 } },
  { name: "oracleFees", type: { bytes: 0 } },
  { name: "openDate", type: "u32" },
  { name: "closeDate", type: "u32" },
  { name: "endDate", type: "u32" },
  { name: "minBetAmount", type: "u64" },
  { name: "maxBetSlotPerOption", type: "u32" },
  { name: "currentBetState", type: { bytes: 0 } },
  { name: "betResultWonOption", type: { bytes: 0 } },
  { name: "betResultOPId", type: { bytes: 0 } },
]},
  issueBet_input: { kind: "struct", fields: [
  { name: "betDesc", type: "id" },
  { name: "optionDesc", type: { bytes: 0 } },
  { name: "oracleProviderId", type: { bytes: 0 } },
  { name: "oracleFees", type: { bytes: 0 } },
  { name: "closeDate", type: "u32" },
  { name: "endDate", type: "u32" },
  { name: "amountPerSlot", type: "u64" },
  { name: "maxBetSlotPerOption", type: "u32" },
  { name: "numberOfOption", type: "u32" },
]},
  issueBet_output: { kind: "struct", fields: [
]},
  joinBet_input: { kind: "struct", fields: [
  { name: "betId", type: "u32" },
  { name: "numberOfSlot", type: "u32" },
  { name: "option", type: "u32" },
  { name: "_placeHolder", type: "u32" },
]},
  joinBet_output: { kind: "struct", fields: [
]},
  getBetOptionDetail_input: { kind: "struct", fields: [
  { name: "betId", type: "u32" },
  { name: "betOption", type: "u32" },
]},
  getBetOptionDetail_output: { kind: "struct", fields: [
]},
  getActiveBet_input: { kind: "struct", fields: [
]},
  getActiveBet_output: { kind: "struct", fields: [
  { name: "count", type: "u32" },
]},
  getBetByCreator_input: { kind: "struct", fields: [
  { name: "creator", type: "id" },
]},
  getBetByCreator_output: { kind: "struct", fields: [
  { name: "count", type: "u32" },
]},
  cancelBet_input: { kind: "struct", fields: [
  { name: "betId", type: "u32" },
]},
  cancelBet_output: { kind: "struct", fields: [
]},
  publishResult_input: { kind: "struct", fields: [
  { name: "betId", type: "u32" },
  { name: "option", type: "u32" },
]},
  publishResult_output: { kind: "struct", fields: [
]},
  cleanMemorySlot_input: { kind: "struct", fields: [
  { name: "slotId", type: "i64" },
]},
  cleanMemorySlot_output: { kind: "struct", fields: [
]},
  cleanMemorySlot_locals: { kind: "struct", fields: [
]},
  tryFinalizeBet_input: { kind: "struct", fields: [
  { name: "betId", type: "u32" },
  { name: "slotId", type: "i64" },
]},
  tryFinalizeBet_output: { kind: "struct", fields: [
]},
  tryFinalizeBet_locals: { kind: "struct", fields: [
  { name: "log", type: { bytes: 0 } },
]},
  checkAndCleanMemorySlots_input: { kind: "struct", fields: [
]},
  checkAndCleanMemorySlots_output: { kind: "struct", fields: [
]},
  checkAndCleanMemorySlots_locals: { kind: "struct", fields: [
  { name: "i", type: { bytes: 0 } },
  { name: "cms", type: { bytes: 0 } },
  { name: "_cleanMemorySlot_input", type: { bytes: 0 } },
  { name: "_cleanMemorySlot_output", type: { bytes: 0 } },
]},
  getBetInfo_locals: { kind: "struct", fields: [
  { name: "slotId", type: "i64" },
]},
  getBetOptionDetail_locals: { kind: "struct", fields: [
  { name: "slotId", type: "i64" },
  { name: "i0", type: "u32" },
]},
  getActiveBet_locals: { kind: "struct", fields: [
  { name: "slotId", type: "i64" },
]},
  getBetByCreator_locals: { kind: "struct", fields: [
  { name: "slotId", type: "i64" },
]},
  issueBet_locals: { kind: "struct", fields: [
  { name: "curDate", type: "u32" },
  { name: "numberOP", type: "i32" },
  { name: "fee", type: "i64" },
  { name: "numberOfOption", type: "u8" },
  { name: "betId", type: "u32" },
  { name: "slotId", type: "i64" },
  { name: "_checkAndCleanMemorySlots_input", type: { bytes: 0 } },
  { name: "_checkAndCleanMemorySlots_output", type: { bytes: 0 } },
  { name: "_checkAndCleanMemorySlots_locals", type: { bytes: 0 } },
  { name: "log", type: { bytes: 0 } },
]},
  joinBet_locals: { kind: "struct", fields: [
  { name: "baseId0", type: "u64" },
  { name: "availableSlotForBet", type: "u32" },
  { name: "slotId", type: "i64" },
  { name: "log", type: { bytes: 0 } },
]},
  publishResult_locals: { kind: "struct", fields: [
  { name: "i0", type: "i32" },
  { name: "baseId0", type: "u64" },
  { name: "opId", type: "i8" },
  { name: "log", type: { bytes: 0 } },
  { name: "tfb", type: { bytes: 0 } },
  { name: "_tryFinalizeBet_input", type: { bytes: 0 } },
  { name: "_tryFinalizeBet_output", type: { bytes: 0 } },
]},
  cancelBet_locals: { kind: "struct", fields: [
  { name: "amountPerSlot", type: "u64" },
  { name: "slotId", type: "i64" },
  { name: "log", type: { bytes: 0 } },
  { name: "cms", type: { bytes: 0 } },
  { name: "_cleanMemorySlot_input", type: { bytes: 0 } },
  { name: "_cleanMemorySlot_output", type: { bytes: 0 } },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "Quottery",
  contractIndex: 2,
  functions: [
    { name: "basicInfo", selector: 1, input: "basicInfo_input", output: "basicInfo_output", inputSchema: schemas["basicInfo_input"], outputSchema: schemas["basicInfo_output"] },
    { name: "getBetInfo", selector: 2, input: "getBetInfo_input", output: "getBetInfo_output", inputSchema: schemas["getBetInfo_input"], outputSchema: schemas["getBetInfo_output"] },
    { name: "getBetOptionDetail", selector: 3, input: "getBetOptionDetail_input", output: "getBetOptionDetail_output", inputSchema: schemas["getBetOptionDetail_input"], outputSchema: schemas["getBetOptionDetail_output"] },
    { name: "getActiveBet", selector: 4, input: "getActiveBet_input", output: "getActiveBet_output", inputSchema: schemas["getActiveBet_input"], outputSchema: schemas["getActiveBet_output"] },
    { name: "getBetByCreator", selector: 5, input: "getBetByCreator_input", output: "getBetByCreator_output", inputSchema: schemas["getBetByCreator_input"], outputSchema: schemas["getBetByCreator_output"] },
  ],
  procedures: [
    { name: "issueBet", selector: 1, input: "issueBet_input", output: "issueBet_output", inputSchema: schemas["issueBet_input"], outputSchema: schemas["issueBet_output"] },
    { name: "joinBet", selector: 2, input: "joinBet_input", output: "joinBet_output", inputSchema: schemas["joinBet_input"], outputSchema: schemas["joinBet_output"] },
    { name: "cancelBet", selector: 3, input: "cancelBet_input", output: "cancelBet_output", inputSchema: schemas["cancelBet_input"], outputSchema: schemas["cancelBet_output"] },
    { name: "publishResult", selector: 4, input: "publishResult_input", output: "publishResult_output", inputSchema: schemas["publishResult_input"], outputSchema: schemas["publishResult_output"] },
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
  async basicInfo(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: basicInfo_input): Promise<basicInfo_output> {
    const payload = encodeInput("basicInfo_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("basicInfo_output", raw) as basicInfo_output;
  },
  async getBetInfo(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getBetInfo_input): Promise<getBetInfo_output> {
    const payload = encodeInput("getBetInfo_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getBetInfo_output", raw) as getBetInfo_output;
  },
  async getBetOptionDetail(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getBetOptionDetail_input): Promise<getBetOptionDetail_output> {
    const payload = encodeInput("getBetOptionDetail_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getBetOptionDetail_output", raw) as getBetOptionDetail_output;
  },
  async getActiveBet(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getActiveBet_input): Promise<getActiveBet_output> {
    const payload = encodeInput("getActiveBet_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getActiveBet_output", raw) as getActiveBet_output;
  },
  async getBetByCreator(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getBetByCreator_input): Promise<getBetByCreator_output> {
    const payload = encodeInput("getBetByCreator_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getBetByCreator_output", raw) as getBetByCreator_output;
  },
};

export const procedures = {
  issueBet(input: issueBet_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("issueBet_input", input);
    return { inputType: 1, payload };
  },
  joinBet(input: joinBet_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("joinBet_input", input);
    return { inputType: 2, payload };
  },
  cancelBet(input: cancelBet_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("cancelBet_input", input);
    return { inputType: 3, payload };
  },
  publishResult(input: publishResult_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("publishResult_input", input);
    return { inputType: 4, payload };
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
      basicInfo: async (input: basicInfo_input): Promise<basicInfo_output> => functions.basicInfo(client, contractIndex, input),
      getBetInfo: async (input: getBetInfo_input): Promise<getBetInfo_output> => functions.getBetInfo(client, contractIndex, input),
      getBetOptionDetail: async (input: getBetOptionDetail_input): Promise<getBetOptionDetail_output> => functions.getBetOptionDetail(client, contractIndex, input),
      getActiveBet: async (input: getActiveBet_input): Promise<getActiveBet_output> => functions.getActiveBet(client, contractIndex, input),
      getBetByCreator: async (input: getBetByCreator_input): Promise<getBetByCreator_output> => functions.getBetByCreator(client, contractIndex, input),
    },
    procedures: {
      issueBet: (input: issueBet_input) => procedures.issueBet(input),
      joinBet: (input: joinBet_input) => procedures.joinBet(input),
      cancelBet: (input: cancelBet_input) => procedures.cancelBet(input),
      publishResult: (input: publishResult_input) => procedures.publishResult(input),
    },
  };
}
