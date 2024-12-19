import { mapPassthroughOptions } from "@/utils/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";

export function foundryBuildCommand() {
  return new Command("build")
    .description("Build the smart contracts using Foundry/forge")
    .helpOption(false)
    .option("-h, --help", "Get list of possible forge options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .action(async (passThroughOptions, cmd) => {
      const forgeOptions = mapPassthroughOptions(passThroughOptions, cmd);
      await executeCommand("forge", ["build", ...forgeOptions]);
    });
}
