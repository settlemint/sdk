"use client";

import { settlemint } from "@/lib/settlemint";
import { SettleMintProvider } from "@settlemint/sdk/browser";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import type { Session } from "next-auth";
import type { FC, PropsWithChildren } from "react";

if (settlemint.wagmi) {
  createWeb3Modal(settlemint.wagmi.web3ModalConfig);
}

export const ClientProvider: FC<
  PropsWithChildren<{
    session: Session | null;
  }>
> = ({ children, session }) => {
  if (!settlemint.wagmi) {
    return null;
  }

  return (
    <SettleMintProvider wagmi={{ config: settlemint.wagmi.wagmiConfig }} session={session}>
      {children}
    </SettleMintProvider>
  );
};
