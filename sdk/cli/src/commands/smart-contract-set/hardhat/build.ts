import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";

export function hardhatBuildCommand() {
  return new Command("build")
    .description("Build the smart contracts using Hardhat")
    .usage(
      createExamples([
        {
          description: "Build the smart contracts using Hardhat",
          command: "scs hardhat build",
        },
        {
          description: "Get list of possible Hardhat compile options",
          command: "scs hardhat build --help",
        },
        {
          description: "Build the smart contracts using additional options to the Hardhat compile command",
          command: "scs hardhat build --concurrency 2",
        },
      ]),
    )
    .helpOption(false)
    .option("-h, --help", "Get list of possible hardhat compile options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .arguments("[operands...]")
    .action(async (operands, options, cmd) => {
      intro("Building smart contracts using Hardhat");
      await validateIfRequiredPackagesAreInstalled(["hardhat"]);
      const hardhatOptions = mapPassthroughOptions(options, { args: operands } as Command);
      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [...args, "hardhat", "compile", ...hardhatOptions]);
      outro("Smart contracts built successfully");
    });
}
