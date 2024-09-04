import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type Env, EnvSchema } from "@/common/config/schemas";
import { findProjectRoot } from "@/common/path";
import { config as dotEnvConfig, parse } from "dotenv";
import { merge } from "ts-deepmerge";

export async function createEnv(env: Partial<Env>) {
  const projectRoot = findProjectRoot(process.cwd());
  const envPath = join(projectRoot, ".env.local");

  let dotEnv: Partial<Env> = {};
  try {
    const parsedEnv = parse(readFileSync(envPath, "utf-8"));
    dotEnv = EnvSchema.partial().parse(parsedEnv);
  } catch (e) {
    // Ignore if file does not exist or is invalid
  }

  const mergedEnv = merge(dotEnv, env);
  const validatedMergedEnv = EnvSchema.parse(mergedEnv);
  const contents = Object.entries(validatedMergedEnv)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => format(key, value))
    .join("\n");
  writeFileSync(envPath, contents);

  dotEnvConfig({
    path: [".env.local", ".env"],
    override: true,
  });
}

export const escapeNewlines = (str: string) => str.replace(/\n/g, "\\n");

export const format = (key: string, value: string) => `${key}=${escapeNewlines(value)}`;
