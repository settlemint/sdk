import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { config as dotEnvConfig, parse } from "dotenv";
import { merge } from "ts-deepmerge";
import { loadSettleMintConfig } from "./loader";
import { findProjectRoot } from "./path";
import { type Config, ConfigSchema, type Env, EnvSchema } from "./schemas";

export async function createConfig(config: Partial<Config>): Promise<void> {
  const defaultConfig: Partial<Config> = {};
  const preConfiguredConfig = merge(defaultConfig, config);
  const existingConfig = await loadSettleMintConfig();
  const mergedConfig = existingConfig ? merge(existingConfig, preConfiguredConfig) : preConfiguredConfig;
  const validatedMergedConfig = ConfigSchema.parse(mergedConfig);

  const projectRoot = findProjectRoot(process.cwd());
  const configPath = join(projectRoot, "settlemint.config.mjs");

  const configContent = `export default ${JSON.stringify(validatedMergedConfig, null, 2)};`;
  writeFileSync(configPath, configContent);
}

export async function createEnv(env: Partial<Env>) {
  const projectRoot = findProjectRoot(process.cwd());
  const envPath = join(projectRoot, ".env.local");

  let dotEnv: Partial<Env> = {};
  try {
    const parsedEnv = parse(readFileSync(envPath, "utf-8"));
    const partialEnvSchema = EnvSchema.partial();
    dotEnv = partialEnvSchema.parse(parsedEnv);
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

const escapeNewlines = (str: string) => str.replace(/\n/g, "\\n");

const format = (key: string, value: string) => `${key}=${escapeNewlines(value)}`;
