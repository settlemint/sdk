import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadSettleMintConfig } from "@/common/config/loader";
import { type Config, ConfigSchema } from "@/common/config/schemas";
import { findProjectRoot } from "@/common/path";
import { merge } from "ts-deepmerge";

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
