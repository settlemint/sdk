import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { exists } from "@settlemint/sdk-utils";
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

export const isGenerated = () => exists(CONFIG_FILE_PATH);

export const getSubgraphYamlFile = async () =>
  (await isGenerated()) ? "generated/scs.subgraph.yaml" : "subgraph/subgraph.yaml";

export const getSubgraphYamlConfig = async (): Promise<SubgraphYamlConfig> => {
  const subgraphYamlFile = await getSubgraphYamlFile();
  const rawYamlConfig = await readFile(subgraphYamlFile);
  return parse(rawYamlConfig.toString());
};

export const updateSubgraphYamlConfig = async (config: SubgraphYamlConfig): Promise<void> => {
  const subgraphYamlFile = await getSubgraphYamlFile();
  await writeFile(subgraphYamlFile, stringify(config));
};

export const getSubgraphConfig = async (): Promise<SubgraphConfig | null> => {
  try {
    const configContents = await readFile(CONFIG_FILE_PATH);
    const currentConfig: SubgraphConfig = JSON.parse(configContents.toString());
    return currentConfig;
  } catch (err) {
    const error = err as Error;
    note(`Failed to read ${basename(CONFIG_FILE_PATH)} file: ${error.message}`);
    return null;
  }
};

export const updateSubgraphConfig = async (config: SubgraphConfig): Promise<void> => {
  try {
    await writeFile(CONFIG_FILE_PATH, JSON.stringify(config, undefined, 2));
  } catch (err) {
    const error = err as Error;
    note(`Failed to update ${basename(CONFIG_FILE_PATH)} file: ${error.message}`);
  }
};
