import { mapPassthroughOptions } from "@/utils/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";

export function foundryNetworkCommand() {
  return new Command("network")
    .description("Start a development network Foundry/anvil")
    .helpOption(false)
    .option("-h, --help", "Get list of possible anvil options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .action(async (passThroughOptions, cmd) => {
      const anvilOptions = mapPassthroughOptions(passThroughOptions, cmd);
      await executeCommand("anvil", anvilOptions);
    });
}
