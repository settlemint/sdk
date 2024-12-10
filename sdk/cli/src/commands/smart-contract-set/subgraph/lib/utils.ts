import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import type { SubgraphConfig } from "./common";
import { isGenerated } from "./is-generated";

export const subgraphYamlFile = (await isGenerated) ? "generated/scs.subgraph.yaml" : "subgraph/subgraph.yaml";

export const getSubgraphYamlConfig = async (): Promise<SubgraphConfig> => {
  const rawYamlConfig = await readFile(subgraphYamlFile);
  return parse(rawYamlConfig.toString());
};
