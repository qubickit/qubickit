import { describe, expect, it } from 'bun:test';
import { EventStreamClient, EventStreamSubscription } from '../src/transport/event-stream';

const encoder = new TextEncoder();

const createStreamResponse = (chunks: string[]) => {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    }
  });
  return new Response(stream, { status: 200, headers: { 'content-type': 'text/event-stream' } });
};

describe('EventStreamSubscription', () => {
  it('parses server-sent events', async () => {
    const fetchImpl = async () => createStreamResponse(['data: hello\n\n', 'event: custom\ndata: world\n\n']);
    const subscription = new EventStreamSubscription('https://example.com/stream', { fetchImpl, reconnect: false });
    const received: string[] = [];
    for await (const event of subscription) {
      received.push(`${event.event ?? 'message'}:${event.data}`);
    }
    expect(received).toEqual(['message:hello', 'custom:world']);
  });
});

describe('EventStreamClient', () => {
  it('subscribes to relative paths', async () => {
    const fetchImpl = async () => createStreamResponse(['data: ok\n\n']);
    const client = new EventStreamClient('https://example.com', { fetchImpl, reconnect: false });
    const subscription = client.subscribe('/stream');
    const events: string[] = [];
    for await (const message of subscription) {
      events.push(message.data);
    }
    expect(events).toEqual(['ok']);
  });
});
