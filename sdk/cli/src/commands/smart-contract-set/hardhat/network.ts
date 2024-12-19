import { mapPassthroughOptions } from "@/utils/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatNetworkCommand() {
  return new Command("network")
    .description("Start a development network using Hardhat")
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
