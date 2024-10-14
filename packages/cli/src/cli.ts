#!/usr/bin/env node

/**
 * Main entry point for the SettleMint CLI.
 *
 * This script sets up the CLI environment, configures commands, and handles execution.
 *
 * @module cli
 * @example
 * ```bash
 * settlemint [command]
 * ```
 */

import { codegenCommand } from "@/commands/codegen";
import { connectCommand } from "@/commands/connect";
import { Command } from "@commander-js/extra-typings";
import { ascii, cancel } from "@settlemint/sdk-utils/terminal";
import pkg from "../package.json";
import { platformCommand } from "./commands/platform";

ascii();

/**
 * The main Command instance for the SettleMint CLI.
 */
const sdkcli = new Command();

// Configure the CLI command
sdkcli
  .name("settlemint")
  .usage("[command]")
  .description(`CLI for SettleMint (v${pkg.version})`)
  .version(pkg.version, "-v, --version", "Output the current version")
  .helpOption("-h, --help", "Display help for command")
  .allowUnknownOption()
  .showSuggestionAfterError(true)
  .showHelpAfterError();

// Add commands to the CLI
sdkcli.addCommand(connectCommand());
sdkcli.addCommand(codegenCommand());
sdkcli.addCommand(platformCommand());

/**
 * Parses command line arguments and executes the appropriate command.
 * Handles any errors that occur during execution.
 *
 * @throws {Error} If an unexpected error occurs during command execution.
 *
 * @example
 * ```typescript
 * sdkcli.parseAsync(process.argv).catch(async (reason) => {
 *   printCancel("An unexpected error occurred. Please report it as a bug:");
 *   console.error(reason);
 *   process.exit(1);
 * });
 * ```
 */
sdkcli.parseAsync(process.argv).catch((reason) => {
  cancel(reason);
});
