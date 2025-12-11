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

export type GQMPROP2 = Record<string, never>;


export interface Success_output {
  okay: any;
}

export interface RevenueDonationEntry {
  destinationPublicKey: Uint8Array;
  millionthAmount: bigint;
  firstEpoch: number;
}

export interface _SetRevenueDonationEntry_locals {
  idx: bigint;
  firstEmptyIdx: bigint;
  beforeInsertIdx: bigint;
  entry: any;
}

export interface _CleanupRevenueDonation_locals {
  entry1: any;
  entry2: any;
}

export interface SetProposal_output {
  proposalIndex: number;
  okay: any;
}

export interface SetProposal_locals {
  i: number;
  millionthAmount: bigint;
}

export interface GetProposalIndices_input {
  activeProposals: number;
  prevProposalIndex: number;
}

export interface GetProposalIndices_output {
  numOfIndices: number;
}

export interface GetProposal_input {
  proposalIndex: number;
}

export interface GetProposal_output {
  okay: number;
  proposerPubicKey: Uint8Array;
  proposal: any;
}

export interface GetVote_input {
  voter: Uint8Array;
  proposalIndex: number;
}

export interface GetVote_output {
  okay: number;
  vote: any;
}

export interface GetVotingResults_input {
  proposalIndex: number;
}

export interface GetVotingResults_output {
  okay: number;
  results: any;
}

export interface BEGIN_EPOCH_locals {
  proposalIndex: number;
  proposal: any;
  propClass: number;
  results: any;
  optionIndex: number;
  optionVotes: number;
  mostVotedOptionIndex: number;
  mostVotedOptionVotes: number;
  revenueDonationEntry: any;
  success: any;
  cleanupInput: any;
  cleanupOutput: any;
}

export interface INITIALIZE_locals {
  revenueDonationEntry: any;
  success: any;
}

export type GetRevenueDonation_input = Record<string, never>;


export type GetRevenueDonation_output = Record<string, never>;


export type SetProposal_input = Record<string, never>;


export type Vote_input = Record<string, never>;


export type Vote_output = Record<string, never>;


