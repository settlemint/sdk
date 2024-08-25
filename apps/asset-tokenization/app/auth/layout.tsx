import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

// This layout ensures that authenticated users are redirected to the secure area
export default async function UnauthenticatedLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (session) {
    redirect("/s");
  }

  return <>{children}</>;
}
