import type {
  Application,
  BlockchainNetwork,
  BlockchainNode,
  CustomDeployment,
  Insights,
  IntegrationTool,
  Middleware,
  PrivateKey,
  SettlemintClient,
  Storage,
} from "@settlemint/sdk-js";
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
export async function servicesSpinner(
  settlemint: SettlemintClient,
  application: Omit<Application, "workspace">,
): Promise<{
  blockchainNetworks: BlockchainNetwork[];
  blockchainNodes: BlockchainNode[];
  middleware: Middleware[];
  integrationTool: IntegrationTool[];
  storage: Storage[];
  privateKey: PrivateKey[];
  insights: Insights[];
  customDeployment: CustomDeployment[];
}> {
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
        settlemint.blockchainNetwork.list(application.uniqueName),
        settlemint.blockchainNode.list(application.uniqueName),
        settlemint.middleware.list(application.uniqueName),
        settlemint.integrationTool.list(application.uniqueName),
        settlemint.storage.list(application.uniqueName),
        settlemint.privateKey.list(application.uniqueName),
        settlemint.insights.list(application.uniqueName),
        settlemint.customDeployment.list(application.uniqueName),
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
