import { Logo } from "@/components/public/logo";
import { PublicNavigation } from "@/components/public/navigation";
import Link from "next/link";
import type { PropsWithChildren } from "react";

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [{ href: "https://console.settlemint.com/documentation", label: "Docs" }];

export function PublicHeader({ children, noNavButton }: PropsWithChildren<{ noNavButton?: boolean }>) {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between py-4">
      <Link href="/" className="flex items-center" aria-label="SettleMint Asset Tokenization Starterkit">
        <Logo />
      </Link>
      <PublicNavigation navItems={NAV_ITEMS} noNavButton={noNavButton} />
      {children}
    </header>
  );
}
