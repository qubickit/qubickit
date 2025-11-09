import { createInterface } from 'node:readline/promises';

export async function promptInput(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const answer = await rl.question(question);
    return answer.trim();
  } finally {
    rl.close();
  }
}

export async function promptSelect<T>(
  question: string,
  options: T[],
  render: (item: T, index: number) => string = (item) => String(item)
): Promise<T> {
  if (!options.length) {
    throw new Error('No options available to select from.');
  }
  options.forEach((item, index) => {
    console.log(`[${index + 1}] ${render(item, index)}`);
  });
  const answer = await promptInput(`${question} (1-${options.length}): `);
  const selectedIndex = Number(answer) - 1;
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= options.length) {
    console.log('Invalid selection. Please try again.');
    return promptSelect(question, options, render);
  }
  return options[selectedIndex]!;
}

export async function promptConfirm(question: string, defaultValue = false): Promise<boolean> {
  const suffix = defaultValue ? 'Y/n' : 'y/N';
  const answer = await promptInput(`${question} (${suffix}): `);
  if (!answer) {
    return defaultValue;
  }
  const normalized = answer.trim().toLowerCase();
  if (['y', 'yes'].includes(normalized)) return true;
  if (['n', 'no'].includes(normalized)) return false;
  console.log('Please answer with y(es) or n(o).');
  return promptConfirm(question, defaultValue);
}

export function ensureEnv(name: string, value: string | undefined): string {
  if (value && value.length > 0) {
    return value;
  }
  throw new Error(`Missing required ${name}. Pass a flag or set the ${name} environment variable.`);
}
