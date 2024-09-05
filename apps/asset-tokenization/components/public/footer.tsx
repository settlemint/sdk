import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import * as m from "@/paraglide/messages.js";

const CURRENT_YEAR = new Date().getFullYear();

const footerLinks = [
  {
    href: "https://console.settlemint.com/documentation/docs/terms-and-policies/terms-of-service/",
    label: m.awful_dirty_marten_drip(),
  },
  {
    href: "https://console.settlemint.com/documentation/docs/terms-and-policies/privacy-policy/",
    label: m.even_dark_parakeet_climb(),
  },
  {
    href: "https://console.settlemint.com/documentation/docs/terms-and-policies/cookie-policy/",
    label: m.tidy_key_bulldog_grin(),
  },
];

export function PublicFooter() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
      <p className="text-xs">
        &copy; {CURRENT_YEAR}{" "}
        <Link href="https://settlemint.com" className="hover:underline">
          SettleMint
        </Link>
        . {m.this_next_spider_cheer()}.
      </p>
      <NavigationMenu className="sm:ml-auto flex gap-4 sm:gap-6">
        <NavigationMenuList>
          {footerLinks.map(({ href, label }) => (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-xs")}>{label}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </footer>
  );
}
