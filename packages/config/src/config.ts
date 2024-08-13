import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { cosmiconfig } from "cosmiconfig";
import dotenv from "dotenv";
import { merge } from "ts-deepmerge";
import { z } from "zod";
import { findProjectRoot } from "./path.js";

/**
 * Schema for environment-specific configuration
 */
const ApplicationConfigSchema = z.object({
  application: z.object({
    id: z.string(),
    displayName: z.string(),
  }),
  portalGql: z.string().url().optional(),
  portalRest: z.string().url().optional(),
  thegraphGql: z.string().url().optional(),
  hasuraGql: z.string().url().optional(),
  nodeJsonRpc: z.string().url().optional(),
});

/**
 * Schema for the main configuration object
 */
const ConfigSchema = z.object({
  framework: z.string(),
  instance: z.string().url(),
  workspace: z.object({
    id: z.string(),
    displayName: z.string(),
  }),
  childWorkspace: z
    .object({
      id: z.string(),
      displayName: z.string(),
    })
    .optional(),
  defaultApplication: z.object({
    id: z.string(),
    displayName: z.string(),
  }),
  applications: z.record(z.string(), ApplicationConfigSchema).optional(),
});

/**
 * Schema for environment variables
 */
const EnvSchema = z.object({
  SETTLEMINT_PAT_TOKEN: z.string(),
  SETTLEMINT_HASURA_GQL_ADMIN_SECRET: z.string().optional(),
  NEXT_PUBLIC_SETTLEMINT_APP_URL: z.string().url().optional(),
});

/**
 * Extended schema combining ConfigSchema with additional fields
 */
const ConfigEnvSchema = ConfigSchema.extend({
  pat: z.string(),
  appUrl: z.string().url().optional(),
  hasuraAdminSecret: z.string().optional(),
});

// Infer types from the schemas
type Config = z.infer<typeof ConfigSchema>;
type Env = z.infer<typeof EnvSchema>;
export type ConfigEnv = z.infer<typeof ConfigEnvSchema>;

/**
 * Retrieves and parses the configuration, combining it with environment variables
 * @returns A promise that resolves to the parsed configuration or undefined if not found
 */
export async function config(): Promise<ConfigEnv | undefined> {
  const config = await parseConfig();
  // If no config is found, return undefined
  if (!config) {
    return undefined;
  }
  // Parse and return the config with additional environment variables
  return ConfigEnvSchema.parse({
    ...config,
    pat: process.env.SETTLEMINT_PAT_TOKEN,
    appUrl: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL,
    hasuraAdminSecret: process.env.SETTLEMINT_HASURA_GQL_ADMIN_SECRET,
  });
}

/**
 * Searches for and parses the configuration file
 * Supported file names and formats:
 * - 'package.json'
 * - '.settlemintrc' (various formats: .json, .yaml, .yml, .js, .ts, .mjs, .cjs)
 * - '.config/settlemintrc' (various formats: .json, .yaml, .yml, .js, .ts, .mjs, .cjs)
 * - 'settlemint.config' (formats: .js, .ts, .mjs, .cjs)
 * @returns A promise that resolves to the parsed Config or undefined if not found
 */
async function parseConfig(): Promise<Config | undefined> {
  // Initialize cosmiconfig explorer
  const explorer = cosmiconfig("settlemint");
  // Search for configuration
  const result = await explorer.search();

  // If no configuration is found, return undefined
  if (!result) {
    return undefined;
  }
  // Attempt to parse and validate the configuration
  return ConfigSchema.parse(result.config);
}

/**
 * Creates or updates the configuration file
 * @param config The configuration object to be saved
 */
export async function createConfig(config: Config): Promise<void> {
  // Define default configuration (empty object for now)
  const defaultConfig: Partial<Config> = {};

  // Merge provided config with default config
  const preConfiguredConfig = merge(defaultConfig, config);

  // Attempt to parse existing configuration
  const existingConfig = await parseConfig();

  // Merge existing config (if any) with the pre-configured config
  const mergedConfig = existingConfig ? merge(existingConfig, preConfiguredConfig) : preConfiguredConfig;
  // Validate the final merged config
  const validatedMergedConfig = ConfigSchema.parse(mergedConfig);

  // Find the project root directory
  const projectRoot = findProjectRoot(process.cwd());
  // Define the path for the new config file
  const configPath = path.join(projectRoot, ".settlemintrc.json");
  // Write the validated merged config to the file
  writeFileSync(configPath, JSON.stringify(validatedMergedConfig, null, 2));
}

/**
 * Escapes newlines in a string
 * @param str The string to escape
 * @returns The escaped string
 */
const escapeNewlines = (str: string) => str.replace(/\n/g, "\\n");

/**
 * Formats a key-value pair for .env file
 * @param key The environment variable name
 * @param value The environment variable value
 * @returns Formatted string for .env file
 */
const format = (key: string, value: string) => `${key}=${escapeNewlines(value)}`;

/**
 * Creates or updates the .env.local file with the provided environment variables
 * @param env The environment variables to be saved
 */
export async function createEnv(env: Env) {
  const projectRoot = findProjectRoot(process.cwd());
  const envPath = path.join(projectRoot, ".env.local");

  let dotEnv = {};
  try {
    // Attempt to parse existing .env.local file
    dotEnv = dotenv.parse(readFileSync(envPath, "utf-8"));
  } catch (e) {
    // Ignore if file does not exist or is invalid
  }

  // Merge existing env with new env
  const mergedEnv = merge(dotEnv, env);
  // Validate the merged env
  const validatedMergedEnv = EnvSchema.parse(mergedEnv);
  // Format the env variables
  const contents = Object.entries(validatedMergedEnv)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => format(key, value))
    .join("\n");
  // Write the formatted env variables to .env.local
  writeFileSync(envPath, contents);

  // Load the new environment variables
  dotenv.config({
    path: [".env.local", ".env"],
    override: true,
  });
}
