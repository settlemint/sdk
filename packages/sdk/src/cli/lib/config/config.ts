import { ConfigEnvSchema } from "@/common/config/schemas";
import { readSettlemintConfig } from "./read-config";

export function config() {
  const config = readSettlemintConfig();
  if (!config) {
    return undefined;
  }
  return ConfigEnvSchema.parse({
    ...config,
    pat: process.env.SETTLEMINT_PAT_TOKEN,
    appUrl: process.env.SETTLEMINT_APP_URL,
    hasuraAdminSecret: process.env.SETTLEMINT_HASURA_GQL_ADMIN_SECRET,
    sessionSecret: process.env.SETTLEMINT_AUTH_SECRET,
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
  });
}
