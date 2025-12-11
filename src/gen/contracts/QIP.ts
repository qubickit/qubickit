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

export interface QIPLogger {
  _contractIndex: number;
  _type: number;
  dst: Uint8Array;
  amt: bigint;
  _terminator: number;
}

export type QIP2 = Record<string, never>;


export interface createICO_input {
  issuer: Uint8Array;
  assetName: bigint;
  price1: bigint;
  price2: bigint;
  price3: bigint;
  saleAmountForPhase1: bigint;
  saleAmountForPhase2: bigint;
  saleAmountForPhase3: bigint;
  startEpoch: number;
}

export interface createICO_output {
  returnCode: number;
}

export interface buyToken_input {
  indexOfICO: number;
  amount: bigint;
}

export interface buyToken_output {
  returnCode: number;
}

export interface TransferShareManagementRights_input {
  asset: any;
  numberOfShares: bigint;
  newManagingContractIndex: number;
}

export interface TransferShareManagementRights_output {
  transferredNumberOfShares: bigint;
}

export interface getICOInfo_input {
  indexOfICO: number;
}

export interface getICOInfo_output {
  creatorOfICO: Uint8Array;
  issuer: Uint8Array;
  assetName: bigint;
  price1: bigint;
  price2: bigint;
  price3: bigint;
  saleAmountForPhase1: bigint;
  saleAmountForPhase2: bigint;
  saleAmountForPhase3: bigint;
  remainingAmountForPhase1: bigint;
  remainingAmountForPhase2: bigint;
  remainingAmountForPhase3: bigint;
  startEpoch: number;
}

export interface ICOInfo {
  creatorOfICO: Uint8Array;
  issuer: Uint8Array;
  assetName: bigint;
  price1: bigint;
  price2: bigint;
  price3: bigint;
  saleAmountForPhase1: bigint;
  saleAmountForPhase2: bigint;
  saleAmountForPhase3: bigint;
  remainingAmountForPhase1: bigint;
  remainingAmountForPhase2: bigint;
  remainingAmountForPhase3: bigint;
  startEpoch: number;
}

export interface getICOInfo_locals {
  ico: any;
}

export interface createICO_locals {
  newICO: any;
  log: any;
}

export interface buyToken_locals {
  ico: any;
  log: any;
}

export interface END_EPOCH_locals {
  ico: any;
  idx: number;
}

const schemas: Record<string, Schema> = {
  QIPLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "dst", type: "id" },
  { name: "amt", type: "i64" },
  { name: "_terminator", type: "i8" },
]},
  QIP2: { kind: "struct", fields: [
]},
  createICO_input: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price1", type: "u64" },
  { name: "price2", type: "u64" },
  { name: "price3", type: "u64" },
  { name: "saleAmountForPhase1", type: "u64" },
  { name: "saleAmountForPhase2", type: "u64" },
  { name: "saleAmountForPhase3", type: "u64" },
  { name: "startEpoch", type: "u32" },
]},
  createICO_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  buyToken_input: { kind: "struct", fields: [
  { name: "indexOfICO", type: "u32" },
  { name: "amount", type: "u64" },
]},
  buyToken_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  TransferShareManagementRights_input: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "numberOfShares", type: "i64" },
  { name: "newManagingContractIndex", type: "u32" },
]},
  TransferShareManagementRights_output: { kind: "struct", fields: [
  { name: "transferredNumberOfShares", type: "i64" },
]},
  getICOInfo_input: { kind: "struct", fields: [
  { name: "indexOfICO", type: "u32" },
]},
  getICOInfo_output: { kind: "struct", fields: [
  { name: "creatorOfICO", type: "id" },
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price1", type: "u64" },
  { name: "price2", type: "u64" },
  { name: "price3", type: "u64" },
  { name: "saleAmountForPhase1", type: "u64" },
  { name: "saleAmountForPhase2", type: "u64" },
  { name: "saleAmountForPhase3", type: "u64" },
  { name: "remainingAmountForPhase1", type: "u64" },
  { name: "remainingAmountForPhase2", type: "u64" },
  { name: "remainingAmountForPhase3", type: "u64" },
  { name: "startEpoch", type: "u32" },
]},
  ICOInfo: { kind: "struct", fields: [
  { name: "creatorOfICO", type: "id" },
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price1", type: "u64" },
  { name: "price2", type: "u64" },
  { name: "price3", type: "u64" },
  { name: "saleAmountForPhase1", type: "u64" },
  { name: "saleAmountForPhase2", type: "u64" },
  { name: "saleAmountForPhase3", type: "u64" },
  { name: "remainingAmountForPhase1", type: "u64" },
  { name: "remainingAmountForPhase2", type: "u64" },
  { name: "remainingAmountForPhase3", type: "u64" },
  { name: "startEpoch", type: "u32" },
]},
  getICOInfo_locals: { kind: "struct", fields: [
  { name: "ico", type: { bytes: 0 } },
]},
  createICO_locals: { kind: "struct", fields: [
  { name: "newICO", type: { bytes: 0 } },
  { name: "log", type: { bytes: 0 } },
]},
  buyToken_locals: { kind: "struct", fields: [
  { name: "ico", type: { bytes: 0 } },
  { name: "log", type: { bytes: 0 } },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "ico", type: { bytes: 0 } },
  { name: "idx", type: "u32" },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "QIP",
  contractIndex: 18,
  functions: [
    { name: "getICOInfo", selector: 1, input: "getICOInfo_input", output: "getICOInfo_output", inputSchema: schemas["getICOInfo_input"], outputSchema: schemas["getICOInfo_output"] },
  ],
  procedures: [
    { name: "createICO", selector: 1, input: "createICO_input", output: "createICO_output", inputSchema: schemas["createICO_input"], outputSchema: schemas["createICO_output"] },
    { name: "buyToken", selector: 2, input: "buyToken_input", output: "buyToken_output", inputSchema: schemas["buyToken_input"], outputSchema: schemas["buyToken_output"] },
    { name: "TransferShareManagementRights", selector: 3, input: "TransferShareManagementRights_input", output: "TransferShareManagementRights_output", inputSchema: schemas["TransferShareManagementRights_input"], outputSchema: schemas["TransferShareManagementRights_output"] },
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
  async getICOInfo(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getICOInfo_input): Promise<getICOInfo_output> {
    const payload = encodeInput("getICOInfo_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getICOInfo_output", raw) as getICOInfo_output;
  },
};

export const procedures = {
  createICO(input: createICO_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("createICO_input", input);
    return { inputType: 1, payload };
  },
  buyToken(input: buyToken_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("buyToken_input", input);
    return { inputType: 2, payload };
  },
  TransferShareManagementRights(input: TransferShareManagementRights_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferShareManagementRights_input", input);
    return { inputType: 3, payload };
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
      getICOInfo: async (input: getICOInfo_input): Promise<getICOInfo_output> => functions.getICOInfo(client, contractIndex, input),
    },
    procedures: {
      createICO: (input: createICO_input) => procedures.createICO(input),
      buyToken: (input: buyToken_input) => procedures.buyToken(input),
      TransferShareManagementRights: (input: TransferShareManagementRights_input) => procedures.TransferShareManagementRights(input),
    },
  };
}
