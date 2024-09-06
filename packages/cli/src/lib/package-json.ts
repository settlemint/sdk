import pkgjs from "@npmcli/package-json";
import { findProjectRoot } from "@settlemint/sdk-config/path";

/**
 * Sets the name field in the package.json file.
 * @param name - The new name to set in the package.json file.
 * @param path - Optional path to the project root. If not provided, it will be determined automatically.
 * @throws {Error} If there's an issue reading, updating, or saving the package.json file.
 *
 * @example
 * ```typescript
 * await setName("my-new-project-name");
 * ```
 */
export async function setName(name: string, path?: string) {
  // Read the package.json file
  const pkgJson = await pkgjs.load(path ?? findProjectRoot(process.cwd()));

  pkgJson.update({
    name,
  });

  await pkgJson.save();
}
