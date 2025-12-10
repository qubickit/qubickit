const https = require("node:https");
const fs = require("node:fs");

const url =
	"https://qubic.github.io/integration/Partners/swagger/query_services.swagger.json";

https.get(url, (res) => {
	let data = "";
	res.on("data", (chunk) => {
		data += chunk;
	});
	res.on("end", () => {
		const spec = JSON.parse(data);
		const defs = spec.definitions || {};

		const resolveRef = (ref) => ref.split("/").pop();

		const toTs = (schema) => {
			if (!schema) return "any";
			if (schema.$ref) return resolveRef(schema.$ref);
			switch (schema.type) {
				case "string":
					return "string";
				case "integer":
				case "number":
					return "number";
				case "boolean":
					return "boolean";
				case "array":
					return `${toTs(schema.items)}[]`;
				case "object":
					return "Record<string, any>";
				default:
					return "any";
			}
		};

		const escapeProp = (name) =>
			/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) ? name : `"${name}"`;

		let out =
			"// Generated from query_services.swagger.json (lightweight, manual converter)\n\n";
		for (const [name, def] of Object.entries(defs)) {
			if (def.type !== "object") {
				out += `export type ${name} = ${toTs(def)};\n\n`;
				continue;
			}
			out += `export interface ${name} {\n`;
			for (const [prop, schema] of Object.entries(def.properties || {})) {
				out += `  ${escapeProp(prop)}?: ${toTs(schema)};\n`;
			}
			out += `}\n\n`;
		}

		fs.mkdirSync("src/gen", { recursive: true });
		fs.writeFileSync("src/gen/query-types.ts", out);
		console.log(
			`wrote ${Object.keys(defs).length} types to src/gen/query-types.ts`,
		);
	});
});
