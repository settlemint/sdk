import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectRoot } from "@/filesystem.js";
import type { DotEnv } from "@/validation.js";
import { config } from "@dotenvx/dotenvx";
import { deepmerge } from "deepmerge-ts";

export async function writeEnv(env: Partial<DotEnv>, secrets: boolean) {
  const projectDir = await projectRoot();
  const envFile = join(
    projectDir,
    secrets ? `.env.${env.SETTLEMINT_ENVIRONMENT}.local` : `.env.${env.SETTLEMINT_ENVIRONMENT}`,
  );

  let { parsed: currentEnv } = config({
    path: envFile,
    logLevel: "error",
  });

  if (!currentEnv) {
    currentEnv = {};
  }

  const mergedEnv = deepmerge(currentEnv, env);

  writeFileSync(envFile, stringify(mergedEnv));
}

const quote = /[\s"'#]/;

function stringifyPair([key, val]: [string, unknown]): string {
  if (!val) return `${key}=""`;

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
    .join("\n");
}
