import { getPackageManager } from "./get-package-manager.js";

/**
 * Retrieves the executable command and arguments for the package manager
 *
 * @param targetDir - The directory to check for package manager (optional, defaults to process.cwd())
 * @returns An object containing the command and arguments for the package manager
 * @example
 * import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
 *
 * const { command, args } = await getPackageManagerExecutable();
 * console.log(`Using ${command} with args: ${args.join(" ")}`);
 */
export async function getPackageManagerExecutable(targetDir?: string): Promise<{ command: string; args: string[] }> {
  const packageManager = await getPackageManager(targetDir ?? process.cwd());

  switch (packageManager) {
    case "pnpm":
      return { command: "pnpm", args: ["dlx"] };
    case "bun":
      return { command: "bunx", args: [] };
    case "yarn":
      return { command: "yarn", args: ["create"] };
  }

  // Default to npm
  return { command: "npx", args: [] };
}
