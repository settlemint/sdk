import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'load-balancer restart' command for the SettleMint SDK.
 * This command restarts a load balancer in the SettleMint platform.
 */
export function loadBalancerRestartCommand() {
  return getRestartCommand({
    name: "load-balancer",
    type: "load balancer",
    alias: "lb",
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER",
    restartFunction: async (settlemint, id) => {
      return settlemint.loadBalancer.restart(id);
    },
  });
}
