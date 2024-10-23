"use client";

import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { TabItem, type TabItemProps } from "./tab-item";

interface TabNavigationProps {
  items: TabItemProps[];
}

export function TabNavigation({ items }: TabNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-card">
      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item) => (
            <TabItem key={item.href} {...item} active={pathname.startsWith(item.href)} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
