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

export type CCF2 = Record<string, never>;


export interface Success_output {
  okay: any;
}

export interface LatestTransfersEntry {
  destination: Uint8Array;
  amount: bigint;
  tick: number;
  success: any;
}

export interface SubscriptionProposalData {
  proposerId: Uint8Array;
  destination: Uint8Array;
  weeksPerPeriod: number;
  numberOfPeriods: number;
  amountPerPeriod: bigint;
  startEpoch: number;
}

export interface SubscriptionData {
  destination: Uint8Array;
  weeksPerPeriod: number;
  numberOfPeriods: number;
  amountPerPeriod: bigint;
  startEpoch: number;
  currentPeriod: number;
}

export interface RegularPaymentEntry {
  destination: Uint8Array;
  amount: bigint;
  tick: number;
  periodIndex: number;
  success: any;
}

export interface SetProposal_input {
  proposal: any;
  isSubscription: number;
  weeksPerPeriod: number;
  startEpoch: number;
  amountPerPeriod: bigint;
  numberOfPeriods: number;
}

export interface SetProposal_output {
  proposalIndex: number;
}

export interface SetProposal_locals {
  totalEpochsForSubscription: number;
  subIndex: number;
  subscriptionProposal: any;
  proposal: any;
}

export interface GetProposalIndices_input {
  activeProposals: number;
  prevProposalIndex: number;
}

export interface GetProposalIndices_output {
  numOfIndices: number;
}

export interface GetProposal_input {
  subscriptionDestination: Uint8Array;
  proposalIndex: number;
}

export interface GetProposal_output {
  okay: number;
  hasSubscriptionProposal: number;
  hasActiveSubscription: number;
  proposerPublicKey: Uint8Array;
  proposal: any;
  subscription: any;
  subscriptionProposal: any;
}

