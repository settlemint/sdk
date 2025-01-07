import { createExamples } from "@/commands/platform/utils/create-examples";
import { mapPassthroughOptions } from "@/utils/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";

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
    .action(async (passThroughOptions, cmd) => {
      const anvilOptions = mapPassthroughOptions(passThroughOptions, cmd);
      await executeCommand("anvil", anvilOptions);
    });
}
