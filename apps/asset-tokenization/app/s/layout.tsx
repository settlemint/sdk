import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SettleMintProvider } from "@/components/providers/settlemint-provider";
import { Logo } from "@/components/public/logo";
import { SidebarNavigation } from "@/components/secure/sidebar/sidebar-navigation";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function SecureLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);
  const pathname = headers().get("x-current-path") || "/s";

  if (!session?.user.address) {
    redirect(`/auth?rd=${encodeURIComponent(pathname)}`);
  }

  if (pathname === "/s") {
    redirect("/s/dashboard");
  }

  return (
    <SettleMintProvider session={session}>
      <div className="grid min-h-screen w-full md:grid-cols-[165px_1fr] lg:grid-cols-[210px_1fr] bg-custom-background-sidebar">
        <div className="hidden md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-16 items-center justify-left px-3 py-2 lg:h-[64px] lg:px-4">
              <Link href="/s/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-7 w-auto" />
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <SidebarNavigation />
            </div>
          </div>
        </div>
        {children}
      </div>
    </SettleMintProvider>
  );
}
