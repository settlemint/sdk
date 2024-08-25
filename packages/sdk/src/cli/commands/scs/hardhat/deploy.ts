import { Command } from "@commander-js/extra-typings";
import { hardhatDeployLocalCommand } from "./deploy/local";
import { hardhatDeployRemoteCommand } from "./deploy/remote";

/**
 * Creates and returns a Smart Contract Suite (SCS) command.
 * @returns {Command} A Command object for managing smart contract operations.
 */
export function hardhatDeployCommand() {
  const scs = new Command("deploy");
  scs.description("Deploy the smart contracts using Hardhat/ignition");

  // Add the build subcommand
  scs.addCommand(hardhatDeployLocalCommand());
  scs.addCommand(hardhatDeployRemoteCommand());

  return scs;
}
