import createClient from "openapi-fetch";

interface PortalClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

/**
 * Creates a portal client for interacting with the SettleMint API.
 *
 * @param portalRestUrl The base URL for the portal REST API.
 * @returns A client instance for making API requests.
 * @throws Error if SETTLEMINT_PAT_TOKEN is missing in a server environment.
 */
export function createPortalRestClient<PortalRestPaths extends {}>(): ReturnType<typeof createClient<PortalRestPaths>> {
  const pcfg: PortalClientConfig = {
    baseUrl: `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/portal/rest`,
  };

  return createClient<PortalRestPaths>(pcfg);
}
