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

export type RL2 = Record<string, never>;


export interface NextEpochData {
  newPrice: bigint;
  schedule: number;
}

export type BuyTicket_input = Record<string, never>;


export interface BuyTicket_output {
  returnCode: number;
}

export type GetFees_input = Record<string, never>;


export interface GetFees_output {
  teamFeePercent: number;
  distributionFeePercent: number;
  winnerFeePercent: number;
  burnPercent: number;
  returnCode: number;
}

export type GetPlayers_input = Record<string, never>;


export interface GetPlayers_output {
  playerCounter: bigint;
  returnCode: number;
}

export interface WinnerInfo {
  winnerAddress: Uint8Array;
  revenue: bigint;
  tick: number;
  epoch: number;
  dayOfWeek: number;
}

export interface FillWinnersInfo_input {
  winnerAddress: Uint8Array;
  revenue: bigint;
}

export type FillWinnersInfo_output = Record<string, never>;


export interface FillWinnersInfo_locals {
  winnerInfo: any;
  insertIdx: bigint;
}

export type GetWinners_input = Record<string, never>;


export interface GetWinners_output {
  winnersCounter: bigint;
  returnCode: number;
}

export type GetTicketPrice_input = Record<string, never>;


export interface GetTicketPrice_output {
  ticketPrice: bigint;
}

export type GetMaxNumberOfPlayers_input = Record<string, never>;


export interface GetMaxNumberOfPlayers_output {
  numberOfPlayers: bigint;
}

export type GetState_input = Record<string, never>;


export interface GetState_output {
  currentState: number;
}

export type GetBalance_input = Record<string, never>;


export interface GetBalance_output {
  balance: bigint;
}

export interface GetBalance_locals {
  entity: any;
}

export interface BuyTicket_locals {
  price: bigint;
  reward: bigint;
  capacity: bigint;
  slotsLeft: bigint;
  desired: bigint;
  remainder: bigint;
  toBuy: bigint;
  unfilled: bigint;
  refundAmount: bigint;
  i: bigint;
}

export type ReturnAllTickets_input = Record<string, never>;


export type ReturnAllTickets_output = Record<string, never>;


export interface ReturnAllTickets_locals {
  i: bigint;
}

export interface SetPrice_input {
  newPrice: bigint;
}

export interface SetPrice_output {
  returnCode: number;
}

export interface SetSchedule_input {
  newSchedule: number;
}

export interface SetSchedule_output {
  returnCode: number;
}

export interface BEGIN_TICK_locals {
  winnerAddress: Uint8Array;
  mixedSpectrumValue: any;
  entity: any;
  revenue: bigint;
  randomNum: bigint;
  winnerAmount: bigint;
  teamFee: bigint;
  distributionFee: bigint;
  burnedAmount: bigint;
  fillWinnersInfoLocals: any;
  fillWinnersInfoInput: any;
  currentDateStamp: number;
  currentDayOfWeek: number;
  currentHour: number;
  isWednesday: number;
  isScheduledToday: number;
  returnAllTicketsLocals: any;
  returnAllTicketsInput: any;
  returnAllTicketsOutput: any;
  fillWinnersInfoOutput: any;
}

export type GetNextEpochData_input = Record<string, never>;


export interface GetNextEpochData_output {
  nextEpochData: any;
}

export type GetDrawHour_input = Record<string, never>;


export interface GetDrawHour_output {
  drawHour: number;
}

export type GetSchedule_input = Record<string, never>;


export interface GetSchedule_output {
  schedule: number;
}

