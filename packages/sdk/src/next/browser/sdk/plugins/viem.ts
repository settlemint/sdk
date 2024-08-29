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
 * Creates a portal client for interacting with the SettleMint API.
 *
 * @param portalRestUrl The base URL for the portal REST API.
 * @returns A client instance for making API requests.
 * @throws Error if SETTLEMINT_PAT_TOKEN is missing in a server environment.
 */
export function createViemPublicClient<
  TChain extends Chain = Chain,
  TAccount extends Account | Address | undefined = undefined,
  TRpcSchema extends RpcSchema | undefined = undefined,
>(parameters: ViemConfig<TChain, TAccount, TRpcSchema>) {
  const { chain, transportConfig, ...rest } = parameters;

  return createPublicClient({
    transport: http(`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/node/jsonrpc`, {
      ...transportConfig,
      fetchOptions: {
        ...transportConfig?.fetchOptions,
      },
    }),
    chain,
    ...rest,
  });
}

/**
 * Creates a wallet client for interacting with the SettleMint API.
 *
 * @param parameters Configuration parameters for the wallet client.
 * @returns A wallet client instance for making API requests.
 * @throws Error if SETTLEMINT_PAT_TOKEN is missing in a server environment.
 */
export function createViemWalletClient<
  TChain extends Chain = Chain,
  TAccount extends Account | Address | undefined = undefined,
  TRpcSchema extends RpcSchema | undefined = undefined,
>(parameters: ViemConfig<TChain, TAccount, TRpcSchema>) {
  const { chain, transportConfig, ...rest } = parameters;

  return createWalletClient({
    transport: http(`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/node/jsonrpc`, {
      ...transportConfig,
      fetchOptions: {
        ...transportConfig?.fetchOptions,
      },
    }),
    chain,
    ...rest,
  });
}
