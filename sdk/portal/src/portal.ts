import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { ApplicationAccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import { z } from "zod/v4";

/**
 * Configuration options for the GraphQL client, excluding 'url' and 'exchanges'.
 */
export type RequestConfig = ConstructorParameters<typeof GraphQLClient>[1];

/**
 * Schema for validating Portal client configuration options.
 */
export const ClientOptionsSchema = z.object({
  instance: UrlOrPathSchema,
  accessToken: ApplicationAccessTokenSchema,
  cache: z.enum(["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]).optional(),
});

/**
 * Type representing the validated client options.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Creates a Portal GraphQL client with the provided configuration.
 *
 * @param options - Configuration options for the Portal client
 * @param clientOptions - Additional GraphQL client configuration options
 * @returns An object containing the configured GraphQL client and graphql helper function
 * @throws If the provided options fail validation
 *
 * @example
 * import { createPortalClient } from "@settlemint/sdk-portal";
 * import { loadEnv } from "@settlemint/sdk-utils/environment";
 * import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
 * import type { introspection } from "@schemas/portal-env";
 *
 * const env = await loadEnv(false, false);
 * const logger = createLogger();
 *
 * const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     // Change unknown to the type you are using to store metadata
 *     JSON: unknown;
 *   };
 * }>(
 *   {
 *     instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
 *     accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
 *   },
 *   {
 *     fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
 *   },
 * );
 *
 * // Making GraphQL queries
 * const query = portalGraphql(`
 *   query GetPendingTransactions {
 *     getPendingTransactions {
 *       count
 *     }
 *   }
 * `);
 *
 * const result = await portalClient.request(query);
 */
export function createPortalClient<const Setup extends AbstractSetupSchema>(
  options: ClientOptions,
  clientOptions?: RequestConfig,
): {
  client: GraphQLClient;
  graphql: initGraphQLTada<Setup>;
} {
  ensureServer();
  const validatedOptions = validate(ClientOptionsSchema, options);
  const graphql = initGraphQLTada<Setup>();
  const fullUrl = new URL(validatedOptions.instance).toString();

  return {
    client: new GraphQLClient(fullUrl, {
      ...clientOptions,
      headers: { ...(clientOptions?.headers ?? {}), "x-auth-token": validatedOptions.accessToken },
    }),
    graphql,
  };
}

export {
  handleWalletVerificationChallenge,
  type HandleWalletVerificationChallengeOptions,
} from "./utils/wallet-verification-challenge.js";
export {
  waitForTransactionReceipt,
  type Transaction,
  type WaitForTransactionReceiptOptions,
} from "./utils/wait-for-transaction-receipt.js";
export { getWebsocketClient, type WebsocketClientOptions } from "./utils/websocket-client.js";
export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
