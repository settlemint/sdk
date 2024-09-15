import { printAsciiArt, printIntro, printOutro } from "@/lib/cli-message";
import { runCli } from "@/lib/run-cli";
import { Command } from "@commander-js/extra-typings";

export function forgeFormatCommand() {
  const format = new Command("fmt")
    .description("Format Solidity source files")
    .argument("[PATH]...", "Path to the file, directory or '-' to read from stdin")
    .option("--root <PATH>", "The project's root path")
    .option("--check", "Run in 'check' mode")
    .option("-r, --raw", "In 'check' and stdin modes, outputs raw formatted code instead of the diff")
    .addHelpText(
      "after",
      "\nBy default, the root is the Git repository root, if in one, or the current working directory.",
    );

  format.action(async (paths, options) => {
    printAsciiArt();
    printIntro("Formatting Solidity source files");

    const formatOptions = [
      "fmt",
      ...(paths || []),
      ...(options.root ? ["--root", options.root] : []),
      ...(options.check ? ["--check"] : []),
      ...(options.raw ? ["--raw"] : []),
    ].filter((option): option is string => option !== undefined);

    await runCli({
      command: "forge",
      commandOptions: formatOptions,
      logFileName: "forge-format.log",
      outputToConsole: true,
    });

    printOutro("Forge format completed successfully");
  });

  return format;
}
