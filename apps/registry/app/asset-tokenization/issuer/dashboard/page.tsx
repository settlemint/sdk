import { BreadcrumbSetter } from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";
import { TokenCharts } from "@/components/ui/token-charts/token-charts";

export default function IssuerDashboard() {
  return (
    <>
      <BreadcrumbSetter
        items={[
          { label: "Issuers", href: "/issuer" },
          { label: "Dashboard", href: "/issuer/dashboard" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <TokenCharts />
    </>
  );
}
