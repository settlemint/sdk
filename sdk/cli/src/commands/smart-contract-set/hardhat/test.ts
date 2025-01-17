import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand } from "@settlemint/sdk-utils/terminal";

export function hardhatTestCommand() {
  return new Command("test")
    .description("Test the smart contracts using Hardhat")
    .usage(
      createExamples([
        {
          description: "Run tests using Hardhat",
          command: "scs hardhat test",
        },
        {
          description: "Get list of possible Hardhat test options",
          command: "scs hardhat test --help",
        },
        {
          description: "Run tests and stop on the first test that fails",
          command: "scs hardhat test --bail",
        },
        {
          description: "Run a specific test file",
          command: "scs hardhat test test/token.test.ts",
        },
      ]),
    )
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
