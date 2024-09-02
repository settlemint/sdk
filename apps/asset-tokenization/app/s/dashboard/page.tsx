import { TokenizationWizard } from "@/components/features/tokenization-wizard";
import type { BreadcrumbItemType } from "@/components/secure/breadcrumb/ellipsis-dropdown";
import { Main } from "@/components/secure/main";
import { SidePanel } from "@/components/ui/sidepanel";

const breadcrumbItems: BreadcrumbItemType[] = [{ label: "Dashboard" }];

export default function SecureDashboard() {
  return (
    <Main breadcrumbItems={breadcrumbItems}>
      <SidePanel>
        <TokenizationWizard />
      </SidePanel>
    </Main>
  );
}
