/**
 * Helpers to pack contract call payloads.
 * HTTP partner API expects base64-encoded requestData.
 */
export interface ContractCall {
	inputType: number;
	payload: Uint8Array;
}

export interface EncodedContractCall {
	inputType: number;
	inputSize: number;
	requestData: string;
}

export function encodeContractCall(call: ContractCall): EncodedContractCall {
	const toBase64 = (data: Uint8Array): string => {
		if (typeof Buffer !== "undefined") {
			return Buffer.from(data).toString("base64");
		}
		let binary = "";
		data.forEach((byte) => {
			binary += String.fromCharCode(byte);
		});
		// btoa is available in browsers
		return btoa(binary);
	};

	return {
		inputType: call.inputType,
		inputSize: call.payload.length,
		requestData: toBase64(call.payload),
	};
}
