import { SettleMintAuth } from "@settlemint/sdk-next";

export const { handlers, signIn, signOut, auth } = SettleMintAuth({
  providers: [],
});
