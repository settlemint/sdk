import { printAsciiArt, printIntro, printOutro, printSpinner } from "@/cli/lib/cli-message";
import { runHardhat } from "@/cli/lib/hardhat";
import { Command } from "@commander-js/extra-typings";

export function hardhatCompileCommand() {
  const compile = new Command("compile")
    .description("Compile the smart contracts using Hardhat")
    .option(
      "--concurrency <number>",
      "Number of compilation jobs executed in parallel (Defaults to the number of CPU cores - 1)",
    )
    .option("--force", "Force compilation ignoring cache")
    .option("--quiet", "Makes the compilation process less verbose");

  compile.action(async ({ concurrency, force, quiet }) => {
    printAsciiArt();
    printIntro("Compiling the smart contracts");
    await printSpinner({
      startMessage: "Running hardhat compile",
      task: async () => {
        const options = [
          ...(concurrency ? ["--concurrency", concurrency] : []),
          ...(force ? ["--force"] : []),
          ...(quiet ? ["--quiet"] : []),
        ];
        await runHardhat("compile", ...options);
      },
      stopMessage: "Smart contracts compiled",
    });
    printOutro("Smart contracts built");
  });

  return compile;
}
