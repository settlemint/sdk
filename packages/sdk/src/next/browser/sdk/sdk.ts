import type { BrowserApplicationConfigEnv, Config } from "@/common/config/schemas";
import { type ViemConfigParameters, viemConfig } from "@/next/browser/sdk/plugins/viem";
import type { Address } from "abitype";
import type { Account, Chain, RpcSchema } from "viem";
import { activeBrowserConfig } from "../config/config";
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
  const cfg: BrowserApplicationConfigEnv = activeBrowserConfig(config);

  return {
    portal: cfg.portalRest ? createPortalClient<PortalRestPaths>(cfg.portalRest) : undefined,
    viem: viemConfig({ ...viem, chain }),
    wagmi: wagmiConfig({ ...wagmi, chain }),
  };
}
