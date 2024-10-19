"use client";

import { signOutAction } from "@/app/auth/signout/actions/sign-out";
import { AddressAvatar } from "@/components/ui/address-avatar/address-avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { shortHex } from "@/lib/hex";
import { portalClient, portalGraphql } from "@/lib/settlemint/clientside/portal";
import { useQuery } from "@tanstack/react-query";
import { BringToFront, ChevronsUpDown, LogOut, Moon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useCallback } from "react";
import type { Address } from "viem";

const GetPendingTransactions = portalGraphql(`
  query GetPendingTransactions($from: String) {
    getPendingTransactions(from: $from) {
      count
    }
  }
`);

export function NavUser() {
  const { isMobile } = useSidebar();
  const session = useSession();
  const wallet = session.data?.user.wallet as Address | undefined;
  const email = session.data?.user.email;
  const { setTheme, resolvedTheme } = useTheme();

  const { data: pendingCount } = useQuery({
    queryKey: ["pendingtx", email, wallet],
    queryFn: async () => {
      const response = await portalClient.request(GetPendingTransactions, {
        from: wallet,
      });
      if (!response?.getPendingTransactions) {
        return 0;
      }
      return response.getPendingTransactions.count;
    },
    refetchInterval: 1000,
  });

  const handleSignOut = useCallback(async () => {
    await signOutAction({});
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <AddressAvatar
                address={wallet}
                email={email}
                className="h-8 w-8 rounded-lg"
                badge={(pendingCount ?? 0) > 0}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{email}</span>
                <span className="truncate text-xs">{shortHex(wallet, 12, 8)}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <AddressAvatar address={wallet} email={email} className="h-8 w-8 rounded-lg" badge={false} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{email}</span>
                  <span className="truncate text-xs">{shortHex(wallet, 12, 8)}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BringToFront />
                <Link href="/issuer/pending-transactions">
                  Pending Transactions
                  {(pendingCount ?? 0) > 0 && (
                    <Badge className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                      {pendingCount}
                    </Badge>
                  )}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {resolvedTheme === "dark" ? (
                <DropdownMenuItem onSelect={() => setTheme("light")}>
                  <Sun />
                  Switch to light mode
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onSelect={() => setTheme("dark")}>
                  <Moon />
                  Switch to dark mode
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleSignOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
