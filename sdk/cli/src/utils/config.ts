import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { type DotEnv, tryParseJson } from "@settlemint/sdk-utils";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { cancel } from "@settlemint/sdk-utils/terminal";

const CONFIG_DIR = join(homedir(), ".config", "settlemint");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

interface InstanceConfig {
  personalAccessToken: string;
  lastUsed: string; // ISO date string
}

interface Config {
  instances: Record<string, InstanceConfig>;
  defaultInstance?: string;
}

/**
 * Ensures the config directory exists
 */
async function ensureConfigDir(): Promise<void> {
  if (!(await exists(CONFIG_DIR))) {
    await mkdir(CONFIG_DIR, { recursive: true });
  }
}

/**
 * Reads the config file
 */
export async function readConfig(): Promise<Config> {
  await ensureConfigDir();

  try {
    const content = await readFile(CONFIG_FILE, "utf-8");
    return tryParseJson<Config>(content, { instances: {} })!;
  } catch (error) {
    return { instances: {} };
  }
}

/**
 * Writes to the config file
 */
export async function writeConfig(config: Config): Promise<void> {
  await ensureConfigDir();
  await writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
}

/**
 * Stores credentials for a specific instance
 */
export async function storeCredentials(token: string, instance: string): Promise<void> {
  const config = await readConfig();

  // Initialize instances if it doesn't exist
  if (!config.instances) {
    config.instances = {};
  }

  // Store the instance config with token
  config.instances[instance] = {
    personalAccessToken: token,
    lastUsed: new Date().toISOString(),
  };

  // If this is the first instance or there's no default, set it as default
  if (!config.defaultInstance || Object.keys(config.instances).length === 1) {
    config.defaultInstance = instance;
  }

  await writeConfig(config);
}

/**
 * Gets credentials for a specific instance
 */
export async function getInstanceCredentials(
  instance: string,
  env?: Partial<DotEnv>,
): Promise<{ personalAccessToken: string } | undefined> {
  const config = await readConfig();
  const instanceConfig = config.instances[instance];

  if (!instanceConfig) {
    cancel(
      `No configuration found for instance '${instance}'${
        Object.keys(config.instances).length > 0
          ? `\nConfigured instances:\n${Object.keys(config.instances)
              .map((i) => `- '${i}'`)
              .join("\n")}`
          : ""
      }`,
    );
  }

  return { personalAccessToken: instanceConfig.personalAccessToken };
}

/**
 * Gets all configured instances
 */
export async function getInstances(): Promise<string[]> {
  const config = await readConfig();
  return Object.keys(config.instances);
}

/**
 * Gets the default instance if one is set
 */
export async function getDefaultInstance(): Promise<string | undefined> {
  const config = await readConfig();
  return config.defaultInstance;
}

/**
 * Sets the default instance
 */
export async function setDefaultInstance(instance: string): Promise<void> {
  const config = await readConfig();
  if (!config.instances[instance]) {
    throw new Error(`Instance ${instance} is not configured`);
  }
  config.defaultInstance = instance;
  await writeConfig(config);
}

/**
 * Removes credentials for a specific instance
 */
export async function removeCredentials(instance: string): Promise<void> {
  const config = await readConfig();

  // Remove from config file
  delete config.instances[instance];

  // If this was the default instance, clear it
  if (config.defaultInstance === instance) {
    config.defaultInstance = undefined;
  }

  await writeConfig(config);
}
