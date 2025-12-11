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

export interface QBAYLogger {
  _contractIndex: number;
  _type: number;
  _terminator: number;
}

export type QBAY2 = Record<string, never>;


export interface settingCFBAndQubicPrice_input {
  CFBPrice: bigint;
  QubicPrice: bigint;
}

export interface settingCFBAndQubicPrice_output {
  returnCode: number;
}

export interface createCollection_input {
  priceForDropMint: bigint;
  volume: number;
  royalty: number;
  maxSizePerOneId: number;
  typeOfCollection: number;
}

export interface createCollection_output {
  returnCode: number;
}

export interface mint_input {
  royalty: number;
  collectionId: number;
  typeOfMint: number;
}

export interface mint_output {
  returnCode: number;
}

export interface mintOfDrop_input {
  collectionId: number;
}

export interface mintOfDrop_output {
  returnCode: number;
}

export interface transfer_input {
  receiver: Uint8Array;
  NFTid: number;
}

export interface transfer_output {
  returnCode: number;
}

export interface listInMarket_input {
  price: bigint;
  NFTid: number;
}

export interface listInMarket_output {
  returnCode: number;
}

export interface buy_input {
  NFTid: number;
  methodOfPayment: number;
}

export interface buy_output {
  returnCode: number;
}

export interface cancelSale_input {
  NFTid: number;
}

export interface cancelSale_output {
  returnCode: number;
}

export interface listInExchange_input {
  possessedNFT: number;
  anotherNFT: number;
}

export interface listInExchange_output {
  returnCode: number;
}

export interface cancelExchange_input {
  possessedNFT: number;
  anotherNFT: number;
}

export interface cancelExchange_output {
  returnCode: number;
}

export interface makeOffer_input {
  askPrice: bigint;
  NFTid: number;
  paymentMethod: number;
}

export interface makeOffer_output {
  returnCode: number;
}

export interface acceptOffer_input {
  NFTid: number;
}

export interface acceptOffer_output {
  returnCode: number;
}

export interface cancelOffer_input {
  NFTid: number;
}

export interface cancelOffer_output {
  returnCode: number;
}

export interface createTraditionalAuction_input {
  minPrice: bigint;
  NFTId: number;
  startYear: number;
  startMonth: number;
  startDay: number;
  startHour: number;
  endYear: number;
  endMonth: number;
  endDay: number;
  endHour: number;
  paymentMethodOfAuction: number;
}

export interface createTraditionalAuction_output {
  returnCode: number;
}

export interface bidOnTraditionalAuction_input {
  price: bigint;
  NFTId: number;
  paymentMethod: number;
}

export interface bidOnTraditionalAuction_output {
  returnCode: number;
}

export interface TransferShareManagementRights_input {
  asset: any;
  numberOfShares: bigint;
  newManagingContractIndex: number;
}

export interface TransferShareManagementRights_output {
  transferredNumberOfShares: bigint;
  returnCode: number;
}

export interface changeStatusOfMarketPlace_input {
  status: number;
}

export interface changeStatusOfMarketPlace_output {
  returnCode: number;
}

export interface getNumberOfNFTForUser_input {
  user: Uint8Array;
}

export interface getNumberOfNFTForUser_output {
  numberOfNFT: number;
}

export interface getInfoOfNFTUserPossessed_input {
  user: Uint8Array;
  NFTNumber: number;
}

export interface getInfoOfNFTUserPossessed_output {
  creator: Uint8Array;
  possessor: Uint8Array;
  askUser: Uint8Array;
  creatorOfAuction: Uint8Array;
  salePrice: bigint;
  askMaxPrice: bigint;
  currentPriceOfAuction: bigint;
  royalty: number;
  NFTidForExchange: number;
  statusOfAuction: number;
  yearAuctionStarted: number;
  monthAuctionStarted: number;
  dayAuctionStarted: number;
  hourAuctionStarted: number;
  minuteAuctionStarted: number;
  secondAuctionStarted: number;
  yearAuctionEnded: number;
  monthAuctionEnded: number;
  dayAuctionEnded: number;
  hourAuctionEnded: number;
  minuteAuctionEnded: number;
  secondAuctionEnded: number;
  statusOfSale: number;
  statusOfAsk: number;
  paymentMethodOfAsk: number;
  statusOfExchange: number;
  paymentMethodOfAuction: number;
}

export type getInfoOfMarketplace_input = Record<string, never>;


export interface getInfoOfMarketplace_output {
  priceOfCFB: bigint;
  priceOfQubic: bigint;
  numberOfNFTIncoming: bigint;
  earnedQubic: bigint;
  earnedCFB: bigint;
  numberOfCollection: number;
  numberOfNFT: number;
  statusOfMarketPlace: number;
}

export interface getInfoOfCollectionByCreator_input {
  creator: Uint8Array;
  orderOfCollection: number;
}

export interface getInfoOfCollectionByCreator_output {
  priceForDropMint: bigint;
  idOfCollection: number;
  royalty: number;
  currentSize: number;
  maxSizeHoldingPerOneId: number;
  typeOfCollection: number;
}

export interface getInfoOfCollectionById_input {
  idOfCollection: number;
}

export interface getInfoOfCollectionById_output {
  creator: Uint8Array;
  priceForDropMint: bigint;
  royalty: number;
  currentSize: number;
  maxSizeHoldingPerOneId: number;
  typeOfCollection: number;
}

