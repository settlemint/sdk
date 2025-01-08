import { readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { exists } from "../filesystem.js";

/**
 * Available templates for project creation
 */
export type Template = { value: string; label: string };
export const templates: Template[] = [
  { value: "@settlemint/starterkit-asset-tokenization", label: "Asset Tokenization" },
] as const;

/**
 * Formats a directory path by removing trailing slashes and whitespace
 *
 * @param targetDir - The directory path to format
 * @returns The formatted directory path
 * @example
 * import { formatTargetDir } from "@settlemint/sdk-utils";
 *
 * const formatted = formatTargetDir("/path/to/dir/ "); // "/path/to/dir"
 */
export function formatTargetDir(targetDir: string): string {
  return targetDir?.trim().replace(/\/+$/g, "");
}

/**
 * Checks if a directory is empty or contains only a .git folder
 *
 * @param path - The directory path to check
 * @returns True if directory is empty or contains only .git, false otherwise
 * @example
 * import { isEmpty } from "@settlemint/sdk-utils";
 *
 * if (await isEmpty("/path/to/dir")) {
 *   // Directory is empty
 * }
 */
export async function isEmpty(path: string): Promise<boolean> {
  const files = await readdir(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

/**
 * Removes all contents of a directory except the .git folder
 *
 * @param dir - The directory path to empty
 * @example
 * import { emptyDir } from "@settlemint/sdk-utils";
 *
 * await emptyDir("/path/to/dir"); // Removes all contents except .git
 */
export async function emptyDir(dir: string): Promise<void> {
  if (!(await exists(dir))) return;
  for (const file of await readdir(dir)) {
    if (file === ".git") continue;
    await rm(resolve(dir, file), { recursive: true, force: true });
  }
}
