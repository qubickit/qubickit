import { expect, test } from "bun:test";
import { ContractTypes } from "../index";

const qx = ContractTypes.Qx;

test("createClient uses registry contractIndex and decodes function output", async () => {
	const registryIndex = qx.contract.contractIndex;
	let lastRequest: any;

	const mockClient = {
		async querySmartContract(req: any) {
			lastRequest = req;
			const payload = qx.encodeInput("Fees_output", {
				assetIssuanceFee: 1,
				transferFee: 2,
				tradeFee: 3,
			});
			return { responseData: Buffer.from(payload).toString("base64") };
		},
	};

	const bound = qx.createClient(mockClient);
	const result = await bound.functions.Fees({});

	expect(result).toEqual({
		assetIssuanceFee: 1,
		transferFee: 2,
		tradeFee: 3,
	});
	expect(lastRequest.contractIndex).toBe(registryIndex);
	expect(lastRequest.inputType).toBe(1);
});

test("createClient allows overriding contractIndex", async () => {
	let lastRequest: any;
	const mockClient = {
		async querySmartContract(req: any) {
			lastRequest = req;
			const payload = qx.encodeInput("Fees_output", {
				assetIssuanceFee: 4,
				transferFee: 5,
				tradeFee: 6,
			});
			return { responseData: Buffer.from(payload).toString("base64") };
		},
	};

	const bound = qx.createClient(mockClient, { contractIndex: 999 });
	await bound.functions.Fees({});

	expect(lastRequest.contractIndex).toBe(999);
});
