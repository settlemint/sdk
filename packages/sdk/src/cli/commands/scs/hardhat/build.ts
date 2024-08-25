import { Command } from "@commander-js/extra-typings";
import { printAsciiArt, printIntro, printOutro, printSpinner } from "../../../lib/cli-message";
import { runHardhat } from "../../../lib/hardhat";

export function hardhatBuildCommand() {
  const build = new Command("build");
  build.description("Build the smart contracts using Hardhat");
  build.action(async () => {
    printAsciiArt();
    printIntro("Building the smart contracts");
    await printSpinner({
      startMessage: "Running hardhat compile",
      task: async () => {
        await runHardhat("compile");
      },
      stopMessage: "Smart contracts compiled",
    });
    printOutro("Smart contracts built");
  });

  return build;
}
