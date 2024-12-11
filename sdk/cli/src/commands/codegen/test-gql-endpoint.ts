import type { ApplicationAccessToken } from "@settlemint/sdk-utils/validation";

/**
 * Tests a GraphQL endpoint with exponential retry.
 *
 * @param env - The environment variables.
 * @param gqlEndpoint - The GraphQL endpoint URL.
 * @param isHasura - Whether the endpoint is a Hasura endpoint.
 * @param maxRetries - Maximum number of retry attempts (default: 3).
 * @returns A boolean indicating whether the endpoint is accessible.
 */
export async function testGqlEndpoint(
  accessToken: ApplicationAccessToken,
  hasuraAdminSecret?: string,
  gqlEndpoint?: string,
  isHasura = false,
  maxRetries = 3,
): Promise<boolean> {
  if (!gqlEndpoint) {
    return false;
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(gqlEndpoint, {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.errors) {
        throw new Error("GraphQL errors in response");
      }

      return true; // Success
    } catch (error) {
      if (attempt === maxRetries - 1) {
        return false;
      }

      // Exponential backoff
      const delay = 2 ** attempt * 1000; // 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return false; // This line should never be reached, but TypeScript needs it
}
