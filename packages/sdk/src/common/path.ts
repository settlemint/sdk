import { existsSync } from "node:fs";
import { dirname, join, parse } from "node:path";

/**
 * Finds the root directory of the project by looking for package.json
 *
 * @param startDir - The directory to start searching from
 * @returns The path to the project root directory
 * @throws Error if the project root cannot be found
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
 * Finds the root directory of the project by looking for package.json
 *
 * @param startDir - The directory to start searching from
 * @returns The path to the project root directory
 * @throws Error if the project root cannot be found
 */
export function findParentConfigRoot(startDir: string): string {
  let currentDir = startDir;

  // Traverse up the directory tree until we find package.json or reach the root
  while (currentDir !== parse(currentDir).root) {
    // Check if package.json exists in the current directory
    if (existsSync(join(currentDir, ".settlemintrc.json"))) {
      // If found, return the current directory as the project root
      return currentDir;
    }

    // Move up to the parent directory
    currentDir = dirname(currentDir);
  }

  // If we've reached the root without finding package.json, throw an error
  throw new Error("Unable to find project root");
}
