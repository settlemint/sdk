import { printAsciiArt, printIntro, printOutro } from "@/lib/cli-message";
import { getExecutor, getPkgManager } from "@/lib/package-manager";
import { runCli } from "@/lib/run-cli";
import { Command } from "@commander-js/extra-typings";

export function subgraphBuildCommand() {
  const build = new Command("build")
    .description("Builds a subgraph and (optionally) uploads it to IPFS.")
    .argument("[SUBGRAPH-MANIFEST]", "Path to the subgraph manifest file")
    .option("-i, --ipfs <value>", "Upload build results to an IPFS node")
    .option("-o, --output-dir <dir>", "Output directory for build results", "build/")
    .option("-t, --output-format <format>", "Output format for mappings")
    .option("--skip-migrations", "Skip subgraph migrations")
    .option("--network <value>", "Network configuration to use from the networks config file")
    .option("--network-file <file>", "Networks config file path", "networks.json")
    .action(async (subgraphManifest, options) => {
      printAsciiArt();
      printIntro("Building subgraph");

      const buildOptions = [
        "build",
        ...(subgraphManifest ? [subgraphManifest] : []),
        ...(options.ipfs ? ["-i", options.ipfs] : []),
        ...(options.outputDir ? ["-o", options.outputDir] : []),
        ...(options.outputFormat ? ["--output-format", options.outputFormat] : []),
        ...(options.skipMigrations ? ["--skip-migrations"] : []),
        ...(options.network ? ["--network", options.network] : []),
        ...(options.networkFile ? ["--network-file", options.networkFile] : []),
      ].filter((option): option is string => option !== undefined);

      const executor = getExecutor(getPkgManager());
      await runCli({
        command: executor,
        commandOptions: ["graph", ...buildOptions],
        logFileName: "graph-build.log",
        outputToConsole: true,
      });

      printOutro("Subgraph build completed successfully");
    });

  return build;
}
