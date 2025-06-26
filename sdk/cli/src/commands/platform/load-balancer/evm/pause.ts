import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'evm pause' command for the SettleMint SDK.
 * This command pauses an EVM load balancer in the SettleMint platform.
 */
export function evmLoadBalancerPauseCommand() {
  return getPauseCommand({
    name: "evm",
    type: "load balancer",
    subType: "evm",
    alias: "lb",
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER",
    pauseFunction: async (settlemint, id) => {
      return settlemint.loadBalancer.pause(id);
    },
  });
}
