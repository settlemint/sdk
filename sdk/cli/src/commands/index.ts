import { telemetry } from "@/utils/telemetry";
import { Command } from "@commander-js/extra-typings";
import { CancelError, ascii, cancel } from "@settlemint/sdk-utils/terminal";
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

let lastCommandPath: string | null = null;

function setLastCommandPath(command: Command): void {
  const parts: string[] = [];
  let currentCommand: Command | null = command;

  while (currentCommand) {
    if (currentCommand.name() !== "settlemint") {
      parts.unshift(currentCommand.name());
    }
    currentCommand = currentCommand.parent as Command | null;
  }

  lastCommandPath = parts.join(" ");
}

function getCommandPathFromArgv(argv: string[]): string | null {
  // Get the command path from argv, skipping the first two arguments (node/bun and script name)
  const args = argv.slice(argv.indexOf("settlemint") + 1);
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
        setLastCommandPath(thisCommand);
      }
      if (isLeafCommand(thisCommand) && !isJsonOrYamlOutput(thisCommand)) {
        ascii();
      }
    })
    .hook("postAction", async (thisCommand) => {
      // Only send telemetry for leaf commands (commands without subcommands)
      if (isLeafCommand(thisCommand)) {
        const commandPath = lastCommandPath ?? getCommandPathFromArgv(argv);
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

export function sdkCliCommand(argv: string[] = process.argv) {
  /**
   * The main Command instance for the SettleMint CLI.
   */
  const sdkcli = new Command() as ExtendedCommand;

  sdkcli.exitOverride(onError);

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

  async function onError(error: Error) {
    // Get the command path from the command that threw the error
    const commandPath = lastCommandPath ?? getCommandPathFromArgv(argv);
    if (commandPath) {
      await telemetry({
        command: commandPath,
        status: "error",
        message: error.message,
      });
    }
    if (!(error instanceof CancelError)) {
      cancel(error.message);
    }
  }

  // Add hooks to all commands including subcommands recursively
  for (const cmd of sdkcli.commands) {
    addHooksToCommand(cmd as Command, sdkcli, argv);
  }

  /**
   * Parses command line arguments and executes the appropriate command.
   * Handles any errors that occur during execution.
   *
   * @throws {Error} If an unexpected error occurs during command execution.
   */
  lastCommandPath = null;
  return new Promise((resolve, reject) => {
    sdkcli
      .parseAsync(argv)
      .then(resolve)
      .catch((err: Error) => {
        onError(err);
        reject(err);
      });
  });
}
