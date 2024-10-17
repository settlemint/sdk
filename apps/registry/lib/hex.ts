/**
 * Shortens a hexadecimal string by keeping a prefix and suffix of specified lengths.
 *
 * @param hex - The hexadecimal string to shorten.
 * @param prefixLength - The number of characters to keep at the beginning of the string. Defaults to 6.
 * @param suffixLength - The number of characters to keep at the end of the string. Defaults to 4.
 * @returns The shortened hexadecimal string, or null if the input is falsy, or the original string if it's too short to shorten.
 */
export function shortHex(hex?: string, prefixLength = 6, suffixLength = 4) {
  if (!hex) {
    return null;
  }
  if (hex.length < prefixLength + suffixLength + 1) {
    return hex;
  }
  return `${hex.slice(0, prefixLength)}…${hex.slice(-suffixLength)}`;
}
