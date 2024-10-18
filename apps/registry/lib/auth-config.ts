import type { NextAuthConfig } from "next-auth";

/**
 * Configuration object for NextAuth, excluding the providers.
 * @type {Omit<NextAuthConfig, "providers">}
 */
export const authConfig: Omit<NextAuthConfig, "providers"> = {
  secret: process.env.SETTLEMINT_AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    newUser: "/auth/new-user",
    error: "/auth/error",
  },
  callbacks: {
    /**
     * Callback to modify the JWT token.
     * @param {object} params - The parameters object.
     * @param {object} params.token - The JWT token.
     * @param {object} params.user - The user object.
     * @returns {Promise<object>} The modified token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.wallet = (user as { wallet: string }).wallet;
      }
      return token;
    },
    /**
     * Callback to modify the session object.
     * @param {object} params - The parameters object.
     * @param {object} params.session - The session object.
     * @param {object} params.token - The JWT token.
     * @returns {Promise<object>} The modified session.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.wallet = token.wallet as string;
      }
      return session;
    },
  },
};
