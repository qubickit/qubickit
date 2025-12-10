// Generated from qubic-http.swagger.json (lightweight, manual converter)

export interface pbAssetInfo {
	tick?: number;
	universeIndex?: number;
}

export interface pbAssetIssuance {
	data?: pbAssetIssuanceData;
	tick?: number;
	universeIndex?: number;
}

export interface pbAssetIssuanceData {
	issuerIdentity?: string;
	type?: number;
	name?: string;
	numberOfDecimalPlaces?: number;
	unitOfMeasurement?: number[];
}

export interface pbAssetIssuances {
	assets?: pbAssetIssuance[];
}

export interface pbAssetOwnership {
	data?: pbAssetOwnershipData;
	tick?: number;
	universeIndex?: number;
}

export interface pbAssetOwnershipData {
	ownerIdentity?: string;
	type?: number;
	managingContractIndex?: number;
	issuanceIndex?: number;
	numberOfUnits?: string;
}

export interface pbAssetOwnerships {
	assets?: pbAssetOwnership[];
}

export interface pbAssetPossession {
	data?: pbAssetPossessionData;
	tick?: number;
	universeIndex?: number;
}

export interface pbAssetPossessionData {
	possessorIdentity?: string;
	type?: number;
	managingContractIndex?: number;
	ownershipIndex?: number;
	numberOfUnits?: string;
}

export interface pbAssetPossessions {
	assets?: pbAssetPossession[];
}

export interface pbBalance {
	id?: string;
	balance?: string;
	validForTick?: number;
	latestIncomingTransferTick?: number;
	latestOutgoingTransferTick?: number;
	incomingAmount?: string;
	outgoingAmount?: string;
	numberOfIncomingTransfers?: number;
	numberOfOutgoingTransfers?: number;
}

export interface pbBroadcastTransactionRequest {
	encodedTransaction?: string;
}

export interface pbBroadcastTransactionResponse {
	peersBroadcasted?: number;
	encodedTransaction?: string;
	transactionId?: string;
}

export interface pbGetActiveIposResponse {
	ipos?: pbIpo[];
}

export interface pbGetBalanceResponse {
	balance?: pbBalance;
}

export interface pbGetBlockHeightResponse {
	blockHeight?: pbTickInfo;
}

export interface pbGetTickInfoResponse {
	tickInfo?: pbTickInfo;
}

export interface pbIpo {
	contractIndex?: number;
	assetName?: string;
}

export interface pbIssuedAsset {
	data?: pbIssuedAssetData;
	info?: pbAssetInfo;
}

export interface pbIssuedAssetData {
	issuerIdentity?: string;
	type?: number;
	name?: string;
	numberOfDecimalPlaces?: number;
	unitOfMeasurement?: number[];
}

export interface pbIssuedAssetsResponse {
	issuedAssets?: pbIssuedAsset[];
}

export interface pbOwnedAsset {
	data?: pbOwnedAssetData;
	info?: pbAssetInfo;
}

export interface pbOwnedAssetData {
	ownerIdentity?: string;
	type?: number;
	padding?: number;
	managingContractIndex?: number;
	issuanceIndex?: number;
	numberOfUnits?: string;
	issuedAsset?: pbIssuedAssetData;
}

export interface pbOwnedAssetsResponse {
	ownedAssets?: pbOwnedAsset[];
}

export interface pbPossessedAsset {
	data?: pbPossessedAssetData;
	info?: pbAssetInfo;
}

export interface pbPossessedAssetData {
	possessorIdentity?: string;
	type?: number;
	padding?: number;
	managingContractIndex?: number;
	issuanceIndex?: number;
	numberOfUnits?: string;
	ownedAsset?: pbOwnedAssetData;
}

export interface pbPossessedAssetsResponse {
	possessedAssets?: pbPossessedAsset[];
}

export interface pbQuerySmartContractRequest {
	contractIndex?: number;
	inputType?: number;
	inputSize?: number;
	requestData?: string;
}

export interface pbQuerySmartContractResponse {
	responseData?: string;
}

export interface pbTickInfo {
	tick?: number;
	duration?: number;
	epoch?: number;
	initialTick?: number;
}

export interface protobufAny {
	"@type"?: string;
}

export interface rpcStatus {
	code?: number;
	message?: string;
	details?: protobufAny[];
}
