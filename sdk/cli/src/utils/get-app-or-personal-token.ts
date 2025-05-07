import { missingAccessTokenError, missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { getInstanceCredentials } from "@/utils/config";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { sanitizeInstanceUrl } from "./instance-url-utils";

export const getApplicationOrPersonalAccessToken = async ({
  env,
  instance,
  prefer,
}: {
  env: Partial<DotEnv>;
  instance: string;
  prefer: "application" | "personal";
}) => {
  const applicationAccessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const instanceUrl = sanitizeInstanceUrl(instance);
  const personalAccessToken = (await getInstanceCredentials(instanceUrl))?.personalAccessToken;
  const preferredToken = prefer === "application" ? applicationAccessToken : personalAccessToken;
  const fallbackToken = prefer === "application" ? personalAccessToken : applicationAccessToken;
  const allowFallback = prefer === "application";

  if (preferredToken) {
    return preferredToken;
  }

  if (allowFallback && fallbackToken) {
    return fallbackToken;
  }

  return prefer === "personal" ? missingPersonalAccessTokenError() : missingAccessTokenError(!!personalAccessToken);
};
