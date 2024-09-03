import { settlemint } from "@/lib/settlemint";
import NextAuth, { type AuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { parseSiweMessage } from "viem/siwe";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      address: string;
    };
  }
}

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV !== "production",
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider({
      name: "Wallet",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.message) {
            return null;
          }
          const { message, signature } = credentials;
          const parsedMessage = parseSiweMessage(message as string);

          const isValid = await settlemint.node.viem.publicClient.verifySiweMessage({
            message: message as string,
            signature: signature as `0x${string}`,
            nonce: await getCsrfToken({ req }),
          });

          if (isValid) {
            return {
              id: `${parsedMessage.address}`,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.SETTLEMINT_AUTH_SECRET,
  callbacks: {
    session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      console.log("token", token);

      session.user.address = token.sub;

      console.log("session", session);

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
