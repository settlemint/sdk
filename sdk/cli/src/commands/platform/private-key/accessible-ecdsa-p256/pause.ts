import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'accessible-ecdsa-p256 pause' command for the SettleMint SDK.
 * This command pauses an Accessible ECDSA P256 private key service in the SettleMint platform.
 */
export function accessibleEcdsaP256PrivateKeyPauseCommand() {
  return getPauseCommand({
    name: "accessible-ecdsa-p256",
    type: "private key",
    subType: "accessible-ecdsa-p256",
    alias: "acc",
    envKey: "SETTLEMINT_ACCESSIBLE_PRIVATE_KEY",
    pauseFunction: async (settlemint, id) => {
      return settlemint.privateKey.pause(id);
    },
  });
}
