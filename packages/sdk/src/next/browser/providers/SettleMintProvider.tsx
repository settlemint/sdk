"use client";

import type { FC, ReactNode } from "react";
import { type ReactQueryProps, ReactQueryWrapper } from "./wrappers/ReactQueryWrapper";
import { ThemeWrapper } from "./wrappers/ThemeWrapper";
import { type WagmiProps, WagmiWrapper } from "./wrappers/WagmiWrapper";

export const SettleMintProvider: FC<{
  children: ReactNode;
  wagmi: WagmiProps;
  reactQuery: ReactQueryProps;
}> = ({ children, wagmi, reactQuery }) => {
  return (
    <WagmiWrapper {...wagmi}>
      <ReactQueryWrapper {...reactQuery}>
        <ThemeWrapper attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeWrapper>
      </ReactQueryWrapper>
    </WagmiWrapper>
  );
};
