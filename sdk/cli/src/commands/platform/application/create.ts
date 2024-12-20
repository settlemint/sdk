import type { DotEnv } from "@settlemint/sdk-utils";
import { getCreateCommand } from "../common/create-command";

/**
 * Creates and returns the 'application' command for the SettleMint SDK.
 * This command creates a new application in a specified workspace.
 * It takes a workspace name and optional flags.
 */
export function applicationCreateCommand() {
  return getCreateCommand({
    name: "application",
    type: "application",
    alias: "a",
    execute: (cmd, baseAction) => {
      cmd
        .option(
          "-w, --workspace <workspace>",
          "The workspace unique name to create the application in (defaults to workspace from env)",
        )
        .action(async (name, { workspace, ...defaultArgs }) => {
          return baseAction(defaultArgs, async (settlemint, env) => {
            const result = await settlemint.application.create({
              name,
              workspaceUniqueName: workspace ?? env.SETTLEMINT_WORKSPACE!,
            });
            return {
              result,
              mapDefaultEnv: (): Partial<DotEnv> => {
                return {
                  SETTLEMINT_APPLICATION: result.uniqueName,
                };
              },
            };
          });
        });
    },
    examples: [
      {
        description: "Create an application in a workspace",
        command: "platform create application my-app --accept-defaults",
      },
      {
        description: "Create an application and save as default",
        command: "platform create application my-app -d",
      },
      {
        description: "Create an application in a specific workspace",
        command: "platform create application my-app --workspace my-workspace",
      },
    ],
  });
}
