import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'hd-ecdsa-p256 pause' command for the SettleMint SDK.
 * This command pauses an HD ECDSA P256 private key service in the SettleMint platform.
 */
export function hdEcdsaP256PrivateKeyPauseCommand() {
  return getPauseCommand({
    name: "hd-ecdsa-p256",
    type: "private key",
    subType: "hd-ecdsa-p256",
    alias: "hd",
    envKey: "SETTLEMINT_HD_PRIVATE_KEY",
    pauseFunction: async (settlemint, id) => {
      return settlemint.privateKey.pause(id);
    },
  });
}
