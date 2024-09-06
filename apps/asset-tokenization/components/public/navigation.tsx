import { LanguageToggle } from "@/components/global/language-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@/lib/i18n";
import * as m from "@/paraglide/messages.js";
import { ThemeToggle } from "../global/theme-toggle";

interface NavItem {
  href: string;
  label: string;
}

interface PublicNavigationProps {
  noNavButton?: boolean;
}

const navItems: () => NavItem[] = () => [
  { href: "https://settlemint.com", label: m.strong_away_mouse_dine() },
  { href: "https://console.settlemint.com/documentation", label: m.alive_last_starfish_find() },
  { href: "https://console.settlemint.com", label: m.super_polite_porpoise_love() },
];

export function PublicNavigation({ noNavButton }: PublicNavigationProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <ThemeToggle variant="outline" className="text-foreground" />
        <LanguageToggle variant="outline" className="text-foreground" />
        {navItems().map(({ href, label }) => (
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
