import { instancePrompt } from "@/prompts/instance.prompt";
import { getRegionId } from "@/utils/cluster-region";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { getStarterkits, getUseCases } from "@/utils/platform-utils";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, list, outro } from "@settlemint/sdk-utils/terminal";
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

      list("Templates (Starterkits)", starterkits.map((starterkit) => starterkit.id).sort());

      list("Use cases (Smart Contract Sets)", useCases.map((useCase) => useCase.id).sort());

      list(
        "Providers and regions",
        platformConfig.deploymentEngineTargets
          .filter((provider) => !provider.disabled)
          .sort((a, b) => a.id.localeCompare(b.id))
          .reduce<Array<string | string[]>>((acc, provider) => {
            acc.push(provider.id);
            acc.push(
              provider.clusters
                .filter((cluster) => !cluster.disabled)
                .map((region) => getRegionId(region.id))
                .sort(),
            );
            return acc;
          }, []),
      );

      list("Pre-deployed abis (Smart Contract Portal)", platformConfig.preDeployedContracts.sort());

      outro("Platform configuration retrieved");
    });
}
