import type { Logger } from "./logger.js";

/**
 * Logs the request and duration of a fetch call (> 3s is logged as warn, otherwise info)
 * @param logger - The logger to use
 * @param name - The name of the request
 * @param fn - The fetch function to use
 * @returns The fetch function
 */
export function requestLogger(logger: Logger, name: string, fn: typeof fetch) {
  return async (...args: Parameters<typeof fetch>) => {
    const start = Date.now();
    try {
      return await fn(...args);
    } finally {
      const end = Date.now();
      const duration = end - start;
      const body = args[1]
        ? typeof args[1]?.body === "string"
          ? args[1]?.body
          : JSON.stringify(args[1]?.body ?? {})
        : "{}";
      const message = `${name} path: ${args[0]}, body: ${body}, took ${formatDuration(duration)}`;
      if (duration > 3000) {
        logger.warn(message);
      } else {
        logger.info(message);
      }
    }
  };
}

function formatDuration(duration: number) {
  return duration < 1000 ? `${duration}ms` : `${(duration / 1000).toFixed(3)}s`;
}
