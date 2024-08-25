"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export interface NavItemType {
  icon: ReactNode;
  label: string;
  href: string;
  badge?: number;
}

interface NavItemProps extends NavItemType {
  variant?: "sidebar" | "mobile";
}

/**
 * NavItem component for sidebar navigation
 * @param {NavItemProps} props - The props for the NavItem component
 * @returns {JSX.Element} The rendered NavItem component
 */
export function NavItem({ icon, label, href, badge, variant = "sidebar" }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
          isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {icon}
        {label}
        {badge !== undefined && (
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{badge}</Badge>
        )}
      </Link>
    );
  }

  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        size="sm"
        className={`w-full justify-start ${
          isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {icon}
        <span className="ml-3">{label}</span>
        {badge !== undefined && (
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{badge}</Badge>
        )}
      </Button>
    </Link>
  );
}
