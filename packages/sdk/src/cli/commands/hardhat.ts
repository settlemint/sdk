import { hardhatCompileCommand } from "@/cli/commands/hardhat/compile";
import { hardhatDeployCommand } from "@/cli/commands/hardhat/deploy";
import { Command } from "@commander-js/extra-typings";

/**
 * Creates and returns a Smart Contract Suite (SCS) command.
 * @returns {Command} A Command object for managing smart contract operations.
 */
export function hardhatCommand() {
  const scs = new Command("hardhat");
  scs.description("Interact with the Hardhat solidity development environment");

  // Add the build subcommand
  scs.addCommand(hardhatCompileCommand());
  scs.addCommand(hardhatDeployCommand());

  return scs;
}
