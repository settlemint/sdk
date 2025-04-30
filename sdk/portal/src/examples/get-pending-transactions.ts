/**
 * This example demonstrates how to get the number of pending transactions.
 *
 * The process involves:
 * 1. Creating a portal client
 * 2. Making a GraphQL query to get the number of pending transactions
 *
 * This pattern is useful for applications that need to monitor the status of pending transactions
 * in the SettleMint Portal, providing a way to track the progress of blockchain operations.
 */
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { createPortalClient } from "../portal.js"; // Replace this path with "@settlemint/sdk-portal"
import type { introspection } from "./schemas/portal-env.d.ts"; // Replace this path with the generated introspection type

const env = await loadEnv(false, false);
const logger = createLogger();

const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    // Change unknown to the type you are using to store metadata
    JSON: unknown;
  };
}>(
  {
    instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
  },
  {
    fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
  },
);

// Making GraphQL queries
const query = portalGraphql(`
  query GetPendingTransactions {
    getPendingTransactions {
      count
    }
  }
`);

const result = await portalClient.request(query);
console.log(`There are ${result.getPendingTransactions?.count} pending transactions`);
