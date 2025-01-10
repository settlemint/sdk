import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { PrivateKey } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function hdPrivateKeyPrompt(
  env: Partial<DotEnv>,
  privateKeys: PrivateKey[],
  accept: boolean | undefined,
): Promise<PrivateKey | undefined> {
  const possible = privateKeys.filter((privateKey) => privateKey.privateKeyType === "HD_ECDSA_P256");
  return servicePrompt<PrivateKey>(
    env,
    possible,
    accept,
    "SETTLEMINT_HD_PRIVATE_KEY",
    async ({ defaultService: defaultPrivateKey }) => {
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
  );
}
