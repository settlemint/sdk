import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { exists, projectRoot } from "@/filesystem.js";
import type { DotEnv } from "@/validation.js";
import { DotEnvSchema } from "@/validation/dot-env.schema.js";
import { config } from "@dotenvx/dotenvx";
import { deepmerge } from "deepmerge-ts";
import { findMonoRepoPackages } from "../filesystem/mono-repo.js";

/**
 * Writes environment variables to .env files across a project or monorepo
 *
 * @param options - The options for writing the environment variables
 * @param options.prod - Whether to write production environment variables
 * @param options.env - The environment variables to write
 * @param options.secrets - Whether to write to .env.local files for secrets
 * @param options.cwd - The directory to start searching for the package.json file from (defaults to process.cwd())
 * @returns Promise that resolves when writing is complete
 * @throws Will throw an error if writing fails
 * @example
 * import { writeEnv } from '@settlemint/sdk-utils/environment';
 *
 * // Write development environment variables
 * await writeEnv(false, {
 *   SETTLEMINT_INSTANCE: 'https://dev.example.com'
 * }, false);
 *
 * // Write production secrets
 * await writeEnv(true, {
 *   SETTLEMINT_ACCESS_TOKEN: 'secret-token'
 * }, true);
 */
export async function writeEnv({
  prod,
  env,
  secrets,
  cwd,
}: {
  prod: boolean;
  env: Partial<DotEnv>;
  secrets: boolean;
  cwd?: string;
}): Promise<void> {
  const projectDir = await projectRoot(true, cwd);

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

      const mergedEnv = deepmerge(pruneCurrentEnv(currentEnv, env), env);
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

/**
 * Prunes the current environment variables from the new environment variables
 *
 * @param currentEnv - The current environment variables
 * @param env - The new environment variables
 * @returns The new environment variables with the current environment variables removed
 */
function pruneCurrentEnv(currentEnv: Record<string, unknown>, env: Partial<DotEnv>): Record<string, unknown> {
  const dotEnvKeys = Object.keys(DotEnvSchema.shape);
  return Object.fromEntries(
    Object.entries(currentEnv).filter(([key]) => {
      if (dotEnvKeys.includes(key) && !env[key as keyof typeof env]) {
        return false;
      }
      return true;
    }),
  );
}
