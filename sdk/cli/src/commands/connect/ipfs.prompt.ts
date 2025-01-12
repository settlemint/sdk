import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Storage } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

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
}: {
  env: Partial<DotEnv>;
  storages: Storage[];
  accept: boolean | undefined;
  isRequired?: boolean;
}): Promise<Storage | undefined> {
  const possible = storages.filter((storage) => storage.storageProtocol === "IPFS");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_IPFS",
    isRequired,
    defaultHandler: async ({ defaultService: defaultStorage }: { defaultService: Storage | undefined }) => {
      return select({
        message: "Which IPFS instance do you want to connect to?",
        choices: [
          ...possible.map((storage) => ({
            name: storage.name,
            value: storage,
          })),
          ...(isRequired
            ? []
            : [
                {
                  name: "None",
                  value: undefined,
                },
              ]),
        ],
        default: defaultStorage,
      });
    },
  });
}
