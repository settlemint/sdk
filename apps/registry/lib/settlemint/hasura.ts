import { createHasuraClient } from "@settlemint/sdk-hasura";
import type { introspection } from "../../hasura-env.d.ts";

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
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
  adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET!, // undefined in browser, by design to not leak the secrets
});