export interface getIncomingAuctions_input {
  offset: number;
  count: number;
}

export type getIncomingAuctions_output = Record<string, never>;


export interface getInfoOfNFTById_input {
  NFTId: number;
}

export interface getInfoOfNFTById_output {
  creator: Uint8Array;
  possessor: Uint8Array;
  askUser: Uint8Array;
  creatorOfAuction: Uint8Array;
  salePrice: bigint;
  askMaxPrice: bigint;
  currentPriceOfAuction: bigint;
  royalty: number;
  NFTidForExchange: number;
  statusOfAuction: number;
  yearAuctionStarted: number;
  monthAuctionStarted: number;
  dayAuctionStarted: number;
  hourAuctionStarted: number;
  minuteAuctionStarted: number;
  secondAuctionStarted: number;
  yearAuctionEnded: number;
  monthAuctionEnded: number;
  dayAuctionEnded: number;
  hourAuctionEnded: number;
  minuteAuctionEnded: number;
  secondAuctionEnded: number;
  statusOfSale: number;
  statusOfAsk: number;
  paymentMethodOfAsk: number;
  statusOfExchange: number;
  paymentMethodOfAuction: number;
}

export interface getUserCreatedCollection_input {
  user: Uint8Array;
  offset: number;
  count: number;
}

export type getUserCreatedCollection_output = Record<string, never>;


export interface getUserCreatedNFT_input {
  user: Uint8Array;
  offset: number;
  count: number;
}

export type getUserCreatedNFT_output = Record<string, never>;


export interface InfoOfCollection {
  creator: Uint8Array;
  priceForDropMint: bigint;
  maxSizeHoldingPerOneId: number;
  currentSize: number;
  royalty: number;
  typeOfCollection: number;
}

export interface InfoOfNFT {
  creator: Uint8Array;
  possessor: Uint8Array;
  askUser: Uint8Array;
  creatorOfAuction: Uint8Array;
  salePrice: bigint;
  askMaxPrice: bigint;
  currentPriceOfAuction: bigint;
  startTimeOfAuction: number;
  endTimeOfAuction: number;
  royalty: number;
  NFTidForExchange: number;
  statusOfAuction: number;
  statusOfSale: number;
  statusOfAsk: number;
  paymentMethodOfAsk: number;
  statusOfExchange: number;
  paymentMethodOfAuction: number;
}

export interface settingCFBAndQubicPrice_locals {
  log: any;
}

export interface createCollection_locals {
  newCollection: any;
  possessedAmount: bigint;
  tmp: bigint;
  _t: number;
  numberOfNFT: number;
  fee: number;
  log: any;
}

export interface mint_locals {
  _t: number;
  cntOfNFTPerOne: number;
  newNFT: any;
  updatedCollection: any;
  log: any;
}

export interface mintOfDrop_locals {
  updatedCollection: any;
  newNFT: any;
  creator: Uint8Array;
  cntOfNFTHoldingPerOneId: bigint;
  _t: number;
  log: any;
}

export interface transfer_locals {
  transferNFT: any;
  curDate: number;
  _t: number;
  log: any;
}

export interface listInMarket_locals {
  saleNFT: any;
  _t: number;
  curDate: number;
  log: any;
}

export interface buy_locals {
  updatedNFT: any;
  transferredAmountOfCFB: bigint;
  marketFee: bigint;
  creatorFee: bigint;
  shareHolderFee: bigint;
  possessedCFBAmount: bigint;
  transferredCFBAmount: bigint;
  _t: number;
  curDate: number;
  log: any;
}

export interface cancelSale_locals {
  updatedNFT: any;
  _t: number;
  curDate: number;
  log: any;
}

export interface listInExchange_locals {
  updatedNFT: any;
  tmpPossessor: Uint8Array;
  _t: number;
  curDate: number;
  log: any;
}

export interface cancelExchange_locals {
  updatedNFT: any;
  _t: number;
  curDate: number;
  log: any;
}

export interface makeOffer_locals {
  AskedNFT: any;
  tmp: bigint;
  _t: number;
  curDate: number;
  log: any;
}

export interface acceptOffer_locals {
  updatedNFT: any;
  tmp: bigint;
  creatorFee: bigint;
  marketFee: bigint;
  shareHolderFee: bigint;
  _t: number;
  curDate: number;
  log: any;
}

export interface cancelOffer_locals {
  updatedNFT: any;
  tmp: bigint;
  _t: number;
  curDate: number;
  log: any;
}

export interface createTraditionalAuction_locals {
  updatedNFT: any;
  curDate: number;
  startDate: number;
  endDate: number;
  log: any;
}

export interface bidOnTraditionalAuction_locals {
  updatedNFT: any;
  marketFee: bigint;
  creatorFee: bigint;
  shareHolderFee: bigint;
  possessedAmount: bigint;
  updatedBidPrice: bigint;
  tmp: bigint;
  _t: number;
  curDate: number;
  log: any;
}

export interface changeStatusOfMarketPlace_locals {
  log: any;
}

export interface TransferShareManagementRights_locals {
  log: any;
}

export interface getNumberOfNFTForUser_locals {
  curDate: number;
  _t: number;
}

export interface getInfoOfNFTUserPossessed_locals {
  curDate: number;
  cnt: number;
}

export type getInfoOfCollectionByCreator_locals = Record<string, never>;


