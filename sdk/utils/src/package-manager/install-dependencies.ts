import { installPackage } from "@antfu/install-pkg";

/**
 * Installs one or more packages as dependencies using the detected package manager
 *
 * @param pkgs - A single package name or array of package names to install
 * @param cwd - The directory to run the installation in
 * @returns A promise that resolves when installation is complete
 * @throws If package installation fails
 * @example
 * import { installDependencies } from "@settlemint/sdk-utils";
 *
 * // Install a single package
 * await installDependencies("express");
 *
 * // Install multiple packages
 * await installDependencies(["express", "cors"]);
 */
export async function installDependencies(pkgs: string | string[], cwd?: string) {
  await installPackage(pkgs, { silent: true, additionalArgs: ["--exact"], cwd });
}
