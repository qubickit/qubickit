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

export interface QUTILLogger {
  contractId: number;
  padding: number;
  src: Uint8Array;
  dst: Uint8Array;
  amt: bigint;
  logtype: number;
  _terminator: number;
}

export interface QUTILSendToManyBenchmarkLog {
  contractId: number;
  logType: number;
  startId: Uint8Array;
  dstCount: bigint;
  _terminator: number;
}

export interface QUTILDFLogger {
  contractId: number;
  padding: number;
  dfNonce: Uint8Array;
  dfPubkey: Uint8Array;
  dfMiningSeed: Uint8Array;
  result: Uint8Array;
  _terminator: number;
}

export interface QUTILPoll {
  poll_name: Uint8Array;
  poll_type: bigint;
  min_amount: bigint;
  is_active: bigint;
  creator: Uint8Array;
  num_assets: bigint;
}

export interface QUTILVoter {
  address: Uint8Array;
  amount: bigint;
  chosen_option: bigint;
}

export type QUTIL2 = Record<string, never>;


export interface get_qubic_balance_input {
  address: Uint8Array;
}

export interface get_qubic_balance_output {
  balance: bigint;
}

export type get_qubic_balance_locals = Record<string, never>;


export interface get_asset_balance_input {
  address: Uint8Array;
  asset: any;
}

export interface get_asset_balance_output {
  balance: bigint;
}

export type get_asset_balance_locals = Record<string, never>;


export interface get_voter_balance_input {
  poll_idx: bigint;
  address: Uint8Array;
}

export interface get_voter_balance_output {
  balance: bigint;
}

export interface get_voter_balance_locals {
  poll_type: bigint;
  balance: bigint;
  max_balance: bigint;
  asset_idx: bigint;
  current_asset: any;
  gqb_input: any;
  gqb_output: any;
  gqb_locals: any;
  gab_input: any;
  gab_output: any;
  gab_locals: any;
}

export interface swap_voter_to_end_input {
  poll_idx: bigint;
  i: bigint;
  end_idx: bigint;
}

export type swap_voter_to_end_output = Record<string, never>;


export interface swap_voter_to_end_locals {
  voter_index_i: bigint;
  voter_index_end: bigint;
  temp_voter: any;
}

export type SendToManyV1_input = Record<string, never>;


export interface SendToManyV1_output {
  returnCode: number;
}

export interface SendToManyV1_locals {
  logger: any;
}

export type GetSendToManyV1Fee_input = Record<string, never>;


export interface GetSendToManyV1Fee_output {
  fee: bigint;
}

export interface SendToManyBenchmark_input {
  dstCount: bigint;
  numTransfersEach: bigint;
}

export interface SendToManyBenchmark_output {
  dstCount: bigint;
  returnCode: number;
  total: bigint;
}

export interface SendToManyBenchmark_locals {
  currentId: Uint8Array;
  t: bigint;
  useNext: bigint;
  totalNumTransfers: bigint;
  logger: any;
  logBenchmark: any;
}

export interface BurnQubic_input {
  amount: bigint;
}

export interface BurnQubic_output {
  amount: bigint;
}

export interface BurnQubicForContract_input {
  contractIndexBurnedFor: number;
}

export interface BurnQubicForContract_output {
  amount: bigint;
}

export interface QueryFeeReserve_input {
  contractIndex: number;
}

export interface QueryFeeReserve_output {
  reserveAmount: bigint;
}

export interface CreatePoll_input {
  poll_name: Uint8Array;
  poll_type: bigint;
  min_amount: bigint;
  num_assets: bigint;
}

export interface CreatePoll_output {
  poll_id: bigint;
}

export interface CreatePoll_locals {
  idx: bigint;
  new_poll: any;
  default_voter: any;
  i: bigint;
  logger: any;
}

export interface Vote_input {
  poll_id: bigint;
  address: Uint8Array;
  amount: bigint;
  chosen_option: bigint;
}

