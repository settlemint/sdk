import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";
import { deleteConfirmationPrompt } from "../prompts/delete-confirmation.prompt";

/**
 * Creates and returns the 'workspace' command for the SettleMint SDK.
 * This command creates a new workspace in the SettleMint platform.
 * It takes a name and optional description for the workspace.
 */
export function workspaceDeleteCommand() {
  return new Command("workspace")
    .alias("w")
    .description(
      `Delete a workspace in the SettleMint platform. Provide the workspace ID or use 'default' to delete the default workspace from your .env file.

Examples:
  # Deletes the specified workspace by id
  $ bunx @settlemint/sdk-cli@latest platform delete workspace <workspace-id>

  # Deletes the default workspace in the production environment
  $ bunx @settlemint/sdk-cli@latest platform delete workspace default --prod`,
    )
    .argument("<id>", "The id of the workspace, use 'default' to delete the default one from your .env file")
    .option("-a, --accept", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .option("-f, --force", "Force delete the workspace without confirmation")
    .action(async (id, { accept, prod, force }) => {
      intro("Deleting workspace in the SettleMint platform");

      if (!force) {
        await deleteConfirmationPrompt("this workspace");
      }

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
