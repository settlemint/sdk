import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SettleMintProvider } from "@/components/providers/settlemint-provider";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session?.user.address) {
    redirect("/s");
  }

  return <SettleMintProvider session={session}>{children}</SettleMintProvider>;
}
