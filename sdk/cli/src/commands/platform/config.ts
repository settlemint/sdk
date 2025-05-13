import { instancePrompt } from "@/prompts/instance.prompt";
import { getRegionId } from "@/utils/cluster-region";
import { createExamples } from "@/utils/commands/create-examples";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { jsonOutput } from "@/utils/output/json-output";
import { yamlOutput } from "@/utils/output/yaml-output";
import { getKits, getUseCases } from "@/utils/platform-utils";
import { Command, Option } from "@commander-js/extra-typings";
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
    .alias("cfg")
    .description("Get platform configuration")
    .option("--prod", "Connect to your production environment")
    .option("-i, --instance <instance>", "The instance to connect to (defaults to the instance in the .env file)")
    .addOption(new Option("-o, --output <output>", "The output format").choices(["json", "yaml"]))
    .usage(
      createExamples([
        {
          description: "Get platform configuration",
          command: "config",
        },
        {
          description: "Get platform configuration in JSON format",
          command: "config -o json",
        },
        {
          description: "Get platform configuration in YAML format",
          command: "config -o yaml",
        },
      ]),
    )
    .action(async ({ prod, instance, output }) => {
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
      const kits = getKits(platformConfig);

      const platformConfigData = {
        useCases: useCases
          .map((useCase) => ({
            id: useCase.id,
            name: useCase.name,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
        kits: kits
          .map((kit) => ({
            id: kit.id,
            name: kit.name,
            description: kit.description,
            npmPackage: kit.npmPackageName,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
        deploymentEngineTargets: platformConfig.deploymentEngineTargets
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
        preDeployedAbis: platformConfig.preDeployedAbis.flatMap((abi) => abi.abis).sort(),
      };

      if (output === "json") {
        jsonOutput(platformConfigData);
      } else if (output === "yaml") {
        yamlOutput(platformConfigData);
      } else {
        table("Templates (Kits)", platformConfigData.kits);

        table("Use cases (Smart Contract Sets)", platformConfigData.useCases);

        table("Providers and regions", platformConfigData.deploymentEngineTargets);

        list("Pre-deployed abis (Smart Contract Portal)", platformConfigData.preDeployedAbis);
      }

      outro("Platform configuration retrieved");
    });
}
