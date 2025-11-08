import { subscribeToAbort } from '../internal/abort';

export const waitFor = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const cleanup = () => {
      clearTimeout(timer);
      unsubscribe();
    };

    const unsubscribe = subscribeToAbort(signal, () => {
      cleanup();
      reject(signal?.reason ?? new Error('Operation aborted.'));
    });
  });
