import { HttpApiClient } from '../clients/http-api-client';
import { bytesToBase64 } from '../utils/base64';

export interface SmartContractQueryInput {
  contractIndex: number;
  inputType?: number;
  payload?: Uint8Array;
}

export const querySmartContract = async (httpClient: HttpApiClient, input: SmartContractQueryInput) => {
  return httpClient.querySmartContract({
    contractIndex: input.contractIndex,
    inputType: input.inputType ?? 0,
    inputSize: input.payload?.byteLength ?? 0,
    requestData: input.payload ? bytesToBase64(input.payload) : undefined
  });
};
