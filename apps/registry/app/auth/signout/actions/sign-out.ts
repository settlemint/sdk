"use server";

import { signOut } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signOutActionSchema } from "../schemas/sign-out-schema";

export const signOutAction = actionClient.schema(signOutActionSchema).action(async () => {
  try {
    return await signOut({
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/auth/error?error=${error.type}`);
    }
    throw error;
  }
});
