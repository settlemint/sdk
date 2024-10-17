import { createServerTheGraphClient } from "@settlemint/sdk-thegraph";
import type { introspection } from "../../the-graph-fallback-env.d.ts";

export const { client: theGraphFallbackClient, graphql: theGraphFallbackGraphql } = createServerTheGraphClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: number;
  };
}>({
  instance: process.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
});