const schemas: Record<string, Schema> = {
  GQMPROP2: { kind: "struct", fields: [
]},
  Success_output: { kind: "struct", fields: [
  { name: "okay", type: { bytes: 0 } },
]},
  RevenueDonationEntry: { kind: "struct", fields: [
  { name: "destinationPublicKey", type: "id" },
  { name: "millionthAmount", type: "i64" },
  { name: "firstEpoch", type: "u16" },
]},
  _SetRevenueDonationEntry_locals: { kind: "struct", fields: [
  { name: "idx", type: "i64" },
  { name: "firstEmptyIdx", type: "i64" },
  { name: "beforeInsertIdx", type: "i64" },
  { name: "entry", type: { bytes: 0 } },
]},
  _CleanupRevenueDonation_locals: { kind: "struct", fields: [
  { name: "entry1", type: { bytes: 0 } },
  { name: "entry2", type: { bytes: 0 } },
]},
  SetProposal_output: { kind: "struct", fields: [
  { name: "proposalIndex", type: "u16" },
  { name: "okay", type: { bytes: 0 } },
]},
  SetProposal_locals: { kind: "struct", fields: [
  { name: "i", type: "u32" },
  { name: "millionthAmount", type: "i64" },
]},
  GetProposalIndices_input: { kind: "struct", fields: [
  { name: "activeProposals", type: "u8" },
  { name: "prevProposalIndex", type: "i32" },
]},
  GetProposalIndices_output: { kind: "struct", fields: [
  { name: "numOfIndices", type: "u16" },
]},
  GetProposal_input: { kind: "struct", fields: [
  { name: "proposalIndex", type: "u16" },
]},
  GetProposal_output: { kind: "struct", fields: [
  { name: "okay", type: "u8" },
  { name: "proposerPubicKey", type: "id" },
  { name: "proposal", type: { bytes: 0 } },
]},
  GetVote_input: { kind: "struct", fields: [
  { name: "voter", type: "id" },
  { name: "proposalIndex", type: "u16" },
]},
  GetVote_output: { kind: "struct", fields: [
  { name: "okay", type: "u8" },
  { name: "vote", type: { bytes: 0 } },
]},
  GetVotingResults_input: { kind: "struct", fields: [
  { name: "proposalIndex", type: "u16" },
]},
  GetVotingResults_output: { kind: "struct", fields: [
  { name: "okay", type: "u8" },
  { name: "results", type: { bytes: 0 } },
]},
  BEGIN_EPOCH_locals: { kind: "struct", fields: [
  { name: "proposalIndex", type: "i32" },
  { name: "proposal", type: { bytes: 0 } },
  { name: "propClass", type: "u16" },
  { name: "results", type: { bytes: 0 } },
  { name: "optionIndex", type: "i32" },
  { name: "optionVotes", type: "u32" },
  { name: "mostVotedOptionIndex", type: "i32" },
  { name: "mostVotedOptionVotes", type: "u32" },
  { name: "revenueDonationEntry", type: { bytes: 0 } },
  { name: "success", type: { bytes: 0 } },
  { name: "cleanupInput", type: { bytes: 0 } },
  { name: "cleanupOutput", type: { bytes: 0 } },
]},
  INITIALIZE_locals: { kind: "struct", fields: [
  { name: "revenueDonationEntry", type: { bytes: 0 } },
  { name: "success", type: { bytes: 0 } },
]},
  GetRevenueDonation_input: { kind: "struct", fields: [
]},
  GetRevenueDonation_output: { kind: "struct", fields: [
]},
  SetProposal_input: { kind: "struct", fields: [
]},
  Vote_input: { kind: "struct", fields: [
]},
  Vote_output: { kind: "struct", fields: [
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "GeneralQuorumProposal",
  contractIndex: 6,
  functions: [
    { name: "GetProposalIndices", selector: 1, input: "GetProposalIndices_input", output: "GetProposalIndices_output", inputSchema: schemas["GetProposalIndices_input"], outputSchema: schemas["GetProposalIndices_output"] },
    { name: "GetProposal", selector: 2, input: "GetProposal_input", output: "GetProposal_output", inputSchema: schemas["GetProposal_input"], outputSchema: schemas["GetProposal_output"] },
    { name: "GetVote", selector: 3, input: "GetVote_input", output: "GetVote_output", inputSchema: schemas["GetVote_input"], outputSchema: schemas["GetVote_output"] },
    { name: "GetVotingResults", selector: 4, input: "GetVotingResults_input", output: "GetVotingResults_output", inputSchema: schemas["GetVotingResults_input"], outputSchema: schemas["GetVotingResults_output"] },
    { name: "GetRevenueDonation", selector: 5, input: "GetRevenueDonation_input", output: "GetRevenueDonation_output", inputSchema: schemas["GetRevenueDonation_input"], outputSchema: schemas["GetRevenueDonation_output"] },
  ],
  procedures: [
    { name: "SetProposal", selector: 1, input: "SetProposal_input", output: "SetProposal_output", inputSchema: schemas["SetProposal_input"], outputSchema: schemas["SetProposal_output"] },
    { name: "Vote", selector: 2, input: "Vote_input", output: "Vote_output", inputSchema: schemas["Vote_input"], outputSchema: schemas["Vote_output"] },
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
  async GetProposalIndices(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetProposalIndices_input): Promise<GetProposalIndices_output> {
    const payload = encodeInput("GetProposalIndices_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetProposalIndices_output", raw) as GetProposalIndices_output;
  },
  async GetProposal(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetProposal_input): Promise<GetProposal_output> {
    const payload = encodeInput("GetProposal_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetProposal_output", raw) as GetProposal_output;
  },
  async GetVote(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetVote_input): Promise<GetVote_output> {
    const payload = encodeInput("GetVote_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetVote_output", raw) as GetVote_output;
  },
  async GetVotingResults(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetVotingResults_input): Promise<GetVotingResults_output> {
    const payload = encodeInput("GetVotingResults_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetVotingResults_output", raw) as GetVotingResults_output;
  },
  async GetRevenueDonation(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetRevenueDonation_input): Promise<GetRevenueDonation_output> {
    const payload = encodeInput("GetRevenueDonation_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetRevenueDonation_output", raw) as GetRevenueDonation_output;
  },
};

export const procedures = {
  SetProposal(input: SetProposal_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SetProposal_input", input);
    return { inputType: 1, payload };
  },
  Vote(input: Vote_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("Vote_input", input);
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
      GetProposalIndices: async (input: GetProposalIndices_input): Promise<GetProposalIndices_output> => functions.GetProposalIndices(client, contractIndex, input),
      GetProposal: async (input: GetProposal_input): Promise<GetProposal_output> => functions.GetProposal(client, contractIndex, input),
      GetVote: async (input: GetVote_input): Promise<GetVote_output> => functions.GetVote(client, contractIndex, input),
      GetVotingResults: async (input: GetVotingResults_input): Promise<GetVotingResults_output> => functions.GetVotingResults(client, contractIndex, input),
      GetRevenueDonation: async (input: GetRevenueDonation_input): Promise<GetRevenueDonation_output> => functions.GetRevenueDonation(client, contractIndex, input),
    },
    procedures: {
      SetProposal: (input: SetProposal_input) => procedures.SetProposal(input),
      Vote: (input: Vote_input) => procedures.Vote(input),
    },
  };
}
