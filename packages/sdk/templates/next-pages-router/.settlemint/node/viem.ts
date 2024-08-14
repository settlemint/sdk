
import type { UnifyIntersection } from '@settlemint/sdk-react';
import { Address } from 'abitype';
import { type Account, type Chain, type HttpTransport, type PublicClientConfig, type RpcSchema, type TransportConfig, http } from 'viem';
import { chain } from './codegen/chain';

export function settleMintViemConfig<
chain extends Chain | undefined = undefined,
accountOrAddress extends Account | Address | undefined = undefined,
rpcSchema extends RpcSchema | undefined = undefined,
>(parameters: UnifyIntersection<Omit<PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema>, 'chain'|'transport'> &{ transportConfig?: TransportConfig<'http'>}>,
):PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema>{
  return {
    chain,
    transport: http(`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc`,parameters.transportConfig),
    ...parameters
  }
}
