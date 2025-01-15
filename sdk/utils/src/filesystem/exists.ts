import type { PathLike } from "node:fs";
import { stat } from "node:fs/promises";

/**
 * Checks if a file or directory exists at the given path
 *
 * @param path - The file system path to check for existence
 * @returns Promise that resolves to true if the path exists, false otherwise
 * @example
 * import { exists } from "@settlemint/sdk-utils/filesystem";
 *
 * // Check if file exists before reading
 * if (await exists('/path/to/file.txt')) {
 *   // File exists, safe to read
 * }
 */
export async function exists(path: PathLike): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}
