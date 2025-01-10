import { dirname } from "node:path";
import { findUp } from "find-up";

/**
 * Finds the root directory of the current project by locating the nearest lockfile
 *
 * @param fallbackToCwd - If true, will return the current working directory if no lockfile is found
 * @param cwd - The directory to start searching from
 * @returns The absolute path of the project root directory
 * @throws Will throw an error if no lockfile is found in the directory tree and fallbackToCwd is false
 */
export async function projectRoot(fallbackToCwd = false, cwd = process.cwd()): Promise<string> {
  const packageJsonPath = await findUp(["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb", "bun.lock"], {
    cwd,
  });
  if (!packageJsonPath) {
    if (fallbackToCwd) {
      return cwd;
    }
    throw new Error("Unable to find project root - no lockfile found in directory tree");
  }
  console.log("packageJsonPath", packageJsonPath);
  return dirname(packageJsonPath);
}
