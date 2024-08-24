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
  chain extends Chain | undefined = undefined,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
> = Prettify<
  Omit<PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema>, "chain" | "transport"> & {
    transportConfig?: TransportConfig<"http">;
    chain: Chain;
  }
>;

export const viemConfig = <
  chain extends Chain | undefined = undefined,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
>(
  parameters: ViemConfigParameters<chain, accountOrAddress, rpcSchema>,
): PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema> => {
  return {
    transport: http(`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/node/jsonrpc`, parameters.transportConfig),
    ...parameters,
    chain: parameters.chain,
  };
};
