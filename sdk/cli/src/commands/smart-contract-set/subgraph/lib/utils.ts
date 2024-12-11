import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { isGenerated } from "./is-generated";

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

export const getSubgraphYamlFile = async () =>
  (await isGenerated()) ? "generated/scs.subgraph.yaml" : "subgraph/subgraph.yaml";

export const getSubgraphYamlConfig = async (): Promise<SubgraphConfig> => {
  const subgraphYamlFile = await getSubgraphYamlFile();
  const rawYamlConfig = await readFile(subgraphYamlFile);
  return parse(rawYamlConfig.toString());
};
