import { exists } from "@settlemint/sdk-utils";

export const isGenerated = () => exists("subgraph/subgraph.config.json");
