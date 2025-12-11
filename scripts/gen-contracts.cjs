const fs = require("node:fs");
const path = require("node:path");

const CONTRACTS_DIR =
	process.env.CONTRACTS_DIR ??
	path.join(__dirname, "..", "tmp", "src", "contracts");
const OUT_DIR = path.join(__dirname, "..", "src", "gen", "contracts");
const REGISTRY_PATH = path.join(__dirname, "contract-registry.json");

const typeMap = {
	bit: { ts: "number", schema: '"u8"' },
	uint8: { ts: "number", schema: '"u8"' },
	sint8: { ts: "number", schema: '"i8"' },
	uint16: { ts: "number", schema: '"u16"' },
	sint16: { ts: "number", schema: '"i16"' },
	uint32: { ts: "number", schema: '"u32"' },
	sint32: { ts: "number", schema: '"i32"' },
	uint64: { ts: "bigint", schema: '"u64"' },
	sint64: { ts: "bigint", schema: '"i64"' },
	id: { ts: "Uint8Array", schema: '"id"' },
	Asset: { ts: "any", schema: "{ bytes: 40 }" },
	AssetIssuanceSelect: { ts: "any", schema: "{ bytes: 8 }" },
	AssetOwnershipSelect: { ts: "any", schema: "{ bytes: 16 }" },
	AssetPossessionSelect: { ts: "any", schema: "{ bytes: 16 }" },
};

function mapType(raw) {
	const cleaned = raw.replace(/const\s+/g, "").trim();
	const base = typeMap[cleaned];
	if (base) return base;
	if (cleaned.endsWith("*")) return { ts: "any", schema: "{ bytes: 0 }" };
	return { ts: "any", schema: "{ bytes: 0 }" };
}

function parseStructs(source) {
	const structs = {};
	const structRegex = /struct\s+(\w+)\s*\{([\s\S]*?)\};/g;
	let match = structRegex.exec(source);
	while (match) {
		const name = match[1];
		const body = match[2];
		const fields = [];
		const seen = new Set();
		body
			.split("\n")
			.map((l) => l.trim())
			.forEach((line) => {
				const fieldMatch =
					/^([A-Za-z0-9_<>]+)\s+([A-Za-z0-9_]+)(\[(\d+)\])?;/.exec(line);
				if (fieldMatch) {
					const type = mapType(fieldMatch[1]);
					const nameField = fieldMatch[2];
					if (seen.has(nameField)) return;
					seen.add(nameField);
					const arrayLen = fieldMatch[4] ? Number(fieldMatch[4]) : undefined;
					fields.push({
						name: nameField,
						ts: type.ts,
						schema:
							arrayLen !== undefined
								? `{ kind: "array", of: ${type.schema}, length: ${arrayLen} }`
								: type.schema,
					});
				}
			});
		structs[name] = fields;
		match = structRegex.exec(source);
	}
	return structs;
}

function parseRegistrations(source) {
	const fns = [];
	const procs = [];
	const fnRegex =
		/REGISTER_USER_FUNCTION\(\s*([A-Za-z0-9_]+)\s*,\s*([0-9]+)\s*\)/g;
	const procRegex =
		/REGISTER_USER_PROCEDURE\(\s*([A-Za-z0-9_]+)\s*,\s*([0-9]+)\s*\)/g;

	let match = fnRegex.exec(source);
	while (match) {
		fns.push({ name: match[1], selector: Number(match[2]) });
		match = fnRegex.exec(source);
	}

	match = procRegex.exec(source);
	while (match) {
		procs.push({ name: match[1], selector: Number(match[2]) });
		match = procRegex.exec(source);
	}
	return { functions: fns, procedures: procs };
}

function generateInterface(name, fields) {
	if (fields.length === 0) {
		return `export type ${name} = Record<string, never>;\n`;
	}
	const lines = [`export interface ${name} {`];
	for (const field of fields) {
		lines.push(`  ${field.name}: ${field.ts};`);
	}
	lines.push("}");
	return lines.join("\n");
}

function generateSchema(fields) {
	const lines = ['{ kind: "struct", fields: ['];
	for (const field of fields) {
		lines.push(`  { name: "${field.name}", type: ${field.schema} },`);
	}
	lines.push("]}");
	return lines.join("\n");
}

