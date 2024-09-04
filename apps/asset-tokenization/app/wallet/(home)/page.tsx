import type { BreadcrumbItemType } from "@/components/secure/breadcrumb/ellipsis-dropdown";
import { Main } from "@/components/secure/main";

const breadcrumbItems: BreadcrumbItemType[] = [{ label: "Dashboard" }];

export default function SecureHome() {
  return (
    <Main breadcrumbItems={breadcrumbItems}>
      {/* <SidePanel>
        <TokenizationWizard />
      </SidePanel> */}
      xxx
    </Main>
  );
}
