import type { ResourceType } from "@/constants/resource-type";
import { deleteConfirmationPrompt } from "@/prompts/delete-confirmation.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { sanitizeCommandName } from "@/utils/commands/sanitize-command-name";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
/**
 * Creates a command for deleting resources in the SettleMint platform.
 *
 * @param options - Configuration options for the delete command
 * @param options.name - The name of the command
 * @param options.type - The type of resource to delete
 * @param options.alias - Command alias (shorthand)
 * @param options.envKey - Environment variable key for the resource ID
 * @param options.mapDefaultEnv - Optional function to map environment variables when deleting default resource
 * @param options.deleteFunction - Function that performs the actual delete operation on the platform
 * @param options.usePersonalAccessToken - Whether to use personal access token for auth (defaults to true)
 * @returns A configured Commander command for deleting the specified resource type
 */
export function getDeleteCommand({
  name,
  type,
  alias,
  envKey,
  mapDefaultEnv = () => ({}),
  deleteFunction,
  usePersonalAccessToken = true,
}: {
  name: string;
  type: ResourceType;
  alias: string;
  envKey: keyof DotEnv;
  mapDefaultEnv?: (env: Partial<DotEnv>) => Partial<DotEnv>;
  deleteFunction: (settlemintClient: SettlemintClient, id: string) => Promise<{ name: string }>;
  usePersonalAccessToken?: boolean;
}) {
  return new Command(sanitizeCommandName(name))
    .alias(alias)
    .description(
      `Delete a ${type} in the SettleMint platform. Provide the ${type} unique name or use 'default' to delete the default ${type} from your .env file.`,
    )
    .usage(
      createExamples([
        {
          description: `Deletes the specified ${type} by unique name`,
          command: `platform delete ${type} <${type}-unique-name>`,
        },
        {
          description: `Deletes the default ${type} in the production environment`,
          command: `platform delete ${type} default --prod`,
        },
        {
          description: `Force deletes the specified ${type} without confirmation`,
          command: `platform delete ${type} <${type}-unique-name> --force`,
        },
      ]),
    )
    .argument(
      "<unique-name>",
      `The unique name of the ${type}, use 'default' to delete the default one from your .env file`,
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .option("-f, --force", `Force delete the ${type} without confirmation`)
    .action(async (uniqueName, { acceptDefaults, prod, force }) => {
      intro(`Deleting ${type} in the SettleMint platform`);

      if (!force) {
        await deleteConfirmationPrompt(`this ${type}`);
      }

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
        throw new Error(
          `No default ${type} found in your .env file. Please provide a valid ${type} unique name or set a default ${type} first.`,
        );
      }

      const result = await spinner({
        startMessage: `Deleting ${type}`,
        task: async () => {
          return deleteFunction(settlemint, serviceUniqueName);
        },
        stopMessage: `${capitalizeFirstLetter(type)} deleted`,
      });

      if (isDefaultUniqueName) {
        const newEnv: Partial<DotEnv> = {
          SETTLEMINT_ACCESS_TOKEN: usePersonalAccessToken ? env.SETTLEMINT_ACCESS_TOKEN : accessToken,
          SETTLEMINT_INSTANCE: instance,
          ...mapDefaultEnv(env),
        };
        await writeEnvSpinner(!!prod, newEnv);
        note(`${capitalizeFirstLetter(type)} removed as default`);
      }

      outro(`${capitalizeFirstLetter(type)} ${result.name} deleted successfully`);
    });
}
