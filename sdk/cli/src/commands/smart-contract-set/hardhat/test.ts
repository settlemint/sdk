import { mapPassthroughOptions } from "@/utils/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatTestCommand() {
  return new Command("test")
    .description("Test the smart contracts using Hardhat")
    .helpOption(false)
    .option("-h, --help", "Get list of possible hardhat test options")
    .passThroughOptions()
    .allowUnknownOption()
    .action(async (options, cmd) => {
      const hardhatOptions = mapPassthroughOptions(options, cmd);
      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [...args, "hardhat", "test", ...hardhatOptions]);
    });
}
