import { readFile } from 'node:fs/promises';

import type {
  ContractFunctionName,
  ContractMetadata,
  ContractName,
  ContractProcedureName,
  ContractDefinition
} from '@qubickit/sdk/contracts';
import {
  CONTRACT_DEFINITION_MAP,
  CONTRACT_DEFINITION_BY_ADDRESS,
  CONTRACT_DEFINITION_BY_INDEX,
  decodeStructPayloadByName,
  encodeStructPayloadByName
} from '@qubickit/sdk/contracts';
import { createContext } from '../context';
import { logSuccess, printJson, printTable } from '../utils/output';
import { decodePayload } from '../utils/payload';
import { parseInteger, parseString } from '../utils/parsers';
import { resolveSigner, type SignerOptions } from './signer';
import { selectContract } from '../utils/selectors';

interface ContractListOptions {
  filter?: string;
  json?: boolean;
}

interface ContractCallOptions extends ContractListOptions {
  contract?: string;
  functionName?: string;
  functionId?: string | number;
  inputType?: string | number;
  payload?: string;
  payloadEncoding?: 'base64' | 'hex' | 'utf8';
  decode?: boolean | string;
  format?: 'raw' | 'fixed';
  decimals?: string | number;
  args?: string;
  argsFile?: string;
  arg?: string[];
}

interface ContractInvokeOptions extends ContractCallOptions, SignerOptions {
  procedureName?: string;
  procedureId?: string | number;
  amount?: string;
  monitor?: boolean;
  dryRun?: boolean;
  queueOnFail?: boolean;
}

export async function listContractsCommand(options: ContractListOptions) {
  const ctx = await createContext();
  const entries: ContractMetadata[] = ctx.sdk.contracts.registry.list();
  const filtered: ContractMetadata[] = options.filter
    ? entries.filter((entry: ContractMetadata) =>
        [entry.name, entry.label, entry.address].some((field) =>
          field?.toLowerCase().includes(options.filter!.toLowerCase())
        )
      )
    : entries;
  if (options.json) {
    printJson(filtered);
    return;
  }
  printTable(
    filtered.map((entry: ContractMetadata) => ({
      index: entry.contractIndex,
      name: entry.name,
      label: entry.label ?? '-',
      address: entry.address
    }))
  );
}

export async function callContractCommand(options: ContractCallOptions) {
  const ctx = await createContext();
  const contractMetadata = await selectContract(ctx, options.contract, options.filter);
  const definition = resolveDefinition(contractMetadata);
  const contract: ContractName | number | string = contractMetadata.name;
  const functionId = parseInteger(options.functionId, 'function id');
  const inputType = parseInteger(options.inputType, 'input type');
  const functionName = options.functionName as ContractFunctionName<ContractName> | undefined;
  const resolvedFunctionId = resolveFunctionIdentifier(definition, {
    inputType,
    functionId,
    functionName
  });
  const inputStruct = resolveFunctionInputStruct(definition, resolvedFunctionId, functionName);
  const payload = await resolvePayloadBuffer(
    {
      payload: options.payload,
      payloadEncoding: options.payloadEncoding,
      args: options.args,
      argsFile: options.argsFile,
      argEntries: options.arg
    },
    inputStruct
  );
  const result = await ctx.sdk.contracts.service.call({
    contract,
    functionName,
    functionId,
    inputType,
    payload
  });
  if (options.json) {
    printJson(result);
  } else {
    const output = await maybeDecodeResponse(result, options.decode, options, {
      definition,
      functionId: resolvedFunctionId,
      functionName
    });
    if (output !== undefined) {
      logSuccess('Decoded response');
      console.dir(output, { depth: null, colors: true });
    } else {
      console.dir(result, { depth: null, colors: true });
    }
  }
}

export async function invokeContractCommand(options: ContractInvokeOptions) {
  const ctx = await createContext();
  const contractMetadata = await selectContract(ctx, options.contract, options.filter);
  const definition = resolveDefinition(contractMetadata);
  const contract: ContractName | number | string = contractMetadata.name;
  const signer = await resolveSigner(ctx, options);
  const procedureId = parseInteger(options.procedureId, 'procedure id');
  const inputType = parseInteger(options.inputType, 'input type');
  const amount = parseString(options.amount ?? '0', 'amount');
  const procedureName = options.procedureName as ContractProcedureName<ContractName> | undefined;
  const inputStruct = resolveProcedureInputStruct(definition, procedureId, procedureName);
  const payload = await resolvePayloadBuffer(
    {
      payload: options.payload,
      payloadEncoding: options.payloadEncoding,
      args: options.args,
      argsFile: options.argsFile,
      argEntries: options.arg
    },
    inputStruct
  );

  const result = await ctx.sdk.contracts.service.invoke({
    contract,
    procedureName,
    procedureId,
    amount,
    signer,
    input: payload,
    inputType,
    dryRun: options.dryRun,
    monitor: options.monitor,
    queueOnFail: options.queueOnFail
  });

  if (options.json) {
    printJson(result);
  } else {
    logSuccess(`Contract invoke enqueued as transfer ${result.txId}.`);
  }
}

