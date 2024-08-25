"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { FC, ReactNode } from "react";
import { ReactQueryWrapper } from "./wrappers/ReactQueryWrapper";
import { ThemeWrapper } from "./wrappers/ThemeWrapper";
import { type WagmiProps, WagmiWrapper } from "./wrappers/WagmiWrapper";

export const SettleMintProvider: FC<{
  children: ReactNode;
  wagmi: WagmiProps;
  session: Session | null;
}> = ({ children, wagmi, session }) => {
  return (
    <SessionProvider session={session}>
      <ThemeWrapper attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <WagmiWrapper {...wagmi}>
          <ReactQueryWrapper>{children}</ReactQueryWrapper>
        </WagmiWrapper>
      </ThemeWrapper>
    </SessionProvider>
  );
};
