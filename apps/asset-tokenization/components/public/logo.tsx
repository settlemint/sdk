import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "vertical" | "icon";
}

export function Logo({ className = "", variant = "horizontal" }: PropsWithChildren<LogoProps>) {
  return (
    <div
      className={cn(
        "bg-no-repeat bg-left bg-contain",
        {
          "w-36 h-12": variant === "horizontal",
          "w-24 h-24": variant === "vertical",
          "w-12 h-12": variant === "icon",
        },
        {
          "bg-[url('/settlemint-logo-h-lm.svg')] dark:bg-[url('/settlemint-logo-h-dm.svg')]": variant === "horizontal",
          "bg-[url('/settlemint-logo-v-lm.svg')] dark:bg-[url('/settlemint-logo-v-dm.svg')]": variant === "vertical",
          "bg-[url('/settlemint-logo-i-lm.svg')] dark:bg-[url('/settlemint-logo-i-dm.svg')]": variant === "icon",
        },
        className,
      )}
      role="img"
      aria-label="SettleMint Logo"
    />
  );
}
