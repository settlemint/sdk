import select from "@inquirer/select";
import type { PlatformConfig } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils";

/**
 * Prompts the user to select a deployment provider or validates a provided one
 *
 * @param platformConfig - The platform configuration
 * @param argument - Optional pre-selected provider
 * @returns The selected provider identifier
 * @throws {Error} If no providers are available or if provided argument is invalid
 */
export async function providerPrompt(
  platformConfig: PlatformConfig,
  argument?: string,
): Promise<PlatformConfig["deploymentEngineTargets"][number] | undefined> {
  const possibleProviders = platformConfig.deploymentEngineTargets.filter((target) => !target.disabled);
  if (possibleProviders.length === 0) {
    cancel("No providers found");
  }

  if (argument) {
    const selectedProvider = platformConfig.deploymentEngineTargets.find((target) => target.id === argument);
    if (!selectedProvider) {
      cancel(
        `No provider found with id '${argument}'. Possible providers: '${possibleProviders
          .map((target) => target.id)
          .sort()
          .join(", ")}'`,
      );
    }
    return selectedProvider;
  }

  if (possibleProviders.length === 1) {
    return possibleProviders[0];
  }

  const provider = await select({
    message: "Which provider do you want to use?",
    choices: platformConfig.deploymentEngineTargets.map((target) => ({
      name: target.name,
      value: target.id,
    })),
  });

  return platformConfig.deploymentEngineTargets.find((target) => target.id === provider);
}
