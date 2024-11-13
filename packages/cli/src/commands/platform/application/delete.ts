import { getDeleteCommand } from "../common/deleteCommand";

/**
 * Creates and returns the 'application' command for the SettleMint SDK.
 * This command deletes an application from the SettleMint platform.
 * It takes an application ID or 'default' to delete the default application.
 */
export function applicationDeleteCommand() {
  return getDeleteCommand({
    type: "application",
    alias: "a",
    envKey: "SETTLEMINT_APPLICATION",
    deleteFunction: async (settlemint, id) => {
      return settlemint.application.delete(id);
    },
  });
}
