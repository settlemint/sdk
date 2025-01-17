/**
 * Capitalizes the first letter of a string.
 *
 * @param val - The string to capitalize
 * @returns The input string with its first letter capitalized
 *
 * @example
 * import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
 *
 * const capitalized = capitalizeFirstLetter("hello");
 * // Returns: "Hello"
 */
export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

/**
 * Converts a camelCase string to a human-readable string.
 *
 * @param s - The camelCase string to convert
 * @returns The human-readable string
 *
 * @example
 * import { camelCaseToWords } from "@settlemint/sdk-utils";
 *
 * const words = camelCaseToWords("camelCaseString");
 * // Returns: "Camel Case String"
 */
export function camelCaseToWords(s: string) {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
