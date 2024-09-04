import type { getDefaultConfig } from "@rainbow-me/rainbowkit";
import type { Chain, Prettify, TransportConfig } from "viem";
import { http } from "wagmi";

/**
 * Configuration type for Web3Modal
 */
type RainbowWagmiConfig = Prettify<Parameters<typeof getDefaultConfig>["0"]>;

/**
 * Parameters for configuring Wagmi
 */
export type WagmiParams = Prettify<
  Omit<RainbowWagmiConfig, "chains" | "projectId"> & {
    transportConfig?: TransportConfig;
    chain: Chain;
  }
>;

export type WagmiConfig = Prettify<Omit<WagmiParams, "chain" | "projectId">>;

/**
 * Creates a Wagmi configuration object.
 *
 * This function generates a configuration object for Wagmi, integrating with Web3Modal and
 * setting up the necessary transports and storage mechanisms.
 *
 * @param parameters - The parameters for configuring Wagmi.
 * @returns The Wagmi configuration object.
 * @example
 * ```typescript
 * const wagmiConfig = createWagmiConfig({
 *   chain: mainnet,
 *   config: {
 *     appName: "MyApp",
 *     appIcon: "https://example.com/icon.png",
 *     transportConfig: { ... },
 *   },
 * });
 * ```
 */
export function createWagmiConfig(parameters: WagmiParams) {
  const { chain, transportConfig, ...wconfig } = parameters;

  return {
    ...wconfig,
    projectId: process.env.WALLET_CONNECT_PROJECT_ID ?? "",
    chains: [chain] as [Chain, ...Chain[]],
    transports: {
      ...(wconfig?.transports ?? {}),
      [chain.id]: http(`${process.env.SETTLEMINT_APP_URL}/proxy/node/jsonrpc`, transportConfig),
    },
    ssr: true,
  };
}
