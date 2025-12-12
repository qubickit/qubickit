// biome-ignore format: auto-generated file
// Auto-generated from tmp/src/contracts. Do not edit manually.

import type { Schema } from "../../encoding/codec";
import { contract as ComputorControlledFundContract } from "./ComputorControlledFund";
import { contract as GeneralQuorumProposalContract } from "./GeneralQuorumProposal";
import { contract as MsVaultContract } from "./MsVault";
import { contract as NostromoContract } from "./Nostromo";
import { contract as QBondContract } from "./QBond";
import { contract as QIPContract } from "./QIP";
import { contract as QUtilContract } from "./QUtil";
import { contract as QVAULTContract } from "./QVAULT";
import { contract as QbayContract } from "./Qbay";
import { contract as QdrawContract } from "./Qdraw";
import { contract as QearnContract } from "./Qearn";
import { contract as QswapContract } from "./Qswap";
import { contract as QuotteryContract } from "./Quottery";
import { contract as QxContract } from "./Qx";
import { contract as RandomContract } from "./Random";
import { contract as RandomLotteryContract } from "./RandomLottery";

export interface ContractSurface {
  contract: string;
  contractIndex?: number;
  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];
}

export * as ComputorControlledFund from "./ComputorControlledFund";
export { contract as ComputorControlledFundSurface } from "./ComputorControlledFund";
export * as GeneralQuorumProposal from "./GeneralQuorumProposal";
export { contract as GeneralQuorumProposalSurface } from "./GeneralQuorumProposal";
export * as MsVault from "./MsVault";
export { contract as MsVaultSurface } from "./MsVault";
export * as Nostromo from "./Nostromo";
export { contract as NostromoSurface } from "./Nostromo";
export * as QBond from "./QBond";
export { contract as QBondSurface } from "./QBond";
export * as QIP from "./QIP";
export { contract as QIPSurface } from "./QIP";
export * as QUtil from "./QUtil";
export { contract as QUtilSurface } from "./QUtil";
export * as QVAULT from "./QVAULT";
export { contract as QVAULTSurface } from "./QVAULT";
export * as Qbay from "./Qbay";
export { contract as QbaySurface } from "./Qbay";
export * as Qdraw from "./Qdraw";
export { contract as QdrawSurface } from "./Qdraw";
export * as Qearn from "./Qearn";
export { contract as QearnSurface } from "./Qearn";
export * as Qswap from "./Qswap";
export { contract as QswapSurface } from "./Qswap";
export * as Quottery from "./Quottery";
export { contract as QuotterySurface } from "./Quottery";
export * as Qx from "./Qx";
export { contract as QxSurface } from "./Qx";
export * as Random from "./Random";
export { contract as RandomSurface } from "./Random";
export * as RandomLottery from "./RandomLottery";
export { contract as RandomLotterySurface } from "./RandomLottery";
export const contracts: ContractSurface[] = [ComputorControlledFundContract, GeneralQuorumProposalContract, MsVaultContract, NostromoContract, QBondContract, QIPContract, QUtilContract, QVAULTContract, QbayContract, QdrawContract, QearnContract, QswapContract, QuotteryContract, QxContract, RandomContract, RandomLotteryContract];