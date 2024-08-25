import { SecureHeader } from "@/components/secure/header";
import type { PropsWithChildren } from "react";
import type { BreadcrumbItemType } from "./breadcrumb/ellipsis-dropdown";

interface MainProps extends PropsWithChildren {
  breadcrumbItems?: BreadcrumbItemType[];
}

export function Main({ children, breadcrumbItems }: MainProps) {
  return (
    <div className="flex flex-col">
      <SecureHeader items={[{ label: "Asset Tokenization", href: "/s/dashboard" }, ...(breadcrumbItems ?? [])]} />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-custom-background-main rounded-tl-[14px]">
        {children}
      </main>
    </div>
  );
}
