import {
  http,
  type Chain,
  type HttpTransportConfig,
  type WalletClient,
  createPublicClient,
  createWalletClient,
  defineChain,
} from "viem";
import chains from "viem/chains";

/**
 * The options for the viem client.
 */
export interface ClientOptions {
  /**
   * The chain id to use for the viem client.
   */
  chainId: string;
  /**
   * The chain name to use for the viem client.
   */
  chainName: string;
  /**
   * The rpc url to use for the viem client.
   */
  rpcUrl: string;
  /**
   * The http transport config to use for the wallet client.
   */
  httpTransportConfig?: HttpTransportConfig;
}

/**
 * Get a public client. Use this if you need to read from the blockchain.
 * @param options - The options for the public client.
 * @returns The public client.
 */
export const getPublicClient = (options: ClientOptions) =>
  createPublicClient({
    chain: getChain(options),
    transport: http(options.rpcUrl, {
      batch: true,
      timeout: 60_000,
      ...options.httpTransportConfig,
    }),
  });

/**
 * The options for the wallet client.
 */
export interface WalletVerificationOptions {
  /**
   * The verification id (used for HD wallets), if not provided, the challenge response will be validated against all active verifications.
   */
  verificationId?: string;
  /**
   * The challenge response (used for HD wallets)
   */
  challengeResponse: string;
}

/**
 * Get a wallet client. Use this if you need to write to the blockchain.
 * @param options - The options for the wallet client.
 * @returns A function that returns a wallet client. The function can be called with verification options.
 */
export const getWalletClient = (options: ClientOptions) => {
  const chain = getChain(options);
  return (verificationOptions?: WalletVerificationOptions): WalletClient =>
    createWalletClient({
      chain,
      transport: http(options.rpcUrl, {
        batch: true,
        timeout: 60_000,
        ...options.httpTransportConfig,
        fetchOptions: {
          ...options?.httpTransportConfig?.fetchOptions,
          headers: {
            ...options?.httpTransportConfig?.fetchOptions?.headers,
            "x-auth-challenge-response": verificationOptions?.challengeResponse ?? "",
            "x-auth-verification-id": verificationOptions?.verificationId ?? "",
          },
        },
      }),
    });
};

function getChain({ chainId, chainName, rpcUrl }: Pick<ClientOptions, "chainId" | "chainName" | "rpcUrl">): Chain {
  const knownChain = Object.values(chains).find((chain) => chain.id.toString() === chainId);
  return (
    knownChain ??
    defineChain({
      id: Number(chainId),
      name: chainName,
      rpcUrls: {
        default: {
          http: [rpcUrl],
        },
      },
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
    })
  );
}
