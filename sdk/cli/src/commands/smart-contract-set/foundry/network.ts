import { Command } from "@commander-js/extra-typings";
import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { executeFoundryCommand } from "@/utils/smart-contract-set/execute-foundry-command";

export function foundryNetworkCommand() {
  return new Command("network")
    .description("Start a development network Foundry/anvil")
    .usage(
      createExamples([
        {
          description: "Start a development network using Foundry",
          command: "scs foundry network",
        },
        {
          description: "Get list of possible Anvil options",
          command: "scs foundry network --help",
        },
        {
          description: "Start a development network using Foundry with a specific port",
          command: "scs foundry network --port 3000",
        },
      ]),
    )
    .helpOption(false)
    .option("-h, --help", "Get list of possible anvil options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .arguments("[operands...]")
    .action(async (operands, options, _cmd) => {
      const anvilOptions = mapPassthroughOptions(options, { args: operands } as Command);
      await executeFoundryCommand("anvil", anvilOptions);
    });
}
