import { dirname } from "node:path";
import { findUp } from "find-up";

/**
 * Finds the root directory of the current project by locating the nearest package.json file
 *
 * @param fallbackToCwd - If true, will return the current working directory if no package.json is found
 * @param cwd - The directory to start searching for the package.json file from (defaults to process.cwd())
 * @returns Promise that resolves to the absolute path of the project root directory
 * @throws Will throw an error if no package.json is found in the directory tree
 * @example
 * import { projectRoot } from "@settlemint/sdk-utils/filesystem";
 *
 * // Get project root path
 * const rootDir = await projectRoot();
 * console.log(`Project root is at: ${rootDir}`);
 */
export async function projectRoot(fallbackToCwd = false, cwd?: string): Promise<string> {
  const packageJsonPath = await findUp("package.json", { cwd });
  if (!packageJsonPath) {
    if (fallbackToCwd) {
      return process.cwd();
    }
    throw new Error("Unable to find project root (no package.json found)");
  }
  return dirname(packageJsonPath);
}
