import { Button } from "@/components/ui/button";
import { BreadcrumbSetter } from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";
import { TokenTable } from "./_components/token-table";

export default function IssuerTokens() {
  return (
    <>
      <BreadcrumbSetter
        items={[
          { label: "Issuers", href: "/issuer" },
          { label: "Tokens", href: "/issuer/tokens" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tokens</h2>
        <div className="flex items-center space-x-2">
          <Button>Issue new token</Button>
        </div>
      </div>
      <TokenTable />
    </>
  );
}
