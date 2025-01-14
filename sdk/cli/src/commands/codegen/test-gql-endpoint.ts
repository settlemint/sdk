import { graphqlFetchWithRetry } from "@settlemint/sdk-utils";
import type { ApplicationAccessToken } from "@settlemint/sdk-utils/validation";

/**
 * Tests a GraphQL endpoint with exponential retry.
 *
 * @param accessToken - The application access token for authentication
 * @param hasuraAdminSecret - The Hasura admin secret if using a Hasura endpoint
 * @param gqlEndpoint - The GraphQL endpoint URL
 * @param isHasura - Whether the endpoint is a Hasura endpoint
 * @returns A boolean indicating whether the endpoint is accessible
 */
export async function testGqlEndpoint({
  accessToken,
  hasuraAdminSecret,
  gqlEndpoint,
  isHasura = false,
}: {
  accessToken: ApplicationAccessToken;
  hasuraAdminSecret?: string;
  gqlEndpoint?: string;
  isHasura?: boolean;
}): Promise<boolean> {
  if (!gqlEndpoint) {
    return false;
  }

  await graphqlFetchWithRetry(gqlEndpoint, {
    method: "POST",
    headers: {
      "x-auth-token": accessToken,
      ...(isHasura ? { "x-hasura-admin-secret": hasuraAdminSecret ?? "" } : {}),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query {
            __schema {
              types {
                name
              }
            }
          }
        `,
    }),
  });

  return true;
}
