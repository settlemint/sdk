import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function SecureLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (!session) {
    const headersList = headers();
    const fullUrl = headersList.get("x-url") ?? "/s";
    redirect(`/auth?rd=${encodeURIComponent(fullUrl)}`);
  }

  return children;
}
