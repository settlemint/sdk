import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Insights } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a blockscout service to connect to.
 *
 * @param config - Configuration object containing environment, insights, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.insights - The available blockscout services to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.isRequired - Whether a blockscout instance is required
 * @returns The selected blockscout service, or undefined if none is selected
 */
export async function blockscoutPrompt({
  env,
  insights,
  accept,
  isRequired = false,
}: {
  env: Partial<DotEnv>;
  insights: Insights[];
  accept: boolean | undefined;
  isRequired?: boolean;
}): Promise<Insights | undefined> {
  const possible = insights.filter((insight) => insight.insightsCategory === "BLOCKCHAIN_EXPLORER");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_BLOCKSCOUT",
    isRequired,
    defaultHandler: async ({ defaultService: defaultBlockscout, choices }) => {
      return select({
        message: "Which blockscout instance do you want to connect to?",
        choices,
        default: defaultBlockscout,
      });
    },
  });
}
