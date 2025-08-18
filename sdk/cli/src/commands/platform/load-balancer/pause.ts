import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'load-balancer pause' command for the SettleMint SDK.
 * This command pauses a load balancer in the SettleMint platform.
 */
export function loadBalancerPauseCommand() {
  return getPauseCommand({
    name: "evm",
    type: "load balancer",
    alias: "lb",
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER",
    pauseFunction: async (settlemint, id) => {
      return settlemint.loadBalancer.pause(id);
    },
  });
}
