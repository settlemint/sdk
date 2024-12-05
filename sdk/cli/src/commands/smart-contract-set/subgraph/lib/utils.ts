import { parse } from "yaml";
import type { SubgraphConfig } from "./common.js";
import { isGenerated } from "./is-generated.js";
export const subgraphYamlFile = isGenerated ? "generated/scs.subgraph.yaml" : "subgraph/subgraph.yaml";

export const getSubgraphYamlConfig = async (): Promise<SubgraphConfig> => {
  const rawYamlConfig = await Bun.file(subgraphYamlFile).text();
  return parse(rawYamlConfig);
};
