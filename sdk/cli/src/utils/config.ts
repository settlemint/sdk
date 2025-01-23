import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { tryParseJson } from "@settlemint/sdk-utils";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { cancel, list } from "@settlemint/sdk-utils/terminal";

const CONFIG_DIR = join(homedir(), ".config", "settlemint");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

interface InstanceConfig {
  personalAccessToken: string;
  lastUsed: string; // ISO date string
}

interface Config {
  instances: Record<string, InstanceConfig>;
  lastSdkVersionCheck?: string; // JSON date
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

  await writeConfig(config);
}

/**
 * Gets credentials for a specific instance
 */
export async function getInstanceCredentials(
  instance: string,
  throwOnMissingInstance = true,
): Promise<{ personalAccessToken: string } | undefined> {
  const config = await readConfig();
  const instanceConfig = config.instances[instance];

  if (!instanceConfig) {
    if (!throwOnMissingInstance) {
      return undefined;
    }

    if (Object.keys(config.instances).length > 0) {
      list("Configured instances", Object.keys(config.instances));
    }
    cancel(`No configuration found for instance '${instance}'`);
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
 * Removes credentials for a specific instance
 */
export async function removeCredentials(instance: string): Promise<void> {
  const config = await readConfig();

  // Remove from config file
  delete config.instances[instance];

  await writeConfig(config);
}

/**
 * Sets the last SDK version check date
 */
export async function setLastSdkVersionCheck(date: string): Promise<void> {
  const config = await readConfig();
  config.lastSdkVersionCheck = date;
  await writeConfig(config);
}
