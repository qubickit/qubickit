export function parseInteger(
  value: string | number | undefined,
  label: string,
  options: { min?: number; max?: number } = {}
): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${label}: "${value}"`);
  }
  if (!Number.isInteger(parsed)) {
    throw new Error(`Invalid ${label}: ${parsed} is not an integer.`);
  }
  if (options.min !== undefined && parsed < options.min) {
    throw new Error(`Invalid ${label}: expected >= ${options.min}, received ${parsed}.`);
  }
  if (options.max !== undefined && parsed > options.max) {
    throw new Error(`Invalid ${label}: expected <= ${options.max}, received ${parsed}.`);
  }
  return parsed;
}

export function parseBoolean(value: boolean | undefined, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

export function parseString(value: string | undefined, label: string): string {
  if (!value || !value.trim()) {
    throw new Error(`Missing required ${label}.`);
  }
  return value.trim();
}
