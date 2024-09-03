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
export type WagmiConfigParameters = Prettify<{
  chain: Chain;
  config: Prettify<
    Omit<Partial<RainbowWagmiConfig>, "chains" | "appName" | "appIcon"> & {
      appName: string;
      appIcon: string;
      transportConfig: TransportConfig;
    }
  >;
}>;

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
export function createWagmiConfig(parameters: WagmiConfigParameters): Parameters<typeof getDefaultConfig>[0] {
  const config: Parameters<typeof getDefaultConfig>[0] = {
    ...parameters.config,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
    chains: [parameters.chain],
    transports: {
      ...(parameters.config?.transports ?? {}),
      [parameters.chain.id]: http(
        `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/node/jsonrpc`,
        parameters.config?.transportConfig,
      ),
    },
    ssr: true,
  };

  return config;
}
