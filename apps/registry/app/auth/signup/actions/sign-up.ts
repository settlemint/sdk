"use server";

import { signIn } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { hasuraClient, hasuraGraphql } from "@/lib/settlemint/hasura";
import { portalClient, portalGraphql } from "@/lib/settlemint/portal";
import { genSalt, hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signUpActionSchema } from "../schemas/sign-up-schema";

const walletExists = hasuraGraphql(`
  query getWalletByEmail($email: String!) {
    starterkit_wallets_aggregate(where: {email: {_eq: $email}}) {
      aggregate {
        count
      }
    }
  }
`);

const hasAtLeastOneAdmin = hasuraGraphql(`
  query hasAtLeastOneAdmin {
    starterkit_wallets_aggregate(limit: 1, where: { role: { _contains: ["admin"] } }) {
      aggregate {
        count
      }
    }
  }
`);

const createNewWallet = hasuraGraphql(`
  mutation createNewWallet($email: String!, $password: String!, $wallet: String!, $role: [String!]) {
    insert_starterkit_wallets_one(object: { email: $email, password: $password, wallet: $wallet, role: $role }) {
      email
      role
      wallet
    }
  }
`);

const createUserWallet = portalGraphql(`
  mutation createUserWallet($keyVaultId: String!, $name: String!) {
    createWallet(keyVaultId: $keyVaultId, walletInfo: { name: $name }) {
      address
    }
  }
`);

export const signUpAction = actionClient.schema(signUpActionSchema).action(async ({ parsedInput }) => {
  try {
    const { provider, ...formData } = parsedInput;

    const walletCount = await hasuraClient.request(walletExists, { email: formData.username });

    if (walletCount.starterkit_wallets_aggregate.aggregate?.count === 0) {
      const hasAdmin = await hasuraClient.request(hasAtLeastOneAdmin);
      const role = [(hasAdmin.starterkit_wallets_aggregate.aggregate?.count ?? 0) > 0 ? "user" : "admin"];

      const wallet = await portalClient.request(createUserWallet, {
        keyVaultId: process.env.SETTLEMINT_HD_PRIVATE_KEY!,
        name: formData.username,
      });

      const salt = await genSalt(10);
      const hashedPassword = await hash(formData.password, salt);

      await hasuraClient.request(createNewWallet, {
        email: formData.username,
        password: hashedPassword,
        wallet: wallet.createWallet?.address ?? "",
        role,
      });
    }

    return await signIn(provider, { ...formData, redirectTo: "/wallet" });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/auth/error?error=${error.type}`);
    }
    throw error;
  }
});
