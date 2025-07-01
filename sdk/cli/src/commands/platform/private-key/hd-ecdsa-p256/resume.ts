import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'hd-ecdsa-p256 resume' command for the SettleMint SDK.
 * This command resumes an HD ECDSA P256 private key service in the SettleMint platform.
 */
export function hdEcdsaP256PrivateKeyResumeCommand() {
  return getResumeCommand({
    name: "hd-ecdsa-p256",
    type: "private key",
    alias: "hd",
    envKey: "SETTLEMINT_HD_PRIVATE_KEY",
    resumeFunction: async (settlemint, id) => {
      return settlemint.privateKey.resume(id);
    },
  });
}
