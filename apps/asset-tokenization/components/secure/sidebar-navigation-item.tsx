"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export interface NavItemType {
  icon: ReactNode;
  label: string;
  href: string;
}

/**
 * NavItem component for sidebar navigation
 * @param {NavItemProps} props - The props for the NavItem component
 * @returns {JSX.Element} The rendered NavItem component
 */
export function NavItem({ icon, label, href }: NavItemType) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href} passHref>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-lg ${isActive ? "bg-muted hover:bg-muted" : ""}`}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
          >
            {icon}
            <span className="sr-only">{label}</span>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
