import { getDeleteCommand } from "@/commands/platform/common/deleteCommand";

/**
 * Creates and returns the 'workspace' command for the SettleMint SDK.
 * This command creates a new workspace in the SettleMint platform.
 * It takes a name and optional description for the workspace.
 */
export function workspaceDeleteCommand() {
  return getDeleteCommand({
    type: "workspace",
    alias: "w",
    envKey: "SETTLEMINT_WORKSPACE",
    deleteFunction: async (settlemint, id) => {
      return settlemint.workspace.delete(id);
    },
  });
}
