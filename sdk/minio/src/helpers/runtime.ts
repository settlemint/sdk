/**
 * Runtime utilities for checking execution environment
 */

/**
 * Ensures the current code is running on the server
 * @throws Will throw an error if called on the client
 */
export function ensureServer(): void {
  if (typeof window !== "undefined") {
    throw new Error("This function can only be called on the server.");
  }
}
