import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

/**
 * Creates and returns the 'workspace' command for the SettleMint SDK.
 * This command creates a new workspace in the SettleMint platform.
 * It takes a name and optional description for the workspace.
 */
export function workspaceDeleteCommand() {
  return new Command("workspace")
    .alias("w")
    .argument("<id>", "The id of the workspace, use 'default' to delete the default one from your .env file")
    .option("-a, --accept", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .action(async (id, { accept, prod }) => {
      intro("Deleting workspace in the SettleMint platform");

      const autoAccept = !!accept || isInCi;
      const env: Partial<DotEnv> = await loadEnv(false, !!prod);

      const accessToken = await accessTokenPrompt(env, autoAccept);
      const instance = await instancePrompt(env, autoAccept);

      const settlemint = createSettleMintClient({
        accessToken,
        instance,
      });

      const workspace = await spinner({
        startMessage: "Deleting workspace",
        task: async () => {
          return settlemint.workspace.delete(id === "default" ? env.SETTLEMINT_WORKSPACE! : id);
        },
        stopMessage: "Workspace deleted",
      });

      outro(`Workspace ${workspace.name} deleted successfully`);
    });
}
