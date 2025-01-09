import select from "@inquirer/select";
import type { PlatformConfig } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils";

/**
 * Prompts the user to select a deployment region or validates a provided one
 *
 * @param provider - The selected provider configuration
 * @param argument - Optional pre-selected region
 * @returns The selected region configuration
 * @throws {Error} If no regions are available or if provided argument is invalid
 */
export async function regionPrompt(
  provider: PlatformConfig["deploymentEngineTargets"][number],
  argument?: string,
): Promise<PlatformConfig["deploymentEngineTargets"][number]["clusters"][number] | undefined> {
  const possibleRegions = provider.clusters
    .filter((cluster) => !cluster.disabled)
    .map((cluster) => ({ ...cluster, id: getRegionId(cluster.id) }));
  if (possibleRegions.length === 0) {
    cancel("No regions found");
  }

  if (argument) {
    const selectedRegion = possibleRegions.find((cluster) => cluster.id === argument);
    if (!selectedRegion) {
      cancel(
        `No region found with id '${argument}'. Possible regions: '${possibleRegions.map((cluster) => cluster.id).join(", ")}'`,
      );
    }
    return selectedRegion;
  }

  if (possibleRegions.length === 1) {
    return possibleRegions[0];
  }

  const region = await select({
    message: "Which region do you want to use?",
    choices: provider.clusters.map((cluster) => ({
      name: cluster.name,
      value: cluster.id,
    })),
  });

  return provider.clusters.find((cluster) => cluster.id === region);
}

/**
 * Extracts the region name from a region ID by removing the provider prefix
 *
 * @param regionId - The full region ID (e.g. 'gke-europe')
 * @returns The region name without the provider prefix (e.g. 'europe')
 */
function getRegionId(regionId: string) {
  return regionId.split("-")[1];
}
