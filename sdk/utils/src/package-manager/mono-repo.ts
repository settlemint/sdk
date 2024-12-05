import { exists, readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function getMonorepoWorkspaces() {
  const packageJsonPath = resolve(process.cwd(), "package.json");
  if (await exists(packageJsonPath)) {
    const packageJson = await readFile(packageJsonPath, "utf8");
    try {
      const json = JSON.parse(packageJson);
      return (json.workspaces as string[]) ?? [];
    } catch (error) {
      return [];
    }
  }
  return [];
}

export async function isMonorepo() {
  const workspaces = await getMonorepoWorkspaces();
  return Array.isArray(workspaces) && workspaces.length > 0;
}

export async function getMonorepoApps() {
  const workspaces = await getMonorepoWorkspaces();
  return workspaces.filter((workspace) => workspace.includes("dapp"));
}
