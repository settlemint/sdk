import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatTestCommand() {
  const test = new Command("test");
  test.description("Test the smart contracts using Hardhat");
  test.action(async () => {
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(command, [...args, "hardhat", "test"]);
  });

  return test;
}