export interface GetProposal_locals {
  subIndex: number;
  subscriptionData: any;
  subscriptionProposalData: any;
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

export interface GetProposalFee_output {
  proposalFee: number;
}

export interface END_EPOCH_locals {
  proposal: any;
  results: any;
  transfer: any;
  regularPayment: any;
  subscription: any;
  subscriptionProposal: any;
  proposerPublicKey: Uint8Array;
  currentEpoch: number;
  epochsSinceStart: number;
  epochsPerPeriod: number;
  periodIndex: number;
  existingSubIdx: number;
  isSubscription: number;
}

export type GetLatestTransfers_input = Record<string, never>;


export type GetLatestTransfers_output = Record<string, never>;


export type GetProposalFee_input = Record<string, never>;


export type GetRegularPayments_input = Record<string, never>;


export type GetRegularPayments_output = Record<string, never>;


export type Vote_input = Record<string, never>;


export type Vote_output = Record<string, never>;


const schemas: Record<string, Schema> = {
  CCF2: { kind: "struct", fields: [
]},
  Success_output: { kind: "struct", fields: [
  { name: "okay", type: { bytes: 0 } },
]},
  LatestTransfersEntry: { kind: "struct", fields: [
  { name: "destination", type: "id" },
  { name: "amount", type: "i64" },
  { name: "tick", type: "u32" },
  { name: "success", type: { bytes: 0 } },
]},
  SubscriptionProposalData: { kind: "struct", fields: [
  { name: "proposerId", type: "id" },
  { name: "destination", type: "id" },
  { name: "weeksPerPeriod", type: "u8" },
  { name: "numberOfPeriods", type: "u32" },
  { name: "amountPerPeriod", type: "u64" },
  { name: "startEpoch", type: "u32" },
]},
  SubscriptionData: { kind: "struct", fields: [
  { name: "destination", type: "id" },
  { name: "weeksPerPeriod", type: "u8" },
  { name: "numberOfPeriods", type: "u32" },
  { name: "amountPerPeriod", type: "u64" },
  { name: "startEpoch", type: "u32" },
  { name: "currentPeriod", type: "i32" },
]},
  RegularPaymentEntry: { kind: "struct", fields: [
  { name: "destination", type: "id" },
  { name: "amount", type: "i64" },
  { name: "tick", type: "u32" },
  { name: "periodIndex", type: "i32" },
  { name: "success", type: { bytes: 0 } },
]},
  SetProposal_input: { kind: "struct", fields: [
  { name: "proposal", type: { bytes: 0 } },
  { name: "isSubscription", type: "u8" },
  { name: "weeksPerPeriod", type: "u8" },
  { name: "startEpoch", type: "u32" },
  { name: "amountPerPeriod", type: "u64" },
  { name: "numberOfPeriods", type: "u32" },
]},
  SetProposal_output: { kind: "struct", fields: [
  { name: "proposalIndex", type: "u16" },
]},
  SetProposal_locals: { kind: "struct", fields: [
  { name: "totalEpochsForSubscription", type: "u32" },
  { name: "subIndex", type: "i32" },
  { name: "subscriptionProposal", type: { bytes: 0 } },
  { name: "proposal", type: { bytes: 0 } },
]},
  GetProposalIndices_input: { kind: "struct", fields: [
  { name: "activeProposals", type: "u8" },
  { name: "prevProposalIndex", type: "i32" },
]},
  GetProposalIndices_output: { kind: "struct", fields: [
  { name: "numOfIndices", type: "u16" },
]},
  GetProposal_input: { kind: "struct", fields: [
  { name: "subscriptionDestination", type: "id" },
  { name: "proposalIndex", type: "u16" },
]},
  GetProposal_output: { kind: "struct", fields: [
  { name: "okay", type: "u8" },
  { name: "hasSubscriptionProposal", type: "u8" },
  { name: "hasActiveSubscription", type: "u8" },
  { name: "proposerPublicKey", type: "id" },
  { name: "proposal", type: { bytes: 0 } },
  { name: "subscription", type: { bytes: 0 } },
  { name: "subscriptionProposal", type: { bytes: 0 } },
]},
  GetProposal_locals: { kind: "struct", fields: [
  { name: "subIndex", type: "i32" },
  { name: "subscriptionData", type: { bytes: 0 } },
  { name: "subscriptionProposalData", type: { bytes: 0 } },
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
  GetProposalFee_output: { kind: "struct", fields: [
  { name: "proposalFee", type: "u32" },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "proposal", type: { bytes: 0 } },
  { name: "results", type: { bytes: 0 } },
  { name: "transfer", type: { bytes: 0 } },
  { name: "regularPayment", type: { bytes: 0 } },
  { name: "subscription", type: { bytes: 0 } },
  { name: "subscriptionProposal", type: { bytes: 0 } },
  { name: "proposerPublicKey", type: "id" },
  { name: "currentEpoch", type: "u32" },
  { name: "epochsSinceStart", type: "u32" },
  { name: "epochsPerPeriod", type: "u32" },
  { name: "periodIndex", type: "i32" },
  { name: "existingSubIdx", type: "i32" },
  { name: "isSubscription", type: "u8" },
]},
  GetLatestTransfers_input: { kind: "struct", fields: [
]},
  GetLatestTransfers_output: { kind: "struct", fields: [
]},
  GetProposalFee_input: { kind: "struct", fields: [
]},
  GetRegularPayments_input: { kind: "struct", fields: [
]},
  GetRegularPayments_output: { kind: "struct", fields: [
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
  contract: "ComputorControlledFund",
  contractIndex: 8,
  functions: [
    { name: "GetProposalIndices", selector: 1, input: "GetProposalIndices_input", output: "GetProposalIndices_output", inputSchema: schemas["GetProposalIndices_input"], outputSchema: schemas["GetProposalIndices_output"] },
    { name: "GetProposal", selector: 2, input: "GetProposal_input", output: "GetProposal_output", inputSchema: schemas["GetProposal_input"], outputSchema: schemas["GetProposal_output"] },
    { name: "GetVote", selector: 3, input: "GetVote_input", output: "GetVote_output", inputSchema: schemas["GetVote_input"], outputSchema: schemas["GetVote_output"] },
    { name: "GetVotingResults", selector: 4, input: "GetVotingResults_input", output: "GetVotingResults_output", inputSchema: schemas["GetVotingResults_input"], outputSchema: schemas["GetVotingResults_output"] },
    { name: "GetLatestTransfers", selector: 5, input: "GetLatestTransfers_input", output: "GetLatestTransfers_output", inputSchema: schemas["GetLatestTransfers_input"], outputSchema: schemas["GetLatestTransfers_output"] },
    { name: "GetProposalFee", selector: 6, input: "GetProposalFee_input", output: "GetProposalFee_output", inputSchema: schemas["GetProposalFee_input"], outputSchema: schemas["GetProposalFee_output"] },
    { name: "GetRegularPayments", selector: 7, input: "GetRegularPayments_input", output: "GetRegularPayments_output", inputSchema: schemas["GetRegularPayments_input"], outputSchema: schemas["GetRegularPayments_output"] },
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
  async GetLatestTransfers(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetLatestTransfers_input): Promise<GetLatestTransfers_output> {
    const payload = encodeInput("GetLatestTransfers_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetLatestTransfers_output", raw) as GetLatestTransfers_output;
  },
  async GetProposalFee(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetProposalFee_input): Promise<GetProposalFee_output> {
    const payload = encodeInput("GetProposalFee_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetProposalFee_output", raw) as GetProposalFee_output;
  },
  async GetRegularPayments(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetRegularPayments_input): Promise<GetRegularPayments_output> {
    const payload = encodeInput("GetRegularPayments_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetRegularPayments_output", raw) as GetRegularPayments_output;
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
      GetLatestTransfers: async (input: GetLatestTransfers_input): Promise<GetLatestTransfers_output> => functions.GetLatestTransfers(client, contractIndex, input),
      GetProposalFee: async (input: GetProposalFee_input): Promise<GetProposalFee_output> => functions.GetProposalFee(client, contractIndex, input),
      GetRegularPayments: async (input: GetRegularPayments_input): Promise<GetRegularPayments_output> => functions.GetRegularPayments(client, contractIndex, input),
    },
    procedures: {
      SetProposal: (input: SetProposal_input) => procedures.SetProposal(input),
      Vote: (input: Vote_input) => procedures.Vote(input),
    },
  };
}
