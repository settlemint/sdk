import type { Address } from "abitype";
import type { Prettify } from "viem";
import {
  http,
  type Account,
  type Chain,
  type HttpTransport,
  type HttpTransportConfig,
  type PublicClientConfig,
  type RpcSchema,
  createPublicClient,
  createWalletClient,
} from "viem";

/**
 * Configuration type for Viem clients.
 *
 * @template TChain - The chain type
 * @template TAccount - The account type (optional)
 * @template TRpcSchema - The RPC schema type (optional)
 */
export type ViemConfig<
  TChain extends Chain = Chain,
  TAccount extends Account | Address | undefined = undefined,
  TRpcSchema extends RpcSchema | undefined = undefined,
> = Prettify<
  Omit<PublicClientConfig<HttpTransport, TChain, TAccount, TRpcSchema>, "chain" | "transport"> & {
    transportConfig?: HttpTransportConfig;
    chain: TChain;
  }
>;

/**
 * Creates a Viem public client for interacting with the blockchain.
 *
 * @template TChain - The chain type
 * @template TAccount - The account type (optional)
 * @template TRpcSchema - The RPC schema type (optional)
 * @param parameters - Configuration parameters for the public client
 * @returns A public client instance for making blockchain requests
 * @throws {Error} If SETTLEMINT_APP_URL is not defined in the environment
 *
 * @example
 * ```typescript
 * const publicClient = createViemPublicClient({
 *   chain: mainnet,
 *   transportConfig: { timeout: 30000 }
 * });
 * ```
 */
export function createViemPublicClient<
  TChain extends Chain,
  TAccount extends Account | Address | undefined = undefined,
  TRpcSchema extends RpcSchema | undefined = undefined,
>(parameters: ViemConfig<TChain, TAccount, TRpcSchema>) {
  const { chain, transportConfig, ...rest } = parameters;

  if (!process.env.SETTLEMINT_APP_URL) {
    throw new Error("SETTLEMINT_APP_URL is not defined");
  }

  return createPublicClient({
    transport: http(`${process.env.SETTLEMINT_APP_URL}/proxy/node/jsonrpc`, {
      ...transportConfig,
    }),
    chain,
    ...rest,
  });
}

/**
 * Creates a Viem wallet client for interacting with the blockchain.
 *
 * @template TChain - The chain type
 * @template TAccount - The account type (optional)
 * @template TRpcSchema - The RPC schema type (optional)
 * @param parameters - Configuration parameters for the wallet client
 * @returns A wallet client instance for making blockchain transactions
 * @throws {Error} If SETTLEMINT_APP_URL is not defined in the environment
 *
 * @example
 * ```typescript
 * const walletClient = createViemWalletClient({
 *   chain: mainnet,
 *   transportConfig: { timeout: 30000 }
 * });
 * ```
 */
export function createViemWalletClient<
  TChain extends Chain,
  TAccount extends Account | Address | undefined = undefined,
  TRpcSchema extends RpcSchema | undefined = undefined,
>(parameters: ViemConfig<TChain, TAccount, TRpcSchema>) {
  const { chain, transportConfig, ...rest } = parameters;

  if (!process.env.SETTLEMINT_APP_URL) throw new Error("SETTLEMINT_APP_URL is not defined");

  return createWalletClient({
    transport: http(`${process.env.SETTLEMINT_APP_URL}/proxy/node/jsonrpc`, {
      ...transportConfig,
    }),
    chain,
    ...rest,
  });
}
