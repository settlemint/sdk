import type { Client, Hex } from "viem";

/**
 * Parameters for setting the balance of a wallet.
 */
export type AnvilSetBalanceParameters = [wallet: string, balance: Hex];

/**
 * RPC schema for setting the balance of a wallet.
 */
type SetBalanceRpcSchema = {
  Method: "anvil_setBalance";
  Parameters: AnvilSetBalanceParameters;
  ReturnType: unknown;
};

/**
 * Set the balance of a wallet in the Anvil test environment.
 * @param client - The viem client to use for the request.
 * @returns An object with a anvilSetBalance method.
 */
export function anvilSetBalance(client: Client) {
  return {
    /**
     * Sets the balance of a wallet.
     * @param args - The parameters for setting the balance.
     * @returns A promise that resolves to the result of the balance setting operation.
     */
    anvilSetBalance(args: AnvilSetBalanceParameters): Promise<unknown> {
      return client.request<SetBalanceRpcSchema>({
        method: "anvil_setBalance",
        params: args,
      });
    },
  };
}
