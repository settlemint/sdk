import { projectRoot } from "@/filesystem/project-root.js";
import pkgjs from "@npmcli/package-json";

/**
 * Checks if a package is installed in the project's dependencies.
 * @param name - The name of the package to check.
 * @param path - Optional path to the project root. If not provided, it will be determined automatically.
 * @returns A boolean indicating whether the package is installed in any of the dependency types (dependencies, devDependencies, or peerDependencies).
 * @throws {Error} If there's an issue reading the package.json file.
 *
 * @example
 * ```typescript
 * const isInstalled = await isPackageInstalled("react");
 * console.log(isInstalled); // true or false
 * ```
 */
export async function isPackageInstalled(name: string, path?: string) {
  // Read the package.json file
  const pkgJson = await pkgjs.load(path ?? (await projectRoot()));

  const inDependencies = !!pkgJson.content.dependencies?.[name];
  const inDevDependencies = !!pkgJson.content.devDependencies?.[name];
  const inPeerDependencies = !!pkgJson.content.peerDependencies?.[name];

  return inDependencies || inDevDependencies || inPeerDependencies;
}
