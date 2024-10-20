"use client";

import { EvmAddress } from "@/components/ui/evm-address/evm-address";
import { EvmAddressBalances } from "@/components/ui/evm-address/evm-address-balances";
import { TabNavigation } from "@/components/ui/tab-navigation/tab-navigation";
import { useParams } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useTokenDetails } from "./_queries/token-details";

export default function WalletTokenDetailLayout({ children }: PropsWithChildren) {
  const params = useParams();
  const address = params.address as string;

  const { data } = useTokenDetails(address);

  return (
    <>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          <span>{data?.erc20Contract?.name}</span>
          <div className="text-sm text-muted-foreground">
            <EvmAddress address={address} prefixLength={12} suffixLength={8}>
              <EvmAddressBalances address={address} />
            </EvmAddress>
          </div>
        </h2>
      </div>
      <div className="border-b border-card">
        <TabNavigation
          items={[
            { href: `/issuer/tokens/${address}/details`, name: "Details" },
            {
              href: `/issuer/tokens/${address}/holders`,
              name: "Holders",
              badge: data?.erc20Contract?.balances?.length,
            },
          ]}
        />
      </div>
      {children}
    </>
  );
}
