import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { exists } from "@/filesystem.js";
import { tryParseJson } from "@/json.js";
import { findUp } from "find-up";
import { glob } from "glob";

/**
 * Finds the root directory of a monorepo
 *
 * @param startDir - The directory to start searching from
 * @returns The root directory of the monorepo or null if not found
 * @example
 * import { findMonoRepoRoot } from "@settlemint/sdk-utils/filesystem";
 *
 * const root = await findMonoRepoRoot("/path/to/your/project");
 * console.log(root); // Output: /path/to/your/project/packages/core
 */
export async function findMonoRepoRoot(startDir: string): Promise<string | null> {
  const lockFilePath = await findUp(["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb", "bun.lock"], {
    cwd: startDir,
  });
  if (lockFilePath) {
    const packageJsonPath = join(dirname(lockFilePath), "package.json");
    const hasWorkSpaces = await packageJsonHasWorkspaces(packageJsonPath);
    return hasWorkSpaces ? dirname(lockFilePath) : null;
  }

  let currentDir = startDir;

  while (currentDir !== "/") {
    const packageJsonPath = join(currentDir, "package.json");

    if (await packageJsonHasWorkspaces(packageJsonPath)) {
      return currentDir;
    }

    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      break; // We've reached the root
    }
    currentDir = parentDir;
  }

  return null;
}

/**
 * Finds all packages in a monorepo
 *
 * @param projectDir - The directory to start searching from
 * @returns An array of package directories
 * @example
 * import { findMonoRepoPackages } from "@settlemint/sdk-utils/filesystem";
 *
 * const packages = await findMonoRepoPackages("/path/to/your/project");
 * console.log(packages); // Output: ["/path/to/your/project/packages/core", "/path/to/your/project/packages/ui"]
 */
export async function findMonoRepoPackages(projectDir: string): Promise<string[]> {
  try {
    const monoRepoRoot = await findMonoRepoRoot(projectDir);
    if (!monoRepoRoot) {
      return [projectDir];
    }

    const packageJsonPath = join(monoRepoRoot, "package.json");
    const packageJson = tryParseJson<{ workspaces: string[] }>(await readFile(packageJsonPath, "utf-8"));
    const workspaces = packageJson?.workspaces ?? [];

    const packagePaths = await Promise.all(
      workspaces.map(async (workspace: string) => {
        const matches = await glob(join(monoRepoRoot, workspace, "package.json"));
        return matches.map((match) => join(match, ".."));
      }),
    );

    const allPaths = packagePaths.flat();
    // If no packages found in workspaces, treat as non-monorepo
    return allPaths.length === 0 ? [projectDir] : [monoRepoRoot, ...allPaths];
  } catch (_error) {
    // If any error occurs, treat as non-monorepo
    return [projectDir];
  }
}

async function packageJsonHasWorkspaces(packageJsonPath: string): Promise<boolean> {
  if (await exists(packageJsonPath)) {
    const packageJson = tryParseJson<{ workspaces: string[] }>(await readFile(packageJsonPath, "utf-8"));
    if (packageJson?.workspaces && Array.isArray(packageJson?.workspaces) && packageJson?.workspaces.length > 0) {
      return true;
    }
  }
  return false;
}
