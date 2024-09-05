"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEventHandler, ReactNode } from "react";

export interface NavItemType {
  icon: ReactNode;
  label: string;
  href: string;
  badge?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface NavItemProps extends NavItemType {
  variant?: "sidebar" | "mobile";
}

/**
 * NavItem component for sidebar navigation
 * @param {NavItemProps} props - The props for the NavItem component
 * @returns {JSX.Element} The rendered NavItem component
 */
export function NavItem({ icon, label, href, badge, onClick, variant = "sidebar" }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (variant === "mobile") {
    if (isActive) {
      return (
        <span
          className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
            isActive ? "bg-accent text-primary font-bold" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {icon}
          {label}
          {badge !== undefined && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{badge}</Badge>
          )}
        </span>
      );
    }
    return onClick ? (
      <Button
        onClick={onClick}
        className={`mx-[-0.65rem] flex w-full items-center gap-4 rounded-xl px-3 py-2 text-left ${
          isActive ? "bg-accent text-primary font-bold" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {icon}
        {label}
        {badge !== undefined && (
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{badge}</Badge>
        )}
      </Button>
    ) : (
      <Link
        href={href}
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
          isActive ? "bg-accent text-primary font-bold" : "text-muted-foreground hover:text-foreground"
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

  const commonButtonProps = {
    variant: "ghost" as const,
    size: "sm" as const,
    className: `w-full justify-start ${
      isActive ? "bg-accent text-primary font-bold" : "text-muted-foreground hover:text-foreground"
    } disabled:opacity-100 disabled:text-primary disabled:font-bold`,
    disabled: isActive,
  };

  const buttonContent = (
    <>
      {icon}
      <span className="ml-3">{label}</span>
      {badge !== undefined && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{badge}</Badge>
      )}
    </>
  );

  return onClick ? (
    <Button {...commonButtonProps} onClick={onClick}>
      {buttonContent}
    </Button>
  ) : (
    <Link href={href} passHref>
      <Button {...commonButtonProps}>{buttonContent}</Button>
    </Link>
  );
}
