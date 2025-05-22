import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { ApplicationAccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import {
  http,
  type Chain as ViemChain,
  createPublicClient,
  createWalletClient,
  defineChain,
  publicActions,
} from "viem";
import * as chains from "viem/chains";
import { z } from "zod/v4";
import { createWalletVerificationChallenges } from "./custom-actions/create-wallet-verification-challenges.action.js";
import { createWalletVerification } from "./custom-actions/create-wallet-verification.action.js";
import { createWallet } from "./custom-actions/create-wallet.action.js";
import { deleteWalletVerification } from "./custom-actions/delete-wallet-verification.action.js";
import { getWalletVerifications } from "./custom-actions/get-wallet-verifications.action.js";
import { verifyWalletVerificationChallenge } from "./custom-actions/verify-wallet-verification-challenge.action.js";

/**
 * Schema for the viem client options.
 */
export const ClientOptionsSchema = z.object({
  /**
   * The access token
   */
  accessToken: ApplicationAccessTokenSchema.optional(),
  /**
   * The chain id
   */
  chainId: z.string().optional(),
  /**
   * The chain name
   */
  chainName: z.string(),
  /**
   * The json rpc url
   */
  rpcUrl: UrlOrPathSchema,
  /**
   * The http transport config
   */
  httpTransportConfig: z.any().optional(),
});

/**
 * Type representing the validated client options.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Get a public client. Use this if you need to read from the blockchain.
 * @param options - The options for the public client.
 * @returns The public client. see {@link https://viem.sh/docs/clients/public}
 * @example
 * ```ts
 * import { getPublicClient } from '@settlemint/sdk-viem';
 *
 * const publicClient = getPublicClient({
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
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
export const getPublicClient = (options: ClientOptions) => {
  ensureServer();
  const validatedOptions = validate(ClientOptionsSchema, options);
  return createPublicClient({
    chain: getChain(validatedOptions),
    transport: http(validatedOptions.rpcUrl, {
      batch: true,
      timeout: 60_000,
      ...validatedOptions.httpTransportConfig,
      fetchOptions: {
        ...validatedOptions?.httpTransportConfig?.fetchOptions,
        headers: {
          ...validatedOptions?.httpTransportConfig?.fetchOptions?.headers,
          "x-auth-token": validatedOptions.accessToken,
        },
      },
    }),
  });
};

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
 * @returns A function that returns a wallet client. The function can be called with verification options for HD wallets. see {@link https://viem.sh/docs/clients/wallet}
 * @example
 * ```ts
 * import { getWalletClient } from '@settlemint/sdk-viem';
 * import { parseAbi } from "viem";
 *
 * const walletClient = getWalletClient({
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
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
export const getWalletClient = (options: ClientOptions) => {
  ensureServer();
  const validatedOptions = validate(ClientOptionsSchema, options);
  const chain = getChain(validatedOptions);
  return (verificationOptions?: WalletVerificationOptions) =>
    createWalletClient({
      chain: chain,
      transport: http(validatedOptions.rpcUrl, {
        batch: true,
        timeout: 60_000,
        ...validatedOptions.httpTransportConfig,
        fetchOptions: {
          ...validatedOptions?.httpTransportConfig?.fetchOptions,
          headers: {
            ...validatedOptions?.httpTransportConfig?.fetchOptions?.headers,
            "x-auth-token": validatedOptions.accessToken,
            "x-auth-challenge-response": verificationOptions?.challengeResponse ?? "",
            "x-auth-verification-id": verificationOptions?.verificationId ?? "",
          },
        },
      }),
    })
      .extend(publicActions)
      .extend(createWallet)
      .extend(getWalletVerifications)
      .extend(createWalletVerification)
      .extend(deleteWalletVerification)
      .extend(createWalletVerificationChallenges)
      .extend(verifyWalletVerificationChallenge);
};

/**
 * Schema for the viem client options.
 */
export const GetChainIdOptionsSchema = z.object({
  /**
   * The access token
   */
  accessToken: ApplicationAccessTokenSchema.optional(),
  /**
   * The json rpc url
   */
  rpcUrl: UrlOrPathSchema,
});

/**
 * Type representing the validated get chain id options.
 */
export type GetChainIdOptions = z.infer<typeof GetChainIdOptionsSchema>;

/**
 * Get the chain id of a blockchain network.
 * @param options - The options for the public client.
 * @returns The chain id.
 * @example
 * ```ts
 * import { getChainId } from '@settlemint/sdk-viem';
 *
 * const chainId = await getChainId({
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
 *   rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
 * });
 * console.log(chainId);
 * ```
 */
export async function getChainId(options: GetChainIdOptions): Promise<number> {
  ensureServer();
  const validatedOptions = validate(GetChainIdOptionsSchema, options);
  const client = createPublicClient({
    transport: http(validatedOptions.rpcUrl, {
      fetchOptions: {
        headers: validatedOptions.accessToken
          ? {
              "x-auth-token": validatedOptions.accessToken,
            }
          : undefined,
      },
    }),
  });

  return client.getChainId();
}

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

export { OTPAlgorithm, WalletVerificationType } from "./custom-actions/types/wallet-verification.enum.js";

export type {
  CreateWalletVerificationChallengesParameters,
  CreateWalletVerificationChallengesResponse,
  WalletVerificationChallenge,
} from "./custom-actions/create-wallet-verification-challenges.action.js";
export type {
  CreateWalletVerificationParameters,
  CreateWalletVerificationResponse,
  WalletOTPVerificationInfo,
  WalletPincodeVerificationInfo,
  WalletSecretCodesVerificationInfo,
  WalletVerificationInfo,
} from "./custom-actions/create-wallet-verification.action.js";
export type {
  CreateWalletParameters,
  CreateWalletResponse,
  WalletInfo,
} from "./custom-actions/create-wallet.action.js";
export type {
  DeleteWalletVerificationParameters,
  DeleteWalletVerificationResponse,
} from "./custom-actions/delete-wallet-verification.action.js";
export type {
  GetWalletVerificationsParameters,
  GetWalletVerificationsResponse,
  WalletVerification,
} from "./custom-actions/get-wallet-verifications.action.js";
export type {
  AddressOrObject,
  VerificationResult,
  VerifyWalletVerificationChallengeParameters,
  VerifyWalletVerificationChallengeResponse,
} from "./custom-actions/verify-wallet-verification-challenge.action.js";
