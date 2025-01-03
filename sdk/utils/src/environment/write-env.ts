import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { exists, projectRoot } from "@/filesystem.js";
import { tryParseJson } from "@/json.js";
import type { DotEnv } from "@/validation.js";
import { config } from "@dotenvx/dotenvx";
import { deepmerge } from "deepmerge-ts";
import { glob } from "glob";

async function findMonoRepoRoot(startDir: string): Promise<string | null> {
  let currentDir = startDir;

  while (currentDir !== "/") {
    const packageJsonPath = join(currentDir, "package.json");

    if (await exists(packageJsonPath)) {
      const packageJson = tryParseJson<{ workspaces: string[] }>(await readFile(packageJsonPath, "utf-8"));
      if (packageJson?.workspaces && Array.isArray(packageJson?.workspaces) && packageJson?.workspaces.length > 0) {
        return currentDir;
      }
    }

    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      break; // We've reached the root
    }
    currentDir = parentDir;
  }

  return null;
}

async function findMonoRepoPackages(projectDir: string): Promise<string[]> {
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
  } catch (error) {
    // If any error occurs, treat as non-monorepo
    return [projectDir];
  }
}

export async function writeEnv(prod: boolean, env: Partial<DotEnv>, secrets: boolean): Promise<void> {
  const projectDir = await projectRoot();

  if (prod) {
    process.env.NODE_ENV = "production";
  }

  const targetDirs = await findMonoRepoPackages(projectDir);

  await Promise.all(
    targetDirs.map(async (dir) => {
      const envFile = join(
        dir,
        secrets ? `.env${prod ? ".production" : ""}.local` : `.env${prod ? ".production" : ""}`,
      );

      let { parsed: currentEnv } = (await exists(envFile))
        ? config({
            path: envFile,
            logLevel: "error",
            quiet: true,
          })
        : { parsed: {} };

      if (!currentEnv) {
        currentEnv = {};
      }

      const mergedEnv = deepmerge(currentEnv, env);
      await writeFile(envFile, stringify(mergedEnv));
    }),
  );
}

const quote = /[\s"'#]/;

function stringifyPair([key, val]: [string, unknown]): string | undefined {
  if (val === undefined) {
    return undefined;
  }
  if (val === null) {
    return `${key}=""`;
  }

  const type = typeof val;
  if (type === "string") {
    return `${key}=${quote.test(val as string) ? JSON.stringify(val) : val}`;
  }
  if (type === "boolean" || type === "number") {
    return `${key}=${val}`;
  }
  if (type === "object") {
    return `${key}=${JSON.stringify(val)}`;
  }

  throw new Error(`Unsupported type for key "${key}": ${type}`);
}

function stringify(obj: Record<string, unknown>): string {
  return Object.entries(obj)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(stringifyPair)
    .filter((value) => value !== undefined)
    .join("\n");
}
