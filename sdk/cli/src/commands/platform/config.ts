import { instancePrompt } from "@/commands/connect/instance.prompt";
import { getRegionId } from "@/commands/platform/utils/cluster-region";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
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
    .action(async ({ prod }) => {
      intro("Getting platform configuration");

      const env: Partial<DotEnv> = await loadEnv(false, !!prod);
      const instance = await instancePrompt(env, true);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance,
        prefer: "personal",
      });
      const settlemint = createSettleMintClient({
        accessToken,
        instance,
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
