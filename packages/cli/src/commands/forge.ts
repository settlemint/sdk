import { forgeBuildCommand } from "@/commands/forge/build";
import { Command } from "@commander-js/extra-typings";
import { forgeCreateCommand } from "./forge/create";
import { forgeFormatCommand } from "./forge/format";
import { forgeTestCommand } from "./forge/test";

/**
 * Creates and returns a Smart Contract Suite (SCS) command.
 * @returns {Command} A Command object for managing smart contract operations.
 */
export function forgeCommand() {
  const scs = new Command("forge");
  scs.description("Interact with the Forge solidity development environment");

  // Add the build subcommand
  scs.addCommand(forgeBuildCommand());
  scs.addCommand(forgeCreateCommand());
  scs.addCommand(forgeTestCommand());
  scs.addCommand(forgeFormatCommand());

  return scs;
}
