import { Command } from "@commander-js/extra-typings";
import { hardhatCommand } from "./scs/hardhat";

/**
 * Creates and returns a Smart Contract Suite (SCS) command.
 * @returns {Command} A Command object for managing smart contract operations.
 */
export function scsCommand() {
  const scs = new Command("scs");
  scs.description("Interact with the Smart Contract Set");

  // Add the build subcommand
  scs.addCommand(hardhatCommand());

  return scs;
}
