import { PublicFooter } from "@/components/public/footer";
import { PublicHeader } from "@/components/public/header";
import type { PropsWithChildren } from "react";

function HomeLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      <PublicHeader />
      <main className="flex-grow">{children}</main>
      <PublicFooter />
    </div>
  );
}

export default HomeLayout;
