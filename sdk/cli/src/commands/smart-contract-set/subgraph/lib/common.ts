import { rm, writeFile } from "node:fs/promises";
import type { SettlemintClient } from "@settlemint/sdk-js";
import { type DotEnv, executeCommand, exists, getPackageManagerExecutable } from "@settlemint/sdk-utils";
import semver from "semver";
import slugify from "slugify";
import { stringify } from "yaml";
import { getSubgraphYamlConfig, getSubgraphYamlFile } from "./utils";

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

  const envConfig = await settlemintClient.foundry.env(env.SETTLEMINT_BLOCKCHAIN_NODE!, env.SETTLEMINT_THEGRAPH);

  const network =
    process.env.BTP_SUBGRAPH_FIXED_NETWORK === "true"
      ? "settlemint"
      : sanitize(process.env.BTP_NODE_UNIQUE_NAME || "localhost", 30);

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

function sanitize(value: string, length = 35) {
  return slugify(value, {
    strict: true,
    remove: /[!"'()*+.:@~]/g,
    replacement: "-",
    lower: true,
  })
    .slice(0, length)
    .replaceAll(/(^\d*)/g, "")
    .replaceAll(/(-$)/g, "")
    .replaceAll(/(^-)/g, "");
}

export type SubgraphTemplate = {
  output: string;
  chain: string;
  datasources: {
    name: string;
    address: string;
    startBlock: number;
    module: string[];
  }[];
};

export type SubgraphConfig = {
  specVersion: string;
  schema: {
    file: string;
  };
  features: string[];
  dataSources: {
    kind: string;
    name: string;
    network: string;
    source: {
      address: string;
      abi: string;
      startBlock: number;
    };
    mapping: {
      kind: string;
      apiVersion: string;
      language: string;
      entities: string[];
      abis: {
        name: string;
        file: string;
      }[];
      eventHandlers: {
        event: string;
        handler: string;
      }[];
      file: string;
    };
  }[];
  templates?: {
    kind: string;
    name: string;
    network: string;
    source: {
      abi: string;
    };
    mapping: {
      kind: string;
      apiVersion: string;
      language: string;
      entities: string[];
      abis: {
        name: string;
        file: string;
      }[];
      eventHandlers: {
        event: string;
        handler: string;
      }[];
      file: string;
    };
  }[];
};
