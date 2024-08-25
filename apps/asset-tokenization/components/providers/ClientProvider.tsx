"use client";

import { settlemint } from "@/lib/settlemint";
import { SettleMintProvider } from "@settlemint/sdk/browser";
import { createWeb3Modal, useWeb3ModalTheme } from "@web3modal/wagmi/react";
import type { Session } from "next-auth";
import { useTheme } from "next-themes";
import { type PropsWithChildren, useEffect, useMemo } from "react";

if (settlemint.wagmi) {
  createWeb3Modal({ ...settlemint.wagmi.web3ModalConfig, themeMode: "light" });
}

interface ClientProviderProps {
  session: Session | null;
}

export function ClientProvider({ children, session }: PropsWithChildren<ClientProviderProps>) {
  const { theme } = useTheme();
  const { setThemeMode } = useWeb3ModalTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // biome-ignore lint/correctness/useExhaustiveDependencies: the darkmode toggle will handle this on changes
  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setThemeMode(systemTheme);
    } else {
      setThemeMode(theme === "dark" ? "dark" : "light");
    }
  }, []); // Run only once on component mount

  const wagmiConfig = useMemo(() => {
    if (!settlemint.wagmi) return null;
    return { config: settlemint.wagmi.wagmiConfig };
  }, []);

  if (!wagmiConfig) {
    return null;
  }

  return (
    <SettleMintProvider wagmi={wagmiConfig} session={session}>
      {children}
    </SettleMintProvider>
  );
}
