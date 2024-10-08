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
    (possible.find((storage) => storage.id === env.SETTLEMINT_MINIO) ?? possible.length === 1)
      ? storages[0]
      : undefined;
  const defaultPossible = accept && defaultStorage;

  if (defaultPossible) {
    return defaultStorage;
  }

  const minio = await select({
    message: "Which Minio instance do you want to connect to?",
    choices: possible.map((storage) => ({
      name: storage.name,
      value: storage,
    })),
    default: defaultStorage,
  });

  return minio;
}
