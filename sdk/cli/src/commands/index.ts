import { Command } from "@commander-js/extra-typings";
import { cancel } from "@settlemint/sdk-utils/terminal";
import pkg from "../../package.json";
import { codegenCommand } from "./codegen";
import { connectCommand } from "./connect";
import { createCommand } from "./create";
import { loginCommand } from "./login";
import { logoutCommand } from "./logout";
import { platformCommand } from "./platform";
import { smartContractSetCommand } from "./smart-contract.set";

export function sdkCliCommand(exitOverride: (() => void) | undefined = undefined) {
  /**
   * The main Command instance for the SettleMint CLI.
   */
  const sdkcli = new Command();

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

  if (!exitOverride) {
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
    sdkcli.parseAsync(process.argv).catch((reason: Error) => {
      cancel(reason.message);
    });
  }

  return sdkcli;
}
