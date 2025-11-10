import { describe, expect, test } from 'bun:test';
import { decodePayload, encodePayload } from '../src/utils/payload';

describe('utils/payload', () => {
  test('decodePayload handles encodings', () => {
    const raw = 'hello';
    const base64 = Buffer.from(raw).toString('base64');
    expect(Buffer.from(decodePayload(base64) ?? []).toString('utf8')).toBe(raw);
    expect(Buffer.from(decodePayload(Buffer.from(raw).toString('hex'), 'hex') ?? []).toString('utf8')).toBe(raw);
    expect(Buffer.from(decodePayload(raw, 'utf8') ?? []).toString('utf8')).toBe(raw);
  });

  test('encodePayload mirrors decode', () => {
    const bytes = new TextEncoder().encode('hi');
    const encoded = encodePayload(bytes);
    expect(Buffer.from(encoded, 'base64').toString('utf8')).toBe('hi');
  });
});
