import { instancePrompt } from "@/prompts/instance.prompt";
import { getRegionId } from "@/utils/cluster-region";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { getStarterkits, getUseCases } from "@/utils/platform-utils";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, list, outro, table } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'config' command for the SettleMint SDK.
 * This command outputs the current platform configuration.
 */
export function configCommand() {
  return new Command("config")
    .alias("c")
    .description("Get platform configuration")
    .option("--prod", "Connect to your production environment")
    .option("-i, --instance <instance>", "The instance to connect to (defaults to the instance in the .env file)")
    .action(async ({ prod, instance }) => {
      intro("Getting platform configuration");

      const env: Partial<DotEnv> = await loadEnv(false, !!prod);
      const selectedInstance = instance ? sanitizeAndValidateInstanceUrl(instance) : await instancePrompt(env, true);
      const settlemint = createSettleMintClient({
        accessToken: "",
        instance: selectedInstance,
        anonymous: true,
      });

      const platformConfig = await settlemint.platform.config();
      const useCases = getUseCases(platformConfig);
      const starterkits = getStarterkits(platformConfig);

      table(
        "Templates (Starterkits)",
        starterkits
          .map((starterkit) => ({
            id: starterkit.id,
            name: starterkit.name,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      );

      table(
        "Use cases (Smart Contract Sets)",
        useCases
          .map((useCase) => ({
            id: useCase.id,
            name: useCase.name,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      );

      table(
        "Providers and regions",
        platformConfig.deploymentEngineTargets
          .filter((provider) => !provider.disabled)
          .flatMap((provider) =>
            provider.clusters
              .filter((cluster) => !cluster.disabled)
              .map((region) => ({
                providerId: provider.id,
                regionId: getRegionId(region.id),
                providerName: provider.name,
                regionName: region.name,
              })),
          )
          .sort((a, b) => a.providerId.localeCompare(b.providerId) || a.regionId.localeCompare(b.regionId)),
      );

      list("Pre-deployed abis (Smart Contract Portal)", platformConfig.preDeployedContracts.sort());

      outro("Platform configuration retrieved");
    });
}
