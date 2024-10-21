import CollapsedBreadcrumbs, {
  CollapsedBreadcrumbProvider,
} from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { AppSidebar } from "./_components/sidebar/app-sidebar";

export default function IssuerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CollapsedBreadcrumbProvider>
      <SidebarProvider>
        <AppSidebar className="group-data-[side=left]:border-r-0" />
        <SidebarInset className="bg-sidebar">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <CollapsedBreadcrumbs maxVisibleItems={2} />
            </div>
          </header>
          <div className="flex-1 space-y-4 p-8 pt-6 rounded-tl-lg bg-background">
            {children}
            <Toaster richColors />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </CollapsedBreadcrumbProvider>
  );
}
