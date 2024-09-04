import { existsSync } from "node:fs";
import { dirname, join, parse } from "node:path";

/**
 * Finds the root directory of the project by looking for package.json
 *
 * @param startDir - The directory to start searching from
 * @returns The path to the project root directory
 * @throws {Error} If the project root cannot be found
 *
 * @example
 * ```typescript
 * const projectRoot = findProjectRoot('/path/to/current/directory');
 * console.log(projectRoot); // Outputs: '/path/to/project/root'
 * ```
 */
export function findProjectRoot(startDir: string): string {
  let currentDir = startDir;

  // Traverse up the directory tree until we find package.json or reach the root
  while (currentDir !== parse(currentDir).root) {
    // Check if package.json exists in the current directory
    if (existsSync(join(currentDir, "package.json"))) {
      // If found, return the current directory as the project root
      return currentDir;
    }

    // Move up to the parent directory
    currentDir = dirname(currentDir);
  }

  // If we've reached the root without finding package.json, throw an error
  throw new Error("Unable to find project root");
}

/**
 * Finds the root directory of the project by looking for settlemint.config.mjs
 *
 * @param startDir - The directory to start searching from
 * @returns The path to the project root directory containing settlemint.config.mjs
 * @throws {Error} If the project root with settlemint.config.mjs cannot be found
 *
 * @example
 * ```typescript
 * const configRoot = findParentConfigRoot('/path/to/current/directory');
 * console.log(configRoot); // Outputs: '/path/to/config/root'
 * ```
 */
export function findParentConfigRoot(startDir: string): string {
  let currentDir = startDir;

  // Traverse up the directory tree until we find settlemint.config.mjs or reach the root
  while (currentDir !== parse(currentDir).root) {
    // Check if settlemint.config.mjs exists in the current directory
    if (existsSync(join(currentDir, "settlemint.config.mjs"))) {
      // If found, return the current directory as the project root
      return currentDir;
    }

    // Move up to the parent directory
    currentDir = dirname(currentDir);
  }

  // If we've reached the root without finding settlemint.config.mjs, throw an error
  throw new Error("Unable to find project root with settlemint.config.mjs");
}
