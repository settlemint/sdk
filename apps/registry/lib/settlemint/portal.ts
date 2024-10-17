import { createServerPortalClient } from "@settlemint/sdk-portal";
import type { introspection } from "../../portal-env.d.ts";

export const { client: portalClient, graphql: portalGraphql } = createServerPortalClient<{
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
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
});
