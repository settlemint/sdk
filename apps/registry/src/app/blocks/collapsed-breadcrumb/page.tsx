import { CollapsedBreadcrumbSetter } from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb-setter";

export default function CollapsedBreadcrumbPage() {
  return (
    <>
      <CollapsedBreadcrumbSetter
        items={[
          { label: "Home", href: "/" },
          { label: "Blocks", href: "/blocks" },
          { label: "Collapsed Breadcrumb", href: "/blocks/collapsed-breadcrumb" },
        ]}
      />
      <h1 className="text-2xl font-bold">Collapsed Breadcrumb</h1>
    </>
  );
}
