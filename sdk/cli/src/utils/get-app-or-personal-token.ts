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

  note(`prefer is ${prefer}`, "debug", env.SETTLEMINT_DEBUG);
  note(`preferredToken is ${preferredToken}`, "debug", env.SETTLEMINT_DEBUG);
  note(`fallbackToken is ${fallbackToken}`, "debug", env.SETTLEMINT_DEBUG);
  note(`allowFallback is ${allowFallback}`, "debug", env.SETTLEMINT_DEBUG);

  if (preferredToken) {
    return preferredToken;
  }

  if (allowFallback && fallbackToken) {
    return fallbackToken;
  }

  return prefer === "personal" ? missingPersonalAccessTokenError() : missingAccessTokenError(!!personalAccessToken);
};
