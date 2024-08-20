import { Button } from "@/components/ui/button";
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
      <Link href="/s" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
        <Button>Login</Button>
      </Link>
    </nav>
  );
}
