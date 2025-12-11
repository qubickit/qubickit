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

export type QBOND2 = Record<string, never>;


export interface StakeEntry {
  staker: Uint8Array;
  amount: bigint;
}

export interface MBondInfo {
  name: bigint;
  stakersAmount: bigint;
  totalStaked: bigint;
}

export interface Stake_input {
  quMillions: bigint;
}

export type Stake_output = Record<string, never>;


export interface TransferMBondOwnershipAndPossession_input {
  newOwnerAndPossessor: Uint8Array;
  epoch: bigint;
  numberOfMBonds: bigint;
}

export interface TransferMBondOwnershipAndPossession_output {
  transferredMBonds: bigint;
}

export interface AddAskOrder_input {
  epoch: bigint;
  price: bigint;
  numberOfMBonds: bigint;
}

export interface AddAskOrder_output {
  addedMBondsAmount: bigint;
}

export interface RemoveAskOrder_input {
  epoch: bigint;
  price: bigint;
  numberOfMBonds: bigint;
}

export interface RemoveAskOrder_output {
  removedMBondsAmount: bigint;
}

export interface AddBidOrder_input {
  epoch: bigint;
  price: bigint;
  numberOfMBonds: bigint;
}

export interface AddBidOrder_output {
  addedMBondsAmount: bigint;
}

export interface RemoveBidOrder_input {
  epoch: bigint;
  price: bigint;
  numberOfMBonds: bigint;
}

export interface RemoveBidOrder_output {
  removedMBondsAmount: bigint;
}

export interface BurnQU_input {
  amount: bigint;
}

export interface BurnQU_output {
  amount: bigint;
}

export interface UpdateCFA_input {
  user: Uint8Array;
  operation: number;
}

export interface UpdateCFA_output {
  result: number;
}

export type GetFees_input = Record<string, never>;


export interface GetFees_output {
  stakeFeePercent: bigint;
  tradeFeePercent: bigint;
  transferFee: bigint;
}

export type GetEarnedFees_input = Record<string, never>;


export interface GetEarnedFees_output {
  stakeFees: bigint;
  tradeFees: bigint;
}

export interface GetInfoPerEpoch_input {
  epoch: bigint;
}

export interface GetInfoPerEpoch_output {
  stakersAmount: bigint;
  totalStaked: bigint;
  apy: bigint;
}

export interface GetOrders_input {
  epoch: bigint;
  askOrdersOffset: bigint;
  bidOrdersOffset: bigint;
}

export interface GetOrders_output {
  owner: Uint8Array;
  epoch: bigint;
  numberOfMBonds: bigint;
  price: bigint;
}

export interface GetUserOrders_input {
  owner: Uint8Array;
  askOrdersOffset: bigint;
  bidOrdersOffset: bigint;
}

export interface GetUserOrders_output {
  owner: Uint8Array;
  epoch: bigint;
  numberOfMBonds: bigint;
  price: bigint;
}

export type GetMBondsTable_input = Record<string, never>;


export interface GetMBondsTable_output {
  epoch: bigint;
  totalStakedQBond: bigint;
  totalStakedQEarn: bigint;
  apy: bigint;
}

export interface GetUserMBonds_input {
  owner: Uint8Array;
}

export interface GetUserMBonds_output {
  totalMBondsAmount: bigint;
  epoch: bigint;
  amount: bigint;
  apy: bigint;
}

export type GetCFA_input = Record<string, never>;


export type GetCFA_output = Record<string, never>;


export interface _Order {
  owner: Uint8Array;
  epoch: bigint;
  numberOfMBonds: bigint;
}

export interface _NumberOfReservedMBonds_input {
  owner: Uint8Array;
  epoch: bigint;
  amount: bigint;
  elementIndex: bigint;
  mbondIdentity: Uint8Array;
  order: any;
  tempMbondInfo: any;
}

export interface Stake_locals {
  amountInQueue: bigint;
  userMBondsAmount: bigint;
  tempAmount: bigint;
  counter: bigint;
  amountToStake: bigint;
  amountAndFee: bigint;
  tempStakeEntry: any;
  tempMbondInfo: any;
}

export interface TransferMBondOwnershipAndPossession_locals {
  tempMbondInfo: any;
}

