import {
  type ApplicationConfigEnv,
  ApplicationConfigEnvSchema,
  type Config,
  ConfigEnvSchema,
} from "@/common/config/schemas";

export function activeServerConfig(config: Config): ApplicationConfigEnv {
  const cfg = ConfigEnvSchema.parse({
    ...config,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    pat: process.env.SETTLEMINT_PAT_TOKEN,
    appUrl: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL,
    hasuraAdminSecret: process.env.SETTLEMINT_HASURA_GQL_ADMIN_SECRET,
    sessionSecret: process.env.NEXTAUTH_SECRET,
  });

  const applications = cfg.applications ?? {};

  const env = process.env.SETTLEMINT_APPLICATION ?? cfg?.defaultApplication.id;
  if (!env || Object.keys(applications).length === 0) {
    throw new Error(
      "No environment found, either set SETTLEMINT_APPLICATION or define a default environment in your .settlemintrc.json file",
    );
  }

  const envConf = applications[env];
  if (!envConf) {
    throw new Error(`No application found for ${env}, please run \`settlemint connect\``);
  }

  return ApplicationConfigEnvSchema.parse({
    ...envConf,
    pat: cfg.pat,
    appUrl: cfg.appUrl,
    hasuraAdminSecret: cfg.hasuraAdminSecret,
    walletConnectProjectId: cfg.walletConnectProjectId,
  });
}
