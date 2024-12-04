import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";

export function foundryTestCommand() {
  const test = new Command("test");
  test.description("Test the smart contracts using Foundry/forge");
  test.action(async () => {
    await $`forge test`;
  });

  return test;
}
