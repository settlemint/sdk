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

/**
 * Creates and returns the 'smart-contract-set' command for the SettleMint SDK.
 * This command provides functionality to manage smart contract sets,
 * including creation, updates and deletion.
 *
 * @returns {Command} The configured 'smart-contract-set' command
 */
export function smartContractSetCommand(): Command {
  const foundry = new Command("foundry");
  foundry.addCommand(foundryBuildCommand());
  foundry.addCommand(foundryFormatCommand());
  foundry.addCommand(foundryNetworkCommand());
  foundry.addCommand(foundryTestCommand());

  const hardhat = new Command("hardhat");
  hardhat.addCommand(hardhatBuildCommand());
  hardhat.addCommand(hardhatDeployCommand());
  hardhat.addCommand(hardhatNetworkCommand());
  hardhat.addCommand(hardhatScriptCommand());
  hardhat.addCommand(hardhatTestCommand());

  return new Command("smart-contract-set")
    .alias("scs")
    .description("Manage smart contract sets")
    .addCommand(createCommand())
    .addCommand(foundry)
    .addCommand(hardhat);
}
