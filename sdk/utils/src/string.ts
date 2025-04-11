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
  const result = s.replace(/([a-z])([A-Z])/g, "$1 $2");
  const withSpaces = result.replace(/([A-Z])([a-z])/g, " $1$2");
  const capitalized = capitalizeFirstLetter(withSpaces);
  return capitalized.replace(/\s+/g, " ").trim();
}

/**
 * Replaces underscores and hyphens with spaces.
 *
 * @param s - The string to replace underscores and hyphens with spaces
 * @returns The input string with underscores and hyphens replaced with spaces
 *
 * @example
 * import { replaceUnderscoresAndHyphensWithSpaces } from "@settlemint/sdk-utils";
 *
 * const result = replaceUnderscoresAndHyphensWithSpaces("Already_Spaced-Second");
 * // Returns: "Already Spaced Second"
 */
export function replaceUnderscoresAndHyphensWithSpaces(s: string) {
  return s.replace(/[-_]/g, " ");
}

/**
 * Truncates a string to a maximum length and appends "..." if it is longer.
 *
 * @param value - The string to truncate
 * @param maxLength - The maximum length of the string
 * @returns The truncated string or the original string if it is shorter than the maximum length
 *
 * @example
 * import { truncate } from "@settlemint/sdk-utils";
 *
 * const truncated = truncate("Hello, world!", 10);
 * // Returns: "Hello, wor..."
 */
export function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength)}...`;
}
