"use client";

import { useParams } from "next/navigation";
import { BalancesTable } from "./_components/balances-table";

export default function WalletTokenDetailsPage() {
  const params = useParams();
  const address = params.address as string;

  return (
    <div className="WalletTokenDetailPage">
      <h3 className="text-lg font-semibold text-primary">Holders</h3>
      <BalancesTable address={address} />
    </div>
  );
}
