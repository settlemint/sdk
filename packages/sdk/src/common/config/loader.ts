import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ApplicationConfig, Env } from "@/common/config/schemas";
import { type Config, ConfigSchema, EnvSchema } from "./schemas";

export async function loadSettleMintApplicationConfig(application?: string): Promise<ApplicationConfig | undefined> {
  const config = await loadSettleMintConfig();
  const activeApplication = application ?? process.env.SETTLEMINT_APPLICATION ?? config?.defaultApplication?.id;
  const activeApplicationConfig: ApplicationConfig | undefined = config?.applications?.[activeApplication as string];
  return activeApplicationConfig;
}

export async function loadSettleMintConfig(): Promise<Config | undefined> {
  const currentDir = process.cwd();
  const configPath = join(currentDir, "settlemint.config.mjs");
  if (existsSync(configPath)) {
    try {
      const configUrl = `file://${configPath}`;
      const config = await import(configUrl);
      return ConfigSchema.parse(config.default || config);
    } catch (error) {
      return undefined;
    }
  }
  return undefined;
}

export function loadSettleMintEnvironmentConfig(): Env {
  return EnvSchema.parse(process.env);
}

export function loadSettleMintPartialEnvironmentConfig(): Partial<Env> {
  return EnvSchema.partial().parse(process.env);
}
