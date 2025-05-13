import { describe, expect, test } from "bun:test";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { createPortalClient } from "@settlemint/sdk-portal";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { type Address, getAddress } from "viem";
import { waitForTransactionReceipt } from "../sdk/portal/src/utils/wait-for-transaction-receipt.js";
import { handleWalletVerificationChallenge } from "../sdk/portal/src/utils/wallet-verification-challenge.js";
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
            DeployContractForwarder(from: $from) {
              transactionHash
            }
          }
        `),
        {
          from: from,
        },
      );
      expect(deployForwarder.DeployContractForwarder?.transactionHash).toBeString();

      const transaction = await waitForTransactionReceipt(deployForwarder.DeployContractForwarder?.transactionHash!, {
        portalGraphqlEndpoint: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
        accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
      });
      expect(transaction?.receipt.contractAddress).toBeString();
      expect(transaction?.receipt.status).toBe("Success");

      const deployStableCoinFactory = await portalClient.request(
        portalGraphql(`
          mutation DeployContractStableCoinFactory($from: String!, $constructorArguments: DeployContractStableCoinFactoryInput!) {
            DeployContractStableCoinFactory(from: $from, constructorArguments: $constructorArguments) {
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

      expect(contractAddresses.getContracts?.count).toBeGreaterThan(0);
      expect(contractAddresses.getContracts?.records).toBeArray();
      expect(
        contractAddresses.getContracts?.records.some(
          (record) => record.address === transaction?.receipt.contractAddress,
        ),
      ).toBeTrue();
    },
    { timeout: 60_000 },
  );

  test(
    "can send transaction using hd wallet",
    async () => {
      const wallet = await portalClient.request(
        portalGraphql(`
          mutation createUserWallet($keyVaultId: String!, $name: String!) {
            createWallet(keyVaultId: $keyVaultId, walletInfo: { name: $name }) {
              address
            }
          }
        `),
        {
          keyVaultId: env.SETTLEMINT_HD_PRIVATE_KEY!,
          name: `My Wallet ${new Date().toISOString()}`,
        },
      );
      expect(wallet.createWallet?.address).toBeString();
      const pincodeVerification = await portalClient.request(
        portalGraphql(`
        mutation setPinCode($address: String!, $pincode: String!) {
          createWalletVerification(
            userWalletAddress: $address
            verificationInfo: {pincode: {name: "PINCODE", pincode: $pincode}}
          ) {
            id
            name
            parameters
            verificationType
          }
        }
        `),
        {
          address: wallet.createWallet?.address!,
          pincode: "123456",
        },
      );
      expect(pincodeVerification.createWalletVerification?.id).toBeString();

      const challengeResponse = await handleWalletVerificationChallenge({
        portalClient,
        portalGraphql,
        verificationId: pincodeVerification.createWalletVerification?.id!,
        userWalletAddress: wallet.createWallet?.address! as Address,
        code: "123456",
        verificationType: "pincode",
      });
      expect(challengeResponse.challengeResponse).toBeString();
      expect(challengeResponse.verificationId).toBe(pincodeVerification.createWalletVerification?.id!);

      const result = await portalClient.request(
        portalGraphql(`
          mutation StableCoinFactoryCreate(
            $challengeResponse: String!
            $verificationId: String
            $address: String!
            $from: String!
            $input: StableCoinFactoryCreateInput!
          ) {
            StableCoinFactoryCreate(
              challengeResponse: $challengeResponse
              verificationId: $verificationId
              address: $address
              from: $from
              input: $input
            ) {
              transactionHash
            }
          }
        `),
        {
          challengeResponse: challengeResponse.challengeResponse,
          verificationId: pincodeVerification.createWalletVerification?.id!,
          address: "0x5e771e1417100000000000000000000000000004",
          from: wallet.createWallet?.address!,
          input: {
            name: `Test Coin ${new Date().toISOString()}`,
            symbol: "TEST",
            decimals: 18,
            collateralLivenessSeconds: 3_600,
          },
        },
      );

      expect(result.StableCoinFactoryCreate?.transactionHash).toBeString();
    },
    { timeout: 60_000 },
  );
});
