import { readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { exists } from "../filesystem.js";

/**
 * Array of available templates for project creation.
 */
export type Template = { value: string; label: string };
export const templates: Template[] = [
  { value: "@settlemint/starterkit-asset-tokenization", label: "Asset Tokenization" },
] as const;

/**
 * Checks if the given project name is a valid package name.
 *
 * @param projectName - The project name to validate
 * @returns True if the project name is valid, false otherwise
 *
 * @example
 * ```typescript
 * const isValid = isValidPackageName("my-project");
 * console.log(isValid); // true
 * ```
 */
export function isValidPackageName(projectName: string): boolean {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

/**
 * Converts a project name to a valid package name.
 *
 * @param projectName - The project name to convert
 * @returns A valid package name
 *
 * @example
 * ```typescript
 * const validName = toValidPackageName("My Project Name");
 * console.log(validName); // "my-project-name"
 * ```
 */
export function toValidPackageName(projectName: string): string {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

/**
 * Formats the target directory string by trimming and removing trailing slashes.
 *
 * @param targetDir - The target directory path to format
 * @returns The formatted target directory path
 *
 * @example
 * ```typescript
 * const formattedDir = formatTargetDir("/path/to/directory/");
 * console.log(formattedDir); // "/path/to/directory"
 * ```
 */
export function formatTargetDir(targetDir: string): string {
  return targetDir?.trim().replace(/\/+$/g, "");
}

/**
 * Checks if a directory is empty (contains no files or only a .git directory).
 *
 * @param path - The path to check
 * @returns True if the directory is empty, false otherwise
 *
 * @example
 * ```typescript
 * const dirIsEmpty = await isEmpty("/path/to/directory");
 * console.log(dirIsEmpty);
 * ```
 */
export async function isEmpty(path: string): Promise<boolean> {
  const files = await readdir(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

/**
 * Empties a directory by removing all its contents except for the .git directory.
 *
 * @param dir - The directory to empty
 *
 * @example
 * ```typescript
 * await emptyDir("/path/to/directory");
 * ```
 */
export async function emptyDir(dir: string): Promise<void> {
  if (!(await exists(dir))) return;
  for (const file of await readdir(dir)) {
    if (file === ".git") continue;
    await rm(resolve(dir, file), { recursive: true, force: true });
  }
}
