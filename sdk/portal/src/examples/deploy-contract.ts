import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { getAddress } from "viem";
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
const FROM = getAddress("0x4B03331cF2db1497ec58CAa4AFD8b93611906960");

/**
 * Deploy a forwarder contract
 */
const deployForwarder = await portalClient.request(
  portalGraphql(`
    mutation DeployContractForwarder($from: String!) {
      DeployContractForwarder(from: $from, gasLimit: "0x3d0900") {
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
const transaction = await waitForTransactionReceipt(deployForwarder.DeployContractForwarder?.transactionHash!, {
  portalGraphqlEndpoint: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
  accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
});

/**
 * Deploy a stablecoin factory contract
 */
const deployStableCoinFactory = await portalClient.request(
  portalGraphql(`
    mutation DeployContractStableCoinFactory($from: String!, $constructorArguments: DeployContractStableCoinFactoryInput!) {
      DeployContractStableCoinFactory(from: $from, constructorArguments: $constructorArguments, gasLimit: "0x3d0900") {
        transactionHash
      }
    }
  `),
  {
    from: FROM,
    constructorArguments: {
      forwarder: getAddress(transaction?.receipt.contractAddress!),
    },
  },
);

console.log(deployStableCoinFactory?.DeployContractStableCoinFactory?.transactionHash);
