/**
 * Tiny binary codec helpers for contract payloads.
 * Assumes little-endian packing, no padding between fields.
 */

export interface FieldSchema {
	name: string;
	type: PrimitiveType | StructSchema | ArraySchema;
}

export type PrimitiveType =
	| "u8"
	| "i8"
	| "u16"
	| "i16"
	| "u32"
	| "i32"
	| "u64"
	| "i64"
	| "id"
	| { bytes: number };

export interface StructSchema {
	kind: "struct";
	fields: FieldSchema[];
}

export interface ArraySchema {
	kind: "array";
	of: PrimitiveType | StructSchema;
	length: number;
}

export type Schema = StructSchema | ArraySchema | PrimitiveType;

export function sizeOf(schema: Schema): number {
	if (schema === "u8" || schema === "i8") return 1;
	if (schema === "u16" || schema === "i16") return 2;
	if (schema === "u32" || schema === "i32") return 4;
	if (schema === "u64" || schema === "i64") return 8;
	if (schema === "id") return 32;
	if (typeof schema === "object" && "bytes" in schema) return schema.bytes;
	if ("kind" in schema && schema.kind === "array") {
		return sizeOf(schema.of) * schema.length;
	}
	if ("kind" in schema && schema.kind === "struct") {
		return schema.fields.reduce((sum, f) => sum + sizeOf(f.type), 0);
	}
	throw new Error("unknown schema");
}

export function encode(schema: Schema, value: any): Uint8Array {
	const buf = new Uint8Array(sizeOf(schema));
	const view = new DataView(buf.buffer);
	write(schema, value, view, 0);
	return buf;
}

export function decode<T>(schema: Schema, buf: Uint8Array): T {
	const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	const [val] = read(schema, view, 0);
	return val as T;
}

function write(
	schema: Schema,
	value: any,
	view: DataView,
	offset: number,
): number {
	switch (schema) {
		case "u8":
			view.setUint8(offset, value);
			return offset + 1;
		case "i8":
			view.setInt8(offset, value);
			return offset + 1;
		case "u16":
			view.setUint16(offset, value, true);
			return offset + 2;
		case "i16":
			view.setInt16(offset, value, true);
			return offset + 2;
		case "u32":
			view.setUint32(offset, value, true);
			return offset + 4;
		case "i32":
			view.setInt32(offset, value, true);
			return offset + 4;
		case "u64":
			view.setBigUint64(offset, BigInt(value), true);
			return offset + 8;
		case "i64":
			view.setBigInt64(offset, BigInt(value), true);
			return offset + 8;
		case "id": {
			const buf = value as Uint8Array;
			if (!(buf instanceof Uint8Array) || buf.length !== 32) {
				throw new Error("id must be 32 bytes");
			}
			new Uint8Array(view.buffer, view.byteOffset + offset, 32).set(buf);
			return offset + 32;
		}
		default:
			if (typeof schema === "object" && "bytes" in schema) {
				const buf = value as Uint8Array;
				if (!(buf instanceof Uint8Array) || buf.length !== schema.bytes) {
					throw new Error(`expected ${schema.bytes} bytes`);
				}
				new Uint8Array(view.buffer, view.byteOffset + offset, schema.bytes).set(
					buf,
				);
				return offset + schema.bytes;
			}
			if (typeof schema === "object" && "kind" in schema) {
				if (schema.kind === "array") {
					const arr = value as any[];
					if (!Array.isArray(arr) || arr.length !== schema.length) {
						throw new Error(`expected array length ${schema.length}`);
					}
					for (let i = 0; i < schema.length; i++) {
						offset = write(schema.of, arr[i], view, offset);
					}
					return offset;
				}
				if (schema.kind === "struct") {
					for (const field of schema.fields) {
						offset = write(field.type, value[field.name], view, offset);
					}
					return offset;
				}
			}
			throw new Error("unsupported schema");
	}
}

function read(schema: Schema, view: DataView, offset: number): [any, number] {
	switch (schema) {
		case "u8":
			return [view.getUint8(offset), offset + 1];
		case "i8":
			return [view.getInt8(offset), offset + 1];
		case "u16":
			return [view.getUint16(offset, true), offset + 2];
		case "i16":
			return [view.getInt16(offset, true), offset + 2];
		case "u32":
			return [view.getUint32(offset, true), offset + 4];
		case "i32":
			return [view.getInt32(offset, true), offset + 4];
		case "u64":
			return [view.getBigUint64(offset, true), offset + 8];
		case "i64":
			return [view.getBigInt64(offset, true), offset + 8];
		case "id": {
			const bytes = new Uint8Array(
				view.buffer,
				view.byteOffset + offset,
				32,
			).slice();
			return [bytes, offset + 32];
		}
		default:
			if (typeof schema === "object" && "bytes" in schema) {
				const bytes = new Uint8Array(
					view.buffer,
					view.byteOffset + offset,
					schema.bytes,
				).slice();
				return [bytes, offset + schema.bytes];
			}
			if (typeof schema === "object" && "kind" in schema) {
				if (schema.kind === "array") {
					const arr: any[] = [];
					for (let i = 0; i < schema.length; i++) {
						const [val, next] = read(schema.of, view, offset);
						arr.push(val);
						offset = next;
					}
					return [arr, offset];
				}
				if (schema.kind === "struct") {
					const obj: Record<string, unknown> = {};
					for (const field of schema.fields) {
						const [val, next] = read(field.type, view, offset);
						obj[field.name] = val;
						offset = next;
					}
					return [obj, offset];
				}
			}
			throw new Error("unsupported schema");
	}
}
