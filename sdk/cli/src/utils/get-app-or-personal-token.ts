import { missingAccessTokenError, missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { getInstanceCredentials } from "@/utils/config";
import { loadEnv } from "@settlemint/sdk-utils";

export const getApplicationOrPersonalAccessToken = async ({
  validateEnv,
  prod,
  instance,
  prefer,
  strict,
}: {
  validateEnv: boolean;
  prod: boolean;
  instance: string;
  prefer: "application" | "personal";
  strict: boolean;
}) => {
  const env = await loadEnv(validateEnv, prod);
  const applicationAccessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const personalAccessToken = (await getInstanceCredentials(instance))?.personalAccessToken;
  const preference = prefer === "application" ? applicationAccessToken : personalAccessToken;
  const fallback = prefer === "application" ? personalAccessToken : applicationAccessToken;

  if (preference) {
    return preference;
  }

  if (!strict && fallback) {
    return fallback;
  }

  return preference === "personal" ? missingPersonalAccessTokenError() : missingAccessTokenError(!!personalAccessToken);
};
