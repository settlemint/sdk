"use server";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { portalClient, portalGraphql } from "@/lib/settlemint/portal";
import { CreateTokenSchema } from "./create-token-form-schema";

// TODO: figure out why the portal cannot estimate the gas, i have to set it myself or it defaults to 90k
const CreateTokenMutation = portalGraphql(`
mutation CreateTokenMutation($address: String!, $from: String!, $name_: String!, $symbol_: String!) {
  StarterKitERC20FactoryCreateToken(
    address: $address
    from: $from
    input: {extraData_: "", name_: $name_, symbol_: $symbol_}
    gasLimit: "2000000"
  ) {
    transactionHash
  }
}
`);

export const createTokenAction = actionClient.schema(CreateTokenSchema).action(async ({ parsedInput }) => {
  const { tokenName, tokenSymbol } = parsedInput;
  const session = await auth();

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  const result = await portalClient.request(CreateTokenMutation, {
    address: process.env.SETTLEMINT_PREDEPLOYED_CONTRACT_ERC20_FACTORY!,
    from: session.user.wallet,
    name_: tokenName,
    symbol_: tokenSymbol,
  });

  const transactionHash = result.StarterKitERC20FactoryCreateToken?.transactionHash;

  if (!transactionHash) {
    throw new Error("Transaction hash not found");
  }

  return transactionHash;
});
