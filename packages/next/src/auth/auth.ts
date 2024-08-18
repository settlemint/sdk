import { HasuraAdapter } from "@auth/hasura-adapter";
import NextAuth, { type NextAuthConfig, type NextAuthResult } from "next-auth";
import type { NextRequest } from "next/server";
import { applicationConfig } from "../config/config";

export interface SettleMintAuthConfig extends NextAuthConfig {}

export function SettleMintAuth(settleMintConfig: SettleMintAuthConfig): NextAuthResult {
  return NextAuth((_request: NextRequest | undefined) => {
    const cfg = applicationConfig();

    const hasuraGql = cfg.hasuraGql;
    const hasuraAdminSecret = cfg.hasuraAdminSecret;
    if (!hasuraGql || !hasuraAdminSecret) {
      throw new Error(
        `No hasuraGql or hasuraAdminSecret found for ${cfg.application.displayName}, please run \`settlemint connect\``,
      );
    }

    return {
      ...settleMintConfig,
      callbacks: {
        ...settleMintConfig.callbacks,
        authorized: async ({ auth }) => {
          // Logged in users are authenticated, otherwise redirect to login page
          return !!auth;
        },
      },
      adapter: HasuraAdapter({
        endpoint: hasuraGql,
        adminSecret: hasuraAdminSecret,
      }),
    } as NextAuthConfig;
  });
}
