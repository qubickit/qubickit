export interface EventStreamMessage {
  id?: string;
  event?: string;
  data: string;
}

export interface EventStreamOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  reconnect?: boolean;
  retryDelayMs?: number;
  fetchImpl?: typeof fetch;
  onError?: (error: unknown) => void;
}

export class EventStreamSubscription implements AsyncIterable<EventStreamMessage> {
  private closed = false;
  private controller = new AbortController();
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly url: string, private readonly options: EventStreamOptions = {}) {
    this.fetchImpl = options.fetchImpl ?? fetch;
    if (options.signal) {
      options.signal.addEventListener('abort', () => this.close(), { once: true });
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<EventStreamMessage, void, unknown> {
    while (!this.closed) {
      try {
        const response = await this.fetchImpl(this.url, {
          headers: this.options.headers,
          signal: this.controller.signal
        });
        if (!response.body) break;
        for await (const message of readEventStream(response.body)) {
          yield message;
        }
      } catch (error) {
        this.options.onError?.(error);
        if (!this.options.reconnect || this.closed) break;
        await delay(this.options.retryDelayMs ?? 1000);
        continue;
      }

      if (!this.options.reconnect) break;
      await delay(this.options.retryDelayMs ?? 1000);
    }
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.controller.abort();
  }
}

export class EventStreamClient {
  constructor(private readonly baseUrl: string, private readonly options: EventStreamOptions = {}) {}

  subscribe(path: string, options: EventStreamOptions = {}) {
    const url = this.buildUrl(path);
    return new EventStreamSubscription(url, {
      ...this.options,
      ...options,
      fetchImpl: options.fetchImpl ?? this.options.fetchImpl
    });
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return new URL(normalized, this.baseUrl).toString();
  }
}

async function* readEventStream(stream: ReadableStream<Uint8Array>): AsyncGenerator<EventStreamMessage> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let boundary = findBoundary(buffer);
    while (boundary !== -1) {
      const chunk = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);
      const message = parseEventChunk(chunk);
      if (message) yield message;
      boundary = findBoundary(buffer);
    }
  }
}

const findBoundary = (buffer: string) => {
  const lf = buffer.indexOf('\n\n');
  const crlf = buffer.indexOf('\r\n\r\n');
  if (lf === -1) return crlf;
  if (crlf === -1) return lf;
  return Math.min(lf, crlf);
};

const parseEventChunk = (chunk: string): EventStreamMessage | null => {
  if (!chunk.trim()) return null;
  const message: EventStreamMessage = { data: '' };
  for (const rawLine of chunk.split(/\r?\n/)) {
    if (!rawLine || rawLine.startsWith(':')) continue;
    const [field, ...rest] = rawLine.split(':');
    const value = rest.join(':').trimStart();
    switch (field) {
      case 'event':
        message.event = value;
        break;
      case 'data':
        message.data = message.data ? `${message.data}\n${value}` : value;
        break;
      case 'id':
        message.id = value;
        break;
      default:
        break;
    }
  }
  return message.data ? message : null;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
