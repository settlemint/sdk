import { Command } from "@commander-js/extra-typings";
import { createCommand } from "./smart-contract-set/create";
import { foundryBuildCommand } from "./smart-contract-set/foundry/build";
import { foundryFormatCommand } from "./smart-contract-set/foundry/format";
import { foundryNetworkCommand } from "./smart-contract-set/foundry/network";
import { foundryTestCommand } from "./smart-contract-set/foundry/test";
import { hardhatBuildCommand } from "./smart-contract-set/hardhat/build";
import { hardhatDeployCommand } from "./smart-contract-set/hardhat/deploy";
import { hardhatNetworkCommand } from "./smart-contract-set/hardhat/network";
import { hardhatScriptCommand } from "./smart-contract-set/hardhat/script";
import { hardhatTestCommand } from "./smart-contract-set/hardhat/test";
import { subgraphAddCommand } from "./smart-contract-set/subgraph/add";
import { subgraphBuildCommand } from "./smart-contract-set/subgraph/build";
import { subgraphCodegenCommand } from "./smart-contract-set/subgraph/codegen";
import { subgraphDeployCommand } from "./smart-contract-set/subgraph/deploy";
import { subgraphRemoveCommand } from "./smart-contract-set/subgraph/remove";

/**
 * Creates and returns the 'smart-contract-set' command for the SettleMint SDK.
 * This command provides functionality to manage smart contract sets,
 * including creation, updates and deletion.
 *
 * @returns {Command} The configured 'smart-contract-set' command
 */
export function smartContractSetCommand(): Command {
  const foundry = new Command("foundry")
    .alias("f")
    .enablePositionalOptions()
    .description("Foundry commands for building and testing smart contracts");
  foundry.addCommand(foundryBuildCommand());
  foundry.addCommand(foundryFormatCommand());
  foundry.addCommand(foundryNetworkCommand());
  foundry.addCommand(foundryTestCommand());

  const hardhat = new Command("hardhat")
    .alias("h")
    .enablePositionalOptions()
    .description("Hardhat commands for building, testing and deploying smart contracts");
  hardhat.addCommand(hardhatBuildCommand());
  hardhat.addCommand(hardhatDeployCommand());
  hardhat.addCommand(hardhatNetworkCommand());
  hardhat.addCommand(hardhatScriptCommand());
  hardhat.addCommand(hardhatTestCommand());

  const subgraph = new Command("subgraph")
    .alias("sg")
    .enablePositionalOptions()
    .description("Commands for managing TheGraph subgraphs for smart contract indexing");
  subgraph.addCommand(subgraphAddCommand());
  subgraph.addCommand(subgraphBuildCommand());
  subgraph.addCommand(subgraphCodegenCommand());
  subgraph.addCommand(subgraphDeployCommand());
  subgraph.addCommand(subgraphRemoveCommand());

  return new Command("smart-contract-set")
    .alias("scs")
    .description("Manage smart contract sets and subgraphs")
    .addCommand(createCommand())
    .addCommand(foundry)
    .addCommand(hardhat)
    .addCommand(subgraph);
}
