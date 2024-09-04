import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "../global/theme-toggle";

interface NavItem {
  href: string;
  label: string;
}

interface PublicNavigationProps {
  navItems: NavItem[];
  noNavButton?: boolean;
}

export function PublicNavigation({ navItems, noNavButton }: PublicNavigationProps) {
  return (
    <nav className="ml-auto flex items-center gap-4 sm:gap-6">
      <ThemeToggle variant="ghost" className="text-foreground" />
      {navItems.map(({ href, label }) => (
        <Link key={href} href={href} passHref legacyBehavior>
          <Button variant="ghost" className="text-foreground">
            {label}
          </Button>
        </Link>
      ))}
      {!noNavButton && (
        <Link href="/wallet" passHref legacyBehavior>
          <Button>Go to the dApp</Button>
        </Link>
      )}
    </nav>
  );
}
