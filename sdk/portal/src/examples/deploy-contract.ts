import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { createClient } from "graphql-ws";
import { createPortalClient } from "../portal.js"; // Replace this path with "@settlemint/sdk-portal"
import { waitForTransactionReceipt } from "../utils/wait-for-transaction-receipt.js";
import type { introspection } from "./schemas/portal-env.d.ts"; // Replace this path with the generated introspection type

const env = await loadEnv(false, false);
const logger = createLogger();

const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    // Change unknown to the type you are using to store metadata
    JSON: unknown;
  };
}>(
  {
    instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
  },
  {
    fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
  },
);

// Replace with the address of your private key which you use to deploy smart contracts
const FROM = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

/**
 * Deploy a forwarder contract
 */
const deployForwarder = await portalClient.request(
  portalGraphql(`
    mutation DeployContractForwarder($from: String!) {
      DeployContractForwarder(from: $from) {
        transactionHash
      }
    }
  `),
  {
    from: FROM,
  },
);

/**
 * Wait for the forwared contract deployment to be finalized
 */
const wsClient = createClient({
  url: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
});
const transaction = await waitForTransactionReceipt(
  wsClient,
  deployForwarder.DeployContractForwarder?.transactionHash!,
);

/**
 * Deploy a bond factory contract
 */
const deployBondFactory = await portalClient.request(
  portalGraphql(`
    mutation DeployContractBondFactory($from: String!, $constructorArguments: DeployContractBondFactoryInput!) {
      DeployContractBondFactory(from: $from, constructorArguments: $constructorArguments) {
        transactionHash
      }
    }
  `),
  {
    from: FROM,
    constructorArguments: {
      forwarder: transaction?.receipt.contractAddress!,
    },
  },
);

console.log(deployBondFactory?.DeployContractBondFactory?.transactionHash);
