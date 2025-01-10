import { dirname, join } from "node:path";
import { findUp } from "find-up";
import { exists } from "./exists.js";

/**
 * Finds the root directory of the current project by locating the nearest package.json file
 *
 * @returns Promise that resolves to the absolute path of the project root directory
 * @throws Will throw an error if no package.json is found in the directory tree
 * @example
 * import { projectRoot } from "@settlemint/sdk-utils";
 *
 * // Get project root path
 * const rootDir = await projectRoot();
 * console.log(`Project root is at: ${rootDir}`);
 */
export async function projectRoot(fallbackToCwd = false): Promise<string> {
  const lockFiles = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb", "bun.lock"];
  const lockFilesInCwd = await Promise.race(lockFiles.map((lockFile) => exists(join(process.cwd(), lockFile))));
  // If a lock file exists in current directory, use that as project root
  if (lockFilesInCwd) {
    return process.cwd();
  }
  const packageJsonPath = await findUp("package.json");
  if (!packageJsonPath) {
    if (fallbackToCwd) {
      return process.cwd();
    }
    throw new Error("Unable to find project root (no package.json found)");
  }
  return dirname(packageJsonPath);
}
