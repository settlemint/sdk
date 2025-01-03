import { instancePrompt } from "@/commands/connect/instance.prompt";
import { waitForCompletion } from "@/commands/platform/utils/wait-for-completion";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { sanitizeCommandName } from "@/utils/sanitize-command-name";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { cancel, capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";
import { createExamples } from "../utils/create-examples";
import type { ResourceType } from "./resource-type";

/**
 * Creates a command for restarting resources in the SettleMint platform.
 *
 * @param options - Configuration options for the restart command
 * @param options.name - The name of the command
 * @param options.type - The type of resource to restart
 * @param options.alias - Command alias (shorthand)
 * @param options.envKey - Environment variable key for the resource ID
 * @param options.restartFunction - Function that performs the actual restart operation on the platform
 * @param options.usePersonalAccessToken - Whether to use personal access token for auth (defaults to true)
 * @returns A configured Commander command for restarting the specified resource type
 */
export function getRestartCommand({
  name,
  type,
  subType,
  alias,
  envKey,
  restartFunction,
  usePersonalAccessToken = true,
}: {
  name: string;
  type: ResourceType;
  subType?: string;
  alias: string;
  envKey: keyof DotEnv;
  restartFunction: (settlemintClient: SettlemintClient, id: string) => Promise<{ name: string }>;
  usePersonalAccessToken?: boolean;
}) {
  const commandName = sanitizeCommandName(name);
  return new Command(commandName)
    .alias(alias)
    .description(
      `Restart a ${type} in the SettleMint platform. Provide the ${type} ID or use 'default' to restart the default ${type} from your .env file.
${createExamples([
  {
    description: `Restarts the specified ${type} by id`,
    command: `platform restart ${commandName}${subType ? ` ${subType}` : ""} <${type}-id>`,
  },
  {
    description: `Restarts the default ${type} in the production environment`,
    command: `platform restart ${commandName}${subType ? ` ${subType}` : ""} default --prod`,
  },
])}`,
    )
    .argument(
      "<uniqueName>",
      `The unique name of the ${type}, use 'default' to restart the default one from your .env file`,
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .option("-w, --wait", "Wait until restarted")
    .action(async (uniqueName, { acceptDefaults, prod, wait }) => {
      intro(`Restarting ${type} in the SettleMint platform`);

      const autoAccept = !!acceptDefaults || isInCi;
      const env: Partial<DotEnv> = await loadEnv(false, !!prod);

      const instance = await instancePrompt(env, autoAccept);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance,
        prefer: usePersonalAccessToken ? "personal" : "application",
      });

      const settlemint = createSettleMintClient({
        accessToken,
        instance,
      });

      const isDefaultUniqueName = uniqueName === "default";
      const serviceUniqueName = isDefaultUniqueName
        ? typeof env[envKey] === "string"
          ? env[envKey]
          : null
        : uniqueName;

      if (!serviceUniqueName) {
        cancel(
          `No default ${type} found in your .env file. Please provide a valid ${type} unique name or set a default ${type} first.`,
        );
      }

      const result = await spinner({
        startMessage: `Restarting ${type}`,
        task: async () => {
          return restartFunction(settlemint, serviceUniqueName);
        },
        stopMessage: `${capitalizeFirstLetter(type)} restart initiated`,
      });

      if (wait) {
        await waitForCompletion({ settlemint, type, uniqueName: serviceUniqueName, action: "restart" });
      }

      outro(`${capitalizeFirstLetter(type)} ${result.name} restart initiated successfully`);
    });
}
