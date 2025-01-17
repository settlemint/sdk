import { readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { tryParseJson } from "@settlemint/sdk-utils";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { note } from "@settlemint/sdk-utils/terminal";
import { parse, stringify } from "yaml";

export type SubgraphYamlConfig = {
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

export type SubgraphConfig = {
  output: string;
  chain: string;
  datasources: {
    name: string;
    address: string;
    startBlock: number;
    module: string[];
  }[];
};

const CONFIG_FILE_PATH = "./subgraph/subgraph.config.json";

export const isGenerated = (path: string = process.cwd()) => exists(join(path, CONFIG_FILE_PATH));

export const getSubgraphYamlFile = async (path: string = process.cwd()) => {
  const generated = await isGenerated(path);
  if (generated && (await exists(join(path, "generated/scs.subgraph.yaml")))) {
    return join(path, "generated/scs.subgraph.yaml");
  }
  if (await exists(join(path, "subgraph/subgraph.yaml"))) {
    return join(path, "subgraph/subgraph.yaml");
  }
  if (await exists(join(path, "subgraph.yaml"))) {
    return join(path, "subgraph.yaml");
  }
  throw new Error("Subgraph configuration file not found");
};

export const getSubgraphYamlConfig = async (path: string = process.cwd()): Promise<SubgraphYamlConfig> => {
  const subgraphYamlFile = await getSubgraphYamlFile(path);
  const rawYamlConfig = await readFile(subgraphYamlFile);
  return parse(rawYamlConfig.toString());
};

export const updateSubgraphYamlConfig = async (
  config: SubgraphYamlConfig,
  cwd: string = process.cwd(),
): Promise<void> => {
  const subgraphYamlFile = await getSubgraphYamlFile(cwd);
  await writeFile(subgraphYamlFile, stringify(config));
};

export const getSubgraphConfig = async (path: string = process.cwd()): Promise<SubgraphConfig | null> => {
  try {
    const configContents = await readFile(join(path, CONFIG_FILE_PATH));
    const currentConfig = tryParseJson<SubgraphConfig>(configContents.toString());
    return currentConfig;
  } catch (err) {
    const error = err as Error;
    note(`Failed to read ${basename(CONFIG_FILE_PATH)} file: ${error.message}`);
    return null;
  }
};

export const updateSubgraphConfig = async (config: SubgraphConfig, path: string = process.cwd()): Promise<void> => {
  try {
    await writeFile(join(path, CONFIG_FILE_PATH), JSON.stringify(config, undefined, 2));
  } catch (err) {
    const error = err as Error;
    note(`Failed to update ${basename(CONFIG_FILE_PATH)} file: ${error.message}`);
  }
};
