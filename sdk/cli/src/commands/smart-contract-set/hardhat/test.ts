import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";

export function hardhatTestCommand() {
  const test = new Command("test");
  test.description("Test the smart contracts using Hardhat");
  test.action(async () => {
    await $`npx hardhat test`;
  });

  return test;
}
