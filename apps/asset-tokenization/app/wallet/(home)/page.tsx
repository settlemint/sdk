import { TokenizationWizard } from "@/components/features/tokenization-wizard";
import type { BreadcrumbItemType } from "@/components/secure/breadcrumb/ellipsis-dropdown";
import { Main } from "@/components/secure/main";
import { SidePanel } from "@/components/ui/sidepanel";
import { type SearchParams, createSearchParamsCache, parseAsInteger, parseAsJson } from "nuqs/server";

const breadcrumbItems: BreadcrumbItemType[] = [{ label: "Dashboard" }];
const searchParamsCache = createSearchParamsCache({ currentStep: parseAsInteger.withDefault(1), state: parseAsJson() });

export default function WalletHome({ searchParams }: { searchParams: SearchParams }) {
  const parsedParams = searchParamsCache.parse(searchParams);
  return (
    <Main breadcrumbItems={breadcrumbItems}>
      <div>{JSON.stringify(process.env.SETTLEMINT_CONFIG)}</div>
      <SidePanel>
        <TokenizationWizard defaultValues={parsedParams.state} />
      </SidePanel>
    </Main>
  );
}
