import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Storage } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function ipfsPrompt(
  env: Partial<DotEnv>,
  storages: Storage[],
  accept: boolean | undefined,
): Promise<Storage | undefined> {
  const possible = storages.filter((storage) => storage.storageProtocol === "IPFS");
  return servicePrompt<Storage>(
    env,
    possible,
    accept,
    "SETTLEMINT_IPFS",
    async ({ defaultService: defaultStorage }) => {
      return select({
        message: "Which IPFS instance do you want to connect to?",
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
    },
  );
}
