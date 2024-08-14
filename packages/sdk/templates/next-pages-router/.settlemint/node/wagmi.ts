"use client"

import type { TransportConfig } from 'viem';
import { Config, createConfig, CreateConfigParameters, http } from 'wagmi';
import { chain } from './codegen/chain';

export function settleMintWagmiConfig(
  parameters?: Omit<CreateConfigParameters, 'client'> & { transportConfig?: TransportConfig<'http'>},
): Config {
  return createConfig({
    ...parameters,
    chains: [...(parameters?.chains??[]),chain],
    transports: {
      ...(parameters?.transports??[]),
      [chain.id]: http(`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc`,parameters?.transportConfig),
    },
  })
};
