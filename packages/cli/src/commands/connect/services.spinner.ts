import type { Application, SettlemintClient } from "@settlemint/sdk-js";
import { spinner } from "@settlemint/sdk-utils/terminal";

/**
 * Writes environment variables to .env files with a spinner for visual feedback.
 *
 * @param env - Partial environment variables to be written.
 * @param environment - The name of the environment (e.g., "development", "production").
 * @returns A promise that resolves when the environment variables are written.
 * @throws If there's an error writing the environment files.
 *
 * @example
 * await writeEnvSpinner(
 *   { SETTLEMINT_INSTANCE: "https://example.com", SETTLEMINT_ACCESS_TOKEN: "token123" },
 *   "development"
 * );
 */
export async function servicesSpinner(settlemint: SettlemintClient, application: Application) {
  return spinner({
    startMessage: "Loading your services",
    stopMessage: "Loaded your services",
    task: async () => {
      const [
        blockchainNetworks,
        blockchainNodes,
        middleware,
        integrationTool,
        storage,
        privateKey,
        insights,
        customDeployment,
      ] = await Promise.all([
        settlemint.blockchainNetwork.list(application.id),
        settlemint.blockchainNode.list(application.id),
        settlemint.middleware.list(application.id),
        settlemint.integrationTool.list(application.id),
        settlemint.storage.list(application.id),
        settlemint.privateKey.list(application.id),
        settlemint.insights.list(application.id),
        settlemint.customDeployment.list(application.id),
      ]);
      return {
        blockchainNetworks,
        blockchainNodes,
        middleware,
        integrationTool,
        storage,
        privateKey,
        insights,
        customDeployment,
      };
    },
  });
}
