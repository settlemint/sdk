import { Badge } from "@/components/ui/badge";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface TabItemProps {
  href: string;
  name: string;
  badge?: number | string;
  active?: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({ href, name, badge, active }) => (
  <NavigationMenuItem>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          "text-md pb-4 rounded-none hover:bg-transparent border-b-2 hover:border-primary",
          active && "text-primary border-primary",
        )}
      >
        {name}
        {badge !== undefined && (
          <Badge variant="outline" className="ml-2 border-card">
            {badge}
          </Badge>
        )}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);
