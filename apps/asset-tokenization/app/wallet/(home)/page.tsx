import type { BreadcrumbItemType } from "@/components/secure/breadcrumb/ellipsis-dropdown";
import { Main } from "@/components/secure/main";

const breadcrumbItems: BreadcrumbItemType[] = [{ label: "Dashboard" }];

export default function WalletHome() {
  return <Main breadcrumbItems={breadcrumbItems}>{JSON.stringify(process.env.SETTLEMINT_CONFIG)}</Main>;
}
