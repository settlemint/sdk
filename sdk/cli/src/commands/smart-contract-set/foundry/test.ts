import { createExamples } from "@/utils/commands/create-examples";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { executeFoundryCommand } from "@/utils/smart-contract-set/execute-foundry-command";
import { Command } from "@commander-js/extra-typings";
import { intro, outro } from "@settlemint/sdk-utils/terminal";

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
    .arguments("[operands...]")
    .action(async (operands, options, _cmd) => {
      intro("Running smart contract tests using Foundry");
      const forgeOptions = mapPassthroughOptions(options, { args: operands } as Command);
      await executeFoundryCommand("forge", ["test", ...forgeOptions]);
      outro("Smart contract tests completed");
    });
}
