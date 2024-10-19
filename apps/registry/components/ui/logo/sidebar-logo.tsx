"use client";

import { Logo } from "@/components/ui/logo/logo";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function SidebarLogo() {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="h-12 group-data-[state=collapsed]:h-8 flex items-center">
        <Logo
          variant={open ? "horizontal" : "icon"}
          className={cn(
            "duration-200 relative transition-[width] ease-linear",
            "w-[--sidebar-width] h-9",
            "group-data-[state=collapsed]:w-[--sidebar-width-icon] group-data-[state=collapsed]:h-8",
          )}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
