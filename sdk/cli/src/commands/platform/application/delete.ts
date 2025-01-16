import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { getDeleteCommand } from "../common/delete-command";

/**
 * Creates and returns the 'application' command for the SettleMint SDK.
 * This command deletes an application from the SettleMint platform.
 */
export function applicationDeleteCommand() {
  return getDeleteCommand({
    name: "application",
    type: "application",
    alias: "a",
    envKey: "SETTLEMINT_APPLICATION",
    mapDefaultEnv: (env): Partial<DotEnv> => {
      return {
        SETTLEMINT_WORKSPACE: env.SETTLEMINT_WORKSPACE,
      };
    },
    deleteFunction: async (settlemint, id) => {
      return settlemint.application.delete(id);
    },
  });
}
