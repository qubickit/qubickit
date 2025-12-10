// Generated from query_services.swagger.json (lightweight, manual converter)

export interface pbComputorList {
	epoch?: number;
	tickNumber?: number;
	identities?: string[];
	signature?: string;
}

export interface pbGetComputorListsForEpochRequest {
	epoch?: number;
}

export interface pbGetComputorListsForEpochResponse {
	computorsLists?: pbComputorList[];
}

export interface pbGetLastProcessedTickResponse {
	tickNumber?: number;
	epoch?: number;
	intervalInitialTick?: number;
}

export interface pbGetProcessedTickIntervalsResponse {
	processedTickIntervals?: pbProcessedTickInterval[];
}

export interface pbGetTickDataRequest {
	tickNumber?: number;
}

export interface pbGetTickDataResponse {
	tickData?: pbTickData;
}

export interface pbGetTransactionByHashRequest {
	hash?: string;
}

export interface pbGetTransactionByHashResponse {
	transaction?: pbTransaction;
}

export interface pbGetTransactionsForIdentityRequest {
	identity?: string;
	filters?: Record<string, any>;
	ranges?: Record<string, any>;
	pagination?: pbPagination;
}

export interface pbGetTransactionsForIdentityResponse {
	validForTick?: number;
	hits?: pbHits;
	transactions?: pbTransaction[];
}

export interface pbGetTransactionsForTickRequest {
	tickNumber?: number;
}

export interface pbGetTransactionsForTickResponse {
	transactions?: pbTransaction[];
}

export interface pbHits {
	total?: number;
	from?: number;
	size?: number;
}

export interface pbPagination {
	offset?: number;
	size?: number;
}

export interface pbProcessedTickInterval {
	epoch?: number;
	firstTick?: number;
	lastTick?: number;
}

export interface pbRange {
	gt?: string;
	gte?: string;
	lt?: string;
	lte?: string;
}

export interface pbTickData {
	tickNumber?: number;
	epoch?: number;
	computorIndex?: number;
	timestamp?: string;
	varStruct?: string;
	timeLock?: string;
	transactionHashes?: string[];
	contractFees?: string[];
	signature?: string;
}

export interface pbTransaction {
	hash?: string;
	amount?: string;
	source?: string;
	destination?: string;
	tickNumber?: number;
	timestamp?: string;
	inputType?: number;
	inputSize?: number;
	inputData?: string;
	signature?: string;
	moneyFlew?: boolean;
}

export interface protobufAny {
	"@type"?: string;
}

export interface rpcStatus {
	code?: number;
	message?: string;
	details?: protobufAny[];
}
