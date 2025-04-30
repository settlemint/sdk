import { describe, expect, test } from "bun:test";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { createPortalClient } from "@settlemint/sdk-portal";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { getAddress } from "viem";
import { waitForTransactionReceipt } from "../sdk/portal/src/utils/wait-for-transaction-receipt.js";
import type { introspection } from "./test-app/portal-env";

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
const settlemintClient = createSettleMintClient({
  instance: env.SETTLEMINT_INSTANCE!,
  accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
});

describe("Portal E2E Tests", () => {
  test("can get pending transactions", async () => {
    // Making GraphQL queries
    const query = portalGraphql(`
      query GetPendingTransactions {
        getPendingTransactions {
          count
        }
      }
    `);

    const result = await portalClient.request(query);
    expect(result.getPendingTransactions?.count).toBeNumber();
  });

  test(
    "can deploy a contract",
    async () => {
      const privateKeys = await settlemintClient.privateKey.list(env.SETTLEMINT_APPLICATION!);
      const privateKeyToDeploy = privateKeys.find(
        (key) =>
          key.__typename === "HsmEcDsaP256PrivateKey" &&
          key.blockchainNodes?.some((node) => node.uniqueName === env.SETTLEMINT_BLOCKCHAIN_NODE!),
      );
      expect(privateKeyToDeploy).toBeDefined();
      const from = getAddress(privateKeyToDeploy?.address!);

      const deployForwarder = await portalClient.request(
        portalGraphql(`
          mutation DeployContractForwarder($from: String!) {
            DeployContractForwarder(from: $from, gasLimit: "0x3d0900") {
              transactionHash
            }
          }
        `),
        {
          from: from,
        },
      );

      const transaction = await waitForTransactionReceipt(deployForwarder.DeployContractForwarder?.transactionHash!, {
        portalGraphqlEndpoint: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
        accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
      });

      const deployStableCoinFactory = await portalClient.request(
        portalGraphql(`
          mutation DeployContractStableCoinFactory($from: String!, $constructorArguments: DeployContractStableCoinFactoryInput!) {
            DeployContractStableCoinFactory(from: $from, constructorArguments: $constructorArguments, gasLimit: "0x3d0900") {
              transactionHash
            }
          }
        `),
        {
          from: from,
          constructorArguments: {
            forwarder: getAddress(transaction?.receipt.contractAddress!),
          },
        },
      );
      expect(deployStableCoinFactory.DeployContractStableCoinFactory?.transactionHash).toBeString();
    },
    { timeout: 120_000 },
  );
});
