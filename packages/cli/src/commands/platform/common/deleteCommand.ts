import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";
import { deleteConfirmationPrompt } from "../prompts/delete-confirmation.prompt";

export function getDeleteCommand({
  type,
  alias,
  envKey,
  deleteFunction,
}: {
  type: "application" | "workspace";
  alias: string;
  envKey: keyof DotEnv;
  deleteFunction: (settlemintClient: SettlemintClient, id: string) => Promise<{ name: string }>;
}) {
  return new Command(type)
    .alias(alias)
    .description(
      `Delete a ${type} in the SettleMint platform. Provide the ${type} ID or use 'default' to delete the default ${type} from your .env file.

  Examples:
    # Deletes the specified ${type} by id
    $ bunx @settlemint/sdk-cli@latest platform delete ${type} <${type}-id>

    # Deletes the default ${type} in the production environment
    $ bunx @settlemint/sdk-cli@latest platform delete ${type} default --prod`,
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
        stopMessage: `${type} deleted`,
      });

      if (isDefaultId) {
        const newEnv: Partial<DotEnv> = {
          SETTLEMINT_ACCESS_TOKEN: accessToken,
          SETTLEMINT_INSTANCE: instance,
        };
        if (type === "application") {
          newEnv.SETTLEMINT_WORKSPACE = env.SETTLEMINT_WORKSPACE;
        }
        await writeEnvSpinner(!!prod, newEnv);
        note(`${type} removed as default`);
      }

      outro(`${type} ${result.name} deleted successfully`);
    });
}
