"use client";

import { Card } from "@/components/ui/card";
import { BreadcrumbSetter } from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";
import { TokenCharts } from "@/components/ui/token-charts/token-charts";
import { formatTokenValue } from "@/lib/number";
import { useParams } from "next/navigation";
import { useTokenDetails } from "../_queries/token-details";

type ContractData = NonNullable<ReturnType<typeof useTokenDetails>["data"]>["erc20Contract"];

const formatLabel = (key: string): string => {
  const words = key.split(/(?=[A-Z])/).map((word) => word.toLowerCase());
  return words.map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)).join(" ");
};

const formatValue = (key: keyof ContractData, value: unknown, decimals?: number): string => {
  if (value === null || value === undefined) return "N/A";
  if (Array.isArray(value)) return `${(value ?? []).length}`;
  if (typeof value === "object") return JSON.stringify(value);
  if (key === "totalSupply" && decimals !== undefined) {
    return formatTokenValue(BigInt(value as string), decimals);
  }
  return String(value);
};

export default function WalletTokenDetailsPage() {
  const params = useParams();
  const address = params.address as string;
  const { data } = useTokenDetails(address);

  const contract = data?.erc20Contract;

  if (!contract) {
    return <div>No contract data available</div>;
  }

  type ContractDataValue = ContractData[keyof ContractData];
  const fields = Object.entries(contract) as [keyof ContractData, ContractDataValue][];

  return (
    <>
      <BreadcrumbSetter
        items={[
          { label: "Issuers", href: "/issuer" },
          { label: "Tokens", href: "/issuer/tokens" },
          { label: contract.name ?? "", href: `/issuer/tokens/${address}/details` },
        ]}
      />
      <h3 className="text-lg font-semibold text-primary">Token Details</h3>
      <Card className="p-4">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {fields
            .filter(([key]) => !["id", "name", "balances", "transfers"].includes(key))
            .map(([key, value]) => (
              <div key={key}>
                <dt className="text-sm font-medium text-muted-foreground">{formatLabel(key)}</dt>
                <dd className="mt-1 text-sm">{formatValue(key, value, 2)}</dd>
              </div>
            ))}
        </dl>
      </Card>
      <TokenCharts token={address} />
    </>
  );
}