export interface Vote_output {
  success: number;
}

export interface Vote_locals {
  idx: bigint;
  balance: bigint;
  poll_type: bigint;
  voter_idx: bigint;
  gvb_input: any;
  gvb_output: any;
  gvb_locals: any;
  sve_input: any;
  sve_output: any;
  sve_locals: any;
  i: bigint;
  voter_index: bigint;
  temp_voter: any;
  real_vote: bigint;
  end_idx: bigint;
  max_balance: bigint;
  logger: any;
}

export interface CancelPoll_input {
  poll_id: bigint;
}

export interface CancelPoll_output {
  success: number;
}

export interface CancelPoll_locals {
  idx: bigint;
  current_poll: any;
  logger: any;
}

export interface GetCurrentResult_input {
  poll_id: bigint;
}

export interface GetCurrentResult_output {
  is_active: bigint;
}

export interface GetCurrentResult_locals {
  idx: bigint;
  poll_type: bigint;
  effective_amount: bigint;
  voter: any;
  i: bigint;
  voter_index: bigint;
  logger: any;
}

export interface GetPollsByCreator_input {
  creator: Uint8Array;
}

export interface GetPollsByCreator_output {
  count: bigint;
}

export interface GetPollsByCreator_locals {
  idx: bigint;
  logger: any;
}

export type GetCurrentPollId_input = Record<string, never>;


export interface GetCurrentPollId_output {
  current_poll_id: bigint;
  active_count: bigint;
}

export interface GetCurrentPollId_locals {
  i: bigint;
}

export interface GetPollInfo_input {
  poll_id: bigint;
}

export interface GetPollInfo_output {
  found: bigint;
  poll_info: any;
}

export interface GetPollInfo_locals {
  idx: bigint;
  default_poll: any;
}

export interface GetFees_output {
  smt1InvocationFee: bigint;
  pollCreationFee: bigint;
  pollVoteFee: bigint;
  distributeQuToShareholderFeePerShareholder: bigint;
  shareholderProposalFee: bigint;
  _futureFeePlaceholder0: bigint;
  _futureFeePlaceholder1: bigint;
  _futureFeePlaceholder2: bigint;
  _futureFeePlaceholder3: bigint;
  _futureFeePlaceholder4: bigint;
  _futureFeePlaceholder5: bigint;
}

export interface END_EPOCH_locals {
  i: bigint;
  current_poll: any;
}

export interface BEGIN_TICK_locals {
  logger: any;
}

export interface DistributeQuToShareholders_input {
  asset: any;
}

export interface DistributeQuToShareholders_output {
  shareholders: bigint;
  totalShares: bigint;
  amountPerShare: bigint;
  fees: bigint;
}

export interface DistributeQuToShareholders_locals {
  iter: any;
  payBack: bigint;
}

export type GetTotalNumberOfAssetShares_input = Record<string, never>;


export type GetTotalNumberOfAssetShares_output = Record<string, never>;


export type GetFees_input = Record<string, never>;


