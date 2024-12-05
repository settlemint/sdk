import { existsSync, rmSync } from "node:fs";
import { $, semver } from "bun";
import slugify from "slugify";
import { stringify } from "yaml";
import { getSubgraphYamlConfig, subgraphYamlFile } from "./utils.js";

export async function commonSetup(isGenerated: boolean) {
  await $`forge build`;

  if (existsSync("./generated")) {
    rmSync("./generated", { recursive: true, force: true });
  }
  if (existsSync("./subgraph/generated")) {
    rmSync("./subgraph/generated", { recursive: true, force: true });
  }
  if (existsSync("./build")) {
    rmSync("./build", { recursive: true, force: true });
  }
  if (existsSync("./subgraph/build")) {
    rmSync("./subgraph/build", { recursive: true, force: true });
  }

  const env = await fetch(`${process.env.BTP_CLUSTER_MANAGER_URL}/ide/foundry/${process.env.BTP_SCS_ID}/env`, {
    headers: {
      "x-auth-token": process.env.BTP_SERVICE_TOKEN!,
    },
  });

  const envText = await env.text();

  const envVars = envText.split("\n").map((line) => line.trim());
  for (const envVar of envVars) {
    const [key, value] = envVar.split("=");
    process.env[key as string] = value;
  }

  const network =
    process.env.BTP_SUBGRAPH_FIXED_NETWORK === "true"
      ? "settlemint"
      : sanitize(process.env.BTP_NODE_UNIQUE_NAME || "localhost", 30);

  if (isGenerated) {
    await $`npx graph-compiler --config subgraph/subgraph.config.json --include node_modules/@openzeppelin/subgraphs/src/datasources subgraph/datasources --export-schema --export-subgraph`;
  }

  const yamlConfig = await getSubgraphYamlConfig();

  if (isGenerated) {
    yamlConfig.features = ["nonFatalErrors", "fullTextSearch", "ipfsOnEthereumContracts"];
  }

  for (const dataSource of yamlConfig.dataSources) {
    // Returns 0 if the versions are equal, 1 if `v1` is greater, or -1 if `v2` is greater.
    if (semver.order(dataSource.mapping.apiVersion, "0.0.9") === -1) {
      dataSource.mapping.apiVersion = "0.0.9";
    }
    dataSource.network = network;
  }
  if (yamlConfig.templates) {
    for (const template of yamlConfig.templates) {
      if (semver.order(template.mapping.apiVersion, "0.0.9") === -1) {
        template.mapping.apiVersion = "0.0.9";
      }
      template.network = network;
    }
  }

  await Bun.write(subgraphYamlFile, stringify(yamlConfig));
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
