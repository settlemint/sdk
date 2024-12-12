import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'custom-deployment restart' command for the SettleMint SDK.
 * This command restarts a custom deployment in the SettleMint platform.
 */
export function customDeploymentRestartCommand() {
  return getRestartCommand({
    name: "custom-deployment",
    type: "custom deployment",
    alias: "cd",
    envKey: "SETTLEMINT_CUSTOM_DEPLOYMENT",
    restartFunction: async (settlemint, id) => {
      return settlemint.customDeployment.restart(id);
    },
    usePersonalAccessToken: false,
  });
}