const schemas: Record<string, Schema> = {
  QUTILLogger: { kind: "struct", fields: [
  { name: "contractId", type: "u32" },
  { name: "padding", type: "u32" },
  { name: "src", type: "id" },
  { name: "dst", type: "id" },
  { name: "amt", type: "i64" },
  { name: "logtype", type: "u32" },
  { name: "_terminator", type: "i8" },
]},
  QUTILSendToManyBenchmarkLog: { kind: "struct", fields: [
  { name: "contractId", type: "u32" },
  { name: "logType", type: "u32" },
  { name: "startId", type: "id" },
  { name: "dstCount", type: "i64" },
  { name: "_terminator", type: "i8" },
]},
  QUTILDFLogger: { kind: "struct", fields: [
  { name: "contractId", type: "u32" },
  { name: "padding", type: "u32" },
  { name: "dfNonce", type: "id" },
  { name: "dfPubkey", type: "id" },
  { name: "dfMiningSeed", type: "id" },
  { name: "result", type: "id" },
  { name: "_terminator", type: "i8" },
]},
  QUTILPoll: { kind: "struct", fields: [
  { name: "poll_name", type: "id" },
  { name: "poll_type", type: "u64" },
  { name: "min_amount", type: "u64" },
  { name: "is_active", type: "u64" },
  { name: "creator", type: "id" },
  { name: "num_assets", type: "u64" },
]},
  QUTILVoter: { kind: "struct", fields: [
  { name: "address", type: "id" },
  { name: "amount", type: "u64" },
  { name: "chosen_option", type: "u64" },
]},
  QUTIL2: { kind: "struct", fields: [
]},
  get_qubic_balance_input: { kind: "struct", fields: [
  { name: "address", type: "id" },
]},
  get_qubic_balance_output: { kind: "struct", fields: [
  { name: "balance", type: "u64" },
]},
  get_qubic_balance_locals: { kind: "struct", fields: [
]},
  get_asset_balance_input: { kind: "struct", fields: [
  { name: "address", type: "id" },
  { name: "asset", type: { bytes: 40 } },
]},
  get_asset_balance_output: { kind: "struct", fields: [
  { name: "balance", type: "u64" },
]},
  get_asset_balance_locals: { kind: "struct", fields: [
]},
  get_voter_balance_input: { kind: "struct", fields: [
  { name: "poll_idx", type: "u64" },
  { name: "address", type: "id" },
]},
  get_voter_balance_output: { kind: "struct", fields: [
  { name: "balance", type: "u64" },
]},
  get_voter_balance_locals: { kind: "struct", fields: [
  { name: "poll_type", type: "u64" },
  { name: "balance", type: "u64" },
  { name: "max_balance", type: "u64" },
  { name: "asset_idx", type: "u64" },
  { name: "current_asset", type: { bytes: 40 } },
  { name: "gqb_input", type: { bytes: 0 } },
  { name: "gqb_output", type: { bytes: 0 } },
  { name: "gqb_locals", type: { bytes: 0 } },
  { name: "gab_input", type: { bytes: 0 } },
  { name: "gab_output", type: { bytes: 0 } },
  { name: "gab_locals", type: { bytes: 0 } },
]},
  swap_voter_to_end_input: { kind: "struct", fields: [
  { name: "poll_idx", type: "u64" },
  { name: "i", type: "u64" },
  { name: "end_idx", type: "u64" },
]},
  swap_voter_to_end_output: { kind: "struct", fields: [
]},
  swap_voter_to_end_locals: { kind: "struct", fields: [
  { name: "voter_index_i", type: "u64" },
  { name: "voter_index_end", type: "u64" },
  { name: "temp_voter", type: { bytes: 0 } },
]},
  SendToManyV1_input: { kind: "struct", fields: [
]},
  SendToManyV1_output: { kind: "struct", fields: [
  { name: "returnCode", type: "i32" },
]},
  SendToManyV1_locals: { kind: "struct", fields: [
  { name: "logger", type: { bytes: 0 } },
]},
  GetSendToManyV1Fee_input: { kind: "struct", fields: [
]},
  GetSendToManyV1Fee_output: { kind: "struct", fields: [
  { name: "fee", type: "i64" },
]},
  SendToManyBenchmark_input: { kind: "struct", fields: [
  { name: "dstCount", type: "i64" },
  { name: "numTransfersEach", type: "i64" },
]},
  SendToManyBenchmark_output: { kind: "struct", fields: [
  { name: "dstCount", type: "i64" },
  { name: "returnCode", type: "i32" },
  { name: "total", type: "i64" },
]},
  SendToManyBenchmark_locals: { kind: "struct", fields: [
  { name: "currentId", type: "id" },
  { name: "t", type: "i64" },
  { name: "useNext", type: "u64" },
  { name: "totalNumTransfers", type: "u64" },
  { name: "logger", type: { bytes: 0 } },
  { name: "logBenchmark", type: { bytes: 0 } },
]},
  BurnQubic_input: { kind: "struct", fields: [
  { name: "amount", type: "i64" },
]},
  BurnQubic_output: { kind: "struct", fields: [
  { name: "amount", type: "i64" },
]},
  BurnQubicForContract_input: { kind: "struct", fields: [
  { name: "contractIndexBurnedFor", type: "u32" },
]},
  BurnQubicForContract_output: { kind: "struct", fields: [
  { name: "amount", type: "i64" },
]},
  QueryFeeReserve_input: { kind: "struct", fields: [
  { name: "contractIndex", type: "u32" },
]},
  QueryFeeReserve_output: { kind: "struct", fields: [
  { name: "reserveAmount", type: "i64" },
]},
  CreatePoll_input: { kind: "struct", fields: [
  { name: "poll_name", type: "id" },
  { name: "poll_type", type: "u64" },
  { name: "min_amount", type: "u64" },
  { name: "num_assets", type: "u64" },
]},
  CreatePoll_output: { kind: "struct", fields: [
  { name: "poll_id", type: "u64" },
]},
  CreatePoll_locals: { kind: "struct", fields: [
  { name: "idx", type: "u64" },
  { name: "new_poll", type: { bytes: 0 } },
  { name: "default_voter", type: { bytes: 0 } },
  { name: "i", type: "u64" },
  { name: "logger", type: { bytes: 0 } },
]},
  Vote_input: { kind: "struct", fields: [
  { name: "poll_id", type: "u64" },
  { name: "address", type: "id" },
  { name: "amount", type: "u64" },
  { name: "chosen_option", type: "u64" },
]},
  Vote_output: { kind: "struct", fields: [
  { name: "success", type: "u8" },
]},
  Vote_locals: { kind: "struct", fields: [
  { name: "idx", type: "u64" },
  { name: "balance", type: "u64" },
  { name: "poll_type", type: "u64" },
  { name: "voter_idx", type: "i64" },
  { name: "gvb_input", type: { bytes: 0 } },
  { name: "gvb_output", type: { bytes: 0 } },
  { name: "gvb_locals", type: { bytes: 0 } },
  { name: "sve_input", type: { bytes: 0 } },
  { name: "sve_output", type: { bytes: 0 } },
  { name: "sve_locals", type: { bytes: 0 } },
  { name: "i", type: "u64" },
  { name: "voter_index", type: "u64" },
  { name: "temp_voter", type: { bytes: 0 } },
  { name: "real_vote", type: "u64" },
  { name: "end_idx", type: "u64" },
  { name: "max_balance", type: "u64" },
  { name: "logger", type: { bytes: 0 } },
]},
  CancelPoll_input: { kind: "struct", fields: [
  { name: "poll_id", type: "u64" },
]},
  CancelPoll_output: { kind: "struct", fields: [
  { name: "success", type: "u8" },
]},
  CancelPoll_locals: { kind: "struct", fields: [
  { name: "idx", type: "u64" },
  { name: "current_poll", type: { bytes: 0 } },
  { name: "logger", type: { bytes: 0 } },
]},
  GetCurrentResult_input: { kind: "struct", fields: [
  { name: "poll_id", type: "u64" },
]},
  GetCurrentResult_output: { kind: "struct", fields: [
  { name: "is_active", type: "u64" },
]},
  GetCurrentResult_locals: { kind: "struct", fields: [
  { name: "idx", type: "u64" },
  { name: "poll_type", type: "u64" },
  { name: "effective_amount", type: "u64" },
  { name: "voter", type: { bytes: 0 } },
  { name: "i", type: "u64" },
  { name: "voter_index", type: "u64" },
  { name: "logger", type: { bytes: 0 } },
]},
  GetPollsByCreator_input: { kind: "struct", fields: [
  { name: "creator", type: "id" },
]},
  GetPollsByCreator_output: { kind: "struct", fields: [
  { name: "count", type: "u64" },
]},
  GetPollsByCreator_locals: { kind: "struct", fields: [
  { name: "idx", type: "u64" },
  { name: "logger", type: { bytes: 0 } },
]},
  GetCurrentPollId_input: { kind: "struct", fields: [
]},
  GetCurrentPollId_output: { kind: "struct", fields: [
  { name: "current_poll_id", type: "u64" },
  { name: "active_count", type: "u64" },
]},
  GetCurrentPollId_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
]},
  GetPollInfo_input: { kind: "struct", fields: [
  { name: "poll_id", type: "u64" },
]},
  GetPollInfo_output: { kind: "struct", fields: [
  { name: "found", type: "u64" },
  { name: "poll_info", type: { bytes: 0 } },
]},
  GetPollInfo_locals: { kind: "struct", fields: [
  { name: "idx", type: "u64" },
  { name: "default_poll", type: { bytes: 0 } },
]},
  GetFees_output: { kind: "struct", fields: [
  { name: "smt1InvocationFee", type: "i64" },
  { name: "pollCreationFee", type: "i64" },
  { name: "pollVoteFee", type: "i64" },
  { name: "distributeQuToShareholderFeePerShareholder", type: "i64" },
  { name: "shareholderProposalFee", type: "i64" },
  { name: "_futureFeePlaceholder0", type: "i64" },
  { name: "_futureFeePlaceholder1", type: "i64" },
  { name: "_futureFeePlaceholder2", type: "i64" },
  { name: "_futureFeePlaceholder3", type: "i64" },
  { name: "_futureFeePlaceholder4", type: "i64" },
  { name: "_futureFeePlaceholder5", type: "i64" },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
  { name: "i", type: "u64" },
  { name: "current_poll", type: { bytes: 0 } },
]},
  BEGIN_TICK_locals: { kind: "struct", fields: [
  { name: "logger", type: { bytes: 0 } },
]},
  DistributeQuToShareholders_input: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
]},
  DistributeQuToShareholders_output: { kind: "struct", fields: [
  { name: "shareholders", type: "i64" },
  { name: "totalShares", type: "i64" },
  { name: "amountPerShare", type: "i64" },
  { name: "fees", type: "i64" },
]},
  DistributeQuToShareholders_locals: { kind: "struct", fields: [
  { name: "iter", type: { bytes: 0 } },
  { name: "payBack", type: "i64" },
]},
  GetTotalNumberOfAssetShares_input: { kind: "struct", fields: [
]},
  GetTotalNumberOfAssetShares_output: { kind: "struct", fields: [
]},
  GetFees_input: { kind: "struct", fields: [
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "QUtil",
  contractIndex: 4,
  functions: [
    { name: "GetSendToManyV1Fee", selector: 1, input: "GetSendToManyV1Fee_input", output: "GetSendToManyV1Fee_output", inputSchema: schemas["GetSendToManyV1Fee_input"], outputSchema: schemas["GetSendToManyV1Fee_output"] },
    { name: "GetTotalNumberOfAssetShares", selector: 2, input: "GetTotalNumberOfAssetShares_input", output: "GetTotalNumberOfAssetShares_output", inputSchema: schemas["GetTotalNumberOfAssetShares_input"], outputSchema: schemas["GetTotalNumberOfAssetShares_output"] },
    { name: "GetCurrentResult", selector: 3, input: "GetCurrentResult_input", output: "GetCurrentResult_output", inputSchema: schemas["GetCurrentResult_input"], outputSchema: schemas["GetCurrentResult_output"] },
    { name: "GetPollsByCreator", selector: 4, input: "GetPollsByCreator_input", output: "GetPollsByCreator_output", inputSchema: schemas["GetPollsByCreator_input"], outputSchema: schemas["GetPollsByCreator_output"] },
    { name: "GetCurrentPollId", selector: 5, input: "GetCurrentPollId_input", output: "GetCurrentPollId_output", inputSchema: schemas["GetCurrentPollId_input"], outputSchema: schemas["GetCurrentPollId_output"] },
    { name: "GetPollInfo", selector: 6, input: "GetPollInfo_input", output: "GetPollInfo_output", inputSchema: schemas["GetPollInfo_input"], outputSchema: schemas["GetPollInfo_output"] },
    { name: "GetFees", selector: 7, input: "GetFees_input", output: "GetFees_output", inputSchema: schemas["GetFees_input"], outputSchema: schemas["GetFees_output"] },
    { name: "QueryFeeReserve", selector: 8, input: "QueryFeeReserve_input", output: "QueryFeeReserve_output", inputSchema: schemas["QueryFeeReserve_input"], outputSchema: schemas["QueryFeeReserve_output"] },
  ],
  procedures: [
    { name: "SendToManyV1", selector: 1, input: "SendToManyV1_input", output: "SendToManyV1_output", inputSchema: schemas["SendToManyV1_input"], outputSchema: schemas["SendToManyV1_output"] },
    { name: "BurnQubic", selector: 2, input: "BurnQubic_input", output: "BurnQubic_output", inputSchema: schemas["BurnQubic_input"], outputSchema: schemas["BurnQubic_output"] },
    { name: "SendToManyBenchmark", selector: 3, input: "SendToManyBenchmark_input", output: "SendToManyBenchmark_output", inputSchema: schemas["SendToManyBenchmark_input"], outputSchema: schemas["SendToManyBenchmark_output"] },
    { name: "CreatePoll", selector: 4, input: "CreatePoll_input", output: "CreatePoll_output", inputSchema: schemas["CreatePoll_input"], outputSchema: schemas["CreatePoll_output"] },
    { name: "Vote", selector: 5, input: "Vote_input", output: "Vote_output", inputSchema: schemas["Vote_input"], outputSchema: schemas["Vote_output"] },
    { name: "CancelPoll", selector: 6, input: "CancelPoll_input", output: "CancelPoll_output", inputSchema: schemas["CancelPoll_input"], outputSchema: schemas["CancelPoll_output"] },
    { name: "DistributeQuToShareholders", selector: 7, input: "DistributeQuToShareholders_input", output: "DistributeQuToShareholders_output", inputSchema: schemas["DistributeQuToShareholders_input"], outputSchema: schemas["DistributeQuToShareholders_output"] },
    { name: "BurnQubicForContract", selector: 8, input: "BurnQubicForContract_input", output: "BurnQubicForContract_output", inputSchema: schemas["BurnQubicForContract_input"], outputSchema: schemas["BurnQubicForContract_output"] },
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
  async GetSendToManyV1Fee(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetSendToManyV1Fee_input): Promise<GetSendToManyV1Fee_output> {
    const payload = encodeInput("GetSendToManyV1Fee_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetSendToManyV1Fee_output", raw) as GetSendToManyV1Fee_output;
  },
  async GetTotalNumberOfAssetShares(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetTotalNumberOfAssetShares_input): Promise<GetTotalNumberOfAssetShares_output> {
    const payload = encodeInput("GetTotalNumberOfAssetShares_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetTotalNumberOfAssetShares_output", raw) as GetTotalNumberOfAssetShares_output;
  },
  async GetCurrentResult(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetCurrentResult_input): Promise<GetCurrentResult_output> {
    const payload = encodeInput("GetCurrentResult_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetCurrentResult_output", raw) as GetCurrentResult_output;
  },
  async GetPollsByCreator(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetPollsByCreator_input): Promise<GetPollsByCreator_output> {
    const payload = encodeInput("GetPollsByCreator_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetPollsByCreator_output", raw) as GetPollsByCreator_output;
  },
  async GetCurrentPollId(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetCurrentPollId_input): Promise<GetCurrentPollId_output> {
    const payload = encodeInput("GetCurrentPollId_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetCurrentPollId_output", raw) as GetCurrentPollId_output;
  },
  async GetPollInfo(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetPollInfo_input): Promise<GetPollInfo_output> {
    const payload = encodeInput("GetPollInfo_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetPollInfo_output", raw) as GetPollInfo_output;
  },
  async GetFees(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: GetFees_input): Promise<GetFees_output> {
    const payload = encodeInput("GetFees_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("GetFees_output", raw) as GetFees_output;
  },
  async QueryFeeReserve(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: QueryFeeReserve_input): Promise<QueryFeeReserve_output> {
    const payload = encodeInput("QueryFeeReserve_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("QueryFeeReserve_output", raw) as QueryFeeReserve_output;
  },
};

export const procedures = {
  SendToManyV1(input: SendToManyV1_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SendToManyV1_input", input);
    return { inputType: 1, payload };
  },
  BurnQubic(input: BurnQubic_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("BurnQubic_input", input);
    return { inputType: 2, payload };
  },
  SendToManyBenchmark(input: SendToManyBenchmark_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("SendToManyBenchmark_input", input);
    return { inputType: 3, payload };
  },
  CreatePoll(input: CreatePoll_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("CreatePoll_input", input);
    return { inputType: 4, payload };
  },
  Vote(input: Vote_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("Vote_input", input);
    return { inputType: 5, payload };
  },
  CancelPoll(input: CancelPoll_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("CancelPoll_input", input);
    return { inputType: 6, payload };
  },
  DistributeQuToShareholders(input: DistributeQuToShareholders_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("DistributeQuToShareholders_input", input);
    return { inputType: 7, payload };
  },
  BurnQubicForContract(input: BurnQubicForContract_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("BurnQubicForContract_input", input);
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
      GetSendToManyV1Fee: async (input: GetSendToManyV1Fee_input): Promise<GetSendToManyV1Fee_output> => functions.GetSendToManyV1Fee(client, contractIndex, input),
      GetTotalNumberOfAssetShares: async (input: GetTotalNumberOfAssetShares_input): Promise<GetTotalNumberOfAssetShares_output> => functions.GetTotalNumberOfAssetShares(client, contractIndex, input),
      GetCurrentResult: async (input: GetCurrentResult_input): Promise<GetCurrentResult_output> => functions.GetCurrentResult(client, contractIndex, input),
      GetPollsByCreator: async (input: GetPollsByCreator_input): Promise<GetPollsByCreator_output> => functions.GetPollsByCreator(client, contractIndex, input),
      GetCurrentPollId: async (input: GetCurrentPollId_input): Promise<GetCurrentPollId_output> => functions.GetCurrentPollId(client, contractIndex, input),
      GetPollInfo: async (input: GetPollInfo_input): Promise<GetPollInfo_output> => functions.GetPollInfo(client, contractIndex, input),
      GetFees: async (input: GetFees_input): Promise<GetFees_output> => functions.GetFees(client, contractIndex, input),
      QueryFeeReserve: async (input: QueryFeeReserve_input): Promise<QueryFeeReserve_output> => functions.QueryFeeReserve(client, contractIndex, input),
    },
    procedures: {
      SendToManyV1: (input: SendToManyV1_input) => procedures.SendToManyV1(input),
      BurnQubic: (input: BurnQubic_input) => procedures.BurnQubic(input),
      SendToManyBenchmark: (input: SendToManyBenchmark_input) => procedures.SendToManyBenchmark(input),
      CreatePoll: (input: CreatePoll_input) => procedures.CreatePoll(input),
      Vote: (input: Vote_input) => procedures.Vote(input),
      CancelPoll: (input: CancelPoll_input) => procedures.CancelPoll(input),
      DistributeQuToShareholders: (input: DistributeQuToShareholders_input) => procedures.DistributeQuToShareholders(input),
      BurnQubicForContract: (input: BurnQubicForContract_input) => procedures.BurnQubicForContract(input),
    },
  };
}
