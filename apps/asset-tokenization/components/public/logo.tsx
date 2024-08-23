"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import type { FC } from "react";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "vertical";
}

const Logo: FC<LogoProps> = ({ className = "", variant }) => {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  return (
    <Image
      src={`/settlemint-logo-${variant === "vertical" ? "v" : "h"}-${isDarkMode ? "dm" : "lm"}.svg`}
      width={200}
      height={200}
      alt="SettleMint"
      className={className}
    />
  );
};

export default Logo;