const schemas: Record<string, Schema> = {
  RL2: { kind: "struct", fields: [
]},
  NextEpochData: { kind: "struct", fields: [
  { name: "newPrice", type: "u64" },
  { name: "schedule", type: "u8" },
]},
  BuyTicket_input: { kind: "struct", fields: [
]},
  BuyTicket_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u8" },
]},
  GetFees_input: { kind: "struct", fields: [
]},
  GetFees_output: { kind: "struct", fields: [
  { name: "teamFeePercent", type: "u8" },
  { name: "distributionFeePercent", type: "u8" },
  { name: "winnerFeePercent", type: "u8" },
  { name: "burnPercent", type: "u8" },
  { name: "returnCode", type: "u8" },
]},
  GetPlayers_input: { kind: "struct", fields: [
]},
  GetPlayers_output: { kind: "struct", fields: [
  { name: "playerCounter", type: "u64" },
  { name: "returnCode", type: "u8" },
]},
  WinnerInfo: { kind: "struct", fields: [
  { name: "winnerAddress", type: "id" },
  { name: "revenue", type: "u64" },
  { name: "tick", type: "u32" },
  { name: "epoch", type: "u16" },
  { name: "dayOfWeek", type: "u8" },
]},
  FillWinnersInfo_input: { kind: "struct", fields: [
  { name: "winnerAddress", type: "id" },
  { name: "revenue", type: "u64" },
]},
  FillWinnersInfo_output: { kind: "struct", fields: [
]},
  FillWinnersInfo_locals: { kind: "struct", fields: [
  { name: "winnerInfo", type: { bytes: 0 } },
  { name: "insertIdx", type: "u64" },
]},
  GetWinners_input: { kind: "struct", fields: [
]},
  GetWinners_output: { kind: "struct", fields: [
  { name: "winnersCounter", type: "u64" },
  { name: "returnCode", type: "u8" },
]},
  GetTicketPrice_input: { kind: "struct", fields: [
]},
  GetTicketPrice_output: { kind: "struct", fields: [
  { name: "ticketPrice", type: "u64" },
]},
  GetMaxNumberOfPlayers_input: { kind: "struct", fields: [
]},
  GetMaxNumberOfPlayers_output: { kind: "struct", fields: [
  { name: "numberOfPlayers", type: "u64" },
]},
  GetState_input: { kind: "struct", fields: [
]},
  GetState_output: { kind: "struct", fields: [
  { name: "currentState", type: "u8" },
]},
  GetBalance_input: { kind: "struct", fields: [
]},
  GetBalance_output: { kind: "struct", fields: [
  { name: "balance", type: "u64" },
]},
  GetBalance_locals: { kind: "struct", fields: [
  { name: "entity", type: { bytes: 0 } },
]},
  BuyTicket_locals: { kind: "struct", fields: [
  { name: "price", type: "u64" },
  { name: "reward", type: "u64" },
  { name: "capacity", type: "u64" },
  { name: "slotsLeft", type: "u64" },
  { name: "desired", type: "u64" },
  { name: "remainder", type: "u64" },
  { name: "toBuy", type: "u64" },
  { name: "unfilled", type: "u64" },
  { name: "refundAmount", type: "u64" },
  { name: "i", type: "u64" },
]},
  ReturnAllTickets_input: { kind: "struct", fields: [
]},
  ReturnAllTickets_output: { kind: "struct", fields: [
]},
  ReturnAllTickets_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
]},
  SetPrice_input: { kind: "struct", fields: [
  { name: "newPrice", type: "u64" },
]},
  SetPrice_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u8" },
]},
  SetSchedule_input: { kind: "struct", fields: [
  { name: "newSchedule", type: "u8" },
]},
  SetSchedule_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u8" },
]},
  BEGIN_TICK_locals: { kind: "struct", fields: [
  { name: "winnerAddress", type: "id" },
  { name: "mixedSpectrumValue", type: { bytes: 0 } },
  { name: "entity", type: { bytes: 0 } },
  { name: "revenue", type: "u64" },
  { name: "randomNum", type: "u64" },
  { name: "winnerAmount", type: "u64" },
  { name: "teamFee", type: "u64" },
  { name: "distributionFee", type: "u64" },
  { name: "burnedAmount", type: "u64" },
  { name: "fillWinnersInfoLocals", type: { bytes: 0 } },
  { name: "fillWinnersInfoInput", type: { bytes: 0 } },
  { name: "currentDateStamp", type: "u32" },
  { name: "currentDayOfWeek", type: "u8" },
  { name: "currentHour", type: "u8" },
  { name: "isWednesday", type: "u8" },
  { name: "isScheduledToday", type: "u8" },
  { name: "returnAllTicketsLocals", type: { bytes: 0 } },
  { name: "returnAllTicketsInput", type: { bytes: 0 } },
  { name: "returnAllTicketsOutput", type: { bytes: 0 } },
  { name: "fillWinnersInfoOutput", type: { bytes: 0 } },
]},
  GetNextEpochData_input: { kind: "struct", fields: [
]},
  GetNextEpochData_output: { kind: "struct", fields: [
  { name: "nextEpochData", type: { bytes: 0 } },
]},
  GetDrawHour_input: { kind: "struct", fields: [
]},
  GetDrawHour_output: { kind: "struct", fields: [
  { name: "drawHour", type: "u8" },
]},
  GetSchedule_input: { kind: "struct", fields: [
]},
  GetSchedule_output: { kind: "struct", fields: [
  { name: "schedule", type: "u8" },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "RandomLottery",
  contractIndex: 16,
  functions: [
    { name: "GetFees", selector: 1, input: "GetFees_input", output: "GetFees_output", inputSchema: schemas["GetFees_input"], outputSchema: schemas["GetFees_output"] },
    { name: "GetPlayers", selector: 2, input: "GetPlayers_input", output: "GetPlayers_output", inputSchema: schemas["GetPlayers_input"], outputSchema: schemas["GetPlayers_output"] },
    { name: "GetWinners", selector: 3, input: "GetWinners_input", output: "GetWinners_output", inputSchema: schemas["GetWinners_input"], outputSchema: schemas["GetWinners_output"] },
    { name: "GetTicketPrice", selector: 4, input: "GetTicketPrice_input", output: "GetTicketPrice_output", inputSchema: schemas["GetTicketPrice_input"], outputSchema: schemas["GetTicketPrice_output"] },
    { name: "GetMaxNumberOfPlayers", selector: 5, input: "GetMaxNumberOfPlayers_input", output: "GetMaxNumberOfPlayers_output", inputSchema: schemas["GetMaxNumberOfPlayers_input"], outputSchema: schemas["GetMaxNumberOfPlayers_output"] },
    { name: "GetState", selector: 6, input: "GetState_input", output: "GetState_output", inputSchema: schemas["GetState_input"], outputSchema: schemas["GetState_output"] },
    { name: "GetBalance", selector: 7, input: "GetBalance_input", output: "GetBalance_output", inputSchema: schemas["GetBalance_input"], outputSchema: schemas["GetBalance_output"] },
    { name: "GetNextEpochData", selector: 8, input: "GetNextEpochData_input", output: "GetNextEpochData_output", inputSchema: schemas["GetNextEpochData_input"], outputSchema: schemas["GetNextEpochData_output"] },
    { name: "GetDrawHour", selector: 9, input: "GetDrawHour_input", output: "GetDrawHour_output", inputSchema: schemas["GetDrawHour_input"], outputSchema: schemas["GetDrawHour_output"] },
    { name: "GetSchedule", selector: 10, input: "GetSchedule_input", output: "GetSchedule_output", inputSchema: schemas["GetSchedule_input"], outputSchema: schemas["GetSchedule_output"] },
  ],
  procedures: [
    { name: "BuyTicket", selector: 1, input: "BuyTicket_input", output: "BuyTicket_output", inputSchema: schemas["BuyTicket_input"], outputSchema: schemas["BuyTicket_output"] },
    { name: "SetPrice", selector: 2, input: "SetPrice_input", output: "SetPrice_output", inputSchema: schemas["SetPrice_input"], outputSchema: schemas["SetPrice_output"] },
    { name: "SetSchedule", selector: 3, input: "SetSchedule_input", output: "SetSchedule_output", inputSchema: schemas["SetSchedule_input"], outputSchema: schemas["SetSchedule_output"] },
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
  async GetFees(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetFees_input): Promise<GetFees_output> {
    const payload = encodeInput("GetFees_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetFees_output", raw) as GetFees_output;
  },
  async GetPlayers(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetPlayers_input): Promise<GetPlayers_output> {
    const payload = encodeInput("GetPlayers_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetPlayers_output", raw) as GetPlayers_output;
  },
  async GetWinners(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetWinners_input): Promise<GetWinners_output> {
    const payload = encodeInput("GetWinners_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetWinners_output", raw) as GetWinners_output;
  },
  async GetTicketPrice(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetTicketPrice_input): Promise<GetTicketPrice_output> {
    const payload = encodeInput("GetTicketPrice_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetTicketPrice_output", raw) as GetTicketPrice_output;
  },
  async GetMaxNumberOfPlayers(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetMaxNumberOfPlayers_input): Promise<GetMaxNumberOfPlayers_output> {
    const payload = encodeInput("GetMaxNumberOfPlayers_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetMaxNumberOfPlayers_output", raw) as GetMaxNumberOfPlayers_output;
  },
  async GetState(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetState_input): Promise<GetState_output> {
    const payload = encodeInput("GetState_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetState_output", raw) as GetState_output;
  },
  async GetBalance(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetBalance_input): Promise<GetBalance_output> {
    const payload = encodeInput("GetBalance_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetBalance_output", raw) as GetBalance_output;
  },
  async GetNextEpochData(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetNextEpochData_input): Promise<GetNextEpochData_output> {
    const payload = encodeInput("GetNextEpochData_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetNextEpochData_output", raw) as GetNextEpochData_output;
  },
  async GetDrawHour(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetDrawHour_input): Promise<GetDrawHour_output> {
    const payload = encodeInput("GetDrawHour_input", input);
    const request = {
      contractIndex,
      inputType: 9,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetDrawHour_output", raw) as GetDrawHour_output;
  },
  async GetSchedule(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetSchedule_input): Promise<GetSchedule_output> {
    const payload = encodeInput("GetSchedule_input", input);
    const request = {
      contractIndex,
      inputType: 10,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetSchedule_output", raw) as GetSchedule_output;
  },
};

export const procedures = {
  BuyTicket(input: BuyTicket_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("BuyTicket_input", input);
    return { inputType: 1, payload };
  },
  SetPrice(input: SetPrice_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SetPrice_input", input);
    return { inputType: 2, payload };
  },
  SetSchedule(input: SetSchedule_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SetSchedule_input", input);
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
      GetFees: async (input: GetFees_input): Promise<GetFees_output> => functions.GetFees(client, contractIndex, input),
      GetPlayers: async (input: GetPlayers_input): Promise<GetPlayers_output> => functions.GetPlayers(client, contractIndex, input),
      GetWinners: async (input: GetWinners_input): Promise<GetWinners_output> => functions.GetWinners(client, contractIndex, input),
      GetTicketPrice: async (input: GetTicketPrice_input): Promise<GetTicketPrice_output> => functions.GetTicketPrice(client, contractIndex, input),
      GetMaxNumberOfPlayers: async (input: GetMaxNumberOfPlayers_input): Promise<GetMaxNumberOfPlayers_output> => functions.GetMaxNumberOfPlayers(client, contractIndex, input),
      GetState: async (input: GetState_input): Promise<GetState_output> => functions.GetState(client, contractIndex, input),
      GetBalance: async (input: GetBalance_input): Promise<GetBalance_output> => functions.GetBalance(client, contractIndex, input),
      GetNextEpochData: async (input: GetNextEpochData_input): Promise<GetNextEpochData_output> => functions.GetNextEpochData(client, contractIndex, input),
      GetDrawHour: async (input: GetDrawHour_input): Promise<GetDrawHour_output> => functions.GetDrawHour(client, contractIndex, input),
      GetSchedule: async (input: GetSchedule_input): Promise<GetSchedule_output> => functions.GetSchedule(client, contractIndex, input),
    },
    procedures: {
      BuyTicket: (input: BuyTicket_input) => procedures.BuyTicket(input),
      SetPrice: (input: SetPrice_input) => procedures.SetPrice(input),
      SetSchedule: (input: SetSchedule_input) => procedures.SetSchedule(input),
    },
  };
}
