import type {
  BlockchainNetwork,
  BlockchainNode,
  CustomDeployment,
  Insights,
  IntegrationTool,
  LoadBalancer,
  Middleware,
  PrivateKey,
  SettlemintClient,
  Storage,
} from "@settlemint/sdk-js";
import { spinner } from "@settlemint/sdk-utils/terminal";

export type ServiceType =
  | "blockchain-network"
  | "blockchain-node"
  | "custom-deployment"
  | "insights"
  | "integration-tool"
  | "middleware"
  | "private-key"
  | "storage"
  | "load-balancer";

/**
 * Fetches all services associated with an application from the SettleMint platform.
 *
 * @param settlemint - The SettleMint client instance to use for API calls.
 * @param applicationUniqueName - The unique name identifier of the application.
 * @returns A promise that resolves to an object containing arrays of all service types.
 * @throws If there's an error fetching any of the services.
 */
export async function servicesSpinner(
  settlemint: SettlemintClient,
  applicationUniqueName: string,
  types?: ServiceType[],
): Promise<{
  blockchainNetworks: BlockchainNetwork[];
  blockchainNodes: BlockchainNode[];
  middlewares: Middleware[];
  integrationTools: IntegrationTool[];
  storages: Storage[];
  privateKeys: PrivateKey[];
  insights: Insights[];
  customDeployments: CustomDeployment[];
  loadBalancers: LoadBalancer[];
}> {
  return spinner({
    startMessage: "Loading your services",
    stopMessage: "Loaded your services",
    task: async () => {
      const shouldFetch = (type: ServiceType) => !types || types?.includes(type);
      const [
        blockchainNetworks,
        blockchainNodes,
        middlewares,
        integrationTools,
        storages,
        privateKeys,
        insights,
        customDeployments,
        loadBalancers,
      ] = await Promise.all([
        shouldFetch("blockchain-network")
          ? settlemint.blockchainNetwork.list(applicationUniqueName)
          : Promise.resolve([]),
        shouldFetch("blockchain-node") ? settlemint.blockchainNode.list(applicationUniqueName) : Promise.resolve([]),
        shouldFetch("middleware") ? settlemint.middleware.list(applicationUniqueName) : Promise.resolve([]),
        shouldFetch("integration-tool") ? settlemint.integrationTool.list(applicationUniqueName) : Promise.resolve([]),
        shouldFetch("storage") ? settlemint.storage.list(applicationUniqueName) : Promise.resolve([]),
        shouldFetch("private-key") ? settlemint.privateKey.list(applicationUniqueName) : Promise.resolve([]),
        shouldFetch("insights") ? settlemint.insights.list(applicationUniqueName) : Promise.resolve([]),
        shouldFetch("custom-deployment")
          ? settlemint.customDeployment.list(applicationUniqueName)
          : Promise.resolve([]),
        shouldFetch("load-balancer") ? settlemint.loadBalancer.list(applicationUniqueName) : Promise.resolve([]),
      ]);
      return {
        blockchainNetworks,
        blockchainNodes,
        middlewares,
        integrationTools,
        storages,
        privateKeys,
        insights,
        customDeployments,
        loadBalancers,
      };
    },
  });
}
