import { projectRoot } from "@/filesystem/project-root.js";
import pkgjs from "@npmcli/package-json";

/**
 * Sets the name field in the package.json file
 *
 * @param name - The new name to set in the package.json file
 * @param path - The path to the project root directory. If not provided, will be automatically determined
 * @returns A promise that resolves when the package.json has been updated
 * @throws If unable to read, update or save the package.json file
 * @example
 * import { setName } from "@settlemint/sdk-utils";
 *
 * await setName("my-new-project-name");
 */
export async function setName(name: string, path?: string) {
  // Read the package.json file
  const pkgJson = await pkgjs.load(path ?? (await projectRoot()));

  pkgJson.update({
    name,
  });

  await pkgJson.save();
}
