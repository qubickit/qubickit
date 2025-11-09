import { querySmartContract } from '@qubickit/core';
import { z } from 'zod';

import type { QubicSdk } from '../sdk';
import { ContractRegistry } from './registry';
import { type ContractMetadata } from './schemas';
import { TransferService, type TransferRequest } from '../transfers/service';
import {
  CONTRACT_DEFINITION_MAP,
  CONTRACT_DEFINITION_BY_ADDRESS,
  CONTRACT_DEFINITION_BY_INDEX,
  type ContractName,
  type ContractFunctionName,
  type ContractProcedureName,
  type ContractDefinition
} from './generated';

const contractAddressSchema = z.string().min(1);

export interface ContractCallOptions {
  contract: ContractName | number | string;
  inputType?: number;
  functionId?: number;
  functionName?: ContractFunctionName<ContractName>;
  payload?: Uint8Array;
}

export interface ContractInvokeOptions extends Omit<TransferRequest, 'destination'> {
  contract: ContractName | number | string;
  procedureId?: number;
  procedureName?: ContractProcedureName<ContractName>;
  input?: Uint8Array;
}

interface ResolvedContract {
  metadata: ContractMetadata;
  definition?: ContractDefinition;
}

export class ContractService {
  constructor(
    private readonly sdk: QubicSdk,
    private readonly registry: ContractRegistry,
    private readonly transfers: TransferService
  ) {}

  private resolveContract(contract: number | string): ResolvedContract {
    let metadata: ContractMetadata | undefined;
    if (typeof contract === 'number') {
      metadata = this.registry.getByIndex(contract);
    } else {
      metadata = this.registry.findByName(contract) ?? this.registry.getByAddress(contract);
    }
    if (!metadata) {
      throw new Error(`Contract ${contract} not found.`);
    }
    const definition =
      CONTRACT_DEFINITION_BY_INDEX.get(metadata.contractIndex) ??
      CONTRACT_DEFINITION_BY_ADDRESS.get(metadata.address) ??
      CONTRACT_DEFINITION_MAP.get(metadata.name as ContractName) ??
      (typeof contract === 'string' ? CONTRACT_DEFINITION_MAP.get(contract as ContractName) : undefined);
    return { metadata, definition };
  }

  private resolveFunctionId(resolved: ResolvedContract, options: ContractCallOptions) {
    if (typeof options.inputType === 'number') return options.inputType;
    if (typeof options.functionId === 'number') return options.functionId;
    if (options.functionName && resolved.definition) {
      const match = resolved.definition.functions.find((fn) => fn.name === options.functionName);
      if (!match) {
        throw new Error(`Function ${options.functionName} not found on ${resolved.definition.name}.`);
      }
      return match.id;
    }
    return undefined;
  }

  private resolveProcedureId(resolved: ResolvedContract, options: ContractInvokeOptions) {
    if (typeof options.procedureId === 'number') return options.procedureId;
    if (options.procedureName && resolved.definition) {
      const match = resolved.definition.procedures.find((proc) => proc.name === options.procedureName);
      if (!match) {
        throw new Error(`Procedure ${options.procedureName} not found on ${resolved.definition.name}.`);
      }
      return match.id;
    }
    return undefined;
  }

  async call(options: ContractCallOptions) {
    const resolved = this.resolveContract(options.contract);
    const functionId = this.resolveFunctionId(resolved, options);
    if (typeof functionId !== 'number') {
      throw new Error('Contract function id is required. Provide functionName/functionId/inputType.');
    }
    const payload = this.normalizePayload(options.payload);
    return querySmartContract(this.sdk.core.http, {
      contractIndex: resolved.metadata.contractIndex,
      inputType: functionId,
      payload
    });
  }

  async invoke(options: ContractInvokeOptions) {
    const resolved = this.resolveContract(options.contract);
    contractAddressSchema.parse(resolved.metadata.address);
    const procedureId = this.resolveProcedureId(resolved, options);
    const transferRequest: TransferRequest = {
      amount: options.amount,
      signer: options.signer,
      destination: resolved.metadata.address,
      metadata: {
        ...options.metadata,
        procedureId
      },
      input: this.normalizePayload(options.input),
      inputType: options.inputType,
      dryRun: options.dryRun,
      monitor: options.monitor,
      queueOnFail: options.queueOnFail
    };
    return this.transfers.send(transferRequest);
  }

  private normalizePayload(payload?: Uint8Array | Record<string, unknown>): Uint8Array | undefined {
    if (!payload) {
      return undefined;
    }
    if (payload instanceof Uint8Array) {
      return payload;
    }
    throw new Error('Contract payloads must be encoded to Uint8Array before querying or invoking.');
  }

  getRegistry() {
    return this.registry;
  }
}
