import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { waitForCompletion } from "@/commands/platform/utils/wait-for-completion";
import { missingAccessTokenError } from "@/error/missing-config-error";
import { getInstanceCredentials } from "@/utils/config";
import { sanitizeCommandName } from "@/utils/sanitize-command-name";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";
import { deleteConfirmationPrompt } from "../prompts/delete-confirmation.prompt";
import { createExamples } from "../utils/create-examples";
import type { ResourceType } from "./resource-type";
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
      `Delete a ${type} in the SettleMint platform. Provide the ${type} unique name or use 'default' to delete the default ${type} from your .env file.
${createExamples([
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
])}`,
    )
    .argument(
      "<uniqueName>",
      `The unique name of the ${type}, use 'default' to delete the default one from your .env file`,
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .option("-w, --wait", "Wait until destroyed")
    .option("-f, --force", `Force delete the ${type} without confirmation`)
    .action(async (uniqueName, { acceptDefaults, prod, force, wait }) => {
      intro(`Deleting ${type} in the SettleMint platform`);

      if (!force) {
        await deleteConfirmationPrompt(`this ${type}`);
      }

      const autoAccept = !!acceptDefaults || isInCi;
      const env: Partial<DotEnv> = await loadEnv(false, !!prod);

      const instance = await instancePrompt(env, autoAccept);
      const accessToken = usePersonalAccessToken
        ? (await getInstanceCredentials(instance))?.personalAccessToken
        : env.SETTLEMINT_ACCESS_TOKEN;
      if (!accessToken) {
        return missingAccessTokenError();
      }

      const settlemint = createSettleMintClient({
        accessToken,
        instance,
      });

      const isDefaultId = uniqueName === "default";
      const serviceUniqueName = isDefaultId ? (typeof env[envKey] === "string" ? env[envKey] : null) : uniqueName;

      if (!serviceUniqueName) {
        throw new Error(
          `No default ${type} found in your .env file. Please provide a valid ${type} ID or set a default ${type} first.`,
        );
      }

      const result = await spinner({
        startMessage: `Deleting ${type}`,
        task: async () => {
          return deleteFunction(settlemint, serviceUniqueName);
        },
        stopMessage: `${capitalizeFirstLetter(type)} deleted`,
      });

      if (isDefaultId) {
        const newEnv: Partial<DotEnv> = {
          SETTLEMINT_ACCESS_TOKEN: usePersonalAccessToken ? env.SETTLEMINT_ACCESS_TOKEN : accessToken,
          SETTLEMINT_INSTANCE: instance,
          ...mapDefaultEnv(env),
        };
        await writeEnvSpinner(!!prod, newEnv);
        note(`${capitalizeFirstLetter(type)} removed as default`);
      }

      if (wait) {
        await waitForCompletion({ settlemint, type, id: serviceUniqueName, action: "destroy" });
      }

      outro(`${capitalizeFirstLetter(type)} ${result.name} deleted successfully`);
    });
}
