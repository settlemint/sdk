import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Insights } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a blockscout service to connect to.
 * If there's only one blockscout service available and auto-accept is enabled,
 * it will automatically select that service.
 *
 * @param env - The current environment variables
 * @param insights - Array of available blockscout services
 * @param accept - Whether to automatically accept default values
 * @returns The selected blockscout service or undefined if none selected
 */
export async function blockscoutPrompt(
  env: Partial<DotEnv>,
  insights: Insights[],
  accept: boolean | undefined,
): Promise<Insights | undefined> {
  const possible = insights.filter((insight) => insight.insightsCategory === "BLOCKCHAIN_EXPLORER");
  return servicePrompt<Insights>(
    env,
    possible,
    accept,
    "SETTLEMINT_BLOCKSCOUT",
    async ({ defaultService: defaultBlockscout }) => {
      return select({
        message: "Which blockscout instance do you want to connect to?",
        choices: [
          ...insights.map((insight) => ({
            name: insight.name,
            value: insight,
          })),
          {
            name: "None",
            value: undefined,
          },
        ],
        default: defaultBlockscout,
      });
    },
  );
}
