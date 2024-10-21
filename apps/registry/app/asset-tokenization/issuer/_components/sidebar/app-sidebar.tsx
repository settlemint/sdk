"use client";

import { SidebarLogo } from "@/components/ui/logo/sidebar-logo";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { ChartNoAxesCombined, Coins, Users } from "lucide-react";
import { SidebarNavigation } from "./sidebar-navigation";
import { NavUser } from "./sidebar-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation
          groups={[
            {
              title: "Asset Management",
              items: [
                {
                  title: "Dashboard",
                  url: "/issuer/dashboard",
                  icon: ChartNoAxesCombined,
                },
                {
                  title: "Tokens",
                  url: "/issuer/tokens",
                  icon: Coins,
                },
                // {
                //   title: "Playground",
                //   url: "#",
                //   icon: SquareTerminal,
                //   items: [
                //     {
                //       title: "History",
                //       url: "#",
                //     },
                //   ],
                // },
              ],
            },
            {
              title: "Platform Management",
              items: [
                {
                  title: "Users",
                  url: "/issuer/users",
                  icon: Users,
                },
              ],
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
