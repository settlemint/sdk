import type { ApplicationConfigEnv, Config } from "@/common/config/schemas";
import { type ViemConfigParameters, viemConfig } from "@/next/browser/sdk/plugins/viem";
import type { Address } from "abitype";
import type { Account, Chain, RpcSchema } from "viem";
import { activeConfig } from "../config/config";
import { createPortalClient } from "./plugins/portal";
import { type WagmiConfigParameters, wagmiConfig } from "./plugins/wagmi";

export function createSdk<
  PortalRestPaths extends {},
  chain extends Chain | undefined = undefined,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
>(
  config: Config,
  {
    chain,
    wagmi,
    viem,
  }: {
    chain: Chain;
    wagmi: Omit<WagmiConfigParameters, "chain">;
    viem?: Omit<ViemConfigParameters<chain, accountOrAddress, rpcSchema>, "chain">;
  },
) {
  const cfg: ApplicationConfigEnv = activeConfig(config);

  return {
    portal: createPortalClient<PortalRestPaths>(cfg),
    viem: viemConfig({ ...viem, chain }),
    wagmi: wagmiConfig({ ...wagmi, chain }),
  };
}
