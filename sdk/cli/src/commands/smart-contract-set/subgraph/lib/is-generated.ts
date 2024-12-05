import { existsSync } from "node:fs";
export const isGenerated = existsSync("subgraph/subgraph.config.json");
