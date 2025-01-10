import { instancePrompt } from "@/commands/connect/instance.prompt";
import { getRegionId } from "@/commands/platform/utils/cluster-region";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { type DotEnv, note } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro } from "@settlemint/sdk-utils/terminal";

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
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance: selectedInstance,
        prefer: "personal",
      });
      const settlemint = createSettleMintClient({
        accessToken,
        instance: selectedInstance,
      });

      const platformConfig = await settlemint.platform.config();

      note(
        `Providers and regions:\n${platformConfig.deploymentEngineTargets
          .filter((provider) => !provider.disabled)
          .map(
            (provider) =>
              `• ${provider.id}\n  ${provider.clusters
                .filter((cluster) => !cluster.disabled)
                .map((region) => `• ${getRegionId(region.id)}`)
                .sort()
                .join("\n  ")}`,
          )
          .sort()
          .join("\n")}`,
      );

      note(
        `Use cases (Smart Contract Sets):\n• ${platformConfig.smartContractSets.sets
          .filter((useCase) => !useCase.featureflagged)
          .map((useCase) => useCase.id)
          .sort()
          .join("\n• ")}`,
      );

      note(`Pre-deployed abis (Smart Contract Portal):\n• ${platformConfig.preDeployedContracts.sort().join("\n• ")}`);

      outro("Platform configuration retrieved");
    });
}
