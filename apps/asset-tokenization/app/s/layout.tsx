import { Logo } from "@/components/public/logo";
import { SecureHeader } from "@/components/secure/header";
import { SidebarNavigation } from "@/components/secure/sidebar-navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function SecureLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (!session) {
    const headersList = headers();
    const fullUrl = headersList.get("x-url") ?? "/s";
    redirect(`/auth?rd=${encodeURIComponent(fullUrl)}`);
  }

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[56px] bg-[url('/background-lm.svg')] dark:bg-[url('/background-dm.svg')] bg-cover bg-center">
        <aside className="fixed inset-y-0 left-0 z-20 flex h-full w-[56px] flex-col">
          <div className="p-2">
            <Link href="/s" className="flex items-center" aria-label="SettleMint Asset Tokenization Starterkit">
              <Logo variant="icon" />
            </Link>
          </div>
          <SidebarNavigation />
        </aside>
        <div className="flex flex-col">
          <SecureHeader />
          <main className="flex-1 overflow-auto p-6 bg-background rounded-tl-lg">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
