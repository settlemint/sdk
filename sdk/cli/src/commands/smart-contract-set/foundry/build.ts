import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";

export function foundryBuildCommand() {
  const build = new Command("build");
  build.description("Build the smart contracts using Foundry/forge");
  build.action(async () => {
    await executeCommand("forge", ["build"]);
  });

  return build;
}
