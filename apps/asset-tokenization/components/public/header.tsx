import { Logo } from "@/components/public/logo";
import { PublicNavigation } from "@/components/public/navigation";
import { Link } from "@/lib/i18n";
import type { PropsWithChildren } from "react";

export function PublicHeader({ children, noNavButton }: PropsWithChildren<{ noNavButton?: boolean }>) {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between py-4">
      <Link href="/" className="flex items-center" aria-label="SettleMint Asset Tokenization Starterkit">
        <Logo />
      </Link>
      <PublicNavigation noNavButton={noNavButton} />
      {children}
    </header>
  );
}
