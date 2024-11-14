import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { sanitizeCommandName } from "@/utils/sanitize-command-name";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";
import { deleteConfirmationPrompt } from "../prompts/delete-confirmation.prompt";
import type { ResourceType } from "./resourceType";

/**
 * Creates a delete command for the SettleMint platform.
 *
 * @param options - Configuration options for the delete command
 * @param options.type - The type of resource to delete
 * @param options.alias - Command alias (shorthand)
 * @param options.envKey - Environment variable key for the resource ID
 * @param options.mapDefaultEnv - Function to map environment variables when deleting default resource
 * @param options.deleteFunction - Function that performs the actual delete operation
 * @returns A configured Commander command for deleting the specified resource type
 */
export function getDeleteCommand({
  type,
  alias,
  envKey,
  mapDefaultEnv = () => ({}),
  deleteFunction,
}: {
  type: ResourceType;
  alias: string;
  envKey: keyof DotEnv;
  mapDefaultEnv?: (env: Partial<DotEnv>) => Partial<DotEnv>;
  deleteFunction: (settlemintClient: SettlemintClient, id: string) => Promise<{ name: string }>;
}) {
  return new Command(sanitizeCommandName(type))
    .alias(alias)
    .description(
      `Delete a ${type} in the SettleMint platform. Provide the ${type} ID or use 'default' to delete the default ${type} from your .env file.

  Examples:
    # Deletes the specified ${type} by id
    $ bunx @settlemint/sdk-cli@latest platform delete ${type} <${type}-id>

    # Deletes the default ${type} in the production environment
    $ bunx @settlemint/sdk-cli@latest platform delete ${type} default --prod

    # Force deletes the specified ${type} without confirmation
    $ bunx @settlemint/sdk-cli@latest platform delete ${type} <${type}-id> --force
    `,
    )
    .argument("<id>", `The id of the ${type}, use 'default' to delete the default one from your .env file`)
    .option("-a, --accept", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .option("-f, --force", `Force delete the ${type} without confirmation`)
    .action(async (id, { accept, prod, force }) => {
      intro(`Deleting ${type} in the SettleMint platform`);

      if (!force) {
        await deleteConfirmationPrompt(`this ${type}`);
      }

      const autoAccept = !!accept || isInCi;
      const env: Partial<DotEnv> = await loadEnv(false, !!prod);

      const accessToken = await accessTokenPrompt(env, autoAccept);
      const instance = await instancePrompt(env, autoAccept);

      const settlemint = createSettleMintClient({
        accessToken,
        instance,
      });

      const isDefaultId = id === "default";

      const result = await spinner({
        startMessage: `Deleting ${type}`,
        task: async () => {
          return deleteFunction(settlemint, isDefaultId ? env[envKey]! : id);
        },
        stopMessage: `${capitalizeFirstLetter(type)} deleted`,
      });

      if (isDefaultId) {
        const newEnv: Partial<DotEnv> = {
          SETTLEMINT_ACCESS_TOKEN: accessToken,
          SETTLEMINT_INSTANCE: instance,
          ...mapDefaultEnv(env),
        };
        await writeEnvSpinner(!!prod, newEnv);
        note(`${capitalizeFirstLetter(type)} removed as default`);
      }

      outro(`${capitalizeFirstLetter(type)} ${result.name} deleted successfully`);
    });
}
