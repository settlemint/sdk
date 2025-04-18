import { truncate } from "../string.js";
import type { Logger } from "./logger.js";

const WARNING_THRESHOLD = 500;
const TRUNCATE_LENGTH = 50;

/**
 * Logs the request and duration of a fetch call (> 500ms is logged as warn, otherwise info)
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
      const body = extractInfoFromBody(args[1]?.body ?? "{}");
      const message = `${name} path: ${args[0]}, took ${formatDuration(duration)}`;
      if (duration > WARNING_THRESHOLD) {
        logger.warn(message, body);
      } else {
        logger.info(message, body);
      }
    }
  };
}

function formatDuration(duration: number) {
  return duration < 1000 ? `${duration}ms` : `${(duration / 1000).toFixed(3)}s`;
}

function extractInfoFromBody(body: BodyInit) {
  try {
    const parsedBody = typeof body === "string" ? JSON.parse(body) : body;

    if (parsedBody === null || parsedBody === undefined || Object.keys(parsedBody).length === 0) {
      return null;
    }

    const dataToKeep: Record<string, unknown> = {};
    // Check for graphql fields
    if ("query" in parsedBody) {
      dataToKeep.query = truncate(parsedBody.query, TRUNCATE_LENGTH);
    }
    if ("variables" in parsedBody) {
      dataToKeep.variables = truncate(JSON.stringify(parsedBody.variables), TRUNCATE_LENGTH);
    }
    if ("operationName" in parsedBody) {
      dataToKeep.operationName = truncate(parsedBody.operationName, TRUNCATE_LENGTH);
    }

    if (Object.keys(dataToKeep).length > 0) {
      return JSON.stringify(dataToKeep);
    }

    // Not graphql, return the body as is
    return truncate(JSON.stringify(parsedBody || "{}"), TRUNCATE_LENGTH);
  } catch {
    return "{}";
  }
}
