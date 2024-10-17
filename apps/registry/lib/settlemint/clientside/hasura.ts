import { createHasuraClient } from "@settlemint/sdk-hasura";
import type { introspection } from "../../../hasura-env.d.ts";

export const { client: hasuraClient, graphql: hasuraGraphql } = createHasuraClient<{
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
  instance: "/proxy/hasura/graphql",
});
