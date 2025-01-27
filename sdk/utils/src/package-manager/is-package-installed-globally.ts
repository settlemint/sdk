import { isPackageInstalled } from "./is-package-installed.js";

/**
 * Checks if a package is installed globally
 *
 * @param packageName - The name of the package to check
 * @returns True if the package is installed globally, false otherwise
 */
export async function isPackageInstalledGlobally(packageName: string) {
  try {
    const installedLocally = await isPackageInstalled(packageName);
    return !installedLocally;
  } catch {
    return true;
  }
}
