import { Button } from "@/components/ui/button";
import { BreadcrumbSetter } from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";
import { SidePanel } from "@/components/ui/sidepanel/sidepanel";
import { type SearchParams, createSearchParamsCache, parseAsInteger, parseAsJson, parseAsString } from "nuqs/server";
import { TokenTable } from "./_components/token-table";
import { CreateTokenForm } from "./_forms/create-token-form";

const searchParamsCache = createSearchParamsCache({
  currentStep: parseAsInteger.withDefault(1),
  state: parseAsJson(),
  formId: parseAsString.withDefault(""),
});

interface WalletTokenPageProps {
  searchParams: SearchParams;
}

export default function IssuerTokens({ searchParams }: WalletTokenPageProps) {
  const parsedParams = searchParamsCache.parse(searchParams);
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
        <SidePanel
          title="Create a new token"
          description="Easily convert your assets into digital tokens using this step-by-step wizard."
          trigger={
            <div className="flex items-center space-x-2">
              <Button>Issue new token</Button>
            </div>
          }
        >
          <div className="p-8">
            <CreateTokenForm defaultValues={parsedParams.state} formId={parsedParams.formId || "create-token-form"} />
          </div>
        </SidePanel>
      </div>
      <TokenTable />
    </>
  );
}
