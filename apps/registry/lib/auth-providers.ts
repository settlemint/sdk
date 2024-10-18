import { hasuraClient, hasuraGraphql } from "@/lib/settlemint/hasura";
import { compare } from "bcryptjs";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

/**
 * GraphQL query to fetch a wallet by email address.
 */
const getWalletByEmail = hasuraGraphql(`
  query getWalletByEmail($email: String!) {
    starterkit_wallets_by_pk(email: $email) {
      wallet
      email
      password
    }
  }
`);

/**
 * Zod schema for validating credentials.
 */
const credentialsSchema = z.object({
  username: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

/**
 * Array of authentication providers.
 */
export const providers: Provider[] = [
  Credentials({
    credentials: {
      username: { label: "Email" },
      password: { label: "Password", type: "password" },
    },
    /**
     * Authorizes user credentials.
     * @param credentials - The user's credentials.
     * @returns The user object if authorized, null otherwise.
     */
    async authorize(credentials) {
      const validatedCredentials = credentialsSchema.safeParse(credentials);

      if (!validatedCredentials.success) {
        return null;
      }

      const { username, password } = validatedCredentials.data;

      const walletResponse = await hasuraClient.request(getWalletByEmail, { email: username });

      // we could not find a wallet with this email address
      if (!walletResponse.starterkit_wallets_by_pk?.email) {
        return null;
      }

      const passwordCorrect = await compare(password, walletResponse.starterkit_wallets_by_pk.password);

      // the hashed password from the database does not match the one provided
      if (!passwordCorrect) {
        return null;
      }

      const { email, wallet } = walletResponse.starterkit_wallets_by_pk;

      return { email, wallet };
    },
  }),
];

/**
 * Map of providers excluding the 'credentials' provider.
 */
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    }
    return { id: provider.id, name: provider.name };
  })
  .filter((provider) => provider.id !== "credentials");
