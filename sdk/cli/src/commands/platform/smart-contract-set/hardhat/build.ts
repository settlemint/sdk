import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";

export function hardhatBuildCommand() {
  const build = new Command("build");
  build.description("Build the smart contracts using Hardhat");
  build.action(async () => {
    await $`npx hardhat compile`;
  });

  return build;
}
