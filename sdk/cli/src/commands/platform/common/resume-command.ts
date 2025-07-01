import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient, type SettlemintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { cancel, intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { waitForCompletion } from "@/commands/platform/utils/wait-for-completion";
import type { ResourceType } from "@/constants/resource-type";
import { instancePrompt } from "@/prompts/instance.prompt";
import { createExamples } from "@/utils/commands/create-examples";
import { sanitizeCommandName } from "@/utils/commands/sanitize-command-name";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";

/**
 * Creates a command for resuming resources in the SettleMint platform.
 *
 * @param options - Configuration options for the resume command
 * @param options.name - The name of the command
 * @param options.type - The type of resource to resume
 * @param options.alias - Command alias (shorthand)
 * @param options.envKey - Environment variable key for the resource unique name
 * @param options.resumeFunction - Function that performs the actual resume operation on the platform
 * @param options.usePersonalAccessToken - Whether to use personal access token for auth (defaults to true)
 * @returns A configured Commander command for resuming the specified resource type
 */
export function getResumeCommand({
  name,
  type,
  subType,
  alias,
  envKey,
  resumeFunction,
  usePersonalAccessToken = true,
}: {
  name: string;
  type: ResourceType;
  subType?: string;
  alias: string;
  envKey: keyof DotEnv;
  resumeFunction: (settlemintClient: SettlemintClient, id: string) => Promise<{ name: string }>;
  usePersonalAccessToken?: boolean;
}) {
  const commandName = sanitizeCommandName(name);
  return new Command(commandName)
    .alias(alias)
    .description(
      `Resume a ${type} in the SettleMint platform. Provide the ${type} unique name or use 'default' to resume the default ${type} from your .env file.`,
    )
    .usage(
      createExamples([
        {
          description: `Resumes the specified ${type} by unique name`,
          command: `platform resume ${commandName} <${type}-id>`,
        },
        {
          description: `Resumes the default ${type} in the production environment`,
          command: `platform resume ${commandName} default --prod`,
        },
      ]),
    )
    .argument(
      "<unique-name>",
      `The unique name of the ${type}, use 'default' to resume the default one from your .env file`,
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .option("-w, --wait", "Wait until resumed")
    .action(async (uniqueName, { acceptDefaults, prod, wait }) => {
      intro(`Resuming ${type} in the SettleMint platform`);

      const env: Partial<DotEnv> = await loadEnv(false, !!prod);

      const instance = await instancePrompt({ env, accept: acceptDefaults });
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
        startMessage: `Resuming ${type}`,
        task: async () => {
          return resumeFunction(settlemint, serviceUniqueName);
        },
        stopMessage: `${capitalizeFirstLetter(type)} resume initiated`,
      });

      if (wait) {
        const isResumed = await waitForCompletion({
          settlemint,
          type,
          uniqueName: serviceUniqueName,
          action: "resume",
        });
        if (!isResumed) {
          throw new Error(`Failed to resume ${type} ${serviceUniqueName}`);
        }
      }

      outro(`${capitalizeFirstLetter(type)} ${result.name} resume initiated successfully`);
    });
}
