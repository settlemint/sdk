import { printAsciiArt, printIntro, printOutro } from "@/lib/cli-message";
import { runCli } from "@/lib/run-cli";
import { Command } from "@commander-js/extra-typings";

export function forgeTestCommand() {
  const test = new Command("test")
    .description("Run the project's tests")
    .option("--debug <TEST_FUNCTION>", "Run a test in the debugger")
    .option("--decode-internal [<TEST_FUNCTION>]", "Identify internal functions in traces")
    .option("--gas-report", "Print a gas report")
    .option("--allow-failure", "Exit with code 0 even if a test fails")
    .option("--fail-fast", "Stop running tests after the first failure")
    .option("--etherscan-api-key <KEY>", "The Etherscan (or equivalent) API key")
    .option("--fuzz-seed <FUZZ_SEED>", "Set seed used to generate randomness during fuzz runs")
    .option("--fuzz-runs <RUNS>", "Number of fuzz runs")
    .option("--fuzz-input-file <FUZZ_INPUT_FILE>", "File to rerun fuzz failures from")
    .option("-j, --threads <THREADS>", "Max concurrent threads to use")
    .option("--show-progress", "Show test execution progress")
    .option("--json", "Output test results in JSON format")
    .option("-l, --list", "List tests instead of running them")
    .option("--summary", "Print test summary table")
    .option("--detailed", "Print detailed test summary table")
    .option("--match-test <REGEX>", "Only run test functions matching the specified regex pattern")
    .option("--no-match-test <REGEX>", "Only run test functions that do not match the specified regex pattern")
    .option("--match-contract <REGEX>", "Only run tests in contracts matching the specified regex pattern")
    .option("--no-match-contract <REGEX>", "Only run tests in contracts that do not match the specified regex pattern")
    .option("--match-path <GLOB>", "Only run tests in source files matching the specified glob pattern")
    .option("--no-match-path <GLOB>", "Only run tests in source files that do not match the specified glob pattern")
    .option("--no-match-coverage <REGEX>", "Only show coverage for files that do not match the specified regex pattern")
    .option("--rerun", "Re-run recorded test failures from last run")
    .option("-w, --watch [<PATH>...]", "Watch for changes and re-run tests")
    .option("--no-restart", "Do not restart the command while it's still running")
    .option("--run-all", "Explicitly re-run all tests when a change is made")
    .option("--watch-delay <DELAY>", "File update debounce delay");

  test.action(async (options) => {
    printAsciiArt();
    printIntro("Running the project's tests");
    const testOptions = [
      "test",
      ...(options.debug ? ["--debug", options.debug] : []),
      ...(options.decodeInternal
        ? ["--decode-internal", ...(typeof options.decodeInternal === "string" ? [options.decodeInternal] : [])]
        : []),
      ...(options.gasReport ? ["--gas-report"] : []),
      ...(options.allowFailure ? ["--allow-failure"] : []),
      ...(options.failFast ? ["--fail-fast"] : []),
      ...(options.etherscanApiKey ? ["--etherscan-api-key", options.etherscanApiKey] : []),
      ...(options.fuzzSeed ? ["--fuzz-seed", options.fuzzSeed] : []),
      ...(options.fuzzRuns ? ["--fuzz-runs", options.fuzzRuns] : []),
      ...(options.fuzzInputFile ? ["--fuzz-input-file", options.fuzzInputFile] : []),
      ...(options.threads ? ["-j", options.threads] : []),
      ...(options.showProgress ? ["--show-progress"] : []),
      ...(options.json ? ["--json"] : []),
      ...(options.list ? ["-l"] : []),
      ...(options.summary ? ["--summary"] : []),
      ...(options.detailed ? ["--detailed"] : []),
      ...(options.matchTest ? ["--match-test", options.matchTest] : []),
      ...(options.matchContract ? ["--match-contract", options.matchContract] : []),
      ...(options.matchPath ? ["--match-path", options.matchPath] : []),
      ...(options.matchCoverage ? ["--no-match-coverage", options.matchCoverage] : []),
      ...(options.rerun ? ["--rerun"] : []),
      ...(options.watch ? ["-w", ...(Array.isArray(options.watch) ? options.watch : [])] : []),
      ...(options.restart === false ? ["--no-restart"] : []),
      ...(options.runAll ? ["--run-all"] : []),
      ...(options.watchDelay ? ["--watch-delay", options.watchDelay] : []),
    ].filter((option): option is string => option !== undefined);

    await runCli({
      command: "forge",
      commandOptions: testOptions,
      logFileName: "forge-test.log",
      outputToConsole: true,
    });

    printOutro("Forge test completed successfully");
  });

  return test;
}
