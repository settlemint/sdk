import { getPackageManager } from "./get-package-manager.js";

export async function getPackageManagerExecutable(targetDir?: string): Promise<{ command: string; args: string[] }> {
  const packageManager = await getPackageManager(targetDir ?? process.cwd());

  switch (packageManager) {
    case "pnpm":
      return { command: "pnpm", args: ["dlx"] };
    case "bun":
      return { command: "bunx", args: [] };
  }

  // Default to npm
  return { command: "npx", args: [] };
}
