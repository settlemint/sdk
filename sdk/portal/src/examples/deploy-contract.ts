/**
 * This example demonstrates how to deploy a contract using the SettleMint Portal.
 *
 * The process involves:
 * 1. Creating a portal client
 * 2. Deploying a forwarder contract
 * 3. Waiting for the forwarder contract deployment to be finalized
 * 4. Deploying a stablecoin factory contract
 * 5. Getting all contracts and filtering by ABI name
 *
 * This pattern is useful for applications that need to deploy smart contracts
 * in the SettleMint Portal, providing a way to track the progress of blockchain operations.
 */
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
 * Wait for the forwarder contract deployment to be finalized
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

const contractAddresses = await portalClient.request(
  portalGraphql(`
    query GetContracts {
        getContracts {
            count
            records {
                address
                abiName
                createdAt
            }
        }
    }
  `),
);
// Print total count
console.log(`Total contracts: ${contractAddresses.getContracts?.count}`);

// Contracts for StableCoinFactory
console.log(contractAddresses.getContracts?.records.filter((record) => record.abiName === "StableCoinFactory"));
