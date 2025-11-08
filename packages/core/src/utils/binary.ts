export class BinaryReader {
  private view: DataView;
  private offset = 0;

  constructor(private readonly buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  private ensure(bytes: number) {
    if (this.offset + bytes > this.buffer.length) {
      throw new RangeError('BinaryReader out of range');
    }
  }

  readUint8() {
    this.ensure(1);
    return this.buffer[this.offset++];
  }

  readUint16(littleEndian = true) {
    this.ensure(2);
    const value = this.view.getUint16(this.offset, littleEndian);
    this.offset += 2;
    return value;
  }

  readUint24(littleEndian = true) {
    this.ensure(3);
    const b0 = this.buffer[this.offset + (littleEndian ? 0 : 2)];
    const b1 = this.buffer[this.offset + 1];
    const b2 = this.buffer[this.offset + (littleEndian ? 2 : 0)];
    this.offset += 3;
    return (b0! | (b1! << 8) | (b2! << 16)) >>> 0;
  }

  readUint32(littleEndian = true) {
    this.ensure(4);
    const value = this.view.getUint32(this.offset, littleEndian);
    this.offset += 4;
    return value >>> 0;
  }

  readBigUint64(littleEndian = true) {
    this.ensure(8);
    const value = this.view.getBigUint64(this.offset, littleEndian);
    this.offset += 8;
    return value;
  }

  readBytes(length: number) {
    this.ensure(length);
    const slice = this.buffer.subarray(this.offset, this.offset + length);
    this.offset += length;
    return slice;
  }
}

export class BinaryWriter {
  private chunks: Uint8Array[] = [];
  private length = 0;

  writeUint8(value: number) {
    const chunk = new Uint8Array([value & 0xff]);
    this.push(chunk);
  }

  writeUint16(value: number, littleEndian = true) {
    const chunk = new Uint8Array(2);
    const view = new DataView(chunk.buffer);
    view.setUint16(0, value, littleEndian);
    this.push(chunk);
  }

  writeUint24(value: number, littleEndian = true) {
    const chunk = new Uint8Array(3);
    if (littleEndian) {
      chunk[0] = value & 0xff;
      chunk[1] = (value >> 8) & 0xff;
      chunk[2] = (value >> 16) & 0xff;
    } else {
      chunk[2] = value & 0xff;
      chunk[1] = (value >> 8) & 0xff;
      chunk[0] = (value >> 16) & 0xff;
    }
    this.push(chunk);
  }

  writeUint32(value: number, littleEndian = true) {
    const chunk = new Uint8Array(4);
    const view = new DataView(chunk.buffer);
    view.setUint32(0, value >>> 0, littleEndian);
    this.push(chunk);
  }

  writeBigUint64(value: bigint, littleEndian = true) {
    const chunk = new Uint8Array(8);
    const view = new DataView(chunk.buffer);
    view.setBigUint64(0, value, littleEndian);
    this.push(chunk);
  }

  writeBytes(bytes: Uint8Array) {
    this.push(bytes);
  }

  toUint8Array() {
    const out = new Uint8Array(this.length);
    let offset = 0;
    for (const chunk of this.chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out;
  }

  private push(chunk: Uint8Array) {
    this.chunks.push(chunk);
    this.length += chunk.length;
  }
}
