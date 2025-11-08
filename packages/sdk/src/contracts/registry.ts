import snapshot from '../../../../static/registry/smart_contracts.json';

import { ContractRegistrySnapshotSchema, type ContractMetadata } from './schemas';

const StaticSnapshot = ContractRegistrySnapshotSchema.parse(snapshot);

export class ContractRegistry {
  private readonly byIndex = new Map<number, ContractMetadata>();
  private readonly byAddress = new Map<string, ContractMetadata>();

  constructor(entries: ContractMetadata[]) {
    for (const entry of entries) {
      this.byIndex.set(entry.contractIndex, entry);
      this.byAddress.set(entry.address, entry);
    }
  }

  getByIndex(contractIndex: number) {
    return this.byIndex.get(contractIndex);
  }

  getByAddress(address: string) {
    return this.byAddress.get(address);
  }

  findByName(name: string) {
    const normalized = name.toLowerCase();
    for (const entry of this.byIndex.values()) {
      if (entry.name.toLowerCase() === normalized || entry.label?.toLowerCase() === normalized) {
        return entry;
      }
    }
    return undefined;
  }

  list() {
    return Array.from(this.byIndex.values()).sort((a, b) => a.contractIndex - b.contractIndex);
  }
}

export const createStaticContractRegistry = () => new ContractRegistry(StaticSnapshot.smart_contracts);
