import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { createPortalClient } from "../portal.js";

const env = await loadEnv(false, false);
const logger = createLogger();

const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  introspection: any;
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
