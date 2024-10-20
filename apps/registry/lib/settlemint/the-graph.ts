import { createTheGraphClient } from "@settlemint/sdk-thegraph";
import type { introspection } from "../../the-graph-env.d.ts";

export const { client: theGraphClient, graphql: theGraphGraphql } = createTheGraphClient<{
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
  instance: process.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
});
