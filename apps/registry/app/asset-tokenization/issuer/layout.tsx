import CollapsedBreadcrumbs, {
  CollapsedBreadcrumbProvider,
} from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";

export default function IssuerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CollapsedBreadcrumbProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <CollapsedBreadcrumbs maxVisibleItems={2} />
            </div>
          </header>
          <main className="p-4 pt-0">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </CollapsedBreadcrumbProvider>
  );
}
