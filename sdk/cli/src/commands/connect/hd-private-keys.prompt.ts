import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { PrivateKey } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select an HD private key to use.
 *
 * @param env - The environment variables containing the current configuration
 * @param privateKeys - The available private keys to choose from
 * @param accept - Whether to automatically accept default values without prompting
 * @returns The selected private key, or undefined if none is selected
 */
export async function hdPrivateKeyPrompt(
  env: Partial<DotEnv>,
  privateKeys: PrivateKey[],
  accept: boolean | undefined,
): Promise<PrivateKey | undefined> {
  const possible = privateKeys.filter((privateKey) => privateKey.privateKeyType === "HD_ECDSA_P256");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_HD_PRIVATE_KEY",
    defaultHandler: async ({ defaultService: defaultPrivateKey }: { defaultService: PrivateKey | undefined }) => {
      return select({
        message: "Which HD Private Key do you want to use?",
        choices: [
          ...possible.map((privateKey) => ({
            name: privateKey.name,
            value: privateKey,
          })),
          {
            name: "None",
            value: undefined,
          },
        ],
        default: defaultPrivateKey,
      });
    },
  });
}
