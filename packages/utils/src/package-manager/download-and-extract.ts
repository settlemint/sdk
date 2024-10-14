import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { downloadTemplate } from "giget";

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
 * const dirIsEmpty = isEmpty("/path/to/directory");
 * console.log(dirIsEmpty);
 * ```
 */
export function isEmpty(path: string): boolean {
  const files = readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

/**
 * Empties a directory by removing all its contents except for the .git directory.
 *
 * @param dir - The directory to empty
 *
 * @example
 * ```typescript
 * emptyDir("/path/to/directory");
 * ```
 */
export function emptyDir(dir: string): void {
  if (!existsSync(dir)) return;
  for (const file of readdirSync(dir)) {
    if (file === ".git") continue;
    rmSync(resolve(dir, file), { recursive: true, force: true });
  }
}

/**
 * Downloads and extracts an npm package template to the specified target directory.
 *
 * @param template - The template to download
 * @param targetDir - The directory to extract the template to
 * @returns A Promise that resolves when the download and extraction are complete
 * @throws Will throw an error if the download or extraction fails
 *
 * @example
 * ```typescript
 * await downloadAndExtractNpmPackage("asset-tokenization", "/path/to/project");
 * ```
 */
export async function downloadAndExtractNpmPackage(template: Template["value"], targetDir: string): Promise<void> {
  // Create target directory if it doesn't exist
  mkdirSync(targetDir, { recursive: true });

  // Fetch the latest version from npm registry
  const response = await fetch(`https://registry.npmjs.org/${template}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const latestVersion = data["dist-tags"].latest;

  // Download and extract the package using giget
  await downloadTemplate(`https://registry.npmjs.org/${template}/-/${template}-${latestVersion}.tgz`, {
    dir: targetDir,
    force: true,
  });
}
