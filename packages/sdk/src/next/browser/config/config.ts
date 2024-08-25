import {
  type BrowserApplicationConfigEnv,
  BrowserApplicationConfigEnvSchema,
  BrowserConfigEnvSchema,
  type Config,
} from "@/common/config/schemas";

export function activeBrowserConfig(config: Config): BrowserApplicationConfigEnv {
  const cfg = BrowserConfigEnvSchema.parse({
    ...config,
    appUrl: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
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

  return BrowserApplicationConfigEnvSchema.parse({
    ...envConf,
    appUrl: cfg.appUrl,
    walletConnectProjectId: cfg.walletConnectProjectId,
  });
}
