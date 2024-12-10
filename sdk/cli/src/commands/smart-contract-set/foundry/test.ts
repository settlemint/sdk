import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";

export function foundryTestCommand() {
  const test = new Command("test");
  test.description("Test the smart contracts using Foundry/forge");
  test.action(async () => {
    await executeCommand("forge", ["test"]);
  });

  return test;
}
