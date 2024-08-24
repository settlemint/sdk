import createClient from "openapi-fetch";

export function createPortalClient<PortalRestPaths extends {}>(portalRestUrl: string) {
  if (globalThis.window?.document !== undefined || !process.env.SETTLEMINT_PAT_TOKEN) {
    return createClient<PortalRestPaths>({
      baseUrl: `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/portal/rest`,
    });
  }
  return createClient<PortalRestPaths>({
    baseUrl: portalRestUrl,
    headers: { "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN },
  });
}
