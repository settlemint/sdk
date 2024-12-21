import { missingAccessTokenError, missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { getInstanceCredentials } from "@/utils/config";
import type { DotEnv } from "@settlemint/sdk-utils";

export const getApplicationOrPersonalAccessToken = async ({
  env,
  instance,
  prefer,
  allowFallback,
}: {
  env: Partial<DotEnv>;
  instance: string;
  prefer: "application" | "personal";
  allowFallback: boolean;
}) => {
  const applicationAccessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const personalAccessToken = (await getInstanceCredentials(instance))?.personalAccessToken;
  const preferredToken = prefer === "application" ? applicationAccessToken : personalAccessToken;
  const fallbackToken = prefer === "application" ? personalAccessToken : applicationAccessToken;

  if (preferredToken) {
    return preferredToken;
  }

  if (allowFallback && fallbackToken) {
    return fallbackToken;
  }

  return prefer === "personal" ? missingPersonalAccessTokenError() : missingAccessTokenError(!!personalAccessToken);
};
