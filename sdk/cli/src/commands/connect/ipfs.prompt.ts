import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Storage } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select an IPFS storage instance to connect to.
 *
 * @param env - The environment variables containing the current configuration
 * @param storages - The available storage instances to choose from
 * @param accept - Whether to automatically accept default values without prompting
 * @returns The selected IPFS storage instance, or undefined if none is selected
 */
export async function ipfsPrompt(
  env: Partial<DotEnv>,
  storages: Storage[],
  accept: boolean | undefined,
): Promise<Storage | undefined> {
  const possible = storages.filter((storage) => storage.storageProtocol === "IPFS");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_IPFS",
    defaultHandler: async ({ defaultService: defaultStorage }: { defaultService: Storage | undefined }) => {
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
  });
}
