"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import type { FC } from "react";

interface BackgroundProps {
  className?: string;
}

const BackgroundImage: FC<BackgroundProps> = ({ className = "" }) => {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  return isDarkMode ? (
    <Image src="/background-dm.svg" width={1920} height={1080} alt="Background Image" className={className} />
  ) : (
    <Image src="/background-lm.svg" width={1920} height={1080} alt="Background Image" className={className} />
  );
};

export default BackgroundImage;
