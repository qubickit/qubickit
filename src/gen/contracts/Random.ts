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

export type RANDOM2 = Record<string, never>;


export interface RevealAndCommit_input {
  revealedBits: any;
  committedDigest: Uint8Array;
}

export type RevealAndCommit_output = Record<string, never>;


const schemas: Record<string, Schema> = {
  RANDOM2: { kind: "struct", fields: [
]},
  RevealAndCommit_input: { kind: "struct", fields: [
  { name: "revealedBits", type: { bytes: 0 } },
  { name: "committedDigest", type: "id" },
]},
  RevealAndCommit_output: { kind: "struct", fields: [
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "Random",
  contractIndex: 3,
  functions: [
  ],
  procedures: [
    { name: "RevealAndCommit", selector: 1, input: "RevealAndCommit_input", output: "RevealAndCommit_output", inputSchema: schemas["RevealAndCommit_input"], outputSchema: schemas["RevealAndCommit_output"] },
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
};

export const procedures = {
  RevealAndCommit(input: RevealAndCommit_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("RevealAndCommit_input", input);
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
    },
    procedures: {
      RevealAndCommit: (input: RevealAndCommit_input) => procedures.RevealAndCommit(input),
    },
  };
}
