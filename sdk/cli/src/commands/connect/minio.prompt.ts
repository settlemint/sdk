import select from "@inquirer/select";
import type { Storage } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function minioPrompt(
  env: Partial<DotEnv>,
  storages: Storage[],
  accept: boolean,
): Promise<Storage | undefined> {
  const possible = storages.filter((storage) => storage.storageProtocol === "MINIO");

  if (possible.length === 0) {
    return undefined;
  }

  const defaultStorage =
    possible.find((storage) => storage.uniqueName === env.SETTLEMINT_MINIO) ??
    (possible.length === 1 ? possible[0] : undefined);
  const defaultPossible = accept; // is optional

  if (defaultPossible) {
    return defaultStorage;
  }

  const minio = await select({
    message: "Which Minio instance do you want to connect to?",
    choices: [
      ...possible.map((storage) => ({
        name: storage.name,
        value: storage,
      })),
      {
        name: "None",
        value: undefined,
      },
    ],
    default: defaultStorage,
  });

  return minio;
}
