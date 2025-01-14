import { retryWhenFailed } from "../retry.js";
import { fetchWithRetry } from "./fetch-with-retry.js";

/**
 * Executes a GraphQL request with automatic retries using exponential backoff and jitter.
 * Only retries on server errors (5xx), rate limits (429), timeouts (408), and network errors.
 * Will also retry if the GraphQL response contains errors.
 *
 * @param input - The URL or Request object for the GraphQL endpoint
 * @param init - Optional fetch configuration options
 * @param maxRetries - Maximum retry attempts before failing (default: 5)
 * @param initialSleepTime - Initial delay between retries in milliseconds (default: 3000)
 * @returns The parsed GraphQL response data
 * @throws Error if all retries fail or if GraphQL response contains errors
 * @example
 * import { graphqlFetchWithRetry } from "@settlemint/sdk-utils";
 *
 * const data = await graphqlFetchWithRetry<{ user: { id: string } }>(
 *   "https://api.example.com/graphql",
 *   {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({
 *       query: `query GetUser($id: ID!) {
 *         user(id: $id) {
 *           id
 *         }
 *       }`,
 *       variables: { id: "123" }
 *     })
 *   }
 * );
 */
export async function graphqlFetchWithRetry<Data>(
  input: RequestInfo | URL,
  init?: RequestInit,
  maxRetries = 5,
  initialSleepTime = 3_000,
): Promise<Data> {
  return retryWhenFailed<Data>(
    async () => {
      const response = await fetchWithRetry(input, init);
      const json: { errors?: { message: string }[]; data: Data } = await response.json();
      if (json.errors) {
        throw new Error(`GraphQL errors in response: ${json.errors.map((error) => error.message).join(", ")}`);
      }
      return json.data;
    },
    maxRetries,
    initialSleepTime,
  );
}
