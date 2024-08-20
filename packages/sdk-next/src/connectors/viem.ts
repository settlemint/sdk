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

/**
 * Creates a SettleMint-specific Viem configuration factory.
 *
 * @param chain - The blockchain chain to configure.
 * @returns A function to generate Viem configurations.
 */
export function createSettleMintViemConfig(chain: Chain) {
  /**
   * Generates a Viem configuration based on provided parameters.
   *
   * @template chain - The Chain type, defaulting to undefined.
   * @template accountOrAddress - The Account or Address type, defaulting to undefined.
   * @template rpcSchema - The RpcSchema type, defaulting to undefined.
   * @param parameters - Configuration parameters for Viem.
   * @returns A PublicClientConfig object for Viem.
   */
  const settleMintViemConfig = <
    chain extends Chain | undefined = undefined,
    accountOrAddress extends Account | Address | undefined = undefined,
    rpcSchema extends RpcSchema | undefined = undefined,
  >(
    parameters: Prettify<
      Omit<PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema>, "chain" | "transport"> & {
        transportConfig?: TransportConfig<"http">;
      }
    >,
  ): PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema> => {
    return {
      chain,
      // Use the SettleMint app URL for the JSON-RPC endpoint
      transport: http(`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc`, parameters.transportConfig),
      ...parameters,
    };
  };
  return settleMintViemConfig;
}
