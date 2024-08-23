import Logo from "@/components/public/logo";
import { PublicNavigation } from "@/components/public/navigation";
import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="container px-4 lg:px-6 h-14 flex items-center py-4 mt-4">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Logo />
        <span className="sr-only">SettleMint Asset Tokenization Starterkit</span>
      </Link>
      <PublicNavigation navItems={[{ href: "https://console.settlemint.com/documentation", label: "Documentation" }]} />
    </header>
  );
}
