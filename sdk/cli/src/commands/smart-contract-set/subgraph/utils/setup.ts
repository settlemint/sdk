import { rm } from "node:fs/promises";
import { theGraphPrompt } from "@/commands/connect/thegraph.prompt";
import { sanitizeName } from "@/commands/smart-contract-set/subgraph/utils/sanitize-name";
import { isGenerated, updateSubgraphYamlConfig } from "@/commands/smart-contract-set/subgraph/utils/subgraph-config";
import { type Middleware, createSettleMintClient } from "@settlemint/sdk-js";
import { type DotEnv, executeCommand, exists, getPackageManagerExecutable } from "@settlemint/sdk-utils";
import semver from "semver";
import { getSubgraphYamlConfig } from "./subgraph-config";

export interface SubgraphSetupParams {
  env: Partial<DotEnv>;
  instance: string;
  accessToken: string;
  theGraphMiddleware?: Middleware;
}

export async function subgraphSetup({ env, instance, accessToken, theGraphMiddleware }: SubgraphSetupParams) {
  const generated = await isGenerated();
  if (generated) {
    await executeCommand("forge", ["build"]);
  }

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

  const isFixedNetwork = (theGraphMiddleware?.entityVersion ?? 4) >= 4;
  const network = isFixedNetwork ? "settlemint" : sanitizeName(await getNodeName({ env, instance, accessToken }), 30);

  if (generated) {
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(command, [
      ...args,
      "graph-compiler",
      "--config",
      "subgraph/subgraph.config.json",
      "--include",
      "node_modules/@openzeppelin/subgraphs/src/datasources",
      "subgraph/datasources",
      "--export-schema",
      "--export-subgraph",
    ]);
  }

  const yamlConfig = await getSubgraphYamlConfig();

  if (generated) {
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

  await updateSubgraphYamlConfig(yamlConfig);
}

export async function getTheGraphMiddleware({
  env,
  instance,
  accessToken,
  autoAccept,
}: Pick<SubgraphSetupParams, "env" | "instance" | "accessToken" | "autoAccept">) {
  const settlemintClient = createSettleMintClient({
    accessToken,
    instance,
  });
  if (autoAccept && env.SETTLEMINT_THEGRAPH) {
    const defaultTheGraphMiddleware = await settlemintClient.middleware.read(env.SETTLEMINT_THEGRAPH);
    if (defaultTheGraphMiddleware && defaultTheGraphMiddleware.__typename === "HAGraphMiddleware") {
      return defaultTheGraphMiddleware;
    }
  }

  const middlewares = await settlemintClient.middleware.list(env.SETTLEMINT_APPLICATION!);
  return theGraphPrompt(env, middlewares, autoAccept);
}

async function getNodeName({
  env,
  instance,
  accessToken,
}: Pick<SubgraphSetupParams, "env" | "instance" | "accessToken">) {
  if (!env.SETTLEMINT_BLOCKCHAIN_NODE) {
    return "localhost";
  }
  const settlemintClient = createSettleMintClient({
    accessToken,
    instance,
  });
  const node = await settlemintClient.blockchainNode.read(env.SETTLEMINT_BLOCKCHAIN_NODE);
  return node.uniqueName;
}