export interface AddAskOrder_locals {
  tempMbondInfo: any;
  mbondIdentity: Uint8Array;
  elementIndex: bigint;
  nextElementIndex: bigint;
  fee: bigint;
  tempAskOrder: any;
  tempBidOrder: any;
}

export interface RemoveAskOrder_locals {
  tempMbondInfo: any;
  mbondIdentity: Uint8Array;
  elementIndex: bigint;
  order: any;
}

export interface AddBidOrder_locals {
  tempMbondInfo: any;
  mbondIdentity: Uint8Array;
  elementIndex: bigint;
  fee: bigint;
  tempAskOrder: any;
  tempBidOrder: any;
}

export interface RemoveBidOrder_locals {
  tempMbondInfo: any;
  mbondIdentity: Uint8Array;
  elementIndex: bigint;
  order: any;
}

export interface GetInfoPerEpoch_locals {
  index: bigint;
}

export interface GetOrders_locals {
  tempMbondInfo: any;
  mbondIdentity: Uint8Array;
  elementIndex: bigint;
  arrayElementIndex: bigint;
  arrayElementIndex2: bigint;
  startEpoch: bigint;
  endEpoch: bigint;
  epochCounter: bigint;
}

export interface GetUserOrders_locals {
  epoch: bigint;
  tempMbondInfo: any;
  mbondIdentity: Uint8Array;
  elementIndex1: bigint;
  arrayElementIndex1: bigint;
  elementIndex2: bigint;
  arrayElementIndex2: bigint;
}

export interface GetMBondsTable_locals {
  epoch: bigint;
  index: bigint;
  tempMBondInfo: any;
}

export interface GetUserMBonds_locals {
  epoch: bigint;
  index: bigint;
  mbondsAmount: bigint;
  tempMBondInfo: any;
}

export interface GetCFA_locals {
  index: bigint;
  counter: bigint;
}

export interface BEGIN_EPOCH_locals {
  chunk: number;
  currentName: bigint;
  emptyEntry: any;
  totalReward: bigint;
  rewardPerMBond: bigint;
  tempAsset: any;
  tempMbondInfo: any;
  assetIt: any;
  mbondIdentity: Uint8Array;
  elementIndex: bigint;
}

export interface POST_INCOMING_TRANSFER_locals {
  tempMbondInfo: any;
}

export interface END_EPOCH_locals {
  availableMbonds: bigint;
  tempMbondInfo: any;
  counter: bigint;
  tempStakeEntry: any;
  amountToQvault: bigint;
  amountToDev: bigint;
}

