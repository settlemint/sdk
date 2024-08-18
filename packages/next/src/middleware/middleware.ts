import type { NextMiddleware } from "next/server";
import { withAuth } from "./auth-middleware";
import { type CustomMiddleware, type MiddlewareConfiguration, type MiddlewareFactory, chain } from "./chain";
import { withProxy } from "./proxy-middleware";

export function withSettleMintMiddleware(
  config: MiddlewareConfiguration,
  middleware?: NextMiddleware,
): CustomMiddleware {
  const middlewares = [withProxy, withAuth];

  if (middleware) {
    // Convert the Next.js middleware to a CustomMiddleware
    const wrappedMiddleware: MiddlewareFactory = (_config, middleware) => {
      return async (request, event, response) => {
        return middleware(request, event, response);
      };
    };
    middlewares.push(wrappedMiddleware);
  }

  return chain(config, middlewares);
}
