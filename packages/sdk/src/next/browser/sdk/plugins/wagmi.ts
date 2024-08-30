import {
  type SIWECreateMessageArgs,
  type SIWESession,
  type SIWEVerifyMessageArgs,
  createSIWEConfig,
  formatMessage,
} from "@web3modal/siwe";
import type { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { getCsrfToken, getSession, signIn, signOut } from "next-auth/react";
import type { Chain, Prettify, TransportConfig } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { http, type Config, cookieStorage, createStorage } from "wagmi";

/**
 * Configuration type for Web3Modal
 */
export type Web3ModalConfig = Parameters<typeof createWeb3Modal>["0"];

/**
 * Limited configuration type for Web3Modal, excluding certain properties
 */
export type LimitedWeb3ModalConfig = Prettify<
  Omit<Web3ModalConfig, "chains" | "wagmiConfig" | "metadata" | "projectId"> & {
    metadata: Omit<NonNullable<Web3ModalConfig["metadata"]>, "url">;
  }
>;

/**
 * Parameters for configuring Wagmi
 */
export type WagmiConfigParameters = Prettify<{
  chain: Chain;
  wagmiConfig?: Partial<Omit<Parameters<typeof defaultWagmiConfig>[0], "client">> & {
    transportConfig?: TransportConfig<"http">;
  };
  web3ModalConfig?: LimitedWeb3ModalConfig;
}>;

/**
 * Configuration type for Wagmi, excluding the chain property
 */
export type WagmiConfig = Prettify<Omit<WagmiConfigParameters, "chain">>;

/**
 * Generates Wagmi and Web3Modal configurations
 *
 * @param {WagmiConfigParameters} parameters - Configuration parameters for Wagmi and Web3Modal
 * @returns {{wagmiConfig: Config, web3ModalConfig: Web3ModalConfig}} An object containing wagmiConfig and web3ModalConfig
 * @throws {Error} Throws an error if unable to get nonce or session during SIWE configuration
 *
 * @example
 * ```typescript
 * const { wagmiConfig, web3ModalConfig } = createWagmiConfig({
 *   chain: mainnet,
 *   wagmiConfig: { ... },
 *   web3ModalConfig: { ... }
 * });
 * ```
 */
export const createWagmiConfig = (
  parameters: WagmiConfigParameters,
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
    chains: [parameters.chain],
    transports: {
      ...(parameters.wagmiConfig?.transports ?? {}),
      [parameters.chain.id]: http(
        `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/node/jsonrpc`,
        parameters.wagmiConfig?.transportConfig,
      ),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    projectId,
    metadata: {
      name: "SettleMint StarterKit",
      description: "A SettleMint StarterKit",
      icons: [`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/apple-icon.png`],
      ...parameters.web3ModalConfig?.metadata,
      url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL ?? "",
    },
    auth: {
      email: true,
      socials: ["google", "x", "github", "discord", "apple", "facebook", "farcaster"],
      showWallets: true,
      walletFeatures: true,
      ...parameters.wagmiConfig?.auth,
    },
  });

  /**
   * SIWE (Sign-In with Ethereum) configuration
   */
  const siweConfig = createSIWEConfig({
    getMessageParams: async () => ({
      domain: typeof window !== "undefined" ? window.location.host : "",
      uri: typeof window !== "undefined" ? window.location.origin : "",
      chains: [mainnet.id, sepolia.id],
      statement: "Please sign with your account",
    }),
    createMessage: ({ address, ...args }: SIWECreateMessageArgs) => formatMessage(args, address),
    getNonce: async () => {
      const nonce = await getCsrfToken();
      if (!nonce) {
        throw new Error("Failed to get nonce!");
      }

      return nonce;
    },
    getSession: async () => {
      const session = await getSession();
      if (!session) {
        throw new Error("Failed to get session!");
      }

      const { address, chainId } = session as unknown as SIWESession;

      return { address, chainId };
    },
    verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const callbackUrl = urlParams.get("rd") || "/s";

        const success = await signIn("credentials", {
          message,
          redirect: true,
          signature,
          callbackUrl,
        });

        return Boolean(success?.ok);
      } catch (error) {
        return false;
      }
    },
    signOut: async () => {
      try {
        await signOut({
          redirect: true,
          callbackUrl: "/",
        });

        return true;
      } catch (error) {
        return false;
      }
    },
  });

  // Create the Web3Modal configuration
  const web3ModalConfig: Web3ModalConfig = {
    metadata: {
      name: "SettleMint StarterKit",
      description: "A SettleMint StarterKit",
      icons: [`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/apple-icon.png`],
      ...parameters.web3ModalConfig?.metadata,
      url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL ?? "",
    },
    siweConfig: parameters.web3ModalConfig?.siweConfig ?? siweConfig,
    wagmiConfig,
    projectId,
    allowUnsupportedChain: true,
  };

  const firstIcon = parameters.web3ModalConfig?.metadata.icons?.[0];
  if (firstIcon) {
    web3ModalConfig.chainImages = {
      [parameters.chain.id]: firstIcon,
      ...parameters.web3ModalConfig?.chainImages,
    };
  }

  return {
    wagmiConfig,
    web3ModalConfig,
  };
};
