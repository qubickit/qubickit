import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import openapiTS, { astToString, COMMENT_HEADER } from 'openapi-typescript';
import swagger2openapi from 'swagger2openapi';

const specs = [
  { name: 'archive', file: 'archive.swagger.json' },
  { name: 'http', file: 'qubic-http.swagger.json' },
  { name: 'stats', file: 'stats-api.swagger.json' },
  { name: 'queryServices', file: 'query_services.swagger.json' }
];

const packageRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const rawDir = path.join(packageRoot, 'schemas/raw');
const outDir = path.join(packageRoot, 'src/models/generated');

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const spec of specs) {
    const inputPath = path.join(rawDir, spec.file);
    const schema = JSON.parse(await readFile(inputPath, 'utf8'));
    const oasDocument = await convertIfNeeded(schema);
    const ast = await openapiTS(oasDocument, {
      exportType: true,
      defaultNonNullable: false
    });
    const source = `${COMMENT_HEADER}// Source: ${spec.file}\n\n${astToString(ast)}`;
    const outfile = path.join(outDir, `${spec.name}.ts`);
    await writeFile(outfile, source, 'utf8');
  }
  console.log(`Generated models in ${outDir}`);
}

main().catch((error) => {
  console.error('Failed to generate models', error);
  process.exitCode = 1;
});

async function convertIfNeeded(schema: any): Promise<any> {
  if (schema?.swagger) {
    const result = await swagger2openapi.convertObj(schema, { patch: true, warnOnly: true });
    return result.openapi;
  }
  return schema;
}
