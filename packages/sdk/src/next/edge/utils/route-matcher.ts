import type Link from "next/link";
import type { NextRequest } from "next/server";
import { pathToRegexp } from "path-to-regexp";

/**
 * Utility type for autocomplete suggestions
 * @template U - The type to be autocompleted, must extend T
 * @template T - The base type, defaults to string
 */
type Autocomplete<U extends T, T = string> = U | (T & Record<never, never>);

/**
 * Object containing utility functions for working with paths
 */
export const paths = {
  /**
   * Converts a path string to a regular expression
   * @param path - The path string to convert
   * @returns A RegExp object
   * @throws {Error} If the path is invalid
   */
  toRegexp: (path: string) => {
    try {
      return pathToRegexp(path);
    } catch (e) {
      throw new Error(
        `Invalid path: ${path}.\nConsult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp\n${(e as Error).message}`,
      );
    }
  },
};

/**
 * Utility type to add a wildcard to a path pattern
 */
type WithPathPatternWildcard<T> = `${T & string}(.*)`;

/**
 * Extracts the string type from Link href prop
 */
type NextTypedRoute<T = Parameters<typeof Link>["0"]["href"]> = T extends string ? T : never;

/**
 * Type for route matcher that supports Next.js typed routes
 */
type RouteMatcherWithNextTypedRoutes = Autocomplete<WithPathPatternWildcard<NextTypedRoute> | NextTypedRoute>;

/**
 * Union type for possible route matcher parameters
 */
export type RouteMatcherParam =
  | Array<RegExp | RouteMatcherWithNextTypedRoutes>
  | RegExp
  | RouteMatcherWithNextTypedRoutes
  | ((req: NextRequest) => boolean);

/**
 * Creates a route matcher function based on the provided routes
 * @param routes - The routes to match against
 * @returns A function that accepts a NextRequest and returns a boolean indicating if the request matches any of the routes
 * @throws {Error} If the path pattern is invalid
 *
 * @example
 * ```typescript
 * const matcher = createRouteMatcher(['/foo', '/bar(.*)']);
 * const isMatch = matcher(request);
 * ```
 */
export const createRouteMatcher = (routes: RouteMatcherParam) => {
  if (typeof routes === "function") {
    return (req: NextRequest) => routes(req);
  }

  const routePatterns = [routes || ""].flat().filter(Boolean);
  const matchers = precomputePathRegex(routePatterns);
  return (req: NextRequest) => matchers.some((matcher) => matcher.test(req.nextUrl.pathname));
};

/**
 * Precomputes regular expressions for the given patterns
 * @param patterns - An array of string or RegExp patterns
 * @returns An array of RegExp objects
 */
const precomputePathRegex = (patterns: Array<string | RegExp>) => {
  return patterns.map((pattern) => (pattern instanceof RegExp ? pattern : paths.toRegexp(pattern)));
};
