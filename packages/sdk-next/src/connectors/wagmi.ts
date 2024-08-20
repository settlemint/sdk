import type { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import type { Chain, Prettify, TransportConfig } from "viem";
import { http, type Config, type CreateConfigParameters, cookieStorage, createStorage } from "wagmi";

export type Web3ModalConfig = Parameters<typeof createWeb3Modal>["0"];
export type LimitedWeb3ModalConfig = Prettify<
  Omit<Web3ModalConfig, "chains" | "wagmiConfig" | "metadata" | "projectId"> & {
    metadata: Omit<NonNullable<Web3ModalConfig["metadata"]>, "url">;
  }
>;

/**
 * Creates a SettleMint-specific Wagmi configuration.
 * @param chain - The blockchain chain to configure.
 * @returns A function to generate Wagmi and Web3Modal configurations.
 */
export function createSettleMintWagmiConfig(chain: Chain) {
  /**
   * Generates Wagmi and Web3Modal configurations based on provided parameters.
   * @param parameters - Configuration parameters for Wagmi and Web3Modal.
   * @param parameters.wagmiConfig - Partial Wagmi configuration options.
   * @param parameters.wagmiConfig.transportConfig - Optional HTTP transport configuration.
   * @param parameters.web3ModalConfig - Limited Web3Modal configuration options.
   * @returns An object containing Wagmi and Web3Modal configurations.
   */
  const settleMintWagmiConfig = (
    parameters: Prettify<{
      wagmiConfig: Partial<Omit<CreateConfigParameters, "client">> & { transportConfig?: TransportConfig<"http"> };
      web3ModalConfig: LimitedWeb3ModalConfig;
    }>,
  ): { wagmiConfig: Config; web3ModalConfig: Web3ModalConfig } => {
    // Retrieve the WalletConnect project ID from environment variables
    const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "";

    if (!projectId) {
      console.warn(
        "Wallet Connect Project ID is not defined, add it to your .env.local file as NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID",
      );
    }

    // Create the Wagmi configuration
    const wagmiConfig = defaultWagmiConfig({
      ...parameters.wagmiConfig,
      chains: [chain],
      transports: {
        ...(parameters.wagmiConfig.transports ?? []),
        [chain.id]: http(
          `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc`,
          parameters.wagmiConfig.transportConfig,
        ),
      },
      ssr: true,
      storage: createStorage({
        storage: cookieStorage,
      }),
      projectId: projectId ?? "",
      metadata: {
        ...parameters.web3ModalConfig.metadata,
        url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL ?? "",
      },
    });

    // Create the Web3Modal configuration
    const web3ModalConfig: Web3ModalConfig = {
      metadata: {
        ...parameters.web3ModalConfig.metadata,
        url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL ?? "",
      },
      wagmiConfig,
      projectId,
    };

    return {
      wagmiConfig,
      web3ModalConfig,
    };
  };

  return settleMintWagmiConfig;
}
