import { createExamples } from "@/commands/platform/utils/create-examples";
import { mapPassthroughOptions } from "@/utils/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils/terminal";
import { note } from "@settlemint/sdk-utils/terminal";

export function foundryFormatCommand() {
  return new Command("format")
    .description("Format the smart contracts using Foundry/forge")
    .usage(
      createExamples([
        {
          description: "Format the smart contracts using Foundry",
          command: "scs foundry format",
        },
        {
          description: "Get list of possible Forge format options",
          command: "scs foundry format --help",
        },
        {
          description: "Format the smart contracts with additional Forge options",
          command: "scs foundry format --check",
        },
      ]),
    )
    .helpOption(false)
    .option("-h, --help", "Get list of possible forge options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .action(async (passThroughOptions, cmd) => {
      const forgeOptions = mapPassthroughOptions(passThroughOptions, cmd);
      await executeCommand("forge", ["fmt", ...forgeOptions]);
      note("Smart contract set formatted successfully!");
    });
}
