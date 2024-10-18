/**
 * This module configures and exports NextAuth functionality for authentication.
 * It combines the auth configuration and providers to set up NextAuth.
 * It also extends the NextAuth Session type to include a wallet property.
 */

import NextAuth, { type DefaultSession } from "next-auth";
import { authConfig } from "./auth-config";
import { providers } from "./auth-providers";

/**
 * Configures and initializes NextAuth with the provided configuration and providers.
 * @returns An object containing NextAuth handlers, signIn, signOut, and auth functions.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: providers,
});

declare module "next-auth" {
  /**
   * Extends the Session interface to include a wallet property in the user object.
   */
  interface Session {
    user: {
      wallet: string;
    } & DefaultSession["user"];
  }
}
