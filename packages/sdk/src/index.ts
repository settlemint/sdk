// Import necessary modules and functions
import { cancel } from "@clack/prompts";
import { Command } from "@commander-js/extra-typings";
import dotenv from "dotenv";
import pkg from "../package.json";
import { codegenCommand } from "./commands/codegen.ts";
import { connectCommand } from "./commands/connect.ts";
import { createCommand } from "./commands/create.ts";

// Load environment variables from .env.local and .env files
// Override existing env vars with those found in the files
dotenv.config({
  path: [".env.local", ".env"],
  override: true,
});

// Create a new Command instance for the CLI
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

// Add the init command to the CLI
sdkcli.addCommand(connectCommand());
sdkcli.addCommand(codegenCommand());
sdkcli.addCommand(createCommand());

// Parse command line arguments and handle errors
sdkcli.parseAsync(process.argv).catch(async (reason) => {
  // If an error occurs:
  // 1. Cancel the current operation
  cancel("An unexpected error occurred. Please report it as a bug:");
  // 2. Log the error to the console
  console.error(reason);
  // 3. Exit the process with an error code
  process.exit(1);
});
