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

export type QX2 = Record<string, never>;


export type Fees_input = Record<string, never>;


export interface Fees_output {
  assetIssuanceFee: number;
  transferFee: number;
  tradeFee: number;
}

export interface AssetAskOrders_input {
  issuer: Uint8Array;
  assetName: bigint;
  offset: bigint;
}

export interface AssetAskOrders_output {
  entity: Uint8Array;
  price: bigint;
  numberOfShares: bigint;
}

export interface AssetBidOrders_input {
  issuer: Uint8Array;
  assetName: bigint;
  offset: bigint;
}

export interface AssetBidOrders_output {
  entity: Uint8Array;
  price: bigint;
  numberOfShares: bigint;
}

export interface EntityAskOrders_input {
  entity: Uint8Array;
  offset: bigint;
}

export interface EntityAskOrders_output {
  issuer: Uint8Array;
  assetName: bigint;
  price: bigint;
  numberOfShares: bigint;
}

export interface EntityBidOrders_input {
  entity: Uint8Array;
  offset: bigint;
}

export interface EntityBidOrders_output {
  issuer: Uint8Array;
  assetName: bigint;
  price: bigint;
  numberOfShares: bigint;
}

export interface IssueAsset_input {
  assetName: bigint;
  numberOfShares: bigint;
  unitOfMeasurement: bigint;
  numberOfDecimalPlaces: number;
}

export interface IssueAsset_output {
  issuedNumberOfShares: bigint;
}

export interface TransferShareOwnershipAndPossession_input {
  issuer: Uint8Array;
  newOwnerAndPossessor: Uint8Array;
  assetName: bigint;
  numberOfShares: bigint;
}

export interface TransferShareOwnershipAndPossession_output {
  transferredNumberOfShares: bigint;
}

export interface AddToAskOrder_input {
  issuer: Uint8Array;
  assetName: bigint;
  price: bigint;
  numberOfShares: bigint;
}

export interface AddToAskOrder_output {
  addedNumberOfShares: bigint;
}

export interface AddToBidOrder_input {
  issuer: Uint8Array;
  assetName: bigint;
  price: bigint;
  numberOfShares: bigint;
}

export interface AddToBidOrder_output {
  addedNumberOfShares: bigint;
}

export interface RemoveFromAskOrder_input {
  issuer: Uint8Array;
  assetName: bigint;
  price: bigint;
  numberOfShares: bigint;
}

export interface RemoveFromAskOrder_output {
  removedNumberOfShares: bigint;
}

export interface RemoveFromBidOrder_input {
  issuer: Uint8Array;
  assetName: bigint;
  price: bigint;
  numberOfShares: bigint;
}

export interface RemoveFromBidOrder_output {
  removedNumberOfShares: bigint;
}

export interface TransferShareManagementRights_input {
  asset: any;
  numberOfShares: bigint;
  newManagingContractIndex: number;
}

export interface TransferShareManagementRights_output {
  transferredNumberOfShares: bigint;
}

export interface _AssetOrder {
  entity: Uint8Array;
  numberOfShares: bigint;
}

export interface _EntityOrder {
  issuer: Uint8Array;
  assetName: bigint;
  numberOfShares: bigint;
}

export interface _TradeMessage {
  issuer: Uint8Array;
  assetName: bigint;
  price: bigint;
  numberOfShares: bigint;
  _terminator: number;
  _elementIndex: bigint;
  _entityOrder: any;
}

export interface AssetAskOrders_locals {
  _issuerAndAssetName: Uint8Array;
  _assetOrder: any;
}

export interface AssetBidOrders_locals {
  _issuerAndAssetName: Uint8Array;
  _assetOrder: any;
}

export interface EntityAskOrders_locals {
  _entityOrder: any;
}

export interface EntityBidOrders_locals {
  _entityOrder: any;
}

