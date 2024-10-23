import CollapsedBreadcrumbs from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb";
import { CollapsedBreadcrumbProvider } from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb-provider";
import type { PropsWithChildren } from "react";

export default function BlocksLayout({ children }: PropsWithChildren) {
  return (
    <CollapsedBreadcrumbProvider>
      <div className="container max-w-screen-lg mx-auto">
        <CollapsedBreadcrumbs className="my-4" />

        {children}
      </div>
    </CollapsedBreadcrumbProvider>
  );
}
