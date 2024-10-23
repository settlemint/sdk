import { CollapsedBreadcrumbSetter } from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb-setter";
import { ThemeToggle } from "@/components/blocks/dark-mode/theme-toggle";

export default function ThemeTogglePage() {
  return (
    <>
      <CollapsedBreadcrumbSetter
        items={[
          { label: "Home", href: "/" },
          { label: "Blocks", href: "/blocks" },
          { label: "Dark Mode", href: "/blocks/dark-mode" },
        ]}
      />
      <h1 className="text-2xl font-bold">Dark Mode</h1>
      <ThemeToggle />
    </>
  );
}
