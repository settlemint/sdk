import { getDeleteCommand } from "@/commands/platform/common/delete-command";

/**
 * Creates and returns the 'workspace' command for the SettleMint SDK.
 * This command creates a new workspace in the SettleMint platform.
 */
export function workspaceDeleteCommand() {
  return getDeleteCommand({
    name: "workspace",
    type: "workspace",
    alias: "w",
    envKey: "SETTLEMINT_WORKSPACE",
    deleteFunction: async (settlemint, uniqueName) => {
      return settlemint.workspace.delete(uniqueName);
    },
  });
}
