import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DarkModeToggle } from "../global/darkmode-toggle";

interface NavItem {
  href: string;
  label: string;
}

interface PublicNavigationProps {
  navItems: NavItem[];
}

export function PublicNavigation({ navItems }: PublicNavigationProps) {
  return (
    <nav className="ml-auto flex items-center gap-4 sm:gap-6">
      <DarkModeToggle variant="ghost" className="text-foreground" />
      {navItems.map(({ href, label }) => (
        <Link key={href} href={href} passHref legacyBehavior>
          <Button variant="ghost" className="text-foreground">
            {label}
          </Button>
        </Link>
      ))}
      <Link href="/s" passHref legacyBehavior>
        <Button>Go to the dApp</Button>
      </Link>
    </nav>
  );
}
