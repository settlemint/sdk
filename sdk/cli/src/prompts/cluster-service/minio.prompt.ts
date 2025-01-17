import { servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { Storage } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a MinIO storage instance to connect to.
 *
 * @param config - Configuration object containing environment, storages, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.storages - The available storage instances to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.isRequired - Whether a MinIO instance is required
 * @returns The selected MinIO storage instance, or undefined if none is selected
 */
export async function minioPrompt({
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
  const possible = storages.filter((storage) => storage.storageProtocol === "MINIO");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_MINIO",
    isRequired,
    defaultHandler: async ({ defaultService: defaultStorage, choices }) => {
      return select({
        message: "Which MinIO instance do you want to connect to?",
        choices,
        default: defaultStorage,
      });
    },
  });
}
