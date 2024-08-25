"use client";

import { settlemint } from "@/lib/settlemint";
import { SettleMintProvider } from "@settlemint/sdk/browser";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import type { Session } from "next-auth";
import { type PropsWithChildren, useMemo } from "react";

if (settlemint.wagmi) {
  createWeb3Modal(settlemint.wagmi.web3ModalConfig);
}

interface ClientProviderProps {
  session: Session | null;
}

export function ClientProvider({ children, session }: PropsWithChildren<ClientProviderProps>) {
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
