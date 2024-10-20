"use client";

import { formatTokenValue } from "@/lib/number";
import { theGraphClient, theGraphGraphql } from "@/lib/settlemint/the-graph";
import { useSuspenseQuery } from "@tanstack/react-query";

const EvmAddressBalancesQuery = theGraphGraphql(`
  query AddressBalances($account: String!) {
    erc20Balances(where: {account: $account}) {
      value
      contract {
        name
        symbol
      }
    }
  }
`);

/**
 * Renders a display of token balances.
 * @param props - The component props.
 * @param props.balances - An array of token balances to display.
 * @returns The rendered BalanceDisplay component.
 */
export function EvmAddressBalances({ address }: { address: string }) {
  const { data: balances } = useSuspenseQuery({
    queryKey: ["evm-address-balances", address],
    queryFn: async () => {
      const response = await theGraphClient.request(EvmAddressBalancesQuery, {
        account: address,
      });
      if (!response?.erc20Balances) {
        return [];
      }
      return response.erc20Balances;
    },
    refetchInterval: 10000,
    staleTime: 5000,
  });

  return (
    <div className="mt-2">
      <dl className="text-sm">
        {balances.map((balance) => (
          <div key={balance.contract.symbol} className="flex items-center justify-between">
            <dt className="text-muted-foreground">{balance.contract.name}:</dt>
            <dd>
              {formatTokenValue(Number.parseFloat(balance.value), 2)} {balance.contract.symbol}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
