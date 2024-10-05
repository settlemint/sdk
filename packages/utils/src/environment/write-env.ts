import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectRoot } from "@/filesystem.js";
import type { DotEnv } from "@/validation.js";
import { deepmerge } from "deepmerge-ts";
import { loadEnvironmentEnv } from "./load-env.js";

export async function writeEnv(env: DotEnv, environment: string) {
  const projectDir = await projectRoot();

  const currentEnv = await loadEnvironmentEnv(false, environment);
  const mergedEnv = deepmerge(currentEnv, env);

  const envFile = join(projectDir, `.env.${environment}`);
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
