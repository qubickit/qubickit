export const normalizeAmount = (value: string | number | bigint): string => {
  if (typeof value === 'bigint') return value.toString();
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('Amount must be finite');
    return Math.trunc(value).toString();
  }
  if (typeof value === 'string') {
    if (!/^-?\d+$/.test(value)) throw new Error('Amount string must be an integer');
    return value;
  }
  throw new Error('Unsupported amount type');
};
