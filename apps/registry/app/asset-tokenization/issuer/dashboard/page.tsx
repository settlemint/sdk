import { BreadcrumbSetter } from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";

export default function IssuerDashboard() {
  return (
    <>
      <BreadcrumbSetter
        items={[
          { label: "Issuers", href: "/issuer" },
          { label: "Dashboard", href: "/issuer/dashboard" },
        ]}
      />
      <p>Issuer Dashboard</p>
    </>
  );
}
