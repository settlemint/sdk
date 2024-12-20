import { mapPassthroughOptions } from "@/utils/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatBuildCommand() {
  return new Command("build")
    .description("Build the smart contracts using Hardhat")
    .helpOption(false)
    .option("-h, --help", "Get list of possible hardhat compile options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .action(async (passThroughOptions, cmd) => {
      const hardhatOptions = mapPassthroughOptions(passThroughOptions, cmd);
      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [...args, "hardhat", "compile", ...hardhatOptions]);
    });
}
