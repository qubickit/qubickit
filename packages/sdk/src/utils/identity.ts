export const identityToPublicKey = (identity: string): Uint8Array => {
  if (!/^[A-Z]{60}$/.test(identity)) throw new Error('Identity must be 60 uppercase characters');
  const bytes = new Uint8Array(32);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < 4; i++) {
    let value = 0n;
    for (let j = 13; j >= 0; j--) {
      const charCode = identity.charCodeAt(i * 14 + j) - 'A'.charCodeAt(0);
      value = value * 26n + BigInt(charCode);
    }
    view.setBigUint64(i * 8, value, true);
  }
  return bytes;
};
