import { HelpCircle, LineChart } from "lucide-react";
import { NavGroup } from "./sidebar-navigation-group";
import type { NavItemType } from "./sidebar-navigation-item";

const navItems: Record<string, NavItemType[]> = {
  main: [
    { icon: <LineChart className="h-4 w-4" />, label: "Dashboard", href: "/s/dashboard" },
    // { icon: <ShoppingCart className="h-4 w-4" />, label: "Orders", href: "/s/orders", badge: 6 },
    // { icon: <Package className="h-4 w-4" />, label: "Products", href: "/s/products" },
    // { icon: <Users className="h-4 w-4" />, label: "Customers", href: "/s/customers" },
    // { icon: <LineChart className="h-4 w-4" />, label: "Analytics", href: "/s/analytics" },
  ],
  footer: [
    {
      icon: <HelpCircle className="h-4 w-4" />,
      label: "Docs",
      href: "https://console.settlemint.com/documentation",
    },
    // { icon: <Settings className="h-4 w-4" />, label: "Settings", href: "/s/settings" },
  ],
};

export function SidebarNavigation({ variant = "sidebar" }: { variant?: "sidebar" | "mobile" }) {
  return (
    <div className={variant === "sidebar" ? "flex flex-col h-full" : ""}>
      <NavGroup
        items={navItems.main}
        className={variant === "sidebar" ? "grid gap-1 px-2" : "grid gap-2"}
        variant={variant}
      />
      <div className={variant === "sidebar" ? "mt-auto" : "mt-4 pt-4 border-t"}>
        <NavGroup
          items={navItems.footer}
          className={variant === "sidebar" ? "grid gap-1 px-2" : "grid gap-2"}
          variant={variant}
        />
      </div>
    </div>
  );
}
