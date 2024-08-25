import type { Address } from "abitype";
import type { Prettify } from "viem";
import {
  http,
  type Account,
  type Chain,
  type HttpTransport,
  type PublicClientConfig,
  type RpcSchema,
  type TransportConfig,
} from "viem";

export type ViemConfigParameters<
  TChain extends Chain = Chain,
  TAccount extends Account | Address | undefined = undefined,
  TRpcSchema extends RpcSchema | undefined = undefined,
> = Prettify<
  Omit<PublicClientConfig<HttpTransport, TChain, TAccount, TRpcSchema>, "chain" | "transport"> & {
    transportConfig?: TransportConfig<"http">;
    chain: TChain;
  }
>;

/**
 * Creates a Viem public client configuration
 * @param parameters - The configuration parameters
 * @returns A public client configuration
 */
export function viemConfig<
  TChain extends Chain = Chain,
  TAccount extends Account | Address | undefined = undefined,
  TRpcSchema extends RpcSchema | undefined = undefined,
>(
  parameters: ViemConfigParameters<TChain, TAccount, TRpcSchema>,
): PublicClientConfig<HttpTransport, TChain, TAccount, TRpcSchema> {
  const { chain, transportConfig, ...rest } = parameters;
  const rpcUrl = `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/node/jsonrpc`;

  return {
    transport: http(rpcUrl, transportConfig),
    chain,
    ...rest,
  };
}
