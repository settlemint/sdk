import { projectRoot } from "@/filesystem/project-root.js";
import pkgjs from "@npmcli/package-json";

/**
 * Checks if a package is installed in the project's dependencies, devDependencies, or peerDependencies.
 *
 * @param name - The name of the package to check
 * @param path - The path to the project root directory. If not provided, will be automatically determined
 * @returns Whether the package is installed
 * @throws If unable to read or parse the package.json file
 * @example
 * import { isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
 *
 * const isInstalled = await isPackageInstalled("@settlemint/sdk-utils");
 * console.log(`@settlemint/sdk-utils is installed: ${isInstalled}`);
 */
export async function isPackageInstalled(name: string, path?: string) {
  // Read the package.json file
  const pkgJson = await pkgjs.load(path ?? (await projectRoot()));

  const inDependencies = !!pkgJson.content.dependencies?.[name];
  const inDevDependencies = !!pkgJson.content.devDependencies?.[name];
  const inPeerDependencies = !!pkgJson.content.peerDependencies?.[name];

  return inDependencies || inDevDependencies || inPeerDependencies;
}
