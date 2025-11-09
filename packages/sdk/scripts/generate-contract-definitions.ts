import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type ContractRegistryEntry = {
  name: string;
  contractIndex: number;
  address: string;
  filename?: string;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..', '..');
const SMART_CONTRACTS_PATH = join(ROOT, 'static/registry/smart_contracts.json');
const TEMP_CONTRACTS_DIR = join(ROOT, 'tmp/temp_qubic_core/src/contracts');
const OUTPUT_PATH = join(ROOT, 'packages/sdk/src/contracts/generated.ts');

const registryRaw = JSON.parse(readFileSync(SMART_CONTRACTS_PATH, 'utf8')) as {
  smart_contracts: ContractRegistryEntry[];
};

const headerFiles = new Set(readdirSync(TEMP_CONTRACTS_DIR));

const parseHeader = (filename: string) => {
  const path = join(TEMP_CONTRACTS_DIR, filename);
  const content = readFileSync(path, 'utf8');
  const functionRegex = /REGISTER_USER_FUNCTION\(\s*([A-Za-z0-9_]+)\s*,\s*(\d+)\s*\)/g;
  const procedureRegex = /REGISTER_USER_PROCEDURE\(\s*([A-Za-z0-9_]+)\s*,\s*(\d+)\s*\)/g;
  const functions: Array<{ name: string; id: number }> = [];
  const procedures: Array<{ name: string; id: number }> = [];
  const inputStructs = new Map<string, string>();
  const outputStructs = new Map<string, string>();

  for (const match of content.matchAll(functionRegex)) {
    functions.push({ name: match[1]!, id: Number(match[2]) });
  }
  for (const match of content.matchAll(procedureRegex)) {
    procedures.push({ name: match[1]!, id: Number(match[2]) });
  }
  const structRegex = /struct\s+([A-Za-z0-9_]+)_(input|output)\s*\{/g;
  let structMatch: RegExpExecArray | null;
  while ((structMatch = structRegex.exec(content)) !== null) {
    const name = structMatch[1]!;
    const kind = structMatch[2] as 'input' | 'output';
    let index = structRegex.lastIndex;
    let depth = 1;
    while (depth > 0 && index < content.length) {
      const char = content[index++];
      if (char === '{') {
        depth++;
      } else if (char === '}') {
        depth--;
      }
    }
    const body = content.slice(structRegex.lastIndex, index - 1).trim();
    structRegex.lastIndex = index;
    if (kind === 'input') {
      inputStructs.set(name, body);
    } else {
      outputStructs.set(name, body);
    }
  }
  return { functions, procedures, inputStructs, outputStructs };
};

const structInterfaces = new Map<string, string>();
type StructLayoutLiteral = {
  name: string;
  wireType: StructWireType;
  structName?: string;
  length?: number;
  elementType?: StructWireType;
  elementStructName?: string;
};
const structLayouts = new Map<string, StructLayoutLiteral[]>();

type StructWireType =
  | 'uint8'
  | 'uint16'
  | 'uint32'
  | 'uint64'
  | 'sint8'
  | 'sint16'
  | 'sint32'
  | 'sint64'
  | 'string'
  | 'asset'
  | 'array'
  | 'struct'
  | 'unknown';

const TYPE_MAPPING: Record<string, { tsType: string; wireType: StructWireType }> = {
  id: { tsType: 'string', wireType: 'string' },
  uint64: { tsType: 'bigint | number | string', wireType: 'uint64' },
  sint64: { tsType: 'bigint | number | string', wireType: 'sint64' },
  uint32: { tsType: 'number', wireType: 'uint32' },
  sint32: { tsType: 'number', wireType: 'sint32' },
  uint16: { tsType: 'number', wireType: 'uint16' },
  sint16: { tsType: 'number', wireType: 'sint16' },
  uint8: { tsType: 'number', wireType: 'uint8' },
  sint8: { tsType: 'number', wireType: 'sint8' },
  uint: { tsType: 'number', wireType: 'uint32' },
  bit: { tsType: 'boolean', wireType: 'uint8' },
  bool: { tsType: 'boolean', wireType: 'uint8' }
};

const mapType = (type: string, options?: { localStructs?: Map<string, string> }) => {
  const normalized = type.replace(/\s+/g, '');
  const arrayMatch = normalized.match(/^Array<([^,>]+),(\d+)>$/i);
  if (arrayMatch) {
    const elementType = arrayMatch[1]!;
    const length = Number(arrayMatch[2]);
    const elementMapping = mapType(elementType, options);
    const tsElementType =
      elementMapping.tsType.includes('|') && !elementMapping.tsType.trim().startsWith('(')
        ? `(${elementMapping.tsType})`
        : elementMapping.tsType;
    return {
      tsType: `${tsElementType}[]`,
      wireType: 'array' as const,
      length,
      elementType: elementMapping.wireType,
      elementStructName: elementMapping.structName
    };
  }
  if (normalized.includes('Collection')) {
    return { tsType: 'unknown', wireType: 'unknown' as const };
  }
  if (options?.localStructs?.has(normalized)) {
    const structName = options.localStructs.get(normalized)!;
    return { tsType: structName, wireType: 'struct' as const, structName };
  }
  if (TYPE_MAPPING[normalized]) {
    return TYPE_MAPPING[normalized];
  }
  if (normalized === 'Asset') {
    return { tsType: '{ issuer: string; assetName: bigint | number | string }', wireType: 'asset' as const };
  }
  return { tsType: 'unknown', wireType: 'unknown' as const };
};

const generateInterface = (contractName: string, structName: string, body?: string) => {
  if (!body) return undefined;
  const key = `${contractName}_${structName}`;
  if (structInterfaces.has(key)) {
    return key;
  }
  let processedBody = body.replace(/\r/g, '');
  const localStructs = new Map<string, string>();
  const nestedStructRegex = /struct\s+([A-Za-z0-9_]+)\s*\{([\s\S]*?)\};/g;
  processedBody = processedBody.replace(nestedStructRegex, (_match, nestedName, nestedBody) => {
    if (typeof nestedName === 'string' && typeof nestedBody === 'string') {
      const nestedKey = `${structName}_${nestedName}`;
      const fullNestedName = `${contractName}_${nestedKey}`;
      localStructs.set(nestedName, fullNestedName);
      generateInterface(contractName, nestedKey, nestedBody);
    }
    return '';
  });
  const lines = processedBody.split('\n');
  const fields: string[] = [];
  const layout: StructLayoutLiteral[] = [];
  let buffer = '';
  for (const rawLine of lines) {
    const line = rawLine.split('//')[0]?.trim();
    if (!line) {
      continue;
    }
    if (/^struct\s+/i.test(line)) {
      continue;
    }
    buffer += `${line} `;
    if (line.endsWith(';')) {
      const normalized = buffer.replace(/;/g, '').trim();
      const match = normalized.match(/^([A-Za-z0-9_<>,\s]+)\s+([A-Za-z0-9_]+)$/);
      if (match) {
        const [, type, name] = match;
        const mapping = mapType(type, { localStructs });
        fields.push(`  ${name}: ${mapping.tsType};`);
        const fieldLayout: StructLayoutLiteral = {
          name,
          wireType: mapping.wireType
        };
        if ('structName' in mapping && mapping.structName) {
          fieldLayout.structName = mapping.structName;
        }
        if ('length' in mapping && typeof mapping.length === 'number') {
          fieldLayout.length = mapping.length;
        }
        if ('elementType' in mapping && mapping.elementType) {
          fieldLayout.elementType = mapping.elementType;
        }
        if ('elementStructName' in mapping && mapping.elementStructName) {
          fieldLayout.elementStructName = mapping.elementStructName;
        }
        layout.push(fieldLayout);
      }
      buffer = '';
    }
  }
  let interfaceCode: string;
  if (fields.length) {
    const interfaceBody = fields.join('\n');
    interfaceCode = `export interface ${key} {\n${interfaceBody}\n}\n`;
  } else {
    interfaceCode = `export type ${key} = Record<string, unknown>;\n`;
  }
  structInterfaces.set(key, interfaceCode);
  structLayouts.set(key, layout);
  return key;
};

const definitions = registryRaw.smart_contracts.map((entry) => {
  const filename = entry.filename ?? `${entry.name}.h`;
  if (!headerFiles.has(filename)) {
    return {
      name: entry.name,
      contractIndex: entry.contractIndex,
      address: entry.address,
      functions: [],
      procedures: []
    };
  }
  const parsed = parseHeader(filename);
  return {
    name: entry.name,
    contractIndex: entry.contractIndex,
    address: entry.address,
    functions: parsed.functions.map((fn) => ({
      ...fn,
      inputStruct: generateInterface(entry.name, `${fn.name}_input`, parsed.inputStructs.get(fn.name)),
      outputStruct: generateInterface(entry.name, `${fn.name}_output`, parsed.outputStructs.get(fn.name))
    })),
    procedures: parsed.procedures.map((proc) => ({
      ...proc,
      inputStruct: generateInterface(entry.name, `${proc.name}_input`, parsed.inputStructs.get(proc.name)),
      outputStruct: generateInterface(entry.name, `${proc.name}_output`, parsed.outputStructs.get(proc.name))
    }))
  };
});

const generate = () => {
  const header = `// Auto-generated by scripts/generate-contract-definitions.ts. Do not edit manually.\n\n`;
  const imports = `export interface ContractFunctionDefinition {\n  name: string;\n  id: number;\n  inputStruct?: string;\n  outputStruct?: string;\n}\n\nexport interface ContractDefinition {\n  name: string;\n  contractIndex: number;\n  address: string;\n  functions: readonly ContractFunctionDefinition[];\n  procedures: readonly ContractFunctionDefinition[];\n}\n\n`;
  const body = `export const CONTRACT_DEFINITIONS = ${JSON.stringify(definitions, null, 2)} as const;\n\n`;
const helper = `
export type ContractName = typeof CONTRACT_DEFINITIONS[number]['name'];

type DefinitionByName<TName extends ContractName> = Extract<typeof CONTRACT_DEFINITIONS[number], { name: TName }>;

export type ContractFunctionName<TName extends ContractName> = DefinitionByName<TName>['functions'][number]['name'];
export type ContractProcedureName<TName extends ContractName> = DefinitionByName<TName>['procedures'][number]['name'];

export const CONTRACT_DEFINITION_MAP = new Map<ContractName, ContractDefinition>(CONTRACT_DEFINITIONS.map((definition) => [definition.name, definition]));
export const CONTRACT_DEFINITION_BY_INDEX = new Map<number, ContractDefinition>(CONTRACT_DEFINITIONS.map((definition) => [definition.contractIndex, definition]));
export const CONTRACT_DEFINITION_BY_ADDRESS = new Map<string, ContractDefinition>(CONTRACT_DEFINITIONS.map((definition) => [definition.address, definition]));
\n`;
  const dir = dirname(OUTPUT_PATH);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
const interfaces = Array.from(structInterfaces.values()).join('\n');
const structMapEntries = Array.from(structInterfaces.keys())
    .map((name) => `  ${name}: ${name};`)
    .join('\n');
  const structMap = `
export type GeneratedStructMap = {
${structMapEntries}
};

export type StructFromName<T extends string | undefined> = T extends keyof GeneratedStructMap ? GeneratedStructMap[T] : undefined;

`;
const structLayoutEntries = Array.from(structLayouts.entries())
    .map(
      ([name, fields]) =>
        `  ${name}: [${fields
          .map((field) => {
            const entries = [`name: ${JSON.stringify(field.name)}`, `wireType: ${JSON.stringify(field.wireType)}`];
            if (field.structName) {
              entries.push(`structName: ${JSON.stringify(field.structName)}`);
            }
            if (typeof field.length === 'number') {
              entries.push(`length: ${field.length}`);
            }
            if (field.elementType) {
              entries.push(`elementType: ${JSON.stringify(field.elementType)}`);
            }
            if (field.elementStructName) {
              entries.push(`elementStructName: ${JSON.stringify(field.elementStructName)}`);
            }
            return `{ ${entries.join(', ')} }`;
          })
          .join(', ')}],`
    )
    .join('\n');
const knownWireTypes = new Set<StructWireType>([
  ...Object.values(TYPE_MAPPING).map((type) => type.wireType),
  'array',
  'struct'
]);
const structWireTypes = new Set([
  ...Array.from(structLayouts.values()).flat().map((field) => field.wireType),
  ...knownWireTypes
]);
const layoutExport = `
export type StructWireType = ${Array.from(structWireTypes)
  .map((wireType) => `'${wireType}'`)
  .join(' | ')} | never;

export interface StructLayoutField {
  name: string;
  wireType: StructWireType;
  structName?: string;
  length?: number;
  elementType?: StructWireType;
  elementStructName?: string;
}

export const STRUCT_LAYOUTS = {
${structLayoutEntries}
} as const;
`;
  writeFileSync(OUTPUT_PATH, `${header}${imports}${body}${helper}${interfaces}\n${structMap}\n${layoutExport}`);
};

generate();
