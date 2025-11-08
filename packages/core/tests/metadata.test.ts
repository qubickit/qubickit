import { describe, expect, it } from 'bun:test';
import {
  deserializeTimeLock,
  deserializeVarStruct,
  serializeTimeLock,
  serializeVarStruct
} from '../src/serde/metadata';

describe('Transaction metadata helpers', () => {
  it('serializes and deserializes time lock windows', () => {
    const bytes = serializeTimeLock({ startTick: 10, endTick: 20 });
    const decoded = deserializeTimeLock(bytes);
    expect(decoded).toEqual({ startTick: 10, endTick: 20 });
  });

  it('serializes varStruct entries', () => {
    const bytes = serializeVarStruct([
      { key: 1, value: new Uint8Array([1, 2]) },
      { key: 2, value: '0x0a0b' }
    ]);
    const decoded = deserializeVarStruct(bytes);
    expect(decoded).toHaveLength(2);
    expect(decoded[0]?.key).toBe(1);
    expect(Array.from(decoded[0]?.value ?? [])).toEqual([1, 2]);
    expect(Array.from(decoded[1]?.value ?? [])).toEqual([0x0a, 0x0b]);
  });
});
