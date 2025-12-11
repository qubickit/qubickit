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

export type QVAULT2 = Record<string, never>;


export interface submitAuthAddress_input {
  newAddress: Uint8Array;
}

export type submitAuthAddress_output = Record<string, never>;


export interface changeAuthAddress_input {
  numberOfChangedAddress: number;
}

export type changeAuthAddress_output = Record<string, never>;


export interface submitDistributionPermille_input {
  newQCAPHolderPermille: number;
  newReinvestingPermille: number;
  newDevPermille: number;
}

export type submitDistributionPermille_output = Record<string, never>;


export interface changeDistributionPermille_input {
  newQCAPHolderPermille: number;
  newReinvestingPermille: number;
  newDevPermille: number;
}

export type changeDistributionPermille_output = Record<string, never>;


export interface submitReinvestingAddress_input {
  newAddress: Uint8Array;
}

export type submitReinvestingAddress_output = Record<string, never>;


export interface changeReinvestingAddress_input {
  newAddress: Uint8Array;
}

export type changeReinvestingAddress_output = Record<string, never>;


export type getData_input = Record<string, never>;


export interface getData_output {
  numberOfBannedAddress: bigint;
}

export interface submitAdminAddress_input {
  newAddress: Uint8Array;
}

export type submitAdminAddress_output = Record<string, never>;


export interface changeAdminAddress_input {
  newAddress: Uint8Array;
}

export type changeAdminAddress_output = Record<string, never>;


export interface submitBannedAddress_input {
  bannedAddress: Uint8Array;
}

export type submitBannedAddress_output = Record<string, never>;


export interface saveBannedAddress_input {
  bannedAddress: Uint8Array;
}

export type saveBannedAddress_output = Record<string, never>;


export interface submitUnbannedAddress_input {
  unbannedAddress: Uint8Array;
}

export type submitUnbannedAddress_output = Record<string, never>;


export interface unblockBannedAddress_input {
  unbannedAddress: Uint8Array;
}

export type unblockBannedAddress_output = Record<string, never>;


export interface changeAuthAddress_locals {
  succeed: number;
}

export type unblockBannedAddress_locals = Record<string, never>;


export interface END_EPOCH_locals {
  entity: any;
  iter: any;
  QCAPId: any;
  revenue: bigint;
  paymentForShareholders: bigint;
  paymentForQCAPHolders: bigint;
  paymentForReinvest: bigint;
  paymentForDevelopment: bigint;
  amountOfBurn: bigint;
  circulatedSupply: bigint;
  _t: number;
  possessorPubkey: Uint8Array;
}

