import { createGraphqlClient } from "@/browser/sdk/plugins/graphql";
import { createPortalRestClient } from "@/browser/sdk/plugins/portal";
import { createViemPublicClient, createViemWalletClient } from "@/browser/sdk/plugins/viem";
import { createWagmiConfig } from "@/browser/sdk/plugins/wagmi";

/**
 * A collection of functions for generating various SDK components.
 *
 * This object provides methods to create clients and configurations for interacting with
 * different parts of the SettleMint ecosystem, including REST APIs, GraphQL endpoints,
 * blockchain interactions, and React hooks for Web3 functionality.
 */
export const sdkGenerator = {
  createPortalRestClient,
  createGraphqlClient,
  createViemPublicClient,
  createViemWalletClient,
  createWagmiConfig,
} as const;
