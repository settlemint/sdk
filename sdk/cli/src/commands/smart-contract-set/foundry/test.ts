import { createExamples } from "@/commands/platform/utils/create-examples";
import { mapPassthroughOptions } from "@/utils/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";

export function foundryTestCommand() {
  return new Command("test")
    .description("Test the smart contracts using Foundry/forge")
    .usage(
      createExamples([
        {
          description: "Run tests using Foundry",
          command: "scs foundry test",
        },
        {
          description: "Get list of possible Forge test options",
          command: "scs foundry test --help",
        },
        {
          description: "Run a specific test function",
          command: "scs foundry test --match-test testToken",
        },
      ]),
    )
    .helpOption(false)
    .option("-h, --help", "Get list of possible forge options")
    .passThroughOptions()
    .allowUnknownOption(true)
    .action(async (passThroughOptions, cmd) => {
      const forgeOptions = mapPassthroughOptions(passThroughOptions, cmd);
      await executeCommand("forge", ["test", ...forgeOptions]);
    });
}
