import { rm } from "node:fs/promises";
import { isGenerated, updateSubgraphYamlConfig } from "@/commands/smart-contract-set/subgraph/utils/subgraph-config";
import { missingApplication } from "@/error/missing-config-error";
import { theGraphPrompt } from "@/prompts/cluster-service/thegraph.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { type Middleware, createSettleMintClient } from "@settlemint/sdk-js";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import semver from "semver";
import { sanitizeName } from "./sanitize-name";
import { getSubgraphYamlConfig } from "./subgraph-config";

export const SETTLEMINT_NETWORK = "settlemint";

export interface SubgraphSetupParams {
  network: string;
}

export async function subgraphSetup({ network }: SubgraphSetupParams) {
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
}: { env: Partial<DotEnv>; instance: string; accessToken: string; autoAccept: boolean }) {
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
  if (!env.SETTLEMINT_APPLICATION) {
    return missingApplication();
  }
  const middlewares = await serviceSpinner("middleware", () =>
    settlemintClient.middleware.list(env.SETTLEMINT_APPLICATION!),
  );
  return theGraphPrompt({
    env,
    middlewares,
    accept: autoAccept,
    isRequired: true,
  });
}

export async function getTheGraphNetwork({
  theGraphMiddleware,
  env,
  instance,
  accessToken,
}: { theGraphMiddleware: Middleware; env: Partial<DotEnv>; instance: string; accessToken: string }) {
  const isFixedNetwork = (theGraphMiddleware?.entityVersion ?? 4) >= 4;
  return isFixedNetwork ? SETTLEMINT_NETWORK : sanitizeName(await getNodeName({ env, instance, accessToken }), 30);
}

async function getNodeName({
  env,
  instance,
  accessToken,
}: { env: Partial<DotEnv>; instance: string; accessToken: string }) {
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
