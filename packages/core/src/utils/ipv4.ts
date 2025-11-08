export const ipToUint32 = (ip: string): number => {
  const parts = ip.split('.').map((p) => Number(p));
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    throw new Error('Invalid IPv4 address');
  }
  return ((parts[0]! << 24) | (parts[1]! << 16) | (parts[2]! << 8) | parts[3]!) >>> 0;
};

export const uint32ToIp = (value: number): string => {
  if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) throw new Error('Invalid IPv4 number');
  return [value >>> 24, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff].join('.');
};
