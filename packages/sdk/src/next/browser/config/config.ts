import {
  type BrowserApplicationConfigEnv,
  BrowserApplicationConfigEnvSchema,
  BrowserConfigEnvSchema,
  type Config,
} from "@/common/config/schemas";

/**
 * Retrieves and validates the active browser configuration.
 *
 * This function processes the initial configuration, validates it against the browser environment,
 * and returns a fully validated browser application configuration.
 *
 * @param config - The initial configuration object.
 * @returns The validated browser application configuration.
 * @throws {Error} If no application is found for the current environment.
 *
 * @example
 * ```typescript
 * const initialConfig = loadConfig();
 * const browserConfig = activeBrowserConfig(initialConfig);
 * console.log(browserConfig);
 * ```
 */
export function activeBrowserConfig(config: Config): BrowserApplicationConfigEnv {
  const cfg = parseBrowserConfig(config);
  const applications = cfg.applications ?? {};
  const env = getEnvironment(cfg);

  validateEnvironment(env, applications);

  const envConf = applications[env];
  if (!envConf) {
    throw new Error(`No application found for ${env}, please run \`settlemint connect\``);
  }

  return BrowserApplicationConfigEnvSchema.parse({
    ...envConf,
    appUrl: cfg.appUrl,
    walletConnectProjectId: cfg.walletConnectProjectId,
  });
}

/**
 * Parses and validates the browser configuration.
 *
 * This function takes the initial configuration and enhances it with environment-specific
 * variables before validating it against the BrowserConfigEnvSchema.
 *
 * @param config - The initial configuration object.
 * @returns The parsed and validated browser configuration.
 */
function parseBrowserConfig(config: Config) {
  return BrowserConfigEnvSchema.parse({
    ...config,
    appUrl: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  });
}

/**
 * Retrieves the current environment identifier.
 *
 * This function determines the current environment based on the SETTLEMINT_APPLICATION
 * environment variable or the default application specified in the configuration.
 *
 * @param cfg - The parsed browser configuration.
 * @returns The current environment identifier.
 */
function getEnvironment(cfg: ReturnType<typeof parseBrowserConfig>): string {
  return process.env.SETTLEMINT_APPLICATION ?? cfg.defaultApplication?.id ?? "";
}

/**
 * Validates the environment and application configuration.
 *
 * This function checks if a valid environment is specified and if there are any
 * configured applications. It throws an error if either condition is not met.
 *
 * @param env - The environment identifier.
 * @param applications - The applications configuration object.
 * @throws {Error} If no valid environment is found or no applications are configured.
 */
function validateEnvironment(env: string, applications: Record<string, unknown>): void {
  if (!env || Object.keys(applications).length === 0) {
    throw new Error(
      "No environment found, either set SETTLEMINT_APPLICATION or define a default environment in your .settlemintrc.json file",
    );
  }
}
