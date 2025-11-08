import { describe, expect, it } from 'vitest';
import { join } from 'node:path';

import { ContractRegistry } from './registry';
import { ContractMetadataSchema } from './schemas';

describe('ContractRegistry', () => {
  it('indexes contracts by index and name', () => {
    const entries = [
      ContractMetadataSchema.parse({
        name: 'Test',
        contractIndex: 1,
        address: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
        procedures: []
      })
    ];
    const registry = new ContractRegistry(entries);
    expect(registry.getByIndex(1)?.name).toBe('Test');
    expect(registry.findByName('test')?.contractIndex).toBe(1);
  });
});
