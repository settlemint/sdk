import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils/terminal";

export function foundryBuildCommand() {
  return new Command("build")
    .description("Build the smart contracts using Foundry/forge")
    .usage(
      createExamples([
        {
          description: "Build the smart contracts using Foundry",
          command: "scs foundry build",
        },
        {
          description: "Get list of possible Forge build options",
          command: "scs foundry build --help",
        },
        {
          description: "Build the smart contracts with additional Forge options",
          command: "scs foundry build --optimize --force",
        },
      ]),
    )
    .helpOption(false)
    .option("-h, --help", "Get list of possible forge options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .action(async (passThroughOptions, cmd) => {
      const forgeOptions = mapPassthroughOptions(passThroughOptions, cmd);
      await executeCommand("forge", ["build", ...forgeOptions]);
    });
}