const schemas: Record<string, Schema> = {
  QVAULT2: { kind: "struct", fields: [
]},
  submitAuthAddress_input: { kind: "struct", fields: [
  { name: "newAddress", type: "id" },
]},
  submitAuthAddress_output: { kind: "struct", fields: [
]},
  changeAuthAddress_input: { kind: "struct", fields: [
  { name: "numberOfChangedAddress", type: "u32" },
]},
  changeAuthAddress_output: { kind: "struct", fields: [
]},
  submitDistributionPermille_input: { kind: "struct", fields: [
  { name: "newQCAPHolderPermille", type: "u32" },
  { name: "newReinvestingPermille", type: "u32" },
  { name: "newDevPermille", type: "u32" },
]},
  submitDistributionPermille_output: { kind: "struct", fields: [
]},
  changeDistributionPermille_input: { kind: "struct", fields: [
  { name: "newQCAPHolderPermille", type: "u32" },
  { name: "newReinvestingPermille", type: "u32" },
  { name: "newDevPermille", type: "u32" },
]},
  changeDistributionPermille_output: { kind: "struct", fields: [
]},
  submitReinvestingAddress_input: { kind: "struct", fields: [
  { name: "newAddress", type: "id" },
]},
  submitReinvestingAddress_output: { kind: "struct", fields: [
]},
  changeReinvestingAddress_input: { kind: "struct", fields: [
  { name: "newAddress", type: "id" },
]},
  changeReinvestingAddress_output: { kind: "struct", fields: [
]},
  getData_input: { kind: "struct", fields: [
]},
  getData_output: { kind: "struct", fields: [
  { name: "numberOfBannedAddress", type: "u64" },
]},
  submitAdminAddress_input: { kind: "struct", fields: [
  { name: "newAddress", type: "id" },
]},
  submitAdminAddress_output: { kind: "struct", fields: [
]},
  changeAdminAddress_input: { kind: "struct", fields: [
  { name: "newAddress", type: "id" },
]},
  changeAdminAddress_output: { kind: "struct", fields: [
]},
  submitBannedAddress_input: { kind: "struct", fields: [
  { name: "bannedAddress", type: "id" },
]},
  submitBannedAddress_output: { kind: "struct", fields: [
]},
  saveBannedAddress_input: { kind: "struct", fields: [
  { name: "bannedAddress", type: "id" },
]},
  saveBannedAddress_output: { kind: "struct", fields: [
]},
  submitUnbannedAddress_input: { kind: "struct", fields: [
  { name: "unbannedAddress", type: "id" },
]},
  submitUnbannedAddress_output: { kind: "struct", fields: [
]},
  unblockBannedAddress_input: { kind: "struct", fields: [
  { name: "unbannedAddress", type: "id" },
]},
  unblockBannedAddress_output: { kind: "struct", fields: [
]},
  changeAuthAddress_locals: { kind: "struct", fields: [
  { name: "succeed", type: "u8" },
]},
  unblockBannedAddress_locals: { kind: "struct", fields: [
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "entity", type: { bytes: 0 } },
  { name: "iter", type: { bytes: 0 } },
  { name: "QCAPId", type: { bytes: 40 } },
  { name: "revenue", type: "u64" },
  { name: "paymentForShareholders", type: "u64" },
  { name: "paymentForQCAPHolders", type: "u64" },
  { name: "paymentForReinvest", type: "u64" },
  { name: "paymentForDevelopment", type: "u64" },
  { name: "amountOfBurn", type: "u64" },
  { name: "circulatedSupply", type: "u64" },
  { name: "_t", type: "u32" },
  { name: "possessorPubkey", type: "id" },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "QVAULT",
  contractIndex: 10,
  functions: [
    { name: "getData", selector: 1, input: "getData_input", output: "getData_output", inputSchema: schemas["getData_input"], outputSchema: schemas["getData_output"] },
  ],
  procedures: [
    { name: "submitAuthAddress", selector: 1, input: "submitAuthAddress_input", output: "submitAuthAddress_output", inputSchema: schemas["submitAuthAddress_input"], outputSchema: schemas["submitAuthAddress_output"] },
    { name: "changeAuthAddress", selector: 2, input: "changeAuthAddress_input", output: "changeAuthAddress_output", inputSchema: schemas["changeAuthAddress_input"], outputSchema: schemas["changeAuthAddress_output"] },
    { name: "submitDistributionPermille", selector: 3, input: "submitDistributionPermille_input", output: "submitDistributionPermille_output", inputSchema: schemas["submitDistributionPermille_input"], outputSchema: schemas["submitDistributionPermille_output"] },
    { name: "changeDistributionPermille", selector: 4, input: "changeDistributionPermille_input", output: "changeDistributionPermille_output", inputSchema: schemas["changeDistributionPermille_input"], outputSchema: schemas["changeDistributionPermille_output"] },
    { name: "submitReinvestingAddress", selector: 5, input: "submitReinvestingAddress_input", output: "submitReinvestingAddress_output", inputSchema: schemas["submitReinvestingAddress_input"], outputSchema: schemas["submitReinvestingAddress_output"] },
    { name: "changeReinvestingAddress", selector: 6, input: "changeReinvestingAddress_input", output: "changeReinvestingAddress_output", inputSchema: schemas["changeReinvestingAddress_input"], outputSchema: schemas["changeReinvestingAddress_output"] },
    { name: "submitAdminAddress", selector: 7, input: "submitAdminAddress_input", output: "submitAdminAddress_output", inputSchema: schemas["submitAdminAddress_input"], outputSchema: schemas["submitAdminAddress_output"] },
    { name: "changeAdminAddress", selector: 8, input: "changeAdminAddress_input", output: "changeAdminAddress_output", inputSchema: schemas["changeAdminAddress_input"], outputSchema: schemas["changeAdminAddress_output"] },
    { name: "submitBannedAddress", selector: 9, input: "submitBannedAddress_input", output: "submitBannedAddress_output", inputSchema: schemas["submitBannedAddress_input"], outputSchema: schemas["submitBannedAddress_output"] },
    { name: "saveBannedAddress", selector: 10, input: "saveBannedAddress_input", output: "saveBannedAddress_output", inputSchema: schemas["saveBannedAddress_input"], outputSchema: schemas["saveBannedAddress_output"] },
    { name: "submitUnbannedAddress", selector: 11, input: "submitUnbannedAddress_input", output: "submitUnbannedAddress_output", inputSchema: schemas["submitUnbannedAddress_input"], outputSchema: schemas["submitUnbannedAddress_output"] },
    { name: "unblockBannedAddress", selector: 12, input: "unblockBannedAddress_input", output: "unblockBannedAddress_output", inputSchema: schemas["unblockBannedAddress_input"], outputSchema: schemas["unblockBannedAddress_output"] },
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
  async getData(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getData_input): Promise<getData_output> {
    const payload = encodeInput("getData_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getData_output", raw) as getData_output;
  },
};

export const procedures = {
  submitAuthAddress(input: submitAuthAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("submitAuthAddress_input", input);
    return { inputType: 1, payload };
  },
  changeAuthAddress(input: changeAuthAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("changeAuthAddress_input", input);
    return { inputType: 2, payload };
  },
  submitDistributionPermille(input: submitDistributionPermille_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("submitDistributionPermille_input", input);
    return { inputType: 3, payload };
  },
  changeDistributionPermille(input: changeDistributionPermille_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("changeDistributionPermille_input", input);
    return { inputType: 4, payload };
  },
  submitReinvestingAddress(input: submitReinvestingAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("submitReinvestingAddress_input", input);
    return { inputType: 5, payload };
  },
  changeReinvestingAddress(input: changeReinvestingAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("changeReinvestingAddress_input", input);
    return { inputType: 6, payload };
  },
  submitAdminAddress(input: submitAdminAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("submitAdminAddress_input", input);
    return { inputType: 7, payload };
  },
  changeAdminAddress(input: changeAdminAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("changeAdminAddress_input", input);
    return { inputType: 8, payload };
  },
  submitBannedAddress(input: submitBannedAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("submitBannedAddress_input", input);
    return { inputType: 9, payload };
  },
  saveBannedAddress(input: saveBannedAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("saveBannedAddress_input", input);
    return { inputType: 10, payload };
  },
  submitUnbannedAddress(input: submitUnbannedAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("submitUnbannedAddress_input", input);
    return { inputType: 11, payload };
  },
  unblockBannedAddress(input: unblockBannedAddress_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("unblockBannedAddress_input", input);
    return { inputType: 12, payload };
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
      getData: async (input: getData_input): Promise<getData_output> => functions.getData(client, contractIndex, input),
    },
    procedures: {
      submitAuthAddress: (input: submitAuthAddress_input) => procedures.submitAuthAddress(input),
      changeAuthAddress: (input: changeAuthAddress_input) => procedures.changeAuthAddress(input),
      submitDistributionPermille: (input: submitDistributionPermille_input) => procedures.submitDistributionPermille(input),
      changeDistributionPermille: (input: changeDistributionPermille_input) => procedures.changeDistributionPermille(input),
      submitReinvestingAddress: (input: submitReinvestingAddress_input) => procedures.submitReinvestingAddress(input),
      changeReinvestingAddress: (input: changeReinvestingAddress_input) => procedures.changeReinvestingAddress(input),
      submitAdminAddress: (input: submitAdminAddress_input) => procedures.submitAdminAddress(input),
      changeAdminAddress: (input: changeAdminAddress_input) => procedures.changeAdminAddress(input),
      submitBannedAddress: (input: submitBannedAddress_input) => procedures.submitBannedAddress(input),
      saveBannedAddress: (input: saveBannedAddress_input) => procedures.saveBannedAddress(input),
      submitUnbannedAddress: (input: submitUnbannedAddress_input) => procedures.submitUnbannedAddress(input),
      unblockBannedAddress: (input: unblockBannedAddress_input) => procedures.unblockBannedAddress(input),
    },
  };
}
