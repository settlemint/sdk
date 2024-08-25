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
export function createPortalClient<PortalRestPaths extends Record<string, unknown>>(
  portalRestUrl: string,
): ReturnType<typeof createClient<PortalRestPaths>> {
  const config: PortalClientConfig = {
    baseUrl: isClientSide() ? `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/portal/rest` : portalRestUrl,
  };

  if (!isClientSide()) {
    if (!process.env.SETTLEMINT_PAT_TOKEN) {
      throw new Error("SETTLEMINT_PAT_TOKEN is required in server environment");
    }
    config.headers = { "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN };
  }

  return createClient<PortalRestPaths>(config);
}

function isClientSide(): boolean {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}
