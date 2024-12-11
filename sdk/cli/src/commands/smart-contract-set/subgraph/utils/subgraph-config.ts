import { readFile, writeFile } from "node:fs/promises";
import { note } from "@settlemint/sdk-utils/terminal";
import { parse, stringify } from "yaml";
import { isGenerated } from "./is-generated";

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
    const configContents = await readFile("./subgraph/subgraph.config.json");
    const currentConfig: SubgraphConfig = JSON.parse(configContents.toString());
    return currentConfig;
  } catch (err) {
    const error = err as Error;
    note(`Failed to read subgraph.config.json file: ${error.message}`);
    return null;
  }
};
