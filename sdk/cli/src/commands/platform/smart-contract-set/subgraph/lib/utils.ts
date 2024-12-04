import { parse } from "yaml";
import type { SubgraphConfig } from "./common.ts";
import { isGenerated } from "./is-generated.ts";
export const subgraphYamlFile = isGenerated ? "generated/scs.subgraph.yaml" : "subgraph/subgraph.yaml";

export const getSubgraphYamlConfig = async (): Promise<SubgraphConfig> => {
  const rawYamlConfig = await Bun.file(subgraphYamlFile).text();
  return parse(rawYamlConfig);
};
