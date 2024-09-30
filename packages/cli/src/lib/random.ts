import { randomBytes } from "node:crypto";

export function randomString(length: number): string {
  // Generate slightly more bytes than needed to ensure we have enough after encoding
  const rb = randomBytes(Math.ceil(length / 2));
  const result = rb.toString("hex");

  // Trim or pad the result to match the exact length
  if (result.length > length) {
    return result.slice(0, length);
  }
  if (result.length < length) {
    const padding = "0"; // Use '1' for base58 (lowest value) and '0' for hex
    return result.padEnd(length, padding);
  }

  return result;
}
