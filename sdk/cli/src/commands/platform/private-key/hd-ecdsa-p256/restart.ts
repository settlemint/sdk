import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'hd-ecdsa-p256 restart' command for the SettleMint SDK.
 * This command restarts a HD ECDSA P256 private key in the SettleMint platform.
 */
export function hdEcdsaP256RestartCommand() {
  return getRestartCommand({
    name: "hd-ecdsa-p256",
    type: "private key",
    alias: "hd",
    envKey: "SETTLEMINT_HD_PRIVATE_KEY",
    restartFunction: async (settlemint, id) => {
      return settlemint.privateKey.restart(id);
    },
  });
}
