import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand } from "@settlemint/sdk-utils/terminal";

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
    .action(async (passThroughOptions, cmd) => {
      const hardhatOptions = mapPassthroughOptions(passThroughOptions, cmd);
      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [...args, "hardhat", "node", ...hardhatOptions]);
    });
}