const schemas: Record<string, Schema> = {
  QX2: { kind: "struct", fields: [
]},
  Fees_input: { kind: "struct", fields: [
]},
  Fees_output: { kind: "struct", fields: [
  { name: "assetIssuanceFee", type: "u32" },
  { name: "transferFee", type: "u32" },
  { name: "tradeFee", type: "u32" },
]},
  AssetAskOrders_input: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "offset", type: "u64" },
]},
  AssetAskOrders_output: { kind: "struct", fields: [
  { name: "entity", type: "id" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
]},
  AssetBidOrders_input: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "offset", type: "u64" },
]},
  AssetBidOrders_output: { kind: "struct", fields: [
  { name: "entity", type: "id" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
]},
  EntityAskOrders_input: { kind: "struct", fields: [
  { name: "entity", type: "id" },
  { name: "offset", type: "u64" },
]},
  EntityAskOrders_output: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
]},
  EntityBidOrders_input: { kind: "struct", fields: [
  { name: "entity", type: "id" },
  { name: "offset", type: "u64" },
]},
  EntityBidOrders_output: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
]},
  IssueAsset_input: { kind: "struct", fields: [
  { name: "assetName", type: "u64" },
  { name: "numberOfShares", type: "i64" },
  { name: "unitOfMeasurement", type: "u64" },
  { name: "numberOfDecimalPlaces", type: "i8" },
]},
  IssueAsset_output: { kind: "struct", fields: [
  { name: "issuedNumberOfShares", type: "i64" },
]},
  TransferShareOwnershipAndPossession_input: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "newOwnerAndPossessor", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "numberOfShares", type: "i64" },
]},
  TransferShareOwnershipAndPossession_output: { kind: "struct", fields: [
  { name: "transferredNumberOfShares", type: "i64" },
]},
  AddToAskOrder_input: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
]},
  AddToAskOrder_output: { kind: "struct", fields: [
  { name: "addedNumberOfShares", type: "i64" },
]},
  AddToBidOrder_input: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
]},
  AddToBidOrder_output: { kind: "struct", fields: [
  { name: "addedNumberOfShares", type: "i64" },
]},
  RemoveFromAskOrder_input: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
]},
  RemoveFromAskOrder_output: { kind: "struct", fields: [
  { name: "removedNumberOfShares", type: "i64" },
]},
  RemoveFromBidOrder_input: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
]},
  RemoveFromBidOrder_output: { kind: "struct", fields: [
  { name: "removedNumberOfShares", type: "i64" },
]},
  TransferShareManagementRights_input: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "numberOfShares", type: "i64" },
  { name: "newManagingContractIndex", type: "u32" },
]},
  TransferShareManagementRights_output: { kind: "struct", fields: [
  { name: "transferredNumberOfShares", type: "i64" },
]},
  _AssetOrder: { kind: "struct", fields: [
  { name: "entity", type: "id" },
  { name: "numberOfShares", type: "i64" },
]},
  _EntityOrder: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "numberOfShares", type: "i64" },
]},
  _TradeMessage: { kind: "struct", fields: [
  { name: "issuer", type: "id" },
  { name: "assetName", type: "u64" },
  { name: "price", type: "i64" },
  { name: "numberOfShares", type: "i64" },
  { name: "_terminator", type: "i8" },
  { name: "_elementIndex", type: "i64" },
  { name: "_entityOrder", type: { bytes: 0 } },
]},
  AssetAskOrders_locals: { kind: "struct", fields: [
  { name: "_issuerAndAssetName", type: "id" },
  { name: "_assetOrder", type: { bytes: 0 } },
]},
  AssetBidOrders_locals: { kind: "struct", fields: [
  { name: "_issuerAndAssetName", type: "id" },
  { name: "_assetOrder", type: { bytes: 0 } },
]},
  EntityAskOrders_locals: { kind: "struct", fields: [
  { name: "_entityOrder", type: { bytes: 0 } },
]},
  EntityBidOrders_locals: { kind: "struct", fields: [
  { name: "_entityOrder", type: { bytes: 0 } },
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "Qx",
  contractIndex: 1,
  functions: [
    { name: "Fees", selector: 1, input: "Fees_input", output: "Fees_output", inputSchema: schemas["Fees_input"], outputSchema: schemas["Fees_output"] },
    { name: "AssetAskOrders", selector: 2, input: "AssetAskOrders_input", output: "AssetAskOrders_output", inputSchema: schemas["AssetAskOrders_input"], outputSchema: schemas["AssetAskOrders_output"] },
    { name: "AssetBidOrders", selector: 3, input: "AssetBidOrders_input", output: "AssetBidOrders_output", inputSchema: schemas["AssetBidOrders_input"], outputSchema: schemas["AssetBidOrders_output"] },
    { name: "EntityAskOrders", selector: 4, input: "EntityAskOrders_input", output: "EntityAskOrders_output", inputSchema: schemas["EntityAskOrders_input"], outputSchema: schemas["EntityAskOrders_output"] },
    { name: "EntityBidOrders", selector: 5, input: "EntityBidOrders_input", output: "EntityBidOrders_output", inputSchema: schemas["EntityBidOrders_input"], outputSchema: schemas["EntityBidOrders_output"] },
  ],
  procedures: [
    { name: "IssueAsset", selector: 1, input: "IssueAsset_input", output: "IssueAsset_output", inputSchema: schemas["IssueAsset_input"], outputSchema: schemas["IssueAsset_output"] },
    { name: "TransferShareOwnershipAndPossession", selector: 2, input: "TransferShareOwnershipAndPossession_input", output: "TransferShareOwnershipAndPossession_output", inputSchema: schemas["TransferShareOwnershipAndPossession_input"], outputSchema: schemas["TransferShareOwnershipAndPossession_output"] },
    { name: "AddToAskOrder", selector: 5, input: "AddToAskOrder_input", output: "AddToAskOrder_output", inputSchema: schemas["AddToAskOrder_input"], outputSchema: schemas["AddToAskOrder_output"] },
    { name: "AddToBidOrder", selector: 6, input: "AddToBidOrder_input", output: "AddToBidOrder_output", inputSchema: schemas["AddToBidOrder_input"], outputSchema: schemas["AddToBidOrder_output"] },
    { name: "RemoveFromAskOrder", selector: 7, input: "RemoveFromAskOrder_input", output: "RemoveFromAskOrder_output", inputSchema: schemas["RemoveFromAskOrder_input"], outputSchema: schemas["RemoveFromAskOrder_output"] },
    { name: "RemoveFromBidOrder", selector: 8, input: "RemoveFromBidOrder_input", output: "RemoveFromBidOrder_output", inputSchema: schemas["RemoveFromBidOrder_input"], outputSchema: schemas["RemoveFromBidOrder_output"] },
    { name: "TransferShareManagementRights", selector: 9, input: "TransferShareManagementRights_input", output: "TransferShareManagementRights_output", inputSchema: schemas["TransferShareManagementRights_input"], outputSchema: schemas["TransferShareManagementRights_output"] },
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
  async Fees(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: Fees_input): Promise<Fees_output> {
    const payload = encodeInput("Fees_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("Fees_output", raw) as Fees_output;
  },
  async AssetAskOrders(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: AssetAskOrders_input): Promise<AssetAskOrders_output> {
    const payload = encodeInput("AssetAskOrders_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("AssetAskOrders_output", raw) as AssetAskOrders_output;
  },
  async AssetBidOrders(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: AssetBidOrders_input): Promise<AssetBidOrders_output> {
    const payload = encodeInput("AssetBidOrders_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("AssetBidOrders_output", raw) as AssetBidOrders_output;
  },
  async EntityAskOrders(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: EntityAskOrders_input): Promise<EntityAskOrders_output> {
    const payload = encodeInput("EntityAskOrders_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("EntityAskOrders_output", raw) as EntityAskOrders_output;
  },
  async EntityBidOrders(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: EntityBidOrders_input): Promise<EntityBidOrders_output> {
    const payload = encodeInput("EntityBidOrders_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("EntityBidOrders_output", raw) as EntityBidOrders_output;
  },
};

export const procedures = {
  IssueAsset(input: IssueAsset_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("IssueAsset_input", input);
    return { inputType: 1, payload };
  },
  TransferShareOwnershipAndPossession(input: TransferShareOwnershipAndPossession_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferShareOwnershipAndPossession_input", input);
    return { inputType: 2, payload };
  },
  AddToAskOrder(input: AddToAskOrder_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("AddToAskOrder_input", input);
    return { inputType: 5, payload };
  },
  AddToBidOrder(input: AddToBidOrder_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("AddToBidOrder_input", input);
    return { inputType: 6, payload };
  },
  RemoveFromAskOrder(input: RemoveFromAskOrder_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("RemoveFromAskOrder_input", input);
    return { inputType: 7, payload };
  },
  RemoveFromBidOrder(input: RemoveFromBidOrder_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("RemoveFromBidOrder_input", input);
    return { inputType: 8, payload };
  },
  TransferShareManagementRights(input: TransferShareManagementRights_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferShareManagementRights_input", input);
    return { inputType: 9, payload };
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
      Fees: async (input: Fees_input): Promise<Fees_output> => functions.Fees(client, contractIndex, input),
      AssetAskOrders: async (input: AssetAskOrders_input): Promise<AssetAskOrders_output> => functions.AssetAskOrders(client, contractIndex, input),
      AssetBidOrders: async (input: AssetBidOrders_input): Promise<AssetBidOrders_output> => functions.AssetBidOrders(client, contractIndex, input),
      EntityAskOrders: async (input: EntityAskOrders_input): Promise<EntityAskOrders_output> => functions.EntityAskOrders(client, contractIndex, input),
      EntityBidOrders: async (input: EntityBidOrders_input): Promise<EntityBidOrders_output> => functions.EntityBidOrders(client, contractIndex, input),
    },
    procedures: {
      IssueAsset: (input: IssueAsset_input) => procedures.IssueAsset(input),
      TransferShareOwnershipAndPossession: (input: TransferShareOwnershipAndPossession_input) => procedures.TransferShareOwnershipAndPossession(input),
      AddToAskOrder: (input: AddToAskOrder_input) => procedures.AddToAskOrder(input),
      AddToBidOrder: (input: AddToBidOrder_input) => procedures.AddToBidOrder(input),
      RemoveFromAskOrder: (input: RemoveFromAskOrder_input) => procedures.RemoveFromAskOrder(input),
      RemoveFromBidOrder: (input: RemoveFromBidOrder_input) => procedures.RemoveFromBidOrder(input),
      TransferShareManagementRights: (input: TransferShareManagementRights_input) => procedures.TransferShareManagementRights(input),
    },
  };
}
