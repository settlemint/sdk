import { MobileNavigation } from "@/components/secure/sidebar/modile-navigation";
import { ConnectButton } from "../global/connect-button";
import { DarkModeToggle } from "../global/darkmode-toggle";
import SecureBreadcrumb from "./breadcrumb/breadcrumb";
import type { BreadcrumbItemType } from "./breadcrumb/ellipsis-dropdown";

interface SecureHeaderProps {
  items: BreadcrumbItemType[];
}

export function SecureHeader({ items }: SecureHeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
      <MobileNavigation />
      <SecureBreadcrumb items={items} />
      <div className="ml-auto flex items-center space-x-2">
        <DarkModeToggle variant="ghost" />
        <ConnectButton />
      </div>
    </header>
  );
}
