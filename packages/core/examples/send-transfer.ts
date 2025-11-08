import { createHttpClient } from '../src/transport/http-client';
import { HttpApiClient } from '../src/clients/http-api-client';
import { createTransactionDraft } from '../src/serde/transaction-builder';

const requireEnv = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var ${name}`);
  return value;
};

async function main() {
  const seed = requireEnv('QUBIC_SOURCE_SEED');
  const destination = requireEnv('QUBIC_DESTINATION_ID');
  const amount = BigInt(process.env.QUBIC_AMOUNT ?? '1');
  const httpHost = process.env.QUBIC_HTTP_HOST ?? 'https://rpc.qubic.org';

  const http = new HttpApiClient(
    createHttpClient({
      baseUrl: httpHost
    })
  );

  const tickInfo = await http.getTickInfo();
  const tickNumber = tickInfo.tickInfo?.tick ?? Math.floor(Date.now() / 1_000);

  const signed = await createTransactionDraft(
    {
      sourceSeed: seed,
      destinationId: destination,
      amount
    },
    { tickNumber }
  );

  console.log('Encoded transaction ready for broadcast:\n', signed.encoded);
  console.log('Unsigned transaction id:', signed.txId);
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
