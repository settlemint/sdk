import { createTheGraphClient } from "@settlemint/sdk-thegraph";
import type { introspection } from "../../../the-graph-fallback-env.d.ts";

export const { client: theGraphFallbackClient, graphql: theGraphFallbackGraphql } = createTheGraphClient<{
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
  instance: "/proxy/thegraph-fallback/graphql",
});
