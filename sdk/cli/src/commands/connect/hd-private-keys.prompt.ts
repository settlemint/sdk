import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { PrivateKey } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select an HD private key to use.
 *
 * @param config - Configuration object containing environment, private keys, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.privateKeys - The available private keys to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.isRequired - Whether an HD private key is required
 * @returns The selected private key, or undefined if none is selected
 */
export async function hdPrivateKeyPrompt({
  env,
  privateKeys,
  accept,
  isRequired = false,
}: {
  env: Partial<DotEnv>;
  privateKeys: PrivateKey[];
  accept: boolean | undefined;
  isRequired?: boolean;
}): Promise<PrivateKey | undefined> {
  const possible = privateKeys.filter((privateKey) => privateKey.privateKeyType === "HD_ECDSA_P256");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_HD_PRIVATE_KEY",
    isRequired,
    defaultHandler: async ({ defaultService: defaultPrivateKey, choices }) => {
      return select({
        message: "Which HD Private Key do you want to use?",
        choices,
        default: defaultPrivateKey,
      });
    },
  });
}
