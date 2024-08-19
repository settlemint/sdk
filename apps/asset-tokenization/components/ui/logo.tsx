import { useTheme } from "next-themes";
import Image from "next/image";
import type { FC } from "react";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  return isDarkMode ? (
    <Image src="/settlemint-logo-dm.svg" width={200} height={80} alt="SettleMint" className={className} />
  ) : (
    <Image src="/settlemint-logo-dm.svg" width={200} height={80} alt="SettleMint" className={className} />
  );
};

export default Logo;
