import { printAsciiArt, printIntro, printOutro } from "@/lib/cli-message";
import { getExecutor, getPkgManager } from "@/lib/package-manager";
import { runCli } from "@/lib/run-cli";
import { Command } from "@commander-js/extra-typings";

export function subgraphCodegenCommand() {
  const codegen = new Command("codegen")
    .description("Generates AssemblyScript types for a subgraph.")
    .argument("[SUBGRAPH-MANIFEST]", "Path to the subgraph manifest file")
    .option("-o, --output-dir <dir>", "Output directory for generated types", "generated/")
    .option("--skip-migrations", "Skip subgraph migrations")
    .option("-w, --watch", "Regenerate types when subgraph files change")
    .option("-u, --uncrashable", "Generate Float Subgraph Uncrashable helper file")
    .option("--uncrashable-config <dir>", "Directory for uncrashable config")
    .action(async (subgraphManifest, options) => {
      printAsciiArt();
      printIntro("Generating AssemblyScript types for subgraph");

      const codegenOptions = [
        "codegen",
        subgraphManifest,
        "-o",
        options.outputDir,
        ...(options.skipMigrations ? ["--skip-migrations"] : []),
        ...(options.uncrashable ? ["-u"] : []),
        ...(options.uncrashableConfig ? ["--uncrashable-config", options.uncrashableConfig] : []),
      ].filter((option): option is string => option !== undefined);

      const executor = getExecutor(getPkgManager());
      await runCli({
        command: executor,
        commandOptions: ["graph", ...codegenOptions],
        logFileName: "graph-codegen.log",
        outputToConsole: true,
      });

      printOutro("AssemblyScript types generation completed successfully");
    });

  return codegen;
}
