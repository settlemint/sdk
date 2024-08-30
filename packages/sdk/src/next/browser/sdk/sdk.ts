import { createGraphqlClient } from "@/next/browser/sdk/plugins/graphql";
import { createPortalRestClient } from "@/next/browser/sdk/plugins/portal";
import { type ViemConfig, createViemPublicClient, createViemWalletClient } from "@/next/browser/sdk/plugins/viem";
import { type WagmiConfig, createWagmiConfig } from "@/next/browser/sdk/plugins/wagmi";

export type { ViemConfig, WagmiConfig };

/**
 * A collection of functions for generating various SDK components.
 *
 * This object provides methods to create clients and configurations for interacting with
 * different parts of the SettleMint ecosystem, including REST APIs, GraphQL endpoints,
 * blockchain interactions, and React hooks for Web3 functionality.
 *
 * @example
 * ```typescript
 * const portalClient = sdkGenerator.createPortalRestClient();
 * const graphqlClient = sdkGenerator.createGraphqlClient('portal');
 * const viemPublicClient = sdkGenerator.createViemPublicClient({ chain: mainnet });
 * const viemWalletClient = sdkGenerator.createViemWalletClient({ chain: mainnet });
 * const { wagmiConfig, web3ModalConfig } = sdkGenerator.createWagmiConfig({ chain: mainnet });
 * ```
 */
export const sdkGenerator = {
  createPortalRestClient,
  createGraphqlClient,
  createViemPublicClient,
  createViemWalletClient,
  createWagmiConfig,
} as const;
