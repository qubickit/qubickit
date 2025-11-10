import { describe, expect, test } from 'bun:test';
import { parseInteger, parseBoolean, parseString } from '../src/utils/parsers';

describe('utils/parsers', () => {
  test('parseInteger validates range', () => {
    expect(parseInteger('42', 'answer')).toBe(42);
    expect(() => parseInteger('foo', 'answer')).toThrow('Invalid answer');
    expect(() => parseInteger('1', 'answer', { min: 2 })).toThrow('expected >= 2');
  });

  test('parseBoolean handles fallback', () => {
    expect(parseBoolean(true, false)).toBe(true);
    expect(parseBoolean(undefined, true)).toBe(true);
  });

  test('parseString trims and validates', () => {
    expect(parseString(' hello ', 'name')).toBe('hello');
    expect(() => parseString('', 'name')).toThrow('Missing required name');
  });
});
