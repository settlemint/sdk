import { config } from "@/cli/lib/config/config";
import { isClientSide } from "@/common/is-clientside";
import { activeServerConfig } from "@/next/node/config/config";
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

export type ViemConfigParameters<
  TChain extends Chain = Chain,
  TAccount extends Account | Address | undefined = undefined,
  TRpcSchema extends RpcSchema | undefined = undefined,
> = Prettify<
  Omit<PublicClientConfig<HttpTransport, TChain, TAccount, TRpcSchema>, "chain" | "transport"> & {
    transportConfig?: HttpTransportConfig;
    chain: TChain;
  }
>;

function setupRpcConfig() {
  let rpcUrl = `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/node/jsonrpc`;
  let headers = {};

  if (!isClientSide()) {
    const cfg = config();
    if (cfg) {
      const activeConfig = activeServerConfig(cfg);
      if (!activeConfig.nodeJsonRpc) {
        throw new Error("Node JSON RPC URL is not configured in the active server config");
      }
      rpcUrl = activeConfig.nodeJsonRpc;
      if (!process.env.SETTLEMINT_PAT_TOKEN) {
        throw new Error("SETTLEMINT_PAT_TOKEN is missing in the server environment");
      }
      headers = {
        "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN,
      };
    }
  }

  return { rpcUrl, headers };
}

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
>(parameters: ViemConfigParameters<TChain, TAccount, TRpcSchema>) {
  const { chain, transportConfig, ...rest } = parameters;
  const { rpcUrl, headers } = setupRpcConfig();

  return createPublicClient({
    transport: http(rpcUrl, {
      ...transportConfig,
      fetchOptions: {
        ...transportConfig?.fetchOptions,
        headers: {
          ...transportConfig?.fetchOptions?.headers,
          ...headers,
        },
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
>(parameters: ViemConfigParameters<TChain, TAccount, TRpcSchema>) {
  const { chain, transportConfig, ...rest } = parameters;
  const { rpcUrl, headers } = setupRpcConfig();

  return createWalletClient({
    transport: http(rpcUrl, {
      ...transportConfig,
      fetchOptions: {
        ...transportConfig?.fetchOptions,
        headers: {
          ...transportConfig?.fetchOptions?.headers,
          ...headers,
        },
      },
    }),
    chain,
    ...rest,
  });
}
