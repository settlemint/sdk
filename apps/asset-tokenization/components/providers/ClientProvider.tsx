"use client";

import { settlemint } from "@/lib/settlemint";
import { SettleMintProvider } from "@settlemint/sdk/browser";
import { createWeb3Modal, useWeb3ModalTheme } from "@web3modal/wagmi/react";
import type { Session } from "next-auth";
import { useTheme } from "next-themes";
import { type PropsWithChildren, useEffect } from "react";
import type { WagmiProviderProps } from "wagmi";

createWeb3Modal({ ...settlemint.node.wagmi.web3ModalConfig, themeMode: "light" });

interface ClientProviderProps {
  session: Session | null;
  initialState: WagmiProviderProps["initialState"];
}

export function ClientProvider({ children, session, initialState }: PropsWithChildren<ClientProviderProps>) {
  const { theme } = useTheme();
  const { setThemeMode } = useWeb3ModalTheme();

  const wagmiConfig = settlemint.node.wagmi.wagmiConfig;

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setThemeMode(systemTheme);
    } else {
      setThemeMode(theme === "dark" ? "dark" : "light");
    }
  }, [theme, setThemeMode]);

  return (
    <SettleMintProvider wagmiConfig={wagmiConfig} initialState={initialState} session={session}>
      {children}
    </SettleMintProvider>
  );
}
