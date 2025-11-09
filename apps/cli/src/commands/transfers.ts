import { createContext } from '../context';
import { logInfo, logSuccess, printJson } from '../utils/output';
import { parseInteger, parseString } from '../utils/parsers';
import { decodePayload } from '../utils/payload';
import { resolveSigner, type SignerOptions } from './signer';
import { promptInput } from '../utils/io';
import { selectIdentity } from '../utils/selectors';

interface TransferSendOptions {
  destination?: string;
  amount?: string;
  sessionToken?: string;
  seed?: string;
  profileId?: string;
  passphrase?: string;
  accountId?: string;
  derivationIndex?: string | number;
  monitor?: boolean;
  json?: boolean;
  dryRun?: boolean;
  queueOnFail?: boolean;
  input?: string;
  inputEncoding?: 'base64' | 'hex' | 'utf8';
  inputType?: string | number;
  tick?: string | number;
  procedureId?: string | number;
}

export async function sendTransferCommand(options: TransferSendOptions) {
  const ctx = await createContext();
  const destination = await selectIdentity(ctx, options.destination);
  const amountInput = await resolveRequiredInput('Amount', options.amount);
  const amount = parseString(amountInput, 'amount');
  const signer = await resolveSigner(ctx, options);
  const input = decodePayload(options.input, options.inputEncoding);
  const metadata = {
    tickNumber: parseInteger(options.tick, 'tick'),
    procedureId: parseInteger(options.procedureId, 'procedure id')
  };
  const inputType = parseInteger(options.inputType, 'input type');
  const queueOnFail = options.queueOnFail ?? true;

  const result = await ctx.sdk.transfers.send(
    {
      destination,
      amount,
      signer,
      metadata,
      input,
      inputType,
      monitor: options.monitor ?? true,
      dryRun: options.dryRun ?? false
    },
    {
      queueOnFail,
      telemetry: {
        onDraft: ({ txId }: { txId: string }) => logInfo(`Drafted ${txId}`),
        onBroadcast: ({ txId }: { txId: string }) => logInfo(`Broadcast ${txId}`),
        onSettled: ({ txId }: { txId: string }) => logSuccess(`Settled ${txId}`)
      }
    }
  );

  if (options.json) {
    printJson(result);
  } else {
    logSuccess(`Transfer ${result.txId} status: ${result.status}`);
  }
}

export async function resumeTransferQueueCommand() {
  const ctx = await createContext();
  await ctx.sdk.transfers.resumePending();
  logSuccess('Pending transfer queue processed.');
}

async function resolveRequiredInput(label: string, value?: string): Promise<string> {
  if (value && value.trim()) {
    return value.trim();
  }
  return promptInput(`${label}: `);
}
