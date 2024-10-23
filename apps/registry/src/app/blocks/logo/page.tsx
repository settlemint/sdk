import { CollapsedBreadcrumbSetter } from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb-setter";
import { Logo } from "@/components/blocks/logo/logo";

export default function LogoPage() {
  return (
    <>
      <CollapsedBreadcrumbSetter
        items={[
          { label: "Home", href: "/" },
          { label: "Blocks", href: "/blocks" },
          { label: "Logo", href: "/blocks/logo" },
        ]}
      />
      <h1 className="text-2xl font-bold">Logo</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Logo />
        <Logo variant="vertical" />
        <Logo variant="icon" />
      </div>
    </>
  );
}
