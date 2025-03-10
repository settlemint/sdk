import { installPackage } from "@antfu/install-pkg";
import { note } from "../terminal.js";

/**
 * Installs one or more packages as dependencies using the detected package manager
 *
 * @param pkgs - A single package name or array of package names to install
 * @param cwd - The directory to run the installation in
 * @returns A promise that resolves when installation is complete
 * @throws If package installation fails
 * @example
 * import { installDependencies } from "@settlemint/sdk-utils/package-manager";
 *
 * // Install a single package
 * await installDependencies("express");
 *
 * // Install multiple packages
 * await installDependencies(["express", "cors"]);
 */
export async function installDependencies(pkgs: string | string[], cwd?: string) {
  try {
    await installPackage(pkgs, { silent: true, additionalArgs: ["--exact"], cwd });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    note(
      `Failed to install ${Array.isArray(pkgs) ? `dependencies '${pkgs.join(", ")}'` : `dependency '${pkgs}'`}: ${error}`,
      "warn",
    );
  }
}
