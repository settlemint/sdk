import { appendHeaders } from "@settlemint/sdk-utils/http";
import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { ApplicationAccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import {
  createPublicClient,
  createWalletClient,
  defineChain,
  type HttpTransportConfig,
  http,
  publicActions,
  type Chain as ViemChain,
  type PublicClient,
  type Transport,
} from "viem";
import * as chains from "viem/chains";
import { z } from "zod";
import { createWallet } from "./custom-actions/create-wallet.action.js";
import { createWalletVerification } from "./custom-actions/create-wallet-verification.action.js";
import { createWalletVerificationChallenges } from "./custom-actions/create-wallet-verification-challenges.action.js";
import { deleteWalletVerification } from "./custom-actions/delete-wallet-verification.action.js";
import { getWalletVerifications } from "./custom-actions/get-wallet-verifications.action.js";
import { verifyWalletVerificationChallenge } from "./custom-actions/verify-wallet-verification-challenge.action.js";

// Simple LRU cache implementation
class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // Remove key if it exists (to update position)
    this.cache.delete(key);
    
    // Check size limit
    if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Cache for chain definitions with size limit
const chainCache = new LRUCache<string, ViemChain>(100);

// Cache for public clients with size limit
const publicClientCache = new LRUCache<string, PublicClient<Transport, ViemChain>>(50);

// Cache for wallet client factories with size limit
const walletClientFactoryCache = new LRUCache<
  string,
  (verificationOptions?: WalletVerificationOptions) => ReturnType<typeof createWalletClient>
>(50);

// Helper to create robust cache key from options
function createCacheKey(options: Partial<ClientOptions>): string {
  // Create a deterministic key by sorting properties
  const keyObject: Record<string, unknown> = {};
  
  // Add properties in sorted order to ensure consistency
  const keys = ["chainId", "chainName", "rpcUrl", "accessToken"] as const;
  for (const key of keys) {
    const value = options[key as keyof ClientOptions];
    // Only include defined values
    if (value !== undefined) {
      keyObject[key] = value;
    }
  }
  
  // Use sorted keys for consistent stringification
  return JSON.stringify(keyObject, Object.keys(keyObject).sort());
}

// Shared utility for building headers
function buildHeaders(
  baseHeaders: HeadersInit | undefined,
  authHeaders: Record<string, string>
): HeadersInit {
  return appendHeaders(baseHeaders, authHeaders);
}


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
  chainId: z.string(),
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
export type ClientOptions = Omit<z.infer<typeof ClientOptionsSchema>, "httpTransportConfig"> & {
  httpTransportConfig?: HttpTransportConfig;
};

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
  const validatedOptions: ClientOptions = validate(ClientOptionsSchema, options);

  // Check cache first
  const cacheKey = createCacheKey(validatedOptions);
  const cachedClient = publicClientCache.get(cacheKey);
  if (cachedClient) {
    return cachedClient;
  }

  // Build headers using shared utility
  const headers = buildHeaders(validatedOptions?.httpTransportConfig?.fetchOptions?.headers, {
    "x-auth-token": validatedOptions.accessToken || "",
  });

  // Create new client
  const client = createPublicClient({
    chain: getChain({
      chainId: validatedOptions.chainId,
      chainName: validatedOptions.chainName,
      rpcUrl: validatedOptions.rpcUrl,
    }),
    transport: http(validatedOptions.rpcUrl, {
      batch: true,
      timeout: 60_000,
      ...validatedOptions.httpTransportConfig,
      fetchOptions: {
        ...validatedOptions?.httpTransportConfig?.fetchOptions,
        headers,
      },
    }),
  });

  // Cache the client
  publicClientCache.set(cacheKey, client);

  return client;
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
  const validatedOptions: ClientOptions = validate(ClientOptionsSchema, options);

  // Check cache first for the factory function
  const cacheKey = createCacheKey(validatedOptions);
  const cachedFactory = walletClientFactoryCache.get(cacheKey);
  if (cachedFactory) {
    return cachedFactory;
  }

  // Get chain (will be cached internally)
  const chain = getChain({
    chainId: validatedOptions.chainId,
    chainName: validatedOptions.chainName,
    rpcUrl: validatedOptions.rpcUrl,
  });

  // Create the factory function
  const walletClientFactory = (verificationOptions?: WalletVerificationOptions) => {
    // Build headers using shared utility
    const headers = buildHeaders(validatedOptions?.httpTransportConfig?.fetchOptions?.headers, {
      "x-auth-token": validatedOptions.accessToken || "",
      "x-auth-challenge-response": verificationOptions?.challengeResponse ?? "",
      "x-auth-verification-id": verificationOptions?.verificationId ?? "",
    });

    return createWalletClient({
      chain: chain,
      transport: http(validatedOptions.rpcUrl, {
        batch: true,
        timeout: 60_000,
        ...validatedOptions.httpTransportConfig,
        fetchOptions: {
          ...validatedOptions?.httpTransportConfig?.fetchOptions,
          headers,
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

  // Cache the factory
  walletClientFactoryCache.set(cacheKey, walletClientFactory);

  return walletClientFactory;
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
  /**
   * The http transport config
   */
  httpTransportConfig: z.any().optional(),
});

/**
 * Type representing the validated get chain id options.
 */
export type GetChainIdOptions = Omit<z.infer<typeof GetChainIdOptionsSchema>, "httpTransportConfig"> & {
  httpTransportConfig?: HttpTransportConfig;
};

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
  const validatedOptions: GetChainIdOptions = validate(GetChainIdOptionsSchema, options);

  // Build headers using shared utility
  const headers = buildHeaders(validatedOptions?.httpTransportConfig?.fetchOptions?.headers, {
    "x-auth-token": validatedOptions.accessToken || "",
  });

  const client = createPublicClient({
    transport: http(validatedOptions.rpcUrl, {
      ...validatedOptions.httpTransportConfig,
      fetchOptions: {
        ...validatedOptions?.httpTransportConfig?.fetchOptions,
        headers,
      },
    }),
  });

  return client.getChainId();
}

// Create a Map for O(1) chain lookups
const knownChainsMap = new Map<string, ViemChain>(Object.values(chains).map((chain) => [chain.id.toString(), chain]));

function getChain({ chainId, chainName, rpcUrl }: Pick<ClientOptions, "chainId" | "chainName" | "rpcUrl">): ViemChain {
  // Create deterministic cache key
  const cacheKey = JSON.stringify({ chainId, chainName, rpcUrl }, ["chainId", "chainName", "rpcUrl"]);
  
  // Check if chain is already cached
  const cachedChain = chainCache.get(cacheKey);
  if (cachedChain) {
    return cachedChain;
  }

  // O(1) lookup for known chains
  const knownChain = knownChainsMap.get(chainId);
  if (knownChain) {
    chainCache.set(cacheKey, knownChain);
    return knownChain;
  }

  // Create custom chain definition
  const customChain = defineChain({
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
  });

  // Cache the custom chain
  chainCache.set(cacheKey, customChain);
  return customChain;
}

export type {
  CreateWalletParameters,
  CreateWalletResponse,
  WalletInfo,
} from "./custom-actions/create-wallet.action.js";
export type {
  CreateWalletVerificationParameters,
  CreateWalletVerificationResponse,
  WalletOTPVerificationInfo,
  WalletPincodeVerificationInfo,
  WalletSecretCodesVerificationInfo,
  WalletVerificationInfo,
} from "./custom-actions/create-wallet-verification.action.js";
export type {
  CreateWalletVerificationChallengesParameters,
  CreateWalletVerificationChallengesResponse,
  WalletVerificationChallenge,
} from "./custom-actions/create-wallet-verification-challenges.action.js";
export type {
  DeleteWalletVerificationParameters,
  DeleteWalletVerificationResponse,
} from "./custom-actions/delete-wallet-verification.action.js";
export type {
  GetWalletVerificationsParameters,
  GetWalletVerificationsResponse,
  WalletVerification,
} from "./custom-actions/get-wallet-verifications.action.js";
export { OTPAlgorithm, WalletVerificationType } from "./custom-actions/types/wallet-verification.enum.js";
export type {
  AddressOrObject,
  VerificationResult,
  VerifyWalletVerificationChallengeParameters,
  VerifyWalletVerificationChallengeResponse,
} from "./custom-actions/verify-wallet-verification-challenge.action.js";
