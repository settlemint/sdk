import { printAsciiArt, printCancel, printIntro, printOutro } from "@/lib/cli-message";
import { getExecutor, getPkgManager } from "@/lib/package-manager";
import { runCli } from "@/lib/run-cli";
import { Command } from "@commander-js/extra-typings";
import { loadSettleMintApplicationConfig } from "@settlemint/sdk-config/loader";

export function subgraphDeployCommand() {
  const deploy = new Command("deploy")
    .description("Deploys a subgraph to a Graph node.")
    .argument("[SUBGRAPH-NAME]", "Name of the subgraph to deploy")
    .argument("[SUBGRAPH-MANIFEST]", "Path to the subgraph manifest file")
    .option("-g, --node <value>", "Graph node for which to initialize")
    .option("-i, --ipfs <value>", "Upload build results to an IPFS node", "https://api.thegraph.com/ipfs/api/v0")
    .option("-l, --version-label <value>", "Version label used for the deployment")
    .option("-o, --output-dir <dir>", "Output directory for build results", "build/")
    .option("--debug-fork <value>", "ID of a remote subgraph whose store will be GraphQL queried")
    .option("--headers <value>", "Add custom headers that will be used by the IPFS HTTP client", JSON.stringify({}))
    .option("--ipfs-hash <value>", "IPFS hash of the subgraph manifest to deploy")
    .option("--network <value>", "Network configuration to use from the networks config file")
    .option("--network-file <file>", "Networks config file path", "networks.json")
    .option("--skip-migrations", "Skip subgraph migrations")
    .action(async (subgraphName, subgraphManifest, options) => {
      printAsciiArt();
      printIntro("Deploying subgraph");

      const app = await loadSettleMintApplicationConfig();
      if (!app) {
        printCancel("No application configuration found");
        process.exit(1);
      }

      const thegraphGql = app.thegraphGql;
      if (!thegraphGql) {
        printCancel("No The Graph URL found");
        process.exit(1);
      }

      // const ipfsUrl = app.thegraphGql;
      // if (!thegraphGql) {
      //   printCancel("No The Graph URL found");
      //   process.exit(1);
      // }

      if (!options.node) {
        options.node = `${thegraphGql}/${process.env.SETTLEMINT_PAT_TOKEN}/`;
      }

      const deployOptions = [
        "deploy",
        ...(subgraphName ? [subgraphName] : []),
        ...(subgraphManifest ? [subgraphManifest] : []),
        ...(options.node ? ["-g", options.node] : []),
        ...(options.ipfs ? ["-i", options.ipfs] : []),
        ...(options.versionLabel ? ["-l", options.versionLabel] : ["-l", `v1.0.${Date.now()}`]),
        ...(options.outputDir ? ["-o", options.outputDir] : []),
        ...(options.debugFork ? ["--debug-fork", options.debugFork] : []),
        ...(options.headers ? ["--headers", options.headers] : []),
        ...(options.ipfsHash ? ["--ipfs-hash", options.ipfsHash] : []),
        ...(options.network ? ["--network", options.network] : []),
        ...(options.networkFile ? ["--network-file", options.networkFile] : []),
        ...(options.skipMigrations ? ["--skip-migrations"] : []),
      ].filter((option): option is string => option !== undefined);

      const executor = getExecutor(getPkgManager());
      await runCli({
        command: executor,
        commandOptions: ["graph", ...deployOptions],
        logFileName: "graph-deploy.log",
        outputToConsole: true,
      });

      printOutro("Subgraph deployment completed successfully");
    });

  return deploy;
}
