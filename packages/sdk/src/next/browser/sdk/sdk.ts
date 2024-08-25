import type { Config } from "@/common/config/schemas";
import { type ViemConfigParameters, viemConfig } from "@/next/browser/sdk/plugins/viem";
import { activeServerConfig } from "@/next/node/config/config";
import type { Address } from "abitype";
import type { Account, Chain, RpcSchema } from "viem";
import { activeBrowserConfig } from "../config/config";
import { createPortalClient } from "./plugins/portal";
import { type WagmiConfigParameters, wagmiConfig } from "./plugins/wagmi";

/**
 * Creates an SDK instance based on the provided configuration and environment.
 *
 * @template PortalRestPaths - The type for portal REST paths
 * @param {Config} config - The application configuration
 * @param {Object} options - The SDK options
 * @param {Chain} options.chain - The blockchain chain configuration
 * @param {Omit<WagmiConfigParameters, "chain">} options.wagmi - Wagmi configuration parameters
 * @param {Omit<ViemConfigParameters<Chain, Account | Address | undefined, RpcSchema | undefined>, "chain">} [options.viem] - Optional Viem configuration parameters
 * @returns {ReturnType<typeof createSdk>} The created SDK instance
 */
export function createSdk<PortalRestPaths extends Record<string, unknown> = Record<string, unknown>>(
  config: Config,
  {
    chain,
    wagmi,
    viem,
  }: {
    chain: Chain;
    wagmi: Omit<WagmiConfigParameters, "chain">;
    viem?: Omit<ViemConfigParameters<Chain, Account | Address | undefined, RpcSchema | undefined>, "chain">;
  },
) {
  if (process.env.NEXT_RUNTIME === "edge") {
    const cfg = activeServerConfig(config);
    return {
      portal: cfg.portalRest && createPortalClient<PortalRestPaths>(cfg.portalRest),
      viem: viemConfig({ ...viem, chain }),
    };
  }

  const cfg = activeBrowserConfig(config);
  return {
    portal: cfg.portalRest && createPortalClient<PortalRestPaths>(cfg.portalRest),
    viem: viemConfig({ ...viem, chain }),
    wagmi: wagmiConfig({ ...wagmi, chain }),
  };
}
