import { type ConfigEnv, ConfigEnvSchema } from "@/common/config/schemas";
import { readSettlemintConfig } from "./read-config";

export function config(): ConfigEnv | undefined {
  const config = readSettlemintConfig();
  if (!config) {
    return undefined;
  }
  return ConfigEnvSchema.parse({
    ...config,
    pat: process.env.SETTLEMINT_PAT_TOKEN,
    appUrl: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL,
    hasuraAdminSecret: process.env.SETTLEMINT_HASURA_GQL_ADMIN_SECRET,
    authSecret: process.env.SETTLEMINT_AUTH_SECRET,
    sessionSecret: process.env.AUTH_SECRET,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  });
}
