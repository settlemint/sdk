import type { Awaitable } from "@auth/core/types";
import { HasuraAdapter } from "@auth/hasura-adapter";
import NextAuth, { type NextAuthConfig, type NextAuthResult } from "next-auth";
import type { NextRequest } from "next/server.ts";
import { config } from "../config/config.ts";

export interface SettleMintAuthConfig extends NextAuthConfig {}

export function SettleMintAuth(
  settleMintConfig: SettleMintAuthConfig | ((request: NextRequest | undefined) => Awaitable<SettleMintAuthConfig>),
): NextAuthResult {
  return NextAuth(async (_request: NextRequest | undefined) => {
    const cfg = await config();
    if (!cfg) {
      throw new Error("No configuration found, please run settlemint connect");
    }

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

    const hasuraGql = envConf.hasuraGql;
    const hasuraAdminSecret = cfg.hasuraAdminSecret;
    if (!hasuraGql || !hasuraAdminSecret) {
      throw new Error(`No hasuraGql or hasuraAdminSecret found for ${env}, please run \`settlemint connect\``);
    }

    return {
      ...settleMintConfig,
      adapter: HasuraAdapter({
        endpoint: hasuraGql,
        adminSecret: hasuraAdminSecret,
      }),
    } as NextAuthConfig;
  });
}
