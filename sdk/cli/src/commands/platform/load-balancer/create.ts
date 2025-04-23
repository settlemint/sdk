import { Command } from "@commander-js/extra-typings";
import { loadBalancerEvmCreateCommand } from "./evm/create";

/**
 * Creates and returns the 'load-balancer' command for the SettleMint SDK.
 * This command provides functionality to create load balancers in the SettleMint platform.
 *
 * @returns {Command} The configured 'load-balancer' command with its subcommands
 */
export function loadBalancerCreateCommand(): Command {
  return new Command("load-balancer")
    .alias("lb")
    .description("Create a load balancer in the SettleMint platform")
    .addCommand(loadBalancerEvmCreateCommand());
}
