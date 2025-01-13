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
