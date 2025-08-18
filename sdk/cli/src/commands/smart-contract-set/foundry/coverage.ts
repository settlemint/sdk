import { Command } from "@commander-js/extra-typings";
import { intro, outro } from "@settlemint/sdk-utils/terminal";
import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { executeFoundryCommand } from "@/utils/smart-contract-set/execute-foundry-command";

export function foundryCoverageCommand() {
  return new Command("coverage")
    .description("Generate coverage report using Foundry/forge")
    .usage(
      createExamples([
        {
          description: "Run coverage using Foundry",
          command: "scs foundry coverage",
        },
        {
          description: "Get list of possible Forge coverage options",
          command: "scs foundry coverage --help",
        },
        {
          description: "Generate lcov report with additional Forge options",
          command: "scs foundry coverage --report lcov",
        },
      ]),
    )
    .helpOption(false)
    .option("-h, --help", "Get list of possible forge options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .arguments("[operands...]")
    .action(async (operands, options, _cmd) => {
      intro("Running smart contract coverage using Foundry");
      const forgeOptions = mapPassthroughOptions(options, { args: operands } as Command);
      await executeFoundryCommand("forge", ["coverage", ...forgeOptions]);
      outro("Smart contract coverage completed");
    });
}
