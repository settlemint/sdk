import type { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { note } from "@settlemint/sdk-utils/terminal";
import * as semver from "semver";
import pkg from "../../package.json";
import { readConfig, setLastSdkVersionCheck } from "./config";

/**
 * Validates the SDK version against the platform's supported version
 *
 * @param command - The command to validate the SDK version against
 * @param interval - The interval in milliseconds to validate the SDK version
 */
export async function validateSdkVersionFromCommand(
  command: Command,
  interval: number = 5 * 60 * 1000 /* 5 minutes */,
) {
  // Check if we've validated since the last interval
  const now = Date.now();

  const config = await readConfig();
  const lastSdkValidation = config.lastSdkVersionCheck ? new Date(config.lastSdkVersionCheck).getTime() : 0;
  if (now - lastSdkValidation <= interval) {
    return;
  }

  await setLastSdkVersionCheck(new Date(now).toJSON());
  const instance = await getInstanceFromCommand(command);
  await validateSdkVersion(instance);
}

/**
 * Validates that the SDK version matches the platform's supported version
 *
 * @param instance - The instance URL to connect to
 * @throws {Error} If the SDK version is incompatible with the platform
 */
export async function validateSdkVersion(instance: string) {
  const settlemint = createSettleMintClient({
    instance,
    accessToken: "",
    anonymous: true,
  });

  const platformConfig = await settlemint.platform.config();
  const currentVersion = pkg.version;

  if (semver.gt(currentVersion, platformConfig.sdkVersion)) {
    note(
      `SDK CLI version mismatch. The platform requires version '${platformConfig.sdkVersion}' but you are using a newer version '${currentVersion}'. This might lead to compatibility issues with the platform.`,
      "warn",
    );
  }
  if (semver.lt(currentVersion, platformConfig.sdkVersion)) {
    note(
      `A newer version of the SDK CLI is available (${platformConfig.sdkVersion}). Please update your SDK CLI to ensure compatibility with the platform.`,
      "warn",
    );
  }
}

async function getInstanceFromCommand(command: Command): Promise<string> {
  const options = command.opts() as { instance?: string; prod?: boolean };
  if (options.instance) {
    return options.instance;
  }
  const env = await loadEnv(false, options.prod ?? false);
  return env.SETTLEMINT_INSTANCE ?? "https://console.settlemint.com";
}
