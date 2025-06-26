import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'custom-deployment pause' command for the SettleMint SDK.
 * This command pauses a custom deployment in the SettleMint platform.
 */
export function customDeploymentPauseCommand() {
  return getPauseCommand({
    name: "custom-deployment",
    type: "custom deployment",
    alias: "cd",
    envKey: "SETTLEMINT_CUSTOM_DEPLOYMENT",
    pauseFunction: async (settlemint, id) => {
      return settlemint.customDeployment.pause(id);
    },
  });
}
