export const createAbortError = (reason?: unknown): Error => {
  if (reason instanceof Error) {
    return reason;
  }
  const message = typeof reason === 'string' ? reason : 'Operation aborted';
  const error = new Error(message);
  error.name = 'AbortError';
  return error;
};

export const assertNotAborted = (signal?: AbortSignal) => {
  if (!signal) {
    return;
  }
  if (typeof signal.throwIfAborted === 'function') {
    signal.throwIfAborted();
    return;
  }
  if (signal.aborted) {
    throw createAbortError(signal.reason);
  }
};

export const subscribeToAbort = (signal: AbortSignal | undefined, onAbort: () => void) => {
  if (!signal) {
    return () => undefined;
  }

  const listener = () => {
    onAbort();
  };

  signal.addEventListener('abort', listener, { once: true });

  return () => {
    signal.removeEventListener('abort', listener);
  };
};
