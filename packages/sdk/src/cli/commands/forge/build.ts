import { printAsciiArt, printIntro, printOutro, printSpinner } from "@/cli/lib/cli-message";
import { runCli } from "@/cli/lib/run-cli";
import { Command } from "@commander-js/extra-typings";

export function forgeBuildCommand() {
  const compile = new Command("build")
    .description("Build the project's smart contracts")
    .option("--names", "Print compiled contract names")
    .option("--sizes", "Print compiled contract sizes")
    .option("--no-cache", "Disable the cache")
    .option("--force", "Clear the cache and artifacts folder and recompile")
    .option("--libraries <LIBRARIES>", "Set pre-linked libraries")
    .option("--ignored-error-codes <ERROR_CODES>", "Ignore solc warnings by error code")
    .option("--deny-warnings", "Warnings will trigger a compiler error")
    .option("--no-auto-detect", "Do not auto-detect the `solc` version")
    .option("--use <SOLC_VERSION>", "Specify the solc version to build with")
    .option("--offline", "Do not access the network")
    .option("--via-ir", "Use the Yul intermediate representation compilation pipeline")
    .option("--no-metadata", "Do not append any metadata to the bytecode")
    .option("--silent", "Don't print anything on startup")
    .option("--optimize", "Activate the Solidity optimizer")
    .option("--optimizer-runs <RUNS>", "The number of optimizer runs")
    .option("-o, --out <PATH>", "The path to the contract artifacts folder")
    .option("--build-info", "Generate build info files")
    .option("--build-info-path <PATH>", "Output path to directory for build info files")
    .option("-w, --watch [<PATH>...]", "Watch for changes and rebuild")
    .option("--format-json", "Output compilation errors in JSON format")
    .argument("[PATHS...]", "Build source files from specified paths");

  compile.action(async (paths, options) => {
    printAsciiArt();
    printIntro("Building the smart contracts");
    const notes = await printSpinner({
      startMessage: "Running forge build",
      task: async () => {
        const buildOptions = [
          "build",
          ...(options.names ? ["--names"] : []),
          ...(options.sizes ? ["--sizes"] : []),
          ...(!options.cache ? ["--no-cache"] : []),
          ...(options.force ? ["--force"] : []),
          ...(options.libraries ? ["--libraries", options.libraries] : []),
          ...(options.ignoredErrorCodes ? ["--ignored-error-codes", options.ignoredErrorCodes] : []),
          ...(options.denyWarnings ? ["--deny-warnings"] : []),
          ...(!options.autoDetect ? ["--no-auto-detect"] : []),
          ...(options.use ? ["--use", options.use] : []),
          ...(options.offline ? ["--offline"] : []),
          ...(options.viaIr ? ["--via-ir"] : []),
          ...(!options.metadata ? ["--no-metadata"] : []),
          ...(options.silent ? ["--silent"] : []),
          ...(options.optimize ? ["--optimize"] : []),
          ...(options.optimizerRuns ? ["--optimizer-runs", options.optimizerRuns] : []),
          ...(options.out ? ["-o", options.out] : []),
          ...(options.buildInfo ? ["--build-info"] : []),
          ...(options.buildInfoPath ? ["--build-info-path", options.buildInfoPath] : []),
          ...(options.watch ? ["-w", ...(Array.isArray(options.watch) ? options.watch : [])] : []),
          ...(options.formatJson ? ["--format-json"] : []),
          ...paths,
        ];

        return await runCli({
          command: "forge",
          commandOptions: buildOptions,
          logFileName: "forge.log",
        });
      },
      stopMessage: "Smart contracts built successfully",
    });
    printOutro(notes);
  });

  return compile;
}
