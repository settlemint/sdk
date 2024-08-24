import type { ApplicationConfigEnv } from "@/common/config/schemas";
import createClient from "openapi-fetch";

export function createPortalClient<PortalRestPaths extends {}>(config: ApplicationConfigEnv) {
  if (globalThis.window?.document !== undefined || !process.env.SETTLEMINT_PAT_TOKEN) {
    return createClient<PortalRestPaths>({
      baseUrl: `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/portal/rest`,
    });
  }
  return createClient<PortalRestPaths>({
    baseUrl: config.portalRest,
    headers: { "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN },
  });
}
