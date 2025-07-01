import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'accessible-ecdsa-p256 resume' command for the SettleMint SDK.
 * This command resumes an accessible ECDSA P256 private key service in the SettleMint platform.
 */
export function accessibleEcdsaP256PrivateKeyResumeCommand() {
  return getResumeCommand({
    name: "accessible-ecdsa-p256",
    type: "private key",
    alias: "acc",
    envKey: "SETTLEMINT_ACCESSIBLE_PRIVATE_KEY",
    resumeFunction: async (settlemint, id) => {
      return settlemint.privateKey.resume(id);
    },
  });
}
