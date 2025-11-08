import { querySmartContract } from '@qubickit/core';
import { z } from 'zod';

import type { QubicSdk } from '../sdk';
import { ContractRegistry } from './registry';
import { type ContractMetadata } from './schemas';
import { TransferService, type TransferRequest } from '../transfers/service';

const contractAddressSchema = z.string().min(1);

export interface ContractCallOptions {
  contract: number | string;
  inputType?: number;
  payload?: Uint8Array;
}

export interface ContractInvokeOptions extends Omit<TransferRequest, 'destination'> {
  contract: number | string;
  procedureId?: number;
}

export class ContractService {
  constructor(
    private readonly sdk: QubicSdk,
    private readonly registry: ContractRegistry,
    private readonly transfers: TransferService
  ) {}

  private resolveContract(contract: number | string): ContractMetadata {
    if (typeof contract === 'number') {
      const found = this.registry.getByIndex(contract);
      if (!found) throw new Error(`Contract index ${contract} not found in registry.`);
      return found;
    }
    const byAddress = this.registry.getByAddress(contract);
    if (byAddress) return byAddress;
    const byName = this.registry.findByName(contract);
    if (byName) return byName;
    throw new Error(`Contract ${contract} not found.`);
  }

  async call(options: ContractCallOptions) {
    const metadata = this.resolveContract(options.contract);
    return querySmartContract(this.sdk.core.http, {
      contractIndex: metadata.contractIndex,
      inputType: options.inputType,
      payload: options.payload
    });
  }

  async invoke(options: ContractInvokeOptions) {
    const metadata = this.resolveContract(options.contract);
    contractAddressSchema.parse(metadata.address);
    return this.transfers.send({
      ...options,
      destination: metadata.address,
      metadata: {
        procedureId: options.procedureId
      }
    });
  }

  getRegistry() {
    return this.registry;
  }
}
