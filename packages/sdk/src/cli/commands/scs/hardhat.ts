import { Command } from "@commander-js/extra-typings";
import { hardhatBuildCommand } from "./hardhat/build";
import { hardhatDeployCommand } from "./hardhat/deploy";

/**
 * Creates and returns a Smart Contract Suite (SCS) command.
 * @returns {Command} A Command object for managing smart contract operations.
 */
export function hardhatCommand() {
  const scs = new Command("hardhat");
  scs.description("Interact with the Hardhat solidity development environment");

  // Add the build subcommand
  scs.addCommand(hardhatBuildCommand());
  scs.addCommand(hardhatDeployCommand());

  return scs;
}
