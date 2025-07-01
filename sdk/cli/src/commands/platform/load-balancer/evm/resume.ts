import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'evm resume' command for the SettleMint SDK.
 * This command resumes an EVM load balancer in the SettleMint platform.
 */
export function evmLoadBalancerResumeCommand() {
  return getResumeCommand({
    name: "evm",
    type: "load balancer",
    alias: "lb",
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER",
    resumeFunction: async (settlemint, id) => {
      return settlemint.loadBalancer.resume(id);
    },
  });
}
