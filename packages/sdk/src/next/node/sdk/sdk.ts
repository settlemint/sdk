import type { ApplicationConfigEnv, Config } from "@/common/config/schemas";
import { type ViemConfigParameters, viemConfig } from "@/next/browser/sdk/plugins/viem";
import { activeServerConfig } from "@/next/node/config/config";
import type { Address } from "abitype";
import type { Account, Chain, RpcSchema } from "viem";
import { createPortalClient } from "./plugins/portal";

export function createSdk<
  PortalRestPaths extends {},
  chain extends Chain | undefined = undefined,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
>(
  config: Config,
  {
    chain,
    viem,
  }: {
    chain: Chain;
    viem?: Omit<ViemConfigParameters<chain, accountOrAddress, rpcSchema>, "chain">;
  },
) {
  const cfg: ApplicationConfigEnv = activeServerConfig(config);

  return {
    portal: cfg.portalRest ? createPortalClient<PortalRestPaths>(cfg.portalRest) : undefined,
    viem: viemConfig({ ...viem, chain }),
  };
}
