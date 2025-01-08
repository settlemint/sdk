import type { AgentName } from "package-manager-detector";
import { detect } from "package-manager-detector/detect";

/**
 * Detects the package manager used in the current project
 *
 * @param targetDir - The directory to check for package manager (optional, defaults to process.cwd())
 * @returns The name of the package manager
 * @example
 * import { getPackageManager } from "@settlemint/sdk-utils";
 *
 * const packageManager = await getPackageManager();
 * console.log(`Using ${packageManager}`);
 */
export async function getPackageManager(targetDir?: string): Promise<AgentName> {
  const packageManager = await detect({ cwd: targetDir || process.cwd() });

  return packageManager?.name ?? "npm";
}
