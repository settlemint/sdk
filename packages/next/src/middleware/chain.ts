import type { NextAuthResult } from "next-auth";
import type { NextMiddlewareResult } from "next/dist/server/web/types";
import type { NextFetchEvent, NextRequest, NextResponse } from "next/server";

/**
 * Configuration object for middleware
 */
export type MiddlewareConfiguration = {
  /** Authentication function from NextAuth */
  auth: NextAuthResult["auth"];
};

/**
 * Custom middleware function type
 * @param request - The incoming request
 * @param event - The Next.js fetch event
 * @param response - The response object
 * @returns A promise that resolves to a NextMiddlewareResult or the result itself
 */
export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

/**
 * Factory function for creating middleware
 * @param config - The middleware configuration
 * @param middleware - The next middleware in the chain
 * @returns A custom middleware function
 */
export type MiddlewareFactory = (config: MiddlewareConfiguration, middleware: CustomMiddleware) => CustomMiddleware;

/**
 * Chains multiple middleware functions together
 * @param config - The middleware configuration
 * @param functions - An array of middleware factory functions
 * @param index - The current index in the middleware chain (default: 0)
 * @returns A custom middleware function that represents the chained middlewares
 */
export function chain(config: MiddlewareConfiguration, functions: MiddlewareFactory[], index = 0): CustomMiddleware {
  const current = functions[index];

  if (current) {
    // Recursively chain the next middleware
    const next = chain(config, functions, index + 1);
    return current(config, next);
  }

  // Return a default middleware function when the chain is complete
  return (_request: NextRequest, _event: NextFetchEvent, response: NextResponse) => {
    return response;
  };
}
