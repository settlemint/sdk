import type { BreadcrumbItemType } from "@/components/secure/breadcrumb/ellipsis-dropdown";
import { Main } from "@/components/secure/main";

const breadcrumbItems: BreadcrumbItemType[] = [{ label: "Dashboard" }];

export default function SecureDashboard() {
  return (
    <Main breadcrumbItems={breadcrumbItems}>
      <div>Secure!</div>
    </Main>
  );
}
