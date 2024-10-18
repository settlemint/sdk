"use server";

import { signIn } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signInActionSchema } from "../schemas/sign-in-schema";

export const signInAction = actionClient.schema(signInActionSchema).action(async ({ parsedInput }) => {
  try {
    const { provider, ...formData } = parsedInput;
    return await signIn(provider, {
      ...formData,
      redirectTo: "/wallet",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/auth/error?error=${error.type}`);
    }
    throw error;
  }
});