interface DecodeContext {
  definition?: ContractDefinition;
  functionId?: number;
  functionName?: string;
}

const collectArgOption = (value: string, previous: string[] = []) => {
  previous.push(value);
  return previous;
};

const maybeDecodeResponse = async (
  result: unknown,
  decodeFlag: ContractCallOptions['decode'],
  options: ContractCallOptions,
  context: DecodeContext
): Promise<unknown> => {
  if (!decodeFlag || typeof result !== 'object' || result === null || !('responseData' in result)) {
    return undefined;
  }
  const raw = (result as { responseData?: string }).responseData;
  if (typeof raw !== 'string') return undefined;
  const mode = normalizeDecodeMode(decodeFlag);
  if (!mode) return undefined;
  if (mode === 'struct' || mode === 'auto') {
    const structName = resolveOutputStruct(context.definition, context.functionId, context.functionName);
    if (!structName) {
      return { error: 'No output struct metadata found for this function.', responseData: raw };
    }
    try {
      const decoded = await decodeStructPayloadByName(structName, raw);
      return maybeFormatJson(decoded, options);
    } catch (error) {
      return {
        error: 'Failed to decode response (struct)',
        details: (error as Error).message,
        responseData: raw
      };
    }
  }
  try {
    const buffer = decodeBuffer(raw, mode);
    if (mode === 'json') {
      const parsed = JSON.parse(buffer.toString('utf8'));
      return maybeFormatJson(parsed, options);
    }
    if (mode === 'utf8' || mode === 'base64') {
      return buffer.toString('utf8');
    }
    if (mode === 'hex') {
      return buffer.toString('hex');
    }
    return buffer;
  } catch (error) {
    return { error: `Failed to decode response (${mode})`, details: (error as Error).message, responseData: raw };
  }
};

type DecodeMode = 'struct' | 'auto' | 'base64' | 'hex' | 'utf8' | 'json';
type RawDecodeMode = Exclude<DecodeMode, 'struct' | 'auto'>;
const decodeModeSet: ReadonlySet<DecodeMode> = new Set(['struct', 'auto', 'base64', 'hex', 'utf8', 'json']);

const normalizeDecodeMode = (value: ContractCallOptions['decode']): DecodeMode | undefined => {
  if (!value) return undefined;
  if (typeof value === 'string') {
    const normalized = value.toLowerCase() as DecodeMode;
    if (decodeModeSet.has(normalized)) {
      return normalized;
    }
    return 'base64';
  }
  return 'struct';
};

const decodeBuffer = (value: string, mode: RawDecodeMode): Buffer => {
  switch (mode) {
    case 'hex':
      return Buffer.from(value.startsWith('0x') ? value.slice(2) : value, 'hex');
    case 'json':
    case 'utf8':
    case 'base64':
    default:
      return Buffer.from(value, 'base64');
  }
};

const maybeFormatJson = (payload: unknown, options: ContractCallOptions) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return payload;
  if (options.format === 'fixed') {
    const decimals = parseInt(String(options.decimals ?? '6'), 10);
    if (!Number.isFinite(decimals)) return payload;
    const entries = Object.entries(payload).map(([key, value]) => {
      if (typeof value === 'number' || typeof value === 'bigint') {
        return [key, formatFixed(value, decimals)];
      }
      if (typeof value === 'string' && /^[0-9]+$/.test(value)) {
        return [key, formatFixed(Number(value), decimals)];
      }
      return [key, value];
    });
    return Object.fromEntries(entries);
  }
  return payload;
};

const formatFixed = (value: number | bigint, decimals: number) => {
  if (typeof value === 'bigint') {
    return formatBigIntFixed(value, decimals);
  }
  return (value / 10 ** decimals).toFixed(decimals);
};

const formatBigIntFixed = (value: bigint, decimals: number) => {
  if (decimals <= 0) {
    return value.toString();
  }
  const base = 10n ** BigInt(decimals);
  const negative = value < 0n;
  const abs = negative ? -value : value;
  const integer = abs / base;
  const fraction = abs % base;
  const fractionStr = fraction.toString().padStart(decimals, '0');
  return `${negative ? '-' : ''}${integer.toString()}.${fractionStr}`;
};

export async function describeContractCommand(options: ContractCallOptions) {
  const ctx = await createContext();
  const contractMetadata = await selectContract(ctx, options.contract, options.filter);
  const definition = resolveDefinition(contractMetadata);
  if (options.json) {
    printJson({ metadata: contractMetadata, definition });
    return;
  }
  logSuccess(`Contract ${contractMetadata.name} (index ${contractMetadata.contractIndex})`);
  printTable([
    { field: 'Address', value: contractMetadata.address },
    { field: 'Label', value: contractMetadata.label ?? '-' }
  ]);
  if (definition?.functions?.length) {
    console.log('\nFunctions');
    printTable(
      definition.functions.map((fn) => ({
        name: fn.name,
        id: fn.id,
        input: fn.inputStruct ?? '-',
        output: fn.outputStruct ?? '-'
      }))
    );
  }
  if (definition?.procedures?.length) {
    console.log('\nProcedures');
    printTable(
      definition.procedures.map((fn) => ({
        name: fn.name,
        id: fn.id,
        input: fn.inputStruct ?? '-'
      }))
    );
  }
}

