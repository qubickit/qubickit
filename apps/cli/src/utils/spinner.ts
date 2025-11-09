import ora, { type Ora } from 'ora';
import { isVerboseLogging } from './output';

export type SpinnerTask<T> = (spinner: Ora) => Promise<T>;

export async function withSpinner<T>(text: string, task: SpinnerTask<T>): Promise<T> {
  if (isVerboseLogging()) {
    // In verbose mode keep raw logs, but still show a simple prefix.
    console.log(text);
    const noop = {
      start: () => noop,
      succeed: () => noop,
      fail: () => noop,
      stop: () => noop,
      text
    } as Ora;
    return task(noop);
  }
  const spinner = ora({ text }).start();
  try {
    const result = await task(spinner);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail(typeof error === 'object' && error && 'message' in error ? (error as Error).message : String(error));
    throw error;
  }
}
