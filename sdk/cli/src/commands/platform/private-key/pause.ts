import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'private-key pause' command for the SettleMint SDK.
 * This command pauses a private key service in the SettleMint platform.
 */
export function privateKeyPauseCommand() {
  return getPauseCommand({
    name: "private-key",
    type: "private key",
    alias: "pk",
    envKey: "SETTLEMINT_ACCESSIBLE_PRIVATE_KEY",
    pauseFunction: async (settlemint, id) => {
      return settlemint.privateKey.pause(id);
    },
  });
}
