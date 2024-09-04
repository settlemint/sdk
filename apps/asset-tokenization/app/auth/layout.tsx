import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PublicFooter } from "@/components/public/footer";
import { PublicHeader } from "@/components/public/header";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session?.user.address) {
    redirect("/s");
  }

  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      <PublicHeader noNavButton />
      <main className="flex-grow flex items-center justify-center">{children}</main>
      <PublicFooter />
    </div>
  );
}
