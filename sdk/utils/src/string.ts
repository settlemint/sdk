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
