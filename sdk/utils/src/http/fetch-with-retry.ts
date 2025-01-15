import { retryWhenFailed } from "../retry.js";

/**
 * Retry an HTTP request with exponential backoff and jitter.
 * Only retries on server errors (5xx), rate limits (429), timeouts (408), and network errors.
 *
 * @param input - The URL or Request object to fetch
 * @param init - The fetch init options
 * @param maxRetries - Maximum number of retry attempts
 * @param initialSleepTime - Initial sleep time between retries in ms
 * @returns The fetch Response
 * @throws Error if all retries fail
 * @example
 * import { fetchWithRetry } from "@settlemint/sdk-utils/http";
 *
 * const response = await fetchWithRetry("https://api.example.com/data");
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  maxRetries = 5,
  initialSleepTime = 3_000,
): Promise<Response> {
  return retryWhenFailed(
    async () => {
      const response = await fetch(input, init);
      if (response.ok) {
        return response;
      }
      // Only retry on 5xx server errors, 429 rate limit, timeout, and network errors
      if (response.status < 500 && response.status !== 429 && response.status !== 408 && response.status !== 0) {
        return response;
      }
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    },
    maxRetries,
    initialSleepTime,
  );
}
