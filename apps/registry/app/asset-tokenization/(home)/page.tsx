import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo/logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

interface MenuItem {
  href: string;
  label: string;
  className?: string;
}

const menuItems: MenuItem[] = [
  { href: "/", label: "Home" },
  { href: "https://console.settlemint.com", label: "Platform" },
  { href: "https://console.settlemint.com/documentation", label: "Documentation" },
];

const footerLinks = [
  {
    href: "https://console.settlemint.com/documentation/docs/terms-and-policies/terms-of-service/",
    label: "Terms of Service",
  },
  {
    href: "https://console.settlemint.com/documentation/docs/terms-and-policies/privacy-policy/",
    label: "Privacy Policy",
  },
  {
    href: "https://console.settlemint.com/documentation/docs/terms-and-policies/cookie-policy/",
    label: "Cookie Policy",
  },
];

const NavItem: FC<MenuItem> = ({ href, label, className }) => (
  <NavigationMenuItem>
    <Link href={href} passHref legacyBehavior>
      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), className)}>{label}</NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

const DesktopNav: FC = () => (
  <NavigationMenu className="hidden md:flex flex-grow justify-center">
    <NavigationMenuList>
      {menuItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

const MobileNav: FC = () => (
  <Sheet>
    <SheetTrigger asChild className="md:hidden">
      <Button variant="ghost" size="icon" aria-label="Open menu">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-[200px] sm:w-[300px]">
      <SheetHeader>
        <SheetTitle>Navigation</SheetTitle>
      </SheetHeader>
      <NavigationMenu className="mt-6">
        <NavigationMenuList className="flex flex-col items-start space-y-2 space-x-0">
          {menuItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
          <NavItem href="/dapp" label="To the dAPP" className="font-extrabold" />
        </NavigationMenuList>
      </NavigationMenu>
    </SheetContent>
  </Sheet>
);

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <div className="flex justify-between items-center p-4">
        <div className="w-24">
          <Logo />
        </div>
        <DesktopNav />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dapp" passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Button>To the dAPP</Button>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <MobileNav />
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex-grow">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ">
                Unlock the Power of Asset Tokenization
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                This starterkit is pre-configured to leverage your SettleMint application and provide an easy way to get
                started with your own asset tokenization solution.
              </p>
            </div>
            <div className="space-x-4">
              <div className="flex justify-center backdrop-blur-2xl static w-auto rounded-xl border bg-muted p-4 overflow-x-auto">
                <code className="font-mono font-bold whitespace-nowrap ">
                  bunx @settlemint/sdk-cli create -t asset-tokenization
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="https://settlemint.com" className="hover:underline">
            SettleMint
          </Link>
          . Functional Source License, Version 1.1, MIT Future License.
        </p>
        <NavigationMenu className="sm:ml-auto flex gap-4 sm:gap-6">
          <NavigationMenuList>
            {footerLinks.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-xs")}>
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </footer>
    </div>
  );
}
