import { Book, Bot, Code2, LifeBuoy, Settings2, SquareTerminal, SquareUser } from "lucide-react";
import { NavGroup } from "./sidebar-navigation-group";
import type { NavItemType } from "./sidebar-navigation-item";

const navItems: Record<string, NavItemType[]> = {
  main: [
    { icon: <SquareTerminal className="size-5" />, label: "Playground", href: "/s" },
    { icon: <Bot className="size-5" />, label: "Models", href: "/models" },
    { icon: <Code2 className="size-5" />, label: "API", href: "/api" },
    { icon: <Book className="size-5" />, label: "Documentation", href: "/docs" },
    { icon: <Settings2 className="size-5" />, label: "Settings", href: "/settings" },
  ],
  footer: [
    { icon: <LifeBuoy className="size-5" />, label: "Help", href: "/help" },
    { icon: <SquareUser className="size-5" />, label: "Account", href: "/account" },
  ],
};

export function SidebarNavigation() {
  return (
    <>
      <NavGroup items={navItems.main} className="grid gap-1 p-2 pt-4" />
      <NavGroup items={navItems.footer} className="mt-auto grid gap-1 p-2" />
    </>
  );
}
