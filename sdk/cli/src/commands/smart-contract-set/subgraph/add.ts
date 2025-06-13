import { copyFile, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, relative } from "node:path";
import { createExamples } from "@/utils/commands/create-examples";
import {
  getSubgraphYamlConfig,
  getSubgraphYamlFile,
  isGenerated,
  updateSubgraphYamlConfig,
} from "@/utils/subgraph/subgraph-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { exists, findMonoRepoRoot, projectRoot } from "@settlemint/sdk-utils/filesystem";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, note, outro } from "@settlemint/sdk-utils/terminal";

const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";

export function subgraphAddCommand() {
  return new Command("add")
    .description("Add a contract to the subgraph")
    .usage(
      createExamples([
        {
          description: "Add a contract to the subgraph",
          command: "scs subgraph add --abi=./abis/bond.json --contract-name=bond",
        },
      ]),
    )
    .requiredOption("--abi <abi>", "Path to the contract ABI.")
    .requiredOption("--contract-name <contract-name>", "Name of the contract.")
    .option("--address <contract-address>", `Address of the contract (defaults to ${DEFAULT_ADDRESS}).`)
    .option("--start-block <start-block>", "Start block of the contract (defaults to 0).")
    .option("--network <network>", "Network name (defaults to settlemint).")
    .action(async ({ abi, contractName, address, startBlock, network }) => {
      intro(`Adding subgraph config for contract ${contractName}`);

      const abiPath = isAbsolute(abi) ? abi : join(process.cwd(), abi);
      if (!(await exists(abiPath))) {
        throw new Error("ABI file not found");
      }
      await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);

      if (await isGenerated()) {
        throw new Error("This command does not support automatically generated subgraph configs");
      }

      const { command, args } = await getPackageManagerExecutable();
      const subgraphYamlFile = await getSubgraphYamlFile();

      // Copy abi to local './abis' folder next to subgraph.yaml
      const abiName = basename(abiPath);
      const subgraphYamlDir = dirname(subgraphYamlFile);
      await mkdir(join(subgraphYamlDir, "abis"), { recursive: true });
      const localAbiPath = join(subgraphYamlDir, "abis", abiName);
      await copyFile(abiPath, localAbiPath);

      try {
        const root = await projectRoot();
        await fixPackageJson(root);
        const monoRepoRoot = await findMonoRepoRoot(root);
        if (monoRepoRoot) {
          await fixPackageJson(monoRepoRoot, false);
        }
        await executeCommand(command, [
          ...args,
          "graph",
          "add",
          "--abi",
          abi,
          "--contract-name",
          contractName,
          "--start-block",
          startBlock ?? "0",
          address ?? DEFAULT_ADDRESS,
          subgraphYamlFile,
        ]);

        // Update subgraph.yaml with the correct abi path and update the network name
        const subgraphYamlConfig = await getSubgraphYamlConfig();
        if (subgraphYamlConfig) {
          const updatedDataSources = subgraphYamlConfig?.dataSources.map((dataSource) => {
            if (dataSource.name === contractName) {
              dataSource.network = network ?? "settlemint";
              dataSource.mapping.abis = [
                {
                  name: contractName,
                  file: relative(subgraphYamlDir, abiPath),
                },
              ];
            }
            return dataSource;
          });
          await updateSubgraphYamlConfig({
            ...subgraphYamlConfig,
            dataSources: updatedDataSources,
          });
        }
      } finally {
        await unlink(localAbiPath);
      }
      outro(`Subgraph config for contract ${contractName} added successfully`);
    });
}

async function fixPackageJson(packageJsonDir: string, requiresCodegenScript = true) {
  const packageJsonPath = join(packageJsonDir, "package.json");
  if (!(await exists(packageJsonPath))) {
    return;
  }

  let hasPackageJsonChanged = false;

  const subgraphPackageJson = await readFile(packageJsonPath);
  const subgraphPackageJsonData = JSON.parse(subgraphPackageJson.toString());

  if (subgraphPackageJsonData.packageManager?.includes("bun")) {
    note("Removing package manager from package.json (bun is not an official package manager)");
    // biome-ignore lint/performance/noDelete: <explanation>
    delete subgraphPackageJsonData.packageManager;
    hasPackageJsonChanged = true;
  }
  if (requiresCodegenScript && !subgraphPackageJsonData.scripts?.codegen) {
    note("Adding codegen script to package.json");
    subgraphPackageJsonData.scripts.codegen = "settlemint scs subgraph codegen";
    hasPackageJsonChanged = true;
  }

  if (hasPackageJsonChanged) {
    await writeFile(packageJsonPath, JSON.stringify(subgraphPackageJsonData, null, 2));
  }
}
