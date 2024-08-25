import { Logo } from "@/components/public/logo";
import { SidebarNavigation } from "@/components/secure/sidebar/sidebar-navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <Link href="/s/dashboard" className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Logo />
        </Link>
        <SidebarNavigation variant="mobile" />
      </SheetContent>
    </Sheet>
  );
}
