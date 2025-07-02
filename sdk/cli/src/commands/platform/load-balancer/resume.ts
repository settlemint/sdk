import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'load-balancer resume' command for the SettleMint SDK.
 * This command resumes a load balancer in the SettleMint platform.
 */
export function loadBalancerResumeCommand() {
  return getResumeCommand({
    name: "load-balancer",
    type: "load balancer",
    alias: "lb",
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER",
    resumeFunction: async (settlemint, id) => {
      return settlemint.loadBalancer.resume(id);
    },
  });
}
