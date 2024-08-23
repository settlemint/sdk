import {
  type SIWECreateMessageArgs,
  type SIWEVerifyMessageArgs,
  createSIWEConfig,
  formatMessage,
} from "@web3modal/siwe";
import type { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookies } from "next/headers";
import type { Chain, Prettify, TransportConfig } from "viem";
import { http, type Config, cookieStorage, createStorage } from "wagmi";
import type { createLucia } from "../auth/lucia.js";
import { retrieveNonce } from "./nonce.js";

export type Web3ModalConfig = Parameters<typeof createWeb3Modal>["0"];
export type LimitedWeb3ModalConfig = Prettify<
  Omit<Web3ModalConfig, "chains" | "wagmiConfig" | "metadata" | "projectId"> & {
    metadata: Omit<NonNullable<Web3ModalConfig["metadata"]>, "url">;
  }
>;

/**
 * Creates a SettleMint-specific Wagmi configuration.
 * @param chain - The blockchain chain to configure.
 * @returns A function that generates Wagmi and Web3Modal configurations.
 */
export function createSettleMintWagmiConfig(chain: Chain, auth: ReturnType<typeof createLucia>) {
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
      wagmiConfig: Partial<Omit<Parameters<typeof defaultWagmiConfig>[0], "client">> & {
        transportConfig?: TransportConfig<"http">;
      };
      web3ModalConfig: LimitedWeb3ModalConfig;
    }>,
  ): { wagmiConfig: Config; web3ModalConfig: Web3ModalConfig } => {
    // Retrieve the WalletConnect project ID from environment variables
    const projectId: string | undefined = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "";

    if (!projectId) {
      console.warn(
        "Wallet Connect Project ID is not defined, add it to your .env.local file as NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID",
      );
    }

    const siweConfig = createSIWEConfig({
      getMessageParams: async () => ({
        domain: typeof window !== "undefined" ? window.location.host : "",
        uri: typeof window !== "undefined" ? window.location.origin : "",
        chains: [chain.id],
        statement: "Please sign with your wallet",
      }),
      createMessage: ({ address, ...args }: SIWECreateMessageArgs) => formatMessage(args, address),
      getNonce: async () => {
        return await retrieveNonce();
      },
      getSession: async () => {
        const sessionId = cookies().get(auth.lucia.sessionCookieName)?.value ?? null;
        const { user, session } = await auth.lucia.validateSession(sessionId);
        if (!session || !user) {
          throw new Error("Failed to get session!");
        }

        return { address: user.id, chainId: chain.id };
      },
      verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
        await auth.createUser({
          id: "test",
          roles: ["test"],
        });
        try {
          const success = await signIn("credentials", {
            message,
            redirect: false,
            signature,
            callbackUrl: "/protected",
          });

          return Boolean(success?.ok);
        } catch (error) {
          return false;
        }
      },
      signOut: async () => {
        lucia.invalidateSession(session.id);
        try {
          await signOut({
            redirect: false,
          });

          return true;
        } catch (error) {
          return false;
        }
      },
    });

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
      projectId,
      metadata: {
        ...parameters.web3ModalConfig.metadata,
        url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL ?? "",
      },
      auth: {
        email: true,
        socials: ["google", "x", "github", "discord", "apple", "facebook", "farcaster"],
        showWallets: true,
        walletFeatures: true,
        ...parameters.wagmiConfig.auth,
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
      allowUnsupportedChain: true,
      defaultChain: parameters.web3ModalConfig.defaultChain ?? chain,
    };

    const firstIcon = parameters.web3ModalConfig.metadata.icons?.[0];
    if (firstIcon) {
      web3ModalConfig.chainImages = {
        [chain.id]: firstIcon,
        ...parameters.web3ModalConfig.chainImages,
      };
    }

    return {
      wagmiConfig,
      web3ModalConfig,
    };
  };

  return settleMintWagmiConfig;
}
