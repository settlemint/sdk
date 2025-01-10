import { dirname, join } from "node:path";
import { findUp } from "find-up";
import { exists } from "./exists.js";

/**
 * Finds the root directory of the current project by locating the nearest package.json file
 *
 * @param fallbackToCwd - If true, will return the current working directory if no package.json is found
 * @param cwd - The directory to start searching from
 * @returns Promise that resolves to the absolute path of the project root directory
 * @throws Will throw an error if no package.json is found in the directory tree
 * @example
 * import { projectRoot } from "@settlemint/sdk-utils";
 *
 * // Get project root path
 * const rootDir = await projectRoot();
 * console.log(`Project root is at: ${rootDir}`);
 */
export async function projectRoot(fallbackToCwd = false, cwd = process.cwd()): Promise<string> {
  const lockFiles = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb", "bun.lock"];
  const lockFilesInCwd = await Promise.race(lockFiles.map((lockFile) => exists(join(cwd, lockFile))));
  // If a lock file exists in current directory, use that as project root
  if (lockFilesInCwd) {
    return cwd;
  }
  const packageJsonPath = await findUp("package.json", { cwd });
  if (!packageJsonPath) {
    if (fallbackToCwd) {
      return cwd;
    }
    throw new Error("Unable to find project root (no package.json found)");
  }
  console.log("packageJsonPath", packageJsonPath);
  return dirname(packageJsonPath);
}
