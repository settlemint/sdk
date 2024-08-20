import { Button } from "@/components/ui/button";
import { ConnectButton } from "@/components/ui/connect-button";
import Link from "next/link";
import { DarkModeToggle } from "../ui/darkmode-toggle";

export function PublicNavigation({ navItems }: { navItems: { href: string; label: string }[] }) {
  return (
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <DarkModeToggle variant="ghost" className="text-white" />
      {navItems.map((navItem) => (
        <Link key={navItem.href} href={navItem.href} prefetch={false}>
          <Button variant="ghost" className="text-white">
            {navItem.label}
          </Button>
        </Link>
      ))}
      <ConnectButton />
    </nav>
  );
}
