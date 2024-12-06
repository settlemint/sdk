import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatBuildCommand() {
  const build = new Command("build");
  build.description("Build the smart contracts using Hardhat");
  build.action(async () => {
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(command, [...args, "hardhat", "compile"]);
  });

  return build;
}