function main() {
	const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
	const registryMap = new Map(
		registry.smart_contracts.map((c) => [
			path.basename(c.githubUrl, ".h"),
			c.contractIndex,
		]),
	);

	fs.rmSync(OUT_DIR, { recursive: true, force: true });
	const files = fs
		.readdirSync(CONTRACTS_DIR)
		.filter((f) => f.endsWith(".h") && /^[A-Z]/.test(f) && f !== "qpi.h");
	const contractDefs = [];

	for (const file of files) {
		const full = path.join(CONTRACTS_DIR, file);
		const source = fs.readFileSync(full, "utf8");
		const contractName = path.basename(file, ".h");
		if (!registryMap.has(contractName)) {
			continue;
		}
		const { functions, procedures } = parseRegistrations(source);
		if (!functions.length && !procedures.length) continue;
		const structs = parseStructs(source);

		// Ensure placeholders for any input/output that lack explicit struct definitions
		const missing = new Map();
		const ensureStruct = (name) => {
			if (!structs[name] && !missing.has(name)) {
				missing.set(name, []);
			}
		};
		for (const fn of functions) {
			ensureStruct(`${fn.name}_input`);
			ensureStruct(`${fn.name}_output`);
		}
		for (const proc of procedures) {
			ensureStruct(`${proc.name}_input`);
			ensureStruct(`${proc.name}_output`);
		}
		for (const [k, v] of missing) structs[k] = v;

		contractDefs.push({
			contract: contractName,
			contractIndex: registryMap.get(contractName),
			functions,
			procedures,
			structs,
		});
	}

	fs.mkdirSync(OUT_DIR, { recursive: true });

	const indexImports = [
		"// biome-ignore format: auto-generated file",
		"// Auto-generated from tmp/src/contracts. Do not edit manually.",
		"",
		'import type { Schema } from "../../encoding/codec";',
	];
	const indexExports = [
		"",
		"export interface ContractSurface {",
		"  contract: string;",
		"  contractIndex?: number;",
		"  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];",
		"  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];",
		"}",
		"",
	];
	const contractArrayEntries = [];

	for (const def of contractDefs) {
		let out =
			"// biome-ignore format: auto-generated file\n// Auto-generated from tmp/src/contracts. Do not edit manually.\n\n";
		out += 'import type { Schema } from "../../encoding/codec";\n';
		out += 'import { decode, encode } from "../../encoding/codec";\n\n';

		out += "function toBase64(data: Uint8Array): string {\n";
		out += '  if (typeof Buffer !== "undefined") {\n';
		out += '    return Buffer.from(data).toString("base64");\n';
		out += "  }\n";
		out += '  let binary = "";\n';
		out += "  data.forEach((b) => {\n";
		out += "    binary += String.fromCharCode(b);\n";
		out += "  });\n";
		out += "  return btoa(binary);\n";
		out += "}\n\n";
		out += "function fromBase64(str: string): Uint8Array {\n";
		out += '  if (typeof Buffer !== "undefined") {\n';
		out += '    return new Uint8Array(Buffer.from(str, "base64"));\n';
		out += "  }\n";
		out += "  const bin = atob(str);\n";
		out += "  const out = new Uint8Array(bin.length);\n";
		out +=
			"  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);\n";
		out += "  return out;\n";
		out += "}\n\n";

		for (const [name, fields] of Object.entries(def.structs)) {
			out += `${generateInterface(name, fields)}\n\n`;
		}

		out += "const schemas: Record<string, Schema> = {\n";
		for (const [name, fields] of Object.entries(def.structs)) {
			out += `  ${name}: ${generateSchema(fields)},\n`;
		}
		out += "};\n\n";

		out += "export interface ContractSurface {\n";
		out += "  contract: string;\n";
		out += "  contractIndex?: number;\n";
		out +=
			"  functions: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];\n";
		out +=
			"  procedures: { name: string; selector: number; input?: string; output?: string; inputSchema?: Schema; outputSchema?: Schema }[];\n";
		out += "}\n\n";

		out += "export const contract: ContractSurface = {\n";
		out += `  contract: "${def.contract}",\n`;
		out += `  contractIndex: ${def.contractIndex},\n`;
		out += "  functions: [\n";
		for (const fn of def.functions) {
			const input = `${fn.name}_input`;
			const output = `${fn.name}_output`;
			out += `    { name: "${fn.name}", selector: ${fn.selector}, input: "${input}", output: "${output}", inputSchema: schemas["${input}"], outputSchema: schemas["${output}"] },\n`;
		}
		out += "  ],\n";
		out += "  procedures: [\n";
		for (const proc of def.procedures) {
			const input = `${proc.name}_input`;
			const output = `${proc.name}_output`;
			out += `    { name: "${proc.name}", selector: ${proc.selector}, input: "${input}", output: "${output}", inputSchema: schemas["${input}"], outputSchema: schemas["${output}"] },\n`;
		}
		out += "  ],\n";
		out += "};\n\n";

		out +=
			"export function encodeInput(name: string, value: any): Uint8Array {\n";
		out +=
			'  if (!schemas[name]) throw new Error("missing schema for " + name);\n';
		out += "  return encode(schemas[name], value);\n";
		out += "}\n\n";
		out +=
			"export function decodeOutput(name: string, buf: Uint8Array): any {\n";
		out +=
			'  if (!schemas[name]) throw new Error("missing schema for " + name);\n';
		out += "  return decode(schemas[name], buf);\n";
		out += "}\n\n";

		// High-level function callers
		out += "export const functions = {\n";
		for (const fn of def.functions) {
			const input = `${fn.name}_input`;
			const output = `${fn.name}_output`;
			out += `  async ${fn.name}(client: { querySmartContract: (req: any) => Promise<any> }, contractIndex: number, input: ${input}): Promise<${output}> {\n`;
			out += `    const payload = encodeInput("${input}", input);\n`;
			out += "    const request = {\n";
			out += "      contractIndex,\n";
			out += `      inputType: ${fn.selector},\n`;
			out += "      inputSize: payload.length,\n";
			out += "      requestData: toBase64(payload),\n";
			out += "    };\n";
			out += "    const resp = await client.querySmartContract(request);\n";
			out +=
				"    const raw = resp?.responseData ? fromBase64(resp.responseData) : new Uint8Array();\n";
			out += `    return decodeOutput("${output}", raw) as ${output};\n`;
			out += "  },\n";
		}
		out += "};\n\n";

		// High-level procedure builders
		out += "export const procedures = {\n";
		for (const proc of def.procedures) {
			const input = `${proc.name}_input`;
			out += `  ${proc.name}(input: ${input}): { inputType: number; payload: Uint8Array } {\n`;
			out += `    const payload = encodeInput("${input}", input);\n`;
			out += `    return { inputType: ${proc.selector}, payload };\n`;
			out += "  },\n";
		}
		out += "};\n\n";

		// Bound helper for easier DX
		out += "export function createClient(\n";
		out += "  client: { querySmartContract: (req: any) => Promise<any> },\n";
		out += "  options: { contractIndex?: number } = {},\n";
		out += ") {\n";
		out +=
			"  const contractIndex = options.contractIndex ?? contract.contractIndex;\n";
		out +=
			'  if (contractIndex === undefined) throw new Error("contractIndex is required");\n';
		out += "  return {\n";
		out += "    contractIndex,\n";
		out += "    functions: {\n";
		for (const fn of def.functions) {
			const input = `${fn.name}_input`;
			const output = `${fn.name}_output`;
			out += `      ${fn.name}: async (input: ${input}): Promise<${output}> => functions.${fn.name}(client, contractIndex, input),\n`;
		}
		out += "    },\n";
		out += "    procedures: {\n";
		for (const proc of def.procedures) {
			const input = `${proc.name}_input`;
			out += `      ${proc.name}: (input: ${input}) => procedures.${proc.name}(input),\n`;
		}
		out += "    },\n";
		out += "  };\n";
		out += "}\n";

		const outPath = path.join(OUT_DIR, `${def.contract}.ts`);
		fs.writeFileSync(outPath, out);

		indexImports.push(
			`import { contract as ${def.contract}Contract } from "./${def.contract}";`,
		);
		indexExports.push(`export * as ${def.contract} from "./${def.contract}";`);
		indexExports.push(
			`export { contract as ${def.contract}Surface } from "./${def.contract}";`,
		);
		contractArrayEntries.push(`${def.contract}Contract`);
	}

	indexExports.push(
		`export const contracts: ContractSurface[] = [${contractArrayEntries.join(
			", ",
		)}];`,
	);

	fs.writeFileSync(
		path.join(OUT_DIR, "index.ts"),
		[...indexImports, ...indexExports].join("\n"),
	);
	console.log(`wrote ${contractDefs.length} contracts to ${OUT_DIR}`);
}

main();
