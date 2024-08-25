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
    sessionSecret: process.env.NEXTAUTH_SECRET,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  });
}
