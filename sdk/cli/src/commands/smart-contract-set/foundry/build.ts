import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";

export function foundryBuildCommand() {
  const build = new Command("build");
  build.description("Build the smart contracts using Foundry/forge");
  build.action(async () => {
    await $`forge build`;
  });

  return build;
}
