/**
 * Attempts to parse a JSON string into a typed value, returning a default value if parsing fails.
 *
 * @param value - The JSON string to parse
 * @param defaultValue - The value to return if parsing fails or results in null/undefined
 * @returns The parsed JSON value as type T, or the default value if parsing fails
 *
 * @example
 * import { tryParseJson } from "@settlemint/sdk-utils";
 *
 * const config = tryParseJson<{ port: number }>(
 *   '{"port": 3000}',
 *   { port: 8080 }
 * );
 * // Returns: { port: 3000 }
 *
 * const invalid = tryParseJson<string[]>(
 *   'invalid json',
 *   []
 * );
 * // Returns: []
 */
export function tryParseJson<T>(value: string, defaultValue: T | null = null): T | null {
  try {
    const parsed = JSON.parse(value) as T;
    if (parsed === undefined || parsed === null) {
      return defaultValue;
    }
    return parsed;
  } catch (err) {
    // Invalid json
    return defaultValue;
  }
}
