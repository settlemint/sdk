import { getCreateCommand } from "@/commands/platform/common/create-command";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { workspacePrompt } from "@/prompts/workspace.prompt";
import { workspaceSpinner } from "@/spinners/workspaces.spinner";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'application' command for the SettleMint SDK.
 * This command creates a new application in a specified workspace.
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
        .action(async (name, { workspace, acceptDefaults, ...defaultArgs }) => {
          return baseAction(
            {
              ...defaultArgs,
              acceptDefaults,
            },
            async (settlemint, env, showSpinner) => {
              let workspaceUniqueName = workspace;
              if (!workspaceUniqueName) {
                const workspaces = await workspaceSpinner(settlemint);
                const workspace = await workspacePrompt(env, workspaces, acceptDefaults);
                if (!workspace) {
                  return nothingSelectedError("workspace");
                }
                workspaceUniqueName = workspace.uniqueName;
              }
              const result = await showSpinner(() =>
                settlemint.application.create({
                  name,
                  workspaceUniqueName,
                }),
              );
              return {
                result,
                mapDefaultEnv: (): Partial<DotEnv> => {
                  return {
                    SETTLEMINT_APPLICATION: result.uniqueName,
                  };
                },
              };
            },
          );
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
    requiresDeployment: false,
  });
}
