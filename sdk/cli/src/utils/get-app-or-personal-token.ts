import { missingAccessTokenError, missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { getInstanceCredentials } from "@/utils/config";
import type { DotEnv } from "@settlemint/sdk-utils";
import { note } from "@settlemint/sdk-utils/terminal";

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
  const personalAccessToken = (await getInstanceCredentials(instance))?.personalAccessToken;
  const preferredToken = prefer === "application" ? applicationAccessToken : personalAccessToken;
  const fallbackToken = prefer === "application" ? personalAccessToken : applicationAccessToken;
  const allowFallback = prefer === "application";
  note(`preferredToken is ${preferredToken}`, "info");
  note(`fallbackToken is ${fallbackToken}`, "info");
  note(`allowFallback is ${allowFallback}`, "info");
  if (preferredToken) {
    return preferredToken;
  }

  if (allowFallback && fallbackToken) {
    return fallbackToken;
  }

  return prefer === "personal" ? missingPersonalAccessTokenError() : missingAccessTokenError(!!personalAccessToken);
};