const resolveDefinition = (metadata: ContractMetadata): ContractDefinition | undefined => {
  return (
    CONTRACT_DEFINITION_MAP.get(metadata.name as ContractName) ??
    CONTRACT_DEFINITION_BY_INDEX.get(metadata.contractIndex) ??
    CONTRACT_DEFINITION_BY_ADDRESS.get(metadata.address)
  );
};

const resolveFunctionInputStruct = (
  definition: ContractDefinition | undefined,
  functionId?: number,
  functionName?: string
) => {
  return resolveStruct(definition, 'functions', functionId, functionName, 'inputStruct');
};

const resolveProcedureInputStruct = (
  definition: ContractDefinition | undefined,
  procedureId?: number,
  procedureName?: string
) => {
  return resolveStruct(definition, 'procedures', procedureId, procedureName, 'inputStruct');
};

const resolveOutputStruct = (
  definition: ContractDefinition | undefined,
  functionId?: number,
  functionName?: string
) => {
  return resolveStruct(definition, 'functions', functionId, functionName, 'outputStruct');
};

const resolveFunctionIdentifier = (
  definition: ContractDefinition | undefined,
  options: { inputType?: number; functionId?: number; functionName?: string }
) => {
  if (typeof options.inputType === 'number') {
    return options.inputType;
  }
  if (typeof options.functionId === 'number') {
    return options.functionId;
  }
  if (definition && options.functionName) {
    return definition.functions.find((fn) => fn.name === options.functionName)?.id;
  }
  return undefined;
};

type StructCollection = 'functions' | 'procedures';
type StructKey = 'inputStruct' | 'outputStruct';

const resolveStruct = (
  definition: ContractDefinition | undefined,
  kind: StructCollection,
  id?: number,
  name?: string,
  structKey: StructKey
) => {
  if (!definition) return undefined;
  const collection = definition[kind];
  if (!collection) return undefined;
  if (typeof id === 'number') {
    return collection.find((entry) => entry.id === id)?.[structKey];
  }
  if (name) {
    return collection.find((entry) => entry.name === name)?.[structKey];
  }
  return undefined;
};

interface PayloadSourceOptions {
  payload?: string;
  payloadEncoding?: 'base64' | 'hex' | 'utf8';
  args?: string;
  argsFile?: string;
  argEntries?: string[];
}

const resolvePayloadBuffer = async (source: PayloadSourceOptions, structName?: string) => {
  if (source.payload && (source.args || source.argsFile || (source.argEntries?.length ?? 0) > 0)) {
    throw new Error('Provide either --payload or --args/--args-file/--arg, not both.');
  }
  if (source.payload) {
    return decodePayload(source.payload, source.payloadEncoding);
  }
  const argsObject = await loadArgsObject(source);
  if (!argsObject) return undefined;
  if (!structName) {
    throw new Error('Unable to encode arguments: no struct metadata available. Pass --payload instead.');
  }
  return encodeStructPayloadByName(structName, argsObject);
};

const loadArgsObject = async (source: { args?: string; argsFile?: string; argEntries?: string[] }) => {
  let merged: Record<string, unknown> | undefined;
  if (source.argsFile) {
    try {
      const raw = await readFile(source.argsFile, 'utf8');
      merged = parseJsonObject(raw, `args file ${source.argsFile}`);
    } catch (error) {
      throw new Error(`Failed to read args file ${source.argsFile}: ${(error as Error).message}`);
    }
  }
  if (source.args) {
    const parsed = parseJsonObject(source.args, '--args');
    merged = merged ? { ...merged, ...parsed } : parsed;
  }
  if (source.argEntries?.length) {
    const parsed = parseArgEntries(source.argEntries);
    merged = merged ? { ...merged, ...parsed } : parsed;
  }
  return merged;
};

const parseJsonObject = (raw: string, label: string): Record<string, unknown> => {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('value must be a JSON object');
    }
    return parsed as Record<string, unknown>;
  } catch (error) {
    throw new Error(`Failed to parse ${label}: ${(error as Error).message}`);
  }
};

const parseArgEntries = (entries: string[]): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  for (const entry of entries) {
    const idx = entry.indexOf('=');
    if (idx === -1) {
      throw new Error(`Invalid --arg entry "${entry}". Expected key=value.`);
    }
    const key = entry.slice(0, idx).trim();
    const raw = entry.slice(idx + 1);
    if (!key) {
      throw new Error(`Invalid --arg entry "${entry}". Key cannot be empty.`);
    }
    result[key] = coerceScalar(raw.trim());
  }
  return result;
};

const coerceScalar = (value: string): unknown => {
  if (/^[-+]?\d+n$/i.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  if (/^[-+]?\d+$/i.test(value)) {
    const num = Number(value);
    if (Number.isSafeInteger(num)) {
      return num;
    }
    return BigInt(value);
  }
  switch (value.toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    case 'null':
      return null;
    default:
      return value;
  }
};