export interface getInfoOfCollectionById_locals {
  _t: number;
}

export interface getIncomingAuctions_locals {
  curDate: number;
}

export interface getInfoOfNFTById_locals {
  _r: number;
}

export interface getUserCreatedCollection_locals {
  _t: number;
}

export interface getUserCreatedNFT_locals {
  _t: number;
}

export type END_EPOCH_locals = Record<string, never>;


const schemas: Record<string, Schema> = {
  QBAYLogger: { kind: "struct", fields: [
  { name: "_contractIndex", type: "u32" },
  { name: "_type", type: "u32" },
  { name: "_terminator", type: "i8" },
]},
  QBAY2: { kind: "struct", fields: [
]},
  settingCFBAndQubicPrice_input: { kind: "struct", fields: [
  { name: "CFBPrice", type: "u64" },
  { name: "QubicPrice", type: "u64" },
]},
  settingCFBAndQubicPrice_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  createCollection_input: { kind: "struct", fields: [
  { name: "priceForDropMint", type: "u64" },
  { name: "volume", type: "u32" },
  { name: "royalty", type: "u32" },
  { name: "maxSizePerOneId", type: "u32" },
  { name: "typeOfCollection", type: "u8" },
]},
  createCollection_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  mint_input: { kind: "struct", fields: [
  { name: "royalty", type: "u32" },
  { name: "collectionId", type: "u32" },
  { name: "typeOfMint", type: "u8" },
]},
  mint_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  mintOfDrop_input: { kind: "struct", fields: [
  { name: "collectionId", type: "u32" },
]},
  mintOfDrop_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  transfer_input: { kind: "struct", fields: [
  { name: "receiver", type: "id" },
  { name: "NFTid", type: "u32" },
]},
  transfer_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  listInMarket_input: { kind: "struct", fields: [
  { name: "price", type: "u64" },
  { name: "NFTid", type: "u32" },
]},
  listInMarket_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  buy_input: { kind: "struct", fields: [
  { name: "NFTid", type: "u32" },
  { name: "methodOfPayment", type: "u8" },
]},
  buy_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  cancelSale_input: { kind: "struct", fields: [
  { name: "NFTid", type: "u32" },
]},
  cancelSale_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  listInExchange_input: { kind: "struct", fields: [
  { name: "possessedNFT", type: "u32" },
  { name: "anotherNFT", type: "u32" },
]},
  listInExchange_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  cancelExchange_input: { kind: "struct", fields: [
  { name: "possessedNFT", type: "u32" },
  { name: "anotherNFT", type: "u32" },
]},
  cancelExchange_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  makeOffer_input: { kind: "struct", fields: [
  { name: "askPrice", type: "u64" },
  { name: "NFTid", type: "u32" },
  { name: "paymentMethod", type: "u8" },
]},
  makeOffer_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  acceptOffer_input: { kind: "struct", fields: [
  { name: "NFTid", type: "u32" },
]},
  acceptOffer_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  cancelOffer_input: { kind: "struct", fields: [
  { name: "NFTid", type: "u32" },
]},
  cancelOffer_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  createTraditionalAuction_input: { kind: "struct", fields: [
  { name: "minPrice", type: "u64" },
  { name: "NFTId", type: "u32" },
  { name: "startYear", type: "u32" },
  { name: "startMonth", type: "u32" },
  { name: "startDay", type: "u32" },
  { name: "startHour", type: "u32" },
  { name: "endYear", type: "u32" },
  { name: "endMonth", type: "u32" },
  { name: "endDay", type: "u32" },
  { name: "endHour", type: "u32" },
  { name: "paymentMethodOfAuction", type: "u8" },
]},
  createTraditionalAuction_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  bidOnTraditionalAuction_input: { kind: "struct", fields: [
  { name: "price", type: "u64" },
  { name: "NFTId", type: "u32" },
  { name: "paymentMethod", type: "u8" },
]},
  bidOnTraditionalAuction_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  TransferShareManagementRights_input: { kind: "struct", fields: [
  { name: "asset", type: { bytes: 40 } },
  { name: "numberOfShares", type: "i64" },
  { name: "newManagingContractIndex", type: "u32" },
]},
  TransferShareManagementRights_output: { kind: "struct", fields: [
  { name: "transferredNumberOfShares", type: "i64" },
  { name: "returnCode", type: "u32" },
]},
  changeStatusOfMarketPlace_input: { kind: "struct", fields: [
  { name: "status", type: "u8" },
]},
  changeStatusOfMarketPlace_output: { kind: "struct", fields: [
  { name: "returnCode", type: "u32" },
]},
  getNumberOfNFTForUser_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
]},
  getNumberOfNFTForUser_output: { kind: "struct", fields: [
  { name: "numberOfNFT", type: "u32" },
]},
  getInfoOfNFTUserPossessed_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
  { name: "NFTNumber", type: "u32" },
]},
  getInfoOfNFTUserPossessed_output: { kind: "struct", fields: [
  { name: "creator", type: "id" },
  { name: "possessor", type: "id" },
  { name: "askUser", type: "id" },
  { name: "creatorOfAuction", type: "id" },
  { name: "salePrice", type: "i64" },
  { name: "askMaxPrice", type: "i64" },
  { name: "currentPriceOfAuction", type: "u64" },
  { name: "royalty", type: "u32" },
  { name: "NFTidForExchange", type: "u32" },
  { name: "statusOfAuction", type: "u8" },
  { name: "yearAuctionStarted", type: "u8" },
  { name: "monthAuctionStarted", type: "u8" },
  { name: "dayAuctionStarted", type: "u8" },
  { name: "hourAuctionStarted", type: "u8" },
  { name: "minuteAuctionStarted", type: "u8" },
  { name: "secondAuctionStarted", type: "u8" },
  { name: "yearAuctionEnded", type: "u8" },
  { name: "monthAuctionEnded", type: "u8" },
  { name: "dayAuctionEnded", type: "u8" },
  { name: "hourAuctionEnded", type: "u8" },
  { name: "minuteAuctionEnded", type: "u8" },
  { name: "secondAuctionEnded", type: "u8" },
  { name: "statusOfSale", type: "u8" },
  { name: "statusOfAsk", type: "u8" },
  { name: "paymentMethodOfAsk", type: "u8" },
  { name: "statusOfExchange", type: "u8" },
  { name: "paymentMethodOfAuction", type: "u8" },
]},
  getInfoOfMarketplace_input: { kind: "struct", fields: [
]},
  getInfoOfMarketplace_output: { kind: "struct", fields: [
  { name: "priceOfCFB", type: "u64" },
  { name: "priceOfQubic", type: "u64" },
  { name: "numberOfNFTIncoming", type: "u64" },
  { name: "earnedQubic", type: "u64" },
  { name: "earnedCFB", type: "u64" },
  { name: "numberOfCollection", type: "u32" },
  { name: "numberOfNFT", type: "u32" },
  { name: "statusOfMarketPlace", type: "u8" },
]},
  getInfoOfCollectionByCreator_input: { kind: "struct", fields: [
  { name: "creator", type: "id" },
  { name: "orderOfCollection", type: "u32" },
]},
  getInfoOfCollectionByCreator_output: { kind: "struct", fields: [
  { name: "priceForDropMint", type: "u64" },
  { name: "idOfCollection", type: "u32" },
  { name: "royalty", type: "u32" },
  { name: "currentSize", type: "i32" },
  { name: "maxSizeHoldingPerOneId", type: "u32" },
  { name: "typeOfCollection", type: "u8" },
]},
  getInfoOfCollectionById_input: { kind: "struct", fields: [
  { name: "idOfCollection", type: "u32" },
]},
  getInfoOfCollectionById_output: { kind: "struct", fields: [
  { name: "creator", type: "id" },
  { name: "priceForDropMint", type: "u64" },
  { name: "royalty", type: "u32" },
  { name: "currentSize", type: "i32" },
  { name: "maxSizeHoldingPerOneId", type: "u32" },
  { name: "typeOfCollection", type: "u8" },
]},
  getIncomingAuctions_input: { kind: "struct", fields: [
  { name: "offset", type: "u32" },
  { name: "count", type: "u32" },
]},
  getIncomingAuctions_output: { kind: "struct", fields: [
]},
  getInfoOfNFTById_input: { kind: "struct", fields: [
  { name: "NFTId", type: "u32" },
]},
  getInfoOfNFTById_output: { kind: "struct", fields: [
  { name: "creator", type: "id" },
  { name: "possessor", type: "id" },
  { name: "askUser", type: "id" },
  { name: "creatorOfAuction", type: "id" },
  { name: "salePrice", type: "i64" },
  { name: "askMaxPrice", type: "i64" },
  { name: "currentPriceOfAuction", type: "u64" },
  { name: "royalty", type: "u32" },
  { name: "NFTidForExchange", type: "u32" },
  { name: "statusOfAuction", type: "u8" },
  { name: "yearAuctionStarted", type: "u8" },
  { name: "monthAuctionStarted", type: "u8" },
  { name: "dayAuctionStarted", type: "u8" },
  { name: "hourAuctionStarted", type: "u8" },
  { name: "minuteAuctionStarted", type: "u8" },
  { name: "secondAuctionStarted", type: "u8" },
  { name: "yearAuctionEnded", type: "u8" },
  { name: "monthAuctionEnded", type: "u8" },
  { name: "dayAuctionEnded", type: "u8" },
  { name: "hourAuctionEnded", type: "u8" },
  { name: "minuteAuctionEnded", type: "u8" },
  { name: "secondAuctionEnded", type: "u8" },
  { name: "statusOfSale", type: "u8" },
  { name: "statusOfAsk", type: "u8" },
  { name: "paymentMethodOfAsk", type: "u8" },
  { name: "statusOfExchange", type: "u8" },
  { name: "paymentMethodOfAuction", type: "u8" },
]},
  getUserCreatedCollection_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
  { name: "offset", type: "u32" },
  { name: "count", type: "u32" },
]},
  getUserCreatedCollection_output: { kind: "struct", fields: [
]},
  getUserCreatedNFT_input: { kind: "struct", fields: [
  { name: "user", type: "id" },
  { name: "offset", type: "u32" },
  { name: "count", type: "u32" },
]},
  getUserCreatedNFT_output: { kind: "struct", fields: [
]},
  InfoOfCollection: { kind: "struct", fields: [
  { name: "creator", type: "id" },
  { name: "priceForDropMint", type: "u64" },
  { name: "maxSizeHoldingPerOneId", type: "u32" },
  { name: "currentSize", type: "i16" },
  { name: "royalty", type: "u8" },
  { name: "typeOfCollection", type: "u8" },
]},
  InfoOfNFT: { kind: "struct", fields: [
  { name: "creator", type: "id" },
  { name: "possessor", type: "id" },
  { name: "askUser", type: "id" },
  { name: "creatorOfAuction", type: "id" },
  { name: "salePrice", type: "u64" },
  { name: "askMaxPrice", type: "u64" },
  { name: "currentPriceOfAuction", type: "u64" },
  { name: "startTimeOfAuction", type: "u32" },
  { name: "endTimeOfAuction", type: "u32" },
  { name: "royalty", type: "u32" },
  { name: "NFTidForExchange", type: "u32" },
  { name: "statusOfAuction", type: "u8" },
  { name: "statusOfSale", type: "u8" },
  { name: "statusOfAsk", type: "u8" },
  { name: "paymentMethodOfAsk", type: "u8" },
  { name: "statusOfExchange", type: "u8" },
  { name: "paymentMethodOfAuction", type: "u8" },
]},
  settingCFBAndQubicPrice_locals: { kind: "struct", fields: [
  { name: "log", type: { bytes: 0 } },
]},
  createCollection_locals: { kind: "struct", fields: [
  { name: "newCollection", type: { bytes: 0 } },
  { name: "possessedAmount", type: "i64" },
  { name: "tmp", type: "u64" },
  { name: "_t", type: "u32" },
  { name: "numberOfNFT", type: "u32" },
  { name: "fee", type: "u16" },
  { name: "log", type: { bytes: 0 } },
]},
  mint_locals: { kind: "struct", fields: [
  { name: "_t", type: "u32" },
  { name: "cntOfNFTPerOne", type: "u32" },
  { name: "newNFT", type: { bytes: 0 } },
  { name: "updatedCollection", type: { bytes: 0 } },
  { name: "log", type: { bytes: 0 } },
]},
  mintOfDrop_locals: { kind: "struct", fields: [
  { name: "updatedCollection", type: { bytes: 0 } },
  { name: "newNFT", type: { bytes: 0 } },
  { name: "creator", type: "id" },
  { name: "cntOfNFTHoldingPerOneId", type: "u64" },
  { name: "_t", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  transfer_locals: { kind: "struct", fields: [
  { name: "transferNFT", type: { bytes: 0 } },
  { name: "curDate", type: "u32" },
  { name: "_t", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  listInMarket_locals: { kind: "struct", fields: [
  { name: "saleNFT", type: { bytes: 0 } },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  buy_locals: { kind: "struct", fields: [
  { name: "updatedNFT", type: { bytes: 0 } },
  { name: "transferredAmountOfCFB", type: "i64" },
  { name: "marketFee", type: "i64" },
  { name: "creatorFee", type: "i64" },
  { name: "shareHolderFee", type: "i64" },
  { name: "possessedCFBAmount", type: "i64" },
  { name: "transferredCFBAmount", type: "i64" },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  cancelSale_locals: { kind: "struct", fields: [
  { name: "updatedNFT", type: { bytes: 0 } },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  listInExchange_locals: { kind: "struct", fields: [
  { name: "updatedNFT", type: { bytes: 0 } },
  { name: "tmpPossessor", type: "id" },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  cancelExchange_locals: { kind: "struct", fields: [
  { name: "updatedNFT", type: { bytes: 0 } },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  makeOffer_locals: { kind: "struct", fields: [
  { name: "AskedNFT", type: { bytes: 0 } },
  { name: "tmp", type: "i64" },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  acceptOffer_locals: { kind: "struct", fields: [
  { name: "updatedNFT", type: { bytes: 0 } },
  { name: "tmp", type: "i64" },
  { name: "creatorFee", type: "i64" },
  { name: "marketFee", type: "i64" },
  { name: "shareHolderFee", type: "i64" },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  cancelOffer_locals: { kind: "struct", fields: [
  { name: "updatedNFT", type: { bytes: 0 } },
  { name: "tmp", type: "i64" },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  createTraditionalAuction_locals: { kind: "struct", fields: [
  { name: "updatedNFT", type: { bytes: 0 } },
  { name: "curDate", type: "u32" },
  { name: "startDate", type: "u32" },
  { name: "endDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  bidOnTraditionalAuction_locals: { kind: "struct", fields: [
  { name: "updatedNFT", type: { bytes: 0 } },
  { name: "marketFee", type: "u64" },
  { name: "creatorFee", type: "u64" },
  { name: "shareHolderFee", type: "u64" },
  { name: "possessedAmount", type: "u64" },
  { name: "updatedBidPrice", type: "u64" },
  { name: "tmp", type: "i64" },
  { name: "_t", type: "u32" },
  { name: "curDate", type: "u32" },
  { name: "log", type: { bytes: 0 } },
]},
  changeStatusOfMarketPlace_locals: { kind: "struct", fields: [
  { name: "log", type: { bytes: 0 } },
]},
  TransferShareManagementRights_locals: { kind: "struct", fields: [
  { name: "log", type: { bytes: 0 } },
]},
  getNumberOfNFTForUser_locals: { kind: "struct", fields: [
  { name: "curDate", type: "u32" },
  { name: "_t", type: "u32" },
]},
  getInfoOfNFTUserPossessed_locals: { kind: "struct", fields: [
  { name: "curDate", type: "u32" },
  { name: "cnt", type: "u32" },
]},
  getInfoOfCollectionByCreator_locals: { kind: "struct", fields: [
]},
  getInfoOfCollectionById_locals: { kind: "struct", fields: [
  { name: "_t", type: "u32" },
]},
  getIncomingAuctions_locals: { kind: "struct", fields: [
  { name: "curDate", type: "u32" },
]},
  getInfoOfNFTById_locals: { kind: "struct", fields: [
  { name: "_r", type: "u32" },
]},
  getUserCreatedCollection_locals: { kind: "struct", fields: [
  { name: "_t", type: "i32" },
]},
  getUserCreatedNFT_locals: { kind: "struct", fields: [
  { name: "_t", type: "i32" },
]},
  END_EPOCH_locals: { kind: "struct", fields: [
]},
};

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export const contract: ContractSurface = {
  contract: "Qbay",
  contractIndex: 12,
  functions: [
    { name: "getNumberOfNFTForUser", selector: 1, input: "getNumberOfNFTForUser_input", output: "getNumberOfNFTForUser_output", inputSchema: schemas["getNumberOfNFTForUser_input"], outputSchema: schemas["getNumberOfNFTForUser_output"] },
    { name: "getInfoOfNFTUserPossessed", selector: 2, input: "getInfoOfNFTUserPossessed_input", output: "getInfoOfNFTUserPossessed_output", inputSchema: schemas["getInfoOfNFTUserPossessed_input"], outputSchema: schemas["getInfoOfNFTUserPossessed_output"] },
    { name: "getInfoOfMarketplace", selector: 3, input: "getInfoOfMarketplace_input", output: "getInfoOfMarketplace_output", inputSchema: schemas["getInfoOfMarketplace_input"], outputSchema: schemas["getInfoOfMarketplace_output"] },
    { name: "getInfoOfCollectionByCreator", selector: 4, input: "getInfoOfCollectionByCreator_input", output: "getInfoOfCollectionByCreator_output", inputSchema: schemas["getInfoOfCollectionByCreator_input"], outputSchema: schemas["getInfoOfCollectionByCreator_output"] },
    { name: "getInfoOfCollectionById", selector: 5, input: "getInfoOfCollectionById_input", output: "getInfoOfCollectionById_output", inputSchema: schemas["getInfoOfCollectionById_input"], outputSchema: schemas["getInfoOfCollectionById_output"] },
    { name: "getIncomingAuctions", selector: 6, input: "getIncomingAuctions_input", output: "getIncomingAuctions_output", inputSchema: schemas["getIncomingAuctions_input"], outputSchema: schemas["getIncomingAuctions_output"] },
    { name: "getInfoOfNFTById", selector: 7, input: "getInfoOfNFTById_input", output: "getInfoOfNFTById_output", inputSchema: schemas["getInfoOfNFTById_input"], outputSchema: schemas["getInfoOfNFTById_output"] },
    { name: "getUserCreatedCollection", selector: 8, input: "getUserCreatedCollection_input", output: "getUserCreatedCollection_output", inputSchema: schemas["getUserCreatedCollection_input"], outputSchema: schemas["getUserCreatedCollection_output"] },
    { name: "getUserCreatedNFT", selector: 9, input: "getUserCreatedNFT_input", output: "getUserCreatedNFT_output", inputSchema: schemas["getUserCreatedNFT_input"], outputSchema: schemas["getUserCreatedNFT_output"] },
  ],
  procedures: [
    { name: "settingCFBAndQubicPrice", selector: 1, input: "settingCFBAndQubicPrice_input", output: "settingCFBAndQubicPrice_output", inputSchema: schemas["settingCFBAndQubicPrice_input"], outputSchema: schemas["settingCFBAndQubicPrice_output"] },
    { name: "createCollection", selector: 2, input: "createCollection_input", output: "createCollection_output", inputSchema: schemas["createCollection_input"], outputSchema: schemas["createCollection_output"] },
    { name: "mint", selector: 3, input: "mint_input", output: "mint_output", inputSchema: schemas["mint_input"], outputSchema: schemas["mint_output"] },
    { name: "mintOfDrop", selector: 4, input: "mintOfDrop_input", output: "mintOfDrop_output", inputSchema: schemas["mintOfDrop_input"], outputSchema: schemas["mintOfDrop_output"] },
    { name: "transfer", selector: 5, input: "transfer_input", output: "transfer_output", inputSchema: schemas["transfer_input"], outputSchema: schemas["transfer_output"] },
    { name: "listInMarket", selector: 6, input: "listInMarket_input", output: "listInMarket_output", inputSchema: schemas["listInMarket_input"], outputSchema: schemas["listInMarket_output"] },
    { name: "buy", selector: 7, input: "buy_input", output: "buy_output", inputSchema: schemas["buy_input"], outputSchema: schemas["buy_output"] },
    { name: "cancelSale", selector: 8, input: "cancelSale_input", output: "cancelSale_output", inputSchema: schemas["cancelSale_input"], outputSchema: schemas["cancelSale_output"] },
    { name: "listInExchange", selector: 9, input: "listInExchange_input", output: "listInExchange_output", inputSchema: schemas["listInExchange_input"], outputSchema: schemas["listInExchange_output"] },
    { name: "cancelExchange", selector: 10, input: "cancelExchange_input", output: "cancelExchange_output", inputSchema: schemas["cancelExchange_input"], outputSchema: schemas["cancelExchange_output"] },
    { name: "makeOffer", selector: 11, input: "makeOffer_input", output: "makeOffer_output", inputSchema: schemas["makeOffer_input"], outputSchema: schemas["makeOffer_output"] },
    { name: "acceptOffer", selector: 12, input: "acceptOffer_input", output: "acceptOffer_output", inputSchema: schemas["acceptOffer_input"], outputSchema: schemas["acceptOffer_output"] },
    { name: "cancelOffer", selector: 13, input: "cancelOffer_input", output: "cancelOffer_output", inputSchema: schemas["cancelOffer_input"], outputSchema: schemas["cancelOffer_output"] },
    { name: "createTraditionalAuction", selector: 14, input: "createTraditionalAuction_input", output: "createTraditionalAuction_output", inputSchema: schemas["createTraditionalAuction_input"], outputSchema: schemas["createTraditionalAuction_output"] },
    { name: "bidOnTraditionalAuction", selector: 15, input: "bidOnTraditionalAuction_input", output: "bidOnTraditionalAuction_output", inputSchema: schemas["bidOnTraditionalAuction_input"], outputSchema: schemas["bidOnTraditionalAuction_output"] },
    { name: "TransferShareManagementRights", selector: 16, input: "TransferShareManagementRights_input", output: "TransferShareManagementRights_output", inputSchema: schemas["TransferShareManagementRights_input"], outputSchema: schemas["TransferShareManagementRights_output"] },
    { name: "changeStatusOfMarketPlace", selector: 17, input: "changeStatusOfMarketPlace_input", output: "changeStatusOfMarketPlace_output", inputSchema: schemas["changeStatusOfMarketPlace_input"], outputSchema: schemas["changeStatusOfMarketPlace_output"] },
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
  async getNumberOfNFTForUser(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getNumberOfNFTForUser_input): Promise<getNumberOfNFTForUser_output> {
    const payload = encodeInput("getNumberOfNFTForUser_input", input);
    const request = {
      contractIndex,
      inputType: 1,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getNumberOfNFTForUser_output", raw) as getNumberOfNFTForUser_output;
  },
  async getInfoOfNFTUserPossessed(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getInfoOfNFTUserPossessed_input): Promise<getInfoOfNFTUserPossessed_output> {
    const payload = encodeInput("getInfoOfNFTUserPossessed_input", input);
    const request = {
      contractIndex,
      inputType: 2,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getInfoOfNFTUserPossessed_output", raw) as getInfoOfNFTUserPossessed_output;
  },
  async getInfoOfMarketplace(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getInfoOfMarketplace_input): Promise<getInfoOfMarketplace_output> {
    const payload = encodeInput("getInfoOfMarketplace_input", input);
    const request = {
      contractIndex,
      inputType: 3,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getInfoOfMarketplace_output", raw) as getInfoOfMarketplace_output;
  },
  async getInfoOfCollectionByCreator(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getInfoOfCollectionByCreator_input): Promise<getInfoOfCollectionByCreator_output> {
    const payload = encodeInput("getInfoOfCollectionByCreator_input", input);
    const request = {
      contractIndex,
      inputType: 4,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getInfoOfCollectionByCreator_output", raw) as getInfoOfCollectionByCreator_output;
  },
  async getInfoOfCollectionById(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getInfoOfCollectionById_input): Promise<getInfoOfCollectionById_output> {
    const payload = encodeInput("getInfoOfCollectionById_input", input);
    const request = {
      contractIndex,
      inputType: 5,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getInfoOfCollectionById_output", raw) as getInfoOfCollectionById_output;
  },
  async getIncomingAuctions(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getIncomingAuctions_input): Promise<getIncomingAuctions_output> {
    const payload = encodeInput("getIncomingAuctions_input", input);
    const request = {
      contractIndex,
      inputType: 6,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getIncomingAuctions_output", raw) as getIncomingAuctions_output;
  },
  async getInfoOfNFTById(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getInfoOfNFTById_input): Promise<getInfoOfNFTById_output> {
    const payload = encodeInput("getInfoOfNFTById_input", input);
    const request = {
      contractIndex,
      inputType: 7,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getInfoOfNFTById_output", raw) as getInfoOfNFTById_output;
  },
  async getUserCreatedCollection(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getUserCreatedCollection_input): Promise<getUserCreatedCollection_output> {
    const payload = encodeInput("getUserCreatedCollection_input", input);
    const request = {
      contractIndex,
      inputType: 8,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getUserCreatedCollection_output", raw) as getUserCreatedCollection_output;
  },
  async getUserCreatedNFT(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: getUserCreatedNFT_input): Promise<getUserCreatedNFT_output> {
    const payload = encodeInput("getUserCreatedNFT_input", input);
    const request = {
      contractIndex,
      inputType: 9,
      inputSize: payload.length,
      requestData: toBase64(payload),
    };
    const resp = await client.querySmartContract(request);
    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();
    return decodeOutput("getUserCreatedNFT_output", raw) as getUserCreatedNFT_output;
  },
};

export const procedures = {
  settingCFBAndQubicPrice(input: settingCFBAndQubicPrice_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("settingCFBAndQubicPrice_input", input);
    return { inputType: 1, payload };
  },
  createCollection(input: createCollection_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("createCollection_input", input);
    return { inputType: 2, payload };
  },
  mint(input: mint_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("mint_input", input);
    return { inputType: 3, payload };
  },
  mintOfDrop(input: mintOfDrop_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("mintOfDrop_input", input);
    return { inputType: 4, payload };
  },
  transfer(input: transfer_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("transfer_input", input);
    return { inputType: 5, payload };
  },
  listInMarket(input: listInMarket_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("listInMarket_input", input);
    return { inputType: 6, payload };
  },
  buy(input: buy_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("buy_input", input);
    return { inputType: 7, payload };
  },
  cancelSale(input: cancelSale_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("cancelSale_input", input);
    return { inputType: 8, payload };
  },
  listInExchange(input: listInExchange_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("listInExchange_input", input);
    return { inputType: 9, payload };
  },
  cancelExchange(input: cancelExchange_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("cancelExchange_input", input);
    return { inputType: 10, payload };
  },
  makeOffer(input: makeOffer_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("makeOffer_input", input);
    return { inputType: 11, payload };
  },
  acceptOffer(input: acceptOffer_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("acceptOffer_input", input);
    return { inputType: 12, payload };
  },
  cancelOffer(input: cancelOffer_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("cancelOffer_input", input);
    return { inputType: 13, payload };
  },
  createTraditionalAuction(input: createTraditionalAuction_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("createTraditionalAuction_input", input);
    return { inputType: 14, payload };
  },
  bidOnTraditionalAuction(input: bidOnTraditionalAuction_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("bidOnTraditionalAuction_input", input);
    return { inputType: 15, payload };
  },
  TransferShareManagementRights(input: TransferShareManagementRights_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("TransferShareManagementRights_input", input);
    return { inputType: 16, payload };
  },
  changeStatusOfMarketPlace(input: changeStatusOfMarketPlace_input): { inputType: number; payload: Uint8Array } {
    const payload = encodeInput("changeStatusOfMarketPlace_input", input);
    return { inputType: 17, payload };
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
      getNumberOfNFTForUser: async (input: getNumberOfNFTForUser_input): Promise<getNumberOfNFTForUser_output> => functions.getNumberOfNFTForUser(client, contractIndex, input),
      getInfoOfNFTUserPossessed: async (input: getInfoOfNFTUserPossessed_input): Promise<getInfoOfNFTUserPossessed_output> => functions.getInfoOfNFTUserPossessed(client, contractIndex, input),
      getInfoOfMarketplace: async (input: getInfoOfMarketplace_input): Promise<getInfoOfMarketplace_output> => functions.getInfoOfMarketplace(client, contractIndex, input),
      getInfoOfCollectionByCreator: async (input: getInfoOfCollectionByCreator_input): Promise<getInfoOfCollectionByCreator_output> => functions.getInfoOfCollectionByCreator(client, contractIndex, input),
      getInfoOfCollectionById: async (input: getInfoOfCollectionById_input): Promise<getInfoOfCollectionById_output> => functions.getInfoOfCollectionById(client, contractIndex, input),
      getIncomingAuctions: async (input: getIncomingAuctions_input): Promise<getIncomingAuctions_output> => functions.getIncomingAuctions(client, contractIndex, input),
      getInfoOfNFTById: async (input: getInfoOfNFTById_input): Promise<getInfoOfNFTById_output> => functions.getInfoOfNFTById(client, contractIndex, input),
      getUserCreatedCollection: async (input: getUserCreatedCollection_input): Promise<getUserCreatedCollection_output> => functions.getUserCreatedCollection(client, contractIndex, input),
      getUserCreatedNFT: async (input: getUserCreatedNFT_input): Promise<getUserCreatedNFT_output> => functions.getUserCreatedNFT(client, contractIndex, input),
    },
    procedures: {
      settingCFBAndQubicPrice: (input: settingCFBAndQubicPrice_input) => procedures.settingCFBAndQubicPrice(input),
      createCollection: (input: createCollection_input) => procedures.createCollection(input),
      mint: (input: mint_input) => procedures.mint(input),
      mintOfDrop: (input: mintOfDrop_input) => procedures.mintOfDrop(input),
      transfer: (input: transfer_input) => procedures.transfer(input),
      listInMarket: (input: listInMarket_input) => procedures.listInMarket(input),
      buy: (input: buy_input) => procedures.buy(input),
      cancelSale: (input: cancelSale_input) => procedures.cancelSale(input),
      listInExchange: (input: listInExchange_input) => procedures.listInExchange(input),
      cancelExchange: (input: cancelExchange_input) => procedures.cancelExchange(input),
      makeOffer: (input: makeOffer_input) => procedures.makeOffer(input),
      acceptOffer: (input: acceptOffer_input) => procedures.acceptOffer(input),
      cancelOffer: (input: cancelOffer_input) => procedures.cancelOffer(input),
      createTraditionalAuction: (input: createTraditionalAuction_input) => procedures.createTraditionalAuction(input),
      bidOnTraditionalAuction: (input: bidOnTraditionalAuction_input) => procedures.bidOnTraditionalAuction(input),
      TransferShareManagementRights: (input: TransferShareManagementRights_input) => procedures.TransferShareManagementRights(input),
      changeStatusOfMarketPlace: (input: changeStatusOfMarketPlace_input) => procedures.changeStatusOfMarketPlace(input),
    },
  };
}
