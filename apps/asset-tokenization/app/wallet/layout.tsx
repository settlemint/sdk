import { WalletOverlay } from "@/components/global/wallet-overlay";
import { Logo } from "@/components/public/logo";
import { SidebarNavigation } from "@/components/secure/sidebar/sidebar-navigation";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export default async function WalletLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[165px_1fr] lg:grid-cols-[210px_1fr] bg-background">
      <div className="hidden md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center justify-left px-3 py-2 lg:h-[64px] lg:px-4">
            <Link href="/wallet" className="flex items-center gap-2 font-semibold">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <SidebarNavigation />
          </div>
        </div>
      </div>
      <WalletOverlay />
      {children}
    </div>
  );
}
