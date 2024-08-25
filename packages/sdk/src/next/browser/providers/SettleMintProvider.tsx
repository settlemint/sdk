"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { ReactQueryWrapper } from "./wrappers/ReactQueryWrapper";
import { ThemeWrapper } from "./wrappers/ThemeWrapper";
import { type WagmiProps, WagmiWrapper } from "./wrappers/WagmiWrapper";

interface SettleMintProviderProps extends PropsWithChildren {
  wagmi: WagmiProps;
  session: Session | null;
}

export function SettleMintProvider({ children, wagmi, session }: SettleMintProviderProps) {
  return (
    <SessionProvider session={session}>
      <ThemeWrapper attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <WagmiWrapper {...wagmi}>
          <ReactQueryWrapper>{children}</ReactQueryWrapper>
        </WagmiWrapper>
      </ThemeWrapper>
    </SessionProvider>
  );
}
