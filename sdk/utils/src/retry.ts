import { logger } from "./logging/logger.js";

/**
 * Retry a function when it fails.
 * @param fn - The function to retry.
 * @param maxRetries - The maximum number of retries.
 * @param initialSleepTime - The initial time to sleep between exponential backoff retries.
 * @param stopOnError - The function to stop on error.
 * @returns The result of the function or undefined if it fails.
 * @example
 * import { retryWhenFailed } from "@settlemint/sdk-utils";
 * import { readFile } from "node:fs/promises";
 *
 * const result = await retryWhenFailed(() => readFile("/path/to/file.txt"), 3, 1_000);
 */
export async function retryWhenFailed<T>(
  fn: () => Promise<T>,
  maxRetries = 5,
  initialSleepTime = 1_000,
  stopOnError?: (error: Error) => boolean,
): Promise<T> {
  let retries = 0;
  const maxAttempts = maxRetries + 1;

  while (retries < maxAttempts) {
    try {
      return await fn();
    } catch (e) {
      const error = e as Error;
      if (typeof stopOnError === "function") {
        if (stopOnError(error)) {
          throw error;
        }
      }
      if (retries >= maxRetries) {
        throw e;
      }
      // Exponential backoff with jitter to prevent thundering herd
      // Jitter: Random value between 0-10% of initialSleepTime
      const baseDelay = 2 ** retries * initialSleepTime;
      const jitterAmount = initialSleepTime * (Math.random() / 10);
      const delay = baseDelay + jitterAmount;
      retries += 1;
      logger.warn(
        `An error occurred ${error.message}, retrying in ${delay.toFixed(0)}ms (retry ${retries} of ${maxRetries})...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Retry failed");
}
