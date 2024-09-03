import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

// This layout ensures that authenticated users are redirected to the secure area
export default async function UnauthenticatedLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();
  console.log("session2", session);
  if (session?.user.address) {
    redirect("/s");
  }

  return <>{children}</>;
}
