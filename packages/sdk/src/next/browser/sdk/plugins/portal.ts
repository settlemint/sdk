import { env } from "next-runtime-env";
import createClient from "openapi-fetch";

interface PortalClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

/**
 * Creates a portal client for interacting with the SettleMint API.
 *
 * This function generates a client instance that can be used to make API requests
 * to the SettleMint portal. It uses the SETTLEMINT_APP_URL environment
 * variable to construct the base URL for the API endpoints.
 *
 * @template PortalRestPaths - The type representing the API paths and operations.
 * @returns A client instance for making API requests.
 * @throws {Error} If SETTLEMINT_APP_URL is not defined in the environment.
 *
 * @example
 * ```typescript
 * type MyApiPaths = {
 *   '/users': {
 *     get: {
 *       responses: {
 *         200: { content: { 'application/json': User[] } }
 *       }
 *     }
 *   }
 * };
 *
 * const client = createPortalRestClient<MyApiPaths>();
 * const { data, error } = await client.GET('/users');
 * ```
 */
export function createPortalRestClient<PortalRestPaths extends {}>(): ReturnType<typeof createClient<PortalRestPaths>> {
  if (!env("NEXT_PUBLIC_SETTLEMINT_APP_URL")) {
    throw new Error("SETTLEMINT_APP_URL is not defined");
  }

  const pcfg: PortalClientConfig = {
    baseUrl: `${env("NEXT_PUBLIC_SETTLEMINT_APP_URL")}/proxy/portal/rest`,
  };

  return createClient<PortalRestPaths>(pcfg);
}
