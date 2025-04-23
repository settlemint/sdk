import {
  http,
  type HttpTransportConfig,
  type Chain as ViemChain,
  type Transport as ViemTransport,
  type WalletClient,
  createPublicClient,
  createWalletClient,
  defineChain,
} from "viem";
import * as chains from "viem/chains";

/**
 * The options for the viem client.
 */
export interface ClientOptions {
  /**
   * The access token
   */
  accessToken: string;
  /**
   * The chain id
   */
  chainId: string;
  /**
   * The chain name
   */
  chainName: string;
  /**
   * The json rpc url
   */
  rpcUrl: string;
  /**
   * The http transport config
   */
  httpTransportConfig?: HttpTransportConfig;
}

/**
 * Get a public client. Use this if you need to read from the blockchain.
 * @param options - The options for the public client.
 * @returns The public client.
 * @example
 * ```ts
 * import { getPublicClient } from '@settlemint/sdk-viem';
 *
 * const publicClient = getPublicClient({
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
 *   chainId: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!,
 *   chainName: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
 *   rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
 * });
 *
 * // Get the block number
 * const block = await publicClient.getBlockNumber();
 * console.log(block);
 * ```
 */
export const getPublicClient = (options: ClientOptions) =>
  createPublicClient({
    chain: getChain(options),
    transport: http(options.rpcUrl, {
      batch: true,
      timeout: 60_000,
      ...options.httpTransportConfig,
      fetchOptions: {
        ...options?.httpTransportConfig?.fetchOptions,
        headers: {
          ...options?.httpTransportConfig?.fetchOptions?.headers,
          "x-auth-token": options.accessToken,
        },
      },
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
 * @example
 * ```ts
 * import { getWalletClient } from '@settlemint/sdk-viem';
 * import { parseAbi } from "viem";
 *
 * const walletClient = getWalletClient({
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
 *   chainId: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!,
 *   chainName: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
 *   rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
 * });
 *
 * // Get the chain id
 * const chainId = await walletClient().getChainId();
 * console.log(chainId);
 *
 * // write to the blockchain
 * const transactionHash = await walletClient().writeContract({
 *   account: "0x0000000000000000000000000000000000000000",
 *   address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
 *   abi: parseAbi(["function mint(uint32 tokenId) nonpayable"]),
 *   functionName: "mint",
 *   args: [69420],
 * });
 * console.log(transactionHash);
 * ```
 */
export const getWalletClient = <C extends ViemChain>(options: ClientOptions) => {
  const chain = getChain(options);
  return (verificationOptions?: WalletVerificationOptions): WalletClient<ViemTransport, C> =>
    createWalletClient({
      chain: chain as ViemChain,
      transport: http(options.rpcUrl, {
        batch: true,
        timeout: 60_000,
        ...options.httpTransportConfig,
        fetchOptions: {
          ...options?.httpTransportConfig?.fetchOptions,
          headers: {
            ...options?.httpTransportConfig?.fetchOptions?.headers,
            "x-auth-token": options.accessToken,
            "x-auth-challenge-response": verificationOptions?.challengeResponse ?? "",
            "x-auth-verification-id": verificationOptions?.verificationId ?? "",
          },
        },
      }),
    }) as WalletClient<ViemTransport, C>;
};

function getChain({ chainId, chainName, rpcUrl }: Pick<ClientOptions, "chainId" | "chainName" | "rpcUrl">): ViemChain {
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
