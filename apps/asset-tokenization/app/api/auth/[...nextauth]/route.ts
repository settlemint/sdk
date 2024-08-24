import { settlemint } from "@/lib/sdk/edge/settlemint";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createPublicClient } from "viem";
import { parseSiweMessage } from "viem/siwe";

declare module "next-auth" {
  interface Session {
    address: string;
    chainId: number;
    nonce: string;
  }
}

const handler = NextAuth({
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider({
      name: "Ethereum",
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
      async authorize(credentials) {
        console.log("authorize", credentials);
        try {
          if (!credentials?.message) {
            return null;
          }
          const { message, signature } = credentials;
          const parsedMessage = parseSiweMessage(message as string);

          const publicClient = createPublicClient(settlemint.viem);

          const isValid = await publicClient.verifySiweMessage({
            message: message as string,
            signature: signature as `0x${string}`,
          });

          if (isValid) {
            return {
              id: `${parsedMessage.chainId}:${parsedMessage.address}`,
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
  },
  callbacks: {
    session({ session, token }) {
      console.log("session", session);
      if (!token.sub) {
        return session;
      }

      const [, chainId, address] = token.sub.split(":");
      if (chainId && address) {
        session.address = address;
        session.chainId = Number.parseInt(chainId, 10);
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
