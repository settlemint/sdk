import { telemetry } from "@/utils/telemetry";
import { Command } from "@commander-js/extra-typings";
import { ascii } from "@settlemint/sdk-utils/terminal";
import pkg from "../../package.json";
import { codegenCommand } from "./codegen";
import { connectCommand } from "./connect";
import { createCommand } from "./create";
import { loginCommand } from "./login";
import { logoutCommand } from "./logout";
import { platformCommand } from "./platform";
import { smartContractSetCommand } from "./smart-contract.set";

// Extend Command type to include our custom properties
type ExtendedCommand = Command & {
  _commandPath?: string;
  _lastCommand?: ExtendedCommand;
};

function getCommandPath(command: Command): string {
  const parts: string[] = [];
  let currentCommand: Command | null = command;

  while (currentCommand) {
    if (currentCommand.name() !== "settlemint") {
      parts.unshift(currentCommand.name());
    }
    currentCommand = currentCommand.parent as Command | null;
  }

  return parts.join(" ");
}

function getCommandPathFromArgv(argv: string[]): string | null {
  // Get the command path from argv, skipping the first two arguments (node/bun and script name)
  const settlemintIndex = argv.indexOf("settlemint");
  const args = argv.slice(settlemintIndex !== -1 ? settlemintIndex + 1 : 0);
  if (!args.length) {
    return null;
  }
  return args.join(" ");
}

function isLeafCommand(command: Command): boolean {
  return command.commands.length === 0;
}

function isJsonOrYamlOutput(command: Command): boolean {
  const options = command.opts() as { output?: string };
  return typeof options.output === "string" && (options.output === "json" || options.output === "yaml");
}

function addHooksToCommand(cmd: Command, rootCmd: ExtendedCommand, argv: string[]) {
  const extendedCmd = cmd as ExtendedCommand;
  extendedCmd
    .hook("preAction", async (thisCommand) => {
      if (isLeafCommand(thisCommand)) {
        const commandPath = getCommandPath(thisCommand);
        rootCmd._lastCommand = thisCommand as ExtendedCommand;
        rootCmd._lastCommand._commandPath = commandPath;
      }
      if (isLeafCommand(thisCommand) && !isJsonOrYamlOutput(thisCommand)) {
        ascii();
      }
    })
    .hook("postAction", async (thisCommand) => {
      // Only send telemetry for leaf commands (commands without subcommands)
      if (isLeafCommand(thisCommand)) {
        const commandPath = thisCommand._commandPath ?? getCommandPathFromArgv(argv);
        if (commandPath) {
          await telemetry({
            command: commandPath,
            status: "success",
          });
        }
      }
    });

  // Recursively add hooks to subcommands
  for (const subcmd of cmd.commands) {
    addHooksToCommand(subcmd as Command, rootCmd, argv);
  }
}

async function onError(sdkcli: ExtendedCommand, argv: string[], error: Error) {
  // Get the command path from the command that threw the error
  const commandPath = sdkcli._lastCommand?._commandPath ?? getCommandPathFromArgv(argv);
  if (commandPath) {
    await telemetry({
      command: commandPath,
      status: "error",
      message: error.message,
    });
  }
  process.exit(1);
}

/**
 * Registers the commands for the SettleMint CLI.
 * @returns The main Command instance for the SettleMint CLI.
 */
export function registerCommands() {
  /**
   * The main Command instance for the SettleMint CLI.
   */
  const sdkcli = new Command() as ExtendedCommand;

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
  sdkcli.addCommand(smartContractSetCommand());
  sdkcli.addCommand(createCommand());
  sdkcli.addCommand(loginCommand());
  sdkcli.addCommand(logoutCommand());

  return sdkcli;
}

/**
 * Parses command line arguments and executes the appropriate command.
 * Handles any errors that occur during execution.
 * @param argv - The command line arguments to parse. Defaults to process.argv.
 * @throws {Error} If an unexpected error occurs during command execution.
 */
export async function sdkCliCommand(argv: string[] = process.argv) {
  /**
   * The main Command instance for the SettleMint CLI.
   */
  const sdkcli = registerCommands();

  sdkcli.exitOverride((error) => onError(sdkcli, argv, error));

  // Add hooks to all commands including subcommands recursively
  for (const cmd of sdkcli.commands) {
    addHooksToCommand(cmd as Command, sdkcli, argv);
  }

  try {
    await sdkcli.parseAsync(argv);
  } catch (err) {
    const error = err as Error;
    onError(sdkcli, argv, error);
  }
}
