import select from "@inquirer/select";
import type { PrivateKey } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function hdPrivateKeyPrompt(
  env: Partial<DotEnv>,
  privateKeys: PrivateKey[],
  accept: boolean,
): Promise<PrivateKey | undefined> {
  const possible = privateKeys.filter((privateKey) => privateKey.privateKeyType === "HD_ECDSA_P256");

  if (possible.length === 0) {
    return undefined;
  }

  const defaultPrivateKey =
    (possible.find((privateKey) => privateKey.uniqueName === env.SETTLEMINT_HD_PRIVATE_KEY) ?? possible.length === 1)
      ? possible[0]
      : undefined;
  const defaultPossible = accept && defaultPrivateKey;

  const privateKey = await select(
    {
      message: "Which HD Private Key do you want to use?",
      choices: possible.map((privateKey) => ({
        name: privateKey.name,
        value: privateKey,
      })),
      default: defaultPrivateKey,
    },
    { signal: defaultPossible ? AbortSignal.timeout(500) : undefined },
  ).catch((error) => {
    if (error.name === "AbortPromptError") {
      return defaultPrivateKey;
    }
    throw error;
  });

  return privateKey;
}
