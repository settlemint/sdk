"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import type { PropsWithChildren } from "react";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "vertical" | "icon";
}

export function Logo({ className = "", variant = "horizontal" }: PropsWithChildren<LogoProps>) {
  const { resolvedTheme } = useTheme();

  const logoVariant = variant === "vertical" ? "v" : variant === "icon" ? "i" : "h";
  const themeMode = resolvedTheme === "dark" ? "dm" : "lm";
  const src = `/settlemint-logo-${logoVariant}-${themeMode}.svg`;

  return <Image src={src} width={200} height={200} alt="SettleMint" className={className} priority />;
}
