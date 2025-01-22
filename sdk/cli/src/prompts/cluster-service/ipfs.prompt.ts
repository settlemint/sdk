import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { Storage } from "@settlemint/sdk-js";

export interface IpfsPromptArgs extends BaseServicePromptArgs<Storage> {
  storages: Storage[];
}

/**
 * Prompts the user to select an IPFS storage instance to connect to.
 *
 * @param config - Configuration object containing environment, storages, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.storages - The available storage instances to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.isRequired - Whether an IPFS instance is required
 * @returns The selected IPFS storage instance, or undefined if none is selected
 */
export async function ipfsPrompt({
  env,
  storages,
  accept,
  isRequired = false,
}: IpfsPromptArgs): Promise<Storage | undefined> {
  const possible = storages.filter((storage) => storage.storageProtocol === "IPFS");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_IPFS",
    isRequired,
    defaultHandler: async ({ defaultService: defaultStorage, choices }) => {
      return select({
        message: "Which IPFS instance do you want to connect to?",
        choices,
        default: defaultStorage,
      });
    },
  });
}
