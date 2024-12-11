import { rm, writeFile } from "node:fs/promises";
import { sanitizeName } from "@/commands/smart-contract-set/subgraph/utils/sanitize-name";
import type { SettlemintClient } from "@settlemint/sdk-js";
import { type DotEnv, executeCommand, exists, getPackageManagerExecutable } from "@settlemint/sdk-utils";
import semver from "semver";
import { stringify } from "yaml";
import { getSubgraphYamlConfig, getSubgraphYamlFile } from "./subgraph-config";

export interface SubgraphSetupParams {
  env: Partial<DotEnv>;
  settlemintClient: SettlemintClient;
  isGenerated: boolean;
}

export async function subgraphSetup({ env, settlemintClient, isGenerated }: SubgraphSetupParams) {
  await executeCommand("forge", ["build"]);

  if (await exists("./generated")) {
    await rm("./generated", { recursive: true, force: true });
  }
  if (await exists("./subgraph/generated")) {
    await rm("./subgraph/generated", { recursive: true, force: true });
  }
  if (await exists("./build")) {
    await rm("./build", { recursive: true, force: true });
  }
  if (await exists("./subgraph/build")) {
    await rm("./subgraph/build", { recursive: true, force: true });
  }

  const envConfig = {
    BTP_SUBGRAPH_FIXED_NETWORK: "", // TODO
    BTP_NODE_UNIQUE_NAME: "", // TODO
  };

  const network =
    process.env.BTP_SUBGRAPH_FIXED_NETWORK === "true"
      ? "settlemint"
      : sanitizeName(process.env.BTP_NODE_UNIQUE_NAME || "localhost", 30);

  if (isGenerated) {
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(
      command,
      [
        ...args,
        "graph-compiler",
        "--config",
        "subgraph/subgraph.config.json",
        "--include",
        "node_modules/@openzeppelin/subgraphs/src/datasources",
        "subgraph/datasources",
        "--export-schema",
        "--export-subgraph",
      ],
      { env: envConfig },
    );
  }

  const yamlConfig = await getSubgraphYamlConfig();

  if (isGenerated) {
    yamlConfig.features = ["nonFatalErrors", "fullTextSearch", "ipfsOnEthereumContracts"];
  }

  for (const dataSource of yamlConfig.dataSources) {
    // Returns 0 if the versions are equal, 1 if `v1` is greater, or -1 if `v2` is greater.
    if (semver.lt(dataSource.mapping.apiVersion, "0.0.9")) {
      dataSource.mapping.apiVersion = "0.0.9";
    }
    dataSource.network = network;
  }
  if (yamlConfig.templates) {
    for (const template of yamlConfig.templates) {
      if (semver.lt(template.mapping.apiVersion, "0.0.9")) {
        template.mapping.apiVersion = "0.0.9";
      }
      template.network = network;
    }
  }

  const subgraphYamlFile = await getSubgraphYamlFile();
  await writeFile(subgraphYamlFile, stringify(yamlConfig));
}
