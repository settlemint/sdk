/**
 * Retry a function when it fails.
 * @param fn - The function to retry.
 * @param maxRetries - The maximum number of retries.
 * @param initialSleepTime - The initial time to sleep between exponential backoff retries.
 * @param stopOnError - The function to stop on error.
 * @returns The result of the function or undefined if it fails.
 */
export async function retryWhenFailed<T>(
  fn: () => Promise<T>,
  maxRetries = 5,
  initialSleepTime = 3_000,
  stopOnError?: (error: Error) => boolean,
): Promise<T> {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (e) {
      if (typeof stopOnError === "function") {
        const error = e as Error;
        if (stopOnError(error)) {
          throw error;
        }
      }
      attempt += 1;
      if (attempt >= maxRetries) {
        throw e;
      }
      // Exponential backoff with full jitter to prevent thundering herd
      const jitter = Math.random();
      const delay = 2 ** attempt * initialSleepTime * jitter; // 0-1x of 1s, 2s, 4s base
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Retry failed");
}

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
