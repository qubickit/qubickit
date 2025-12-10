import { expect, test } from "bun:test";
import { createHttpClient } from "../src/clients/http.ts";
import { createQueryClient } from "../src/clients/query.ts";
import { createRpcClient } from "../src/clients/rpc.ts";
import { QubicError } from "../src/errors.ts";
import type {
	Transport,
	TransportRequest,
	TransportResponse,
} from "../src/transport.ts";

class MockTransport implements Transport {
	lastRequest?: TransportRequest;
	response: TransportResponse = { status: 200, headers: {}, data: {} };

	async request<T>(options: TransportRequest): Promise<TransportResponse<T>> {
		this.lastRequest = options;
		return this.response as TransportResponse<T>;
	}
}

test("http client shapes GET with query and headers", async () => {
	const transport = new MockTransport();
	transport.response = {
		status: 200,
		headers: {},
		data: { ok: true },
	};

	const client = createHttpClient({
		baseUrl: "https://api.example.com",
		transport,
		headers: { "x-default": "1" },
		userAgent: "qubickit-test",
	});

	const result = await client.get("/balances/abc", {
		query: { limit: 10, search: "foo" },
		headers: { "x-override": "2" },
	});

	expect(result).toEqual({ ok: true });
	expect(transport.lastRequest?.url).toBe(
		"https://api.example.com/balances/abc?limit=10&search=foo",
	);
	expect(transport.lastRequest?.headers?.["x-default"]).toBe("1");
	expect(transport.lastRequest?.headers?.["x-override"]).toBe("2");
	expect(transport.lastRequest?.headers?.["user-agent"]).toBe("qubickit-test");
	expect(transport.lastRequest?.method).toBe("GET");
});

test("rpc client builds JSON-RPC payload", async () => {
	const transport = new MockTransport();
	transport.response = {
		status: 200,
		headers: {},
		data: { jsonrpc: "2.0", id: 1, result: { ok: true } },
	};

	const client = createRpcClient({
		baseUrl: "https://rpc.example.com",
		transport,
		userAgent: "qubickit-test",
	});

	const result = await client.call("ping", { foo: "bar" });

	expect(result).toEqual({ ok: true });
	expect(transport.lastRequest?.url).toBe("https://rpc.example.com/");
	expect(transport.lastRequest?.method).toBe("POST");
	expect(transport.lastRequest?.headers?.["user-agent"]).toBe("qubickit-test");
	expect(transport.lastRequest?.headers?.["content-type"]).toBe(
		"application/json",
	);
	expect(transport.lastRequest?.body).toEqual({
		jsonrpc: "2.0",
		method: "ping",
		params: { foo: "bar" },
		id: 1,
	});
});

test("http client applies auth header when configured", async () => {
	const transport = new MockTransport();
	transport.response = {
		status: 200,
		headers: {},
		data: { ok: true },
	};

	const client = createHttpClient({
		baseUrl: "https://api.example.com",
		transport,
		apiKey: "secret",
		authHeaderName: "x-api-key",
	});

	await client.get("/tick-info");

	expect(transport.lastRequest?.headers?.["x-api-key"]).toBe("secret");
});

test("rpc batch maps error results to QubicError", async () => {
	const transport = new MockTransport();
	transport.response = {
		status: 200,
		headers: {},
		data: [
			{ jsonrpc: "2.0", id: 1, result: { ok: true } },
			{
				jsonrpc: "2.0",
				id: 2,
				error: { code: -1, message: "boom", data: { detail: "x" } },
			},
		],
	};

	const client = createRpcClient({
		baseUrl: "https://rpc.example.com",
		transport,
	});

	const [ok, err] = await client.batch([{ method: "foo" }, { method: "bar" }]);

	expect(ok).toEqual({ ok: true });
	expect(err).toBeInstanceOf(QubicError);
	expect((err as QubicError).code).toBe("-1");
});

test("query client posts body to correct path", async () => {
	const transport = new MockTransport();
	transport.response = {
		status: 200,
		headers: {},
		data: { tickData: { tickNumber: 1 } },
	};

	const client = createQueryClient({
		baseUrl: "https://query.example.com",
		transport,
	});

	const result = await client.getTickData({ tickNumber: 123 });

	expect(result).toEqual({ tickData: { tickNumber: 1 } });
	expect(transport.lastRequest?.url).toBe(
		"https://query.example.com/getTickData",
	);
	expect(transport.lastRequest?.method).toBe("POST");
	expect(transport.lastRequest?.body).toEqual({ tickNumber: 123 });
});
