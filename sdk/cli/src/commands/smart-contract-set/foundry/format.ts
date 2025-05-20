import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { executeFoundryCommand } from "@/utils/smart-contract-set/execute-foundry-command";
import { Command } from "@commander-js/extra-typings";
import { intro, outro } from "@settlemint/sdk-utils/terminal";

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
    .arguments("[operands...]")
    .action(async (operands, options, cmd) => {
      intro("Formatting smart contracts using Foundry");
      const forgeOptions = mapPassthroughOptions(options, { args: operands } as Command);
      await executeFoundryCommand("forge", ["fmt", ...forgeOptions]);
      outro("Smart contracts formatted successfully");
    });
}
