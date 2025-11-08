const specs = [
  { name: 'archive.swagger.json', url: 'https://qubic.github.io/integration/Partners/swagger/archive.swagger.json' },
  { name: 'qubic-http.swagger.json', url: 'https://qubic.github.io/integration/Partners/swagger/qubic-http.swagger.json' },
  { name: 'stats-api.swagger.json', url: 'https://qubic.github.io/integration/Partners/swagger/stats-api.swagger.json' },
  { name: 'query_services.swagger.json', url: 'https://qubic.github.io/integration/Partners/swagger/query_services.swagger.json' }
];

const download = async () => {
  for (const spec of specs) {
    const response = await fetch(spec.url);
    if (!response.ok) throw new Error(`Failed to download ${spec.url}`);
    const text = await response.text();
    const filePath = new URL(`../schemas/raw/${spec.name}`, import.meta.url);
    await Bun.write(filePath, text);
    console.log(`Saved ${spec.name}`);
  }
};

download().catch((err) => {
  console.error(err);
  process.exit(1);
});