const schemas: Record<string, Schema> = {
  QBOND2: { kind: "struct", fields: [
]},
  StakeEntry: { kind: "struct", fields: [
  { name: "staker", type: "id" },
  { name: "amount", type: "i64" },
]},
  MBondInfo: { kind: "struct", fields: [
  { name: "name", type: "u64" },
  { name: "stakersAmount", type: "i64" },
  { name: "totalStaked", type: "i64" },
]},
  Stake_input: { kind: "struct", fields: [
  { name: "quMillions", type: "i64" },
]},
  Stake_output: { kind: "struct", fields: [
]},
  TransferMBondOwnershipAndPossession_input: { kind: "struct", fields: [
  { name: "newOwnerAndPossessor", type: "id" },
  { name: "epoch", type: "i64" },
  { name: "numberOfMBonds", type: "i64" },
]},
  TransferMBondOwnershipAndPossession_output: { kind: "struct", fields: [
  { name: "transferredMBonds", type: "i64" },
]},
  AddAskOrder_input: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "price", type: "i64" },
  { name: "numberOfMBonds", type: "i64" },
]},
  AddAskOrder_output: { kind: "struct", fields: [
  { name: "addedMBondsAmount", type: "i64" },
]},
  RemoveAskOrder_input: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "price", type: "i64" },
  { name: "numberOfMBonds", type: "i64" },
]},
  RemoveAskOrder_output: { kind: "struct", fields: [
  { name: "removedMBondsAmount", type: "i64" },
]},
  AddBidOrder_input: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "price", type: "i64" },
  { name: "numberOfMBonds", type: "i64" },
]},
  AddBidOrder_output: { kind: "struct", fields: [
  { name: "addedMBondsAmount", type: "i64" },
]},
  RemoveBidOrder_input: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "price", type: "i64" },
  { name: "numberOfMBonds", type: "i64" },
]},
  RemoveBidOrder_output: { kind: "struct", fields: [
  { name: "removedMBondsAmount", type: "i64" },
]},
  BurnQU_input: { kind: "struct", fields: [
  { name: "amount", type: "i64" },
]},
  BurnQU_output: { kind: "struct", fields: [
  { name: "amount", type: "i64" },
]},
  UpdateCFA_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
  { name: "operation", type: "u8" },
]},
  UpdateCFA_output: { kind: "struct", fields: [
  { name: "result", type: "u8" },
]},
  GetFees_input: { kind: "struct", fields: [
]},
  GetFees_output: { kind: "struct", fields: [
  { name: "stakeFeePercent", type: "u64" },
  { name: "tradeFeePercent", type: "u64" },
  { name: "transferFee", type: "u64" },
]},
  GetEarnedFees_input: { kind: "struct", fields: [
]},
  GetEarnedFees_output: { kind: "struct", fields: [
  { name: "stakeFees", type: "u64" },
  { name: "tradeFees", type: "u64" },
]},
  GetInfoPerEpoch_input: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
]},
  GetInfoPerEpoch_output: { kind: "struct", fields: [
  { name: "stakersAmount", type: "u64" },
  { name: "totalStaked", type: "i64" },
  { name: "apy", type: "i64" },
]},
  GetOrders_input: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "askOrdersOffset", type: "i64" },
  { name: "bidOrdersOffset", type: "i64" },
]},
  GetOrders_output: { kind: "struct", fields: [
  { name: "owner", type: "id" },
  { name: "epoch", type: "i64" },
  { name: "numberOfMBonds", type: "i64" },
  { name: "price", type: "i64" },
]},
  GetUserOrders_input: { kind: "struct", fields: [
  { name: "owner", type: "id" },
  { name: "askOrdersOffset", type: "i64" },
  { name: "bidOrdersOffset", type: "i64" },
]},
  GetUserOrders_output: { kind: "struct", fields: [
  { name: "owner", type: "id" },
  { name: "epoch", type: "i64" },
  { name: "numberOfMBonds", type: "i64" },
  { name: "price", type: "i64" },
]},
  GetMBondsTable_input: { kind: "struct", fields: [
]},
  GetMBondsTable_output: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "totalStakedQBond", type: "i64" },
  { name: "totalStakedQEarn", type: "i64" },
  { name: "apy", type: "u64" },
]},
  GetUserMBonds_input: { kind: "struct", fields: [
  { name: "owner", type: "id" },
]},
  GetUserMBonds_output: { kind: "struct", fields: [
  { name: "totalMBondsAmount", type: "i64" },
  { name: "epoch", type: "i64" },
  { name: "amount", type: "i64" },
  { name: "apy", type: "u64" },
]},
  GetCFA_input: { kind: "struct", fields: [
]},
  GetCFA_output: { kind: "struct", fields: [
]},
  _Order: { kind: "struct", fields: [
  { name: "owner", type: "id" },
  { name: "epoch", type: "i64" },
  { name: "numberOfMBonds", type: "i64" },
]},
  _NumberOfReservedMBonds_input: { kind: "struct", fields: [
  { name: "owner", type: "id" },
  { name: "epoch", type: "i64" },
  { name: "amount", type: "i64" },
  { name: "elementIndex", type: "i64" },
  { name: "mbondIdentity", type: "id" },
  { name: "order", type: { bytes: 0 } },
  { name: "tempMbondInfo", type: { bytes: 0 } },
]},
  Stake_locals: { kind: "struct", fields: [
  { name: "amountInQueue", type: "i64" },
  { name: "userMBondsAmount", type: "i64" },
  { name: "tempAmount", type: "i64" },
  { name: "counter", type: "u64" },
  { name: "amountToStake", type: "i64" },
  { name: "amountAndFee", type: "u64" },
  { name: "tempStakeEntry", type: { bytes: 0 } },
  { name: "tempMbondInfo", type: { bytes: 0 } },
]},
  TransferMBondOwnershipAndPossession_locals: { kind: "struct", fields: [
  { name: "tempMbondInfo", type: { bytes: 0 } },
]},
  AddAskOrder_locals: { kind: "struct", fields: [
  { name: "tempMbondInfo", type: { bytes: 0 } },
  { name: "mbondIdentity", type: "id" },
  { name: "elementIndex", type: "i64" },
  { name: "nextElementIndex", type: "i64" },
  { name: "fee", type: "i64" },
  { name: "tempAskOrder", type: { bytes: 0 } },
  { name: "tempBidOrder", type: { bytes: 0 } },
]},
  RemoveAskOrder_locals: { kind: "struct", fields: [
  { name: "tempMbondInfo", type: { bytes: 0 } },
  { name: "mbondIdentity", type: "id" },
  { name: "elementIndex", type: "i64" },
  { name: "order", type: { bytes: 0 } },
]},
  AddBidOrder_locals: { kind: "struct", fields: [
  { name: "tempMbondInfo", type: { bytes: 0 } },
  { name: "mbondIdentity", type: "id" },
  { name: "elementIndex", type: "i64" },
  { name: "fee", type: "i64" },
  { name: "tempAskOrder", type: { bytes: 0 } },
  { name: "tempBidOrder", type: { bytes: 0 } },
]},
  RemoveBidOrder_locals: { kind: "struct", fields: [
  { name: "tempMbondInfo", type: { bytes: 0 } },
  { name: "mbondIdentity", type: "id" },
  { name: "elementIndex", type: "i64" },
  { name: "order", type: { bytes: 0 } },
]},
  GetInfoPerEpoch_locals: { kind: "struct", fields: [
  { name: "index", type: "i64" },
]},
  GetOrders_locals: { kind: "struct", fields: [
  { name: "tempMbondInfo", type: { bytes: 0 } },
  { name: "mbondIdentity", type: "id" },
  { name: "elementIndex", type: "i64" },
  { name: "arrayElementIndex", type: "i64" },
  { name: "arrayElementIndex2", type: "i64" },
  { name: "startEpoch", type: "i64" },
  { name: "endEpoch", type: "i64" },
  { name: "epochCounter", type: "i64" },
]},
  GetUserOrders_locals: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "tempMbondInfo", type: { bytes: 0 } },
  { name: "mbondIdentity", type: "id" },
  { name: "elementIndex1", type: "i64" },
  { name: "arrayElementIndex1", type: "i64" },
  { name: "elementIndex2", type: "i64" },
  { name: "arrayElementIndex2", type: "i64" },
]},
  GetMBondsTable_locals: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "index", type: "i64" },
  { name: "tempMBondInfo", type: { bytes: 0 } },
]},
  GetUserMBonds_locals: { kind: "struct", fields: [
  { name: "epoch", type: "i64" },
  { name: "index", type: "i64" },
  { name: "mbondsAmount", type: "i64" },
  { name: "tempMBondInfo", type: { bytes: 0 } },
]},
  GetCFA_locals: { kind: "struct", fields: [
  { name: "index", type: "i64" },
  { name: "counter", type: "i64" },
]},
  BEGIN_EPOCH_locals: { kind: "struct", fields: [
  { name: "chunk", type: "i8" },
  { name: "currentName", type: "u64" },
  { name: "emptyEntry", type: { bytes: 0 } },
  { name: "totalReward", type: "i64" },
  { name: "rewardPerMBond", type: "i64" },
  { name: "tempAsset", type: { bytes: 40 } },
  { name: "tempMbondInfo", type: { bytes: 0 } },
  { name: "assetIt", type: { bytes: 0 } },
  { name: "mbondIdentity", type: "id" },
  { name: "elementIndex", type: "i64" },
]},
  POST_INCOMING_TRANSFER_locals: { kind: "struct", fields: [
  { name: "tempMbondInfo", type: { bytes: 0 } },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "availableMbonds", type: "i64" },
  { name: "tempMbondInfo", type: { bytes: 0 } },
  { name: "counter", type: "i64" },
  { name: "tempStakeEntry", type: { bytes: 0 } },
  { name: "amountToQvault", type: "i64" },
  { name: "amountToDev", type: "i64" },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "QBond",
  contractIndex: 17,
  functions: [
    { name: "GetFees", selector: 1, input: "GetFees_input", output: "GetFees_output", inputSchema: schemas["GetFees_input"], outputSchema: schemas["GetFees_output"] },
    { name: "GetEarnedFees", selector: 2, input: "GetEarnedFees_input", output: "GetEarnedFees_output", inputSchema: schemas["GetEarnedFees_input"], outputSchema: schemas["GetEarnedFees_output"] },
    { name: "GetInfoPerEpoch", selector: 3, input: "GetInfoPerEpoch_input", output: "GetInfoPerEpoch_output", inputSchema: schemas["GetInfoPerEpoch_input"], outputSchema: schemas["GetInfoPerEpoch_output"] },
    { name: "GetOrders", selector: 4, input: "GetOrders_input", output: "GetOrders_output", inputSchema: schemas["GetOrders_input"], outputSchema: schemas["GetOrders_output"] },
    { name: "GetUserOrders", selector: 5, input: "GetUserOrders_input", output: "GetUserOrders_output", inputSchema: schemas["GetUserOrders_input"], outputSchema: schemas["GetUserOrders_output"] },
    { name: "GetMBondsTable", selector: 6, input: "GetMBondsTable_input", output: "GetMBondsTable_output", inputSchema: schemas["GetMBondsTable_input"], outputSchema: schemas["GetMBondsTable_output"] },
    { name: "GetUserMBonds", selector: 7, input: "GetUserMBonds_input", output: "GetUserMBonds_output", inputSchema: schemas["GetUserMBonds_input"], outputSchema: schemas["GetUserMBonds_output"] },
    { name: "GetCFA", selector: 8, input: "GetCFA_input", output: "GetCFA_output", inputSchema: schemas["GetCFA_input"], outputSchema: schemas["GetCFA_output"] },
  ],
  procedures: [
    { name: "Stake", selector: 1, input: "Stake_input", output: "Stake_output", inputSchema: schemas["Stake_input"], outputSchema: schemas["Stake_output"] },
    { name: "TransferMBondOwnershipAndPossession", selector: 2, input: "TransferMBondOwnershipAndPossession_input", output: "TransferMBondOwnershipAndPossession_output", inputSchema: schemas["TransferMBondOwnershipAndPossession_input"], outputSchema: schemas["TransferMBondOwnershipAndPossession_output"] },
    { name: "AddAskOrder", selector: 3, input: "AddAskOrder_input", output: "AddAskOrder_output", inputSchema: schemas["AddAskOrder_input"], outputSchema: schemas["AddAskOrder_output"] },
    { name: "RemoveAskOrder", selector: 4, input: "RemoveAskOrder_input", output: "RemoveAskOrder_output", inputSchema: schemas["RemoveAskOrder_input"], outputSchema: schemas["RemoveAskOrder_output"] },
    { name: "AddBidOrder", selector: 5, input: "AddBidOrder_input", output: "AddBidOrder_output", inputSchema: schemas["AddBidOrder_input"], outputSchema: schemas["AddBidOrder_output"] },
    { name: "RemoveBidOrder", selector: 6, input: "RemoveBidOrder_input", output: "RemoveBidOrder_output", inputSchema: schemas["RemoveBidOrder_input"], outputSchema: schemas["RemoveBidOrder_output"] },
    { name: "BurnQU", selector: 7, input: "BurnQU_input", output: "BurnQU_output", inputSchema: schemas["BurnQU_input"], outputSchema: schemas["BurnQU_output"] },
    { name: "UpdateCFA", selector: 8, input: "UpdateCFA_input", output: "UpdateCFA_output", inputSchema: schemas["UpdateCFA_input"], outputSchema: schemas["UpdateCFA_output"] },
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
  async GetEarnedFees(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetEarnedFees_input): Promise<GetEarnedFees_output> {
    const payload = encodeInput("GetEarnedFees_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetEarnedFees_output", raw) as GetEarnedFees_output;
  },
  async GetInfoPerEpoch(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetInfoPerEpoch_input): Promise<GetInfoPerEpoch_output> {
    const payload = encodeInput("GetInfoPerEpoch_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetInfoPerEpoch_output", raw) as GetInfoPerEpoch_output;
  },
  async GetOrders(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetOrders_input): Promise<GetOrders_output> {
    const payload = encodeInput("GetOrders_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetOrders_output", raw) as GetOrders_output;
  },
  async GetUserOrders(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetUserOrders_input): Promise<GetUserOrders_output> {
    const payload = encodeInput("GetUserOrders_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetUserOrders_output", raw) as GetUserOrders_output;
  },
  async GetMBondsTable(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetMBondsTable_input): Promise<GetMBondsTable_output> {
    const payload = encodeInput("GetMBondsTable_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetMBondsTable_output", raw) as GetMBondsTable_output;
  },
  async GetUserMBonds(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetUserMBonds_input): Promise<GetUserMBonds_output> {
    const payload = encodeInput("GetUserMBonds_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetUserMBonds_output", raw) as GetUserMBonds_output;
  },
  async GetCFA(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetCFA_input): Promise<GetCFA_output> {
    const payload = encodeInput("GetCFA_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetCFA_output", raw) as GetCFA_output;
  },
};

export const procedures = {
  Stake(input: Stake_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("Stake_input", input);
    return { inputType: 1, payload };
  },
  TransferMBondOwnershipAndPossession(input: TransferMBondOwnershipAndPossession_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferMBondOwnershipAndPossession_input", input);
    return { inputType: 2, payload };
  },
  AddAskOrder(input: AddAskOrder_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("AddAskOrder_input", input);
    return { inputType: 3, payload };
  },
  RemoveAskOrder(input: RemoveAskOrder_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("RemoveAskOrder_input", input);
    return { inputType: 4, payload };
  },
  AddBidOrder(input: AddBidOrder_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("AddBidOrder_input", input);
    return { inputType: 5, payload };
  },
  RemoveBidOrder(input: RemoveBidOrder_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("RemoveBidOrder_input", input);
    return { inputType: 6, payload };
  },
  BurnQU(input: BurnQU_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("BurnQU_input", input);
    return { inputType: 7, payload };
  },
  UpdateCFA(input: UpdateCFA_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("UpdateCFA_input", input);
    return { inputType: 8, payload };
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
      GetEarnedFees: async (input: GetEarnedFees_input): Promise<GetEarnedFees_output> => functions.GetEarnedFees(client, contractIndex, input),
      GetInfoPerEpoch: async (input: GetInfoPerEpoch_input): Promise<GetInfoPerEpoch_output> => functions.GetInfoPerEpoch(client, contractIndex, input),
      GetOrders: async (input: GetOrders_input): Promise<GetOrders_output> => functions.GetOrders(client, contractIndex, input),
      GetUserOrders: async (input: GetUserOrders_input): Promise<GetUserOrders_output> => functions.GetUserOrders(client, contractIndex, input),
      GetMBondsTable: async (input: GetMBondsTable_input): Promise<GetMBondsTable_output> => functions.GetMBondsTable(client, contractIndex, input),
      GetUserMBonds: async (input: GetUserMBonds_input): Promise<GetUserMBonds_output> => functions.GetUserMBonds(client, contractIndex, input),
      GetCFA: async (input: GetCFA_input): Promise<GetCFA_output> => functions.GetCFA(client, contractIndex, input),
    },
    procedures: {
      Stake: (input: Stake_input) => procedures.Stake(input),
      TransferMBondOwnershipAndPossession: (input: TransferMBondOwnershipAndPossession_input) => procedures.TransferMBondOwnershipAndPossession(input),
      AddAskOrder: (input: AddAskOrder_input) => procedures.AddAskOrder(input),
      RemoveAskOrder: (input: RemoveAskOrder_input) => procedures.RemoveAskOrder(input),
      AddBidOrder: (input: AddBidOrder_input) => procedures.AddBidOrder(input),
      RemoveBidOrder: (input: RemoveBidOrder_input) => procedures.RemoveBidOrder(input),
      BurnQU: (input: BurnQU_input) => procedures.BurnQU(input),
      UpdateCFA: (input: UpdateCFA_input) => procedures.UpdateCFA(input),
    },
  };
}
