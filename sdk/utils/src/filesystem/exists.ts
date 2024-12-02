import type { PathLike } from "node:fs";
import { stat } from "node:fs/promises";

/**
 * Checks if a file or directory exists at the given path
 *
 * @param path - The path to check
 * @returns True if the path exists, false otherwise
 */
export async function exists(path: PathLike): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}
