import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";
import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";

export function hardhatNetworkCommand() {
  return new Command("network")
    .description("Start a development network using Hardhat")
    .usage(
      createExamples([
        {
          description: "Start a development network using Hardhat",
          command: "scs hardhat network",
        },
        {
          description: "Get list of possible Hardhat node options",
          command: "scs hardhat network --help",
        },
        {
          description: "Start a development network using Hardhat with a specific port",
          command: "scs hardhat network --port 3000",
        },
      ]),
    )
    .helpOption(false)
    .option("-h, --help", "Get list of possible hardhat node options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .arguments("[operands...]")
    .action(async (operands, options, _cmd) => {
      intro("Starting development network using Hardhat");
      await validateIfRequiredPackagesAreInstalled(["hardhat"]);
      const hardhatOptions = mapPassthroughOptions(options, { args: operands } as Command);
      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [...args, "hardhat", "node", ...hardhatOptions]);
      outro("Development network started successfully");
    });
}
