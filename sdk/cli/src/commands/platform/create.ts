import { blockchainNetworkCreateCommand } from "@/commands/platform/blockchain-network/create";
import { workspaceCreateCommand } from "@/commands/platform/workspace/create";
import { Command } from "@commander-js/extra-typings";
import { applicationAccessTokenCreateCommand } from "./apllication-access-tokens/create";
import { applicationCreateCommand } from "./application/create";
import { insightsCreateCommand } from "./insights/create";
import { integrationToolCreateCommand } from "./integration-tools/create";
import { middlewareCreateCommand } from "./middleware/create";
import { privateKeyCreateCommand } from "./private-key/create";
import { storageCreateCommand } from "./storage/create";

/**
 * Creates and returns the 'create' command for the SettleMint SDK.
 * This command provides functionality to create resources in the SettleMint platform.
 *
 * @returns {Command} The configured 'create' command with its subcommands
 */
export function createCommand(): Command {
  return new Command("create")
    .alias("c")
    .description("Create a resource in the SettleMint platform")
    .addCommand(workspaceCreateCommand())
    .addCommand(applicationCreateCommand())
    .addCommand(blockchainNetworkCreateCommand())
    .addCommand(privateKeyCreateCommand())
    .addCommand(middlewareCreateCommand())
    .addCommand(storageCreateCommand())
    .addCommand(integrationToolCreateCommand())
    .addCommand(insightsCreateCommand())
    .addCommand(applicationAccessTokenCreateCommand());
}
