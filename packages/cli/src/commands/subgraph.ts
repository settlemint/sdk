import { Command } from "@commander-js/extra-typings";
import { subgraphBuildCommand } from "./subgraph/build";
import { subgraphCodegenCommand } from "./subgraph/codegen";
import { subgraphDeployCommand } from "./subgraph/deploy";

/**
 * Creates and returns a Smart Contract Suite (SCS) command.
 * @returns {Command} A Command object for managing smart contract operations.
 */
export function subgraphCommand() {
  const sg = new Command("subgraph");
  sg.description("Interact with the cli from The Graph for subgraphs");

  // Add the build subcommand
  sg.addCommand(subgraphCodegenCommand());
  sg.addCommand(subgraphBuildCommand());
  sg.addCommand(subgraphDeployCommand());

  return sg;
}
