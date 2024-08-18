import { lilconfigSync } from "lilconfig";
import { z } from "zod";

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
 * Extended schema combining ConfigSchema with additional fields
 */
const ConfigEnvSchema = ConfigSchema.extend({
  pat: z.string(),
  appUrl: z.string().url().optional(),
  hasuraAdminSecret: z.string().optional(),
});

const ApplicationConfigEnvSchema = ApplicationConfigSchema.extend({
  pat: z.string(),
  appUrl: z.string().url().optional(),
  hasuraAdminSecret: z.string().optional(),
});

// Infer types from the schemas
type ConfigEnv = z.infer<typeof ConfigEnvSchema>;
type ApplicationConfigEnv = z.infer<typeof ApplicationConfigEnvSchema>;
type Config = z.infer<typeof ConfigSchema>;

/**
 * Retrieves and parses the configuration, combining it with environment variables
 * @returns A promise that resolves to the parsed configuration or undefined if not found
 */
export function config(): ConfigEnv | undefined {
  const config = parseConfig();
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

export function applicationConfig(): ApplicationConfigEnv {
  const cfg = config();
  if (!cfg) {
    throw new Error("No configuration found, please run settlemint connect");
  }

  const applications = cfg.applications ?? {};

  const env = process.env.SETTLEMINT_APPLICATION ?? cfg?.defaultApplication.id;
  if (!env || Object.keys(applications).length === 0) {
    throw new Error(
      "No environment found, either set SETTLEMINT_APPLICATION or define a default environment in your .settlemintrc.json file",
    );
  }

  const envConf = applications[env];
  if (!envConf) {
    throw new Error(`No application found for ${env}, please run \`settlemint connect\``);
  }

  return ApplicationConfigEnvSchema.parse({
    ...envConf,
    pat: cfg.pat,
    appUrl: cfg.appUrl,
    hasuraAdminSecret: cfg.hasuraAdminSecret,
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
function parseConfig(): Config | undefined {
  // Initialize lilconfig explorer
  const explorer = lilconfigSync("settlemint");
  // Search for configuration
  const result = explorer.search();

  // If no configuration is found, return undefined
  if (!result) {
    return undefined;
  }
  // Attempt to parse and validate the configuration
  return ConfigSchema.parse(result.config);
}
