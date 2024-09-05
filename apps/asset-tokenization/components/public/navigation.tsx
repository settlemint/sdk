import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
    <NavigationMenu>
      <NavigationMenuList>
        <ThemeToggle variant="ghost" className="text-foreground" />
        {navItems.map(({ href, label }) => (
          <NavigationMenuItem key={href}>
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>{label}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        {!noNavButton && (
          <NavigationMenuItem>
            <Link href="/wallet" passHref legacyBehavior className="ml-4">
              <Button>Go to the dApp</Button>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
