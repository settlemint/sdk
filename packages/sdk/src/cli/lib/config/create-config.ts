import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { type Config, ConfigSchema } from "@/common/config/schemas";
import { findProjectRoot } from "@/common/path";
import { merge } from "ts-deepmerge";
import { readSettlemintConfig } from "./read-config";

export async function createConfig(config: Partial<Config>): Promise<void> {
  const defaultConfig: Partial<Config> = {};
  const preConfiguredConfig = merge(defaultConfig, config);
  const existingConfig = readSettlemintConfig();
  const mergedConfig = existingConfig ? merge(existingConfig, preConfiguredConfig) : preConfiguredConfig;
  const validatedMergedConfig = ConfigSchema.parse(mergedConfig);

  const projectRoot = findProjectRoot(process.cwd());
  const configPath = join(projectRoot, ".settlemintrc.json");
  writeFileSync(configPath, JSON.stringify(validatedMergedConfig, null, 2));
}
