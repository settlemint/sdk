import { config } from "@/cli/lib/config/config";
import { isClientSide } from "@/common/is-clientside";
import { activeServerConfig } from "@/next/node/config/config";
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

  if (!isClientSide()) {
    const cfg = config();
    if (cfg) {
      const activeConfig = activeServerConfig(cfg);
      if (!activeConfig.portalRest) {
        throw new Error("Portal REST URL is not configured in the active server config");
      }
      pcfg.baseUrl = activeConfig.portalRest;
      pcfg.headers = {
        "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN ?? "",
      };
    }
  }

  return createClient<PortalRestPaths>(pcfg);
}
