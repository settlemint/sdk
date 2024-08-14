"use client";

import type { FC, ReactNode } from "react";
import { type ReactQueryProps, ReactQueryWrapper } from "./wrappers/ReactQueryWrapper.tsx";
import { type WagmiProps, WagmiWrapper } from "./wrappers/WagmiWrapper.tsx";

export const SettleMintProvider: FC<{
  children: ReactNode;
  wagmi: WagmiProps;
  reactQuery: ReactQueryProps;
}> = ({ children, wagmi, reactQuery }) => {
  return (
    <WagmiWrapper {...wagmi}>
      <ReactQueryWrapper {...reactQuery}>{children}</ReactQueryWrapper>
    </WagmiWrapper>
  );
};
