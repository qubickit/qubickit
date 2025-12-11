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

export type QDRAW2 = Record<string, never>;


export interface buyTicket_input {
  ticketCount: bigint;
}

export type buyTicket_output = Record<string, never>;


export type getInfo_input = Record<string, never>;


export interface getInfo_output {
  pot: bigint;
  participantCount: bigint;
  lastWinner: Uint8Array;
  lastWinAmount: bigint;
  lastDrawHour: number;
  currentHour: number;
  nextDrawHour: number;
}

export type getParticipants_input = Record<string, never>;


export interface getParticipants_output {
  participantCount: bigint;
  uniqueParticipantCount: bigint;
}

export interface buyTicket_locals {
  available: bigint;
  totalCost: bigint;
  i: bigint;
}

export interface getParticipants_locals {
  uniqueCount: bigint;
  i: bigint;
  j: bigint;
  found: any;
  p: Uint8Array;
}

export interface BEGIN_TICK_locals {
  currentHour: number;
  only: Uint8Array;
  rand: Uint8Array;
  winner: Uint8Array;
  loopIndex: bigint;
}

const schemas: Record<string, Schema> = {
  QDRAW2: { kind: "struct", fields: [
]},
  buyTicket_input: { kind: "struct", fields: [
  { name: "ticketCount", type: "u64" },
]},
  buyTicket_output: { kind: "struct", fields: [
]},
  getInfo_input: { kind: "struct", fields: [
]},
  getInfo_output: { kind: "struct", fields: [
  { name: "pot", type: "i64" },
  { name: "participantCount", type: "u64" },
  { name: "lastWinner", type: "id" },
  { name: "lastWinAmount", type: "i64" },
  { name: "lastDrawHour", type: "u8" },
  { name: "currentHour", type: "u8" },
  { name: "nextDrawHour", type: "u8" },
]},
  getParticipants_input: { kind: "struct", fields: [
]},
  getParticipants_output: { kind: "struct", fields: [
  { name: "participantCount", type: "u64" },
  { name: "uniqueParticipantCount", type: "u64" },
]},
  buyTicket_locals: { kind: "struct", fields: [
  { name: "available", type: "u64" },
  { name: "totalCost", type: "i64" },
  { name: "i", type: "u64" },
]},
  getParticipants_locals: { kind: "struct", fields: [
  { name: "uniqueCount", type: "u64" },
  { name: "i", type: "u64" },
  { name: "j", type: "u64" },
  { name: "found", type: { bytes: 0 } },
  { name: "p", type: "id" },
]},
  BEGIN_TICK_locals: { kind: "struct", fields: [
  { name: "currentHour", type: "u8" },
  { name: "only", type: "id" },
  { name: "rand", type: "id" },
  { name: "winner", type: "id" },
  { name: "loopIndex", type: "u64" },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "Qdraw",
  contractIndex: 15,
  functions: [
    { name: "getInfo", selector: 2, input: "getInfo_input", output: "getInfo_output", inputSchema: schemas["getInfo_input"], outputSchema: schemas["getInfo_output"] },
    { name: "getParticipants", selector: 3, input: "getParticipants_input", output: "getParticipants_output", inputSchema: schemas["getParticipants_input"], outputSchema: schemas["getParticipants_output"] },
  ],
  procedures: [
    { name: "buyTicket", selector: 1, input: "buyTicket_input", output: "buyTicket_output", inputSchema: schemas["buyTicket_input"], outputSchema: schemas["buyTicket_output"] },
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
  async getInfo(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getInfo_input): Promise<getInfo_output> {
    const payload = encodeInput("getInfo_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getInfo_output", raw) as getInfo_output;
  },
  async getParticipants(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getParticipants_input): Promise<getParticipants_output> {
    const payload = encodeInput("getParticipants_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getParticipants_output", raw) as getParticipants_output;
  },
};

export const procedures = {
  buyTicket(input: buyTicket_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("buyTicket_input", input);
    return { inputType: 1, payload };
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
      getInfo: async (input: getInfo_input): Promise<getInfo_output> => functions.getInfo(client, contractIndex, input),
      getParticipants: async (input: getParticipants_input): Promise<getParticipants_output> => functions.getParticipants(client, contractIndex, input),
    },
    procedures: {
      buyTicket: (input: buyTicket_input) => procedures.buyTicket(input),
    },
  };
}
