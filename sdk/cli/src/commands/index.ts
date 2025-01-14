import { telemetry } from "@/utils/telemetry";
import { Command, type CommandUnknownOpts } from "@commander-js/extra-typings";
import { cancel } from "@settlemint/sdk-utils/terminal";
import pkg from "../../package.json";
import { codegenCommand } from "./codegen";
import { connectCommand } from "./connect";
import { createCommand } from "./create";
import { loginCommand } from "./login";
import { logoutCommand } from "./logout";
import { platformCommand } from "./platform";
import { smartContractSetCommand } from "./smart-contract.set";

// Extend Command type to include our custom properties
type ExtendedCommand = CommandUnknownOpts & {
  _commandPath?: string;
  _lastCommand?: ExtendedCommand;
};

function getCommandPath(command: CommandUnknownOpts): string {
  const parts: string[] = [];
  let currentCommand: CommandUnknownOpts | null = command;

  while (currentCommand) {
    if (currentCommand.name() !== "settlemint") {
      parts.unshift(currentCommand.name());
    }
    currentCommand = currentCommand.parent;
  }

  return parts.join(" ");
}

function addHooksToCommand(cmd: CommandUnknownOpts, rootCmd: ExtendedCommand) {
  const extendedCmd = cmd as ExtendedCommand;
  extendedCmd
    .hook("preAction", async (thisCommand) => {
      const commandPath = getCommandPath(thisCommand);
      rootCmd._lastCommand = thisCommand as ExtendedCommand;
      rootCmd._lastCommand._commandPath = commandPath;
    })
    .hook("postAction", async (thisCommand) => {
      // Only send telemetry for leaf commands (commands without subcommands)
      if (thisCommand.commands.length === 0) {
        const commandPath = getCommandPath(thisCommand);
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
    addHooksToCommand(subcmd, rootCmd);
  }
}

export function sdkCliCommand(exitOverride: (() => void) | undefined = undefined) {
  /**
   * The main Command instance for the SettleMint CLI.
   */
  const sdkcli = new Command() as ExtendedCommand;

  if (exitOverride) {
    sdkcli.exitOverride(exitOverride);
  }

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

  // Add hooks to all commands including subcommands recursively
  for (const cmd of sdkcli.commands) {
    addHooksToCommand(cmd, sdkcli);
  }

  if (!exitOverride) {
    /**
     * Parses command line arguments and executes the appropriate command.
     * Handles any errors that occur during execution.
     *
     * @throws {Error} If an unexpected error occurs during command execution.
     */
    sdkcli.parseAsync(process.argv).catch(async (error: Error) => {
      // Get the command path from the command that threw the error
      const commandPath = sdkcli._lastCommand?._commandPath;
      if (commandPath) {
        await telemetry({
          command: commandPath,
          status: "error",
          message: error.message,
        });
      }
      cancel(error.message);
    });
  }

  return sdkcli;
}
