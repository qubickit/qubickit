export type QubicErrorCode = string | undefined;

export interface QubicErrorDetails {
	status?: number;
	code?: QubicErrorCode;
	cause?: unknown;
	details?: unknown;
}

/**
 * Normalized error thrown by all client calls so consumers can handle failures consistently.
 */
export class QubicError extends Error {
	readonly status?: number;
	readonly code?: QubicErrorCode;
	readonly details?: unknown;

	constructor(message: string, options: QubicErrorDetails = {}) {
		super(message);
		this.name = "QubicError";
		this.status = options.status;
		this.code = options.code;
		this.details = options.details;
		if (options.cause) {
			// Retain causal chain without relying on Error.cause, which is not always available.
			(this as any).cause = options.cause;
		}
	}
}

export function toQubicError(
	message: string,
	details: QubicErrorDetails = {},
): QubicError {
	return details instanceof QubicError
		? details
		: new QubicError(message, details);
}
