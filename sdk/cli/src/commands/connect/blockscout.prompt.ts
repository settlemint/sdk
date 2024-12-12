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
  accept: boolean,
): Promise<Insights | undefined> {
  const possible = insights.filter((insight) => insight.insightsCategory === "BLOCKCHAIN_EXPLORER");

  if (possible.length === 0) {
    return undefined;
  }

  const defaultBlockscout =
    insights.find((insight) => insight.id === env.SETTLEMINT_BLOCKSCOUT) ??
    (insights.length === 1 ? insights[0] : undefined);
  const defaultPossible = accept && defaultBlockscout;

  if (defaultPossible) {
    return defaultBlockscout;
  }

  const blockscout = await select({
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

  return blockscout;
}
