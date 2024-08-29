"use client";

import { WagmiProvider, type WagmiProviderProps } from "wagmi";

export type WagmiProps = {
  wagmiConfig: WagmiProviderProps["config"];
  initialState: WagmiProviderProps["initialState"];
};

/**
 * Wrapper component for WagmiProvider
 * @param props - The WagmiProps and children
 * @returns WagmiProvider if enabled, otherwise just the children
 */
export function WagmiWrapper({ children, ...props }: React.PropsWithChildren<WagmiProps>) {
  return (
    <WagmiProvider config={props.wagmiConfig} initialState={props.initialState} reconnectOnMount={true}>
      {children}
    </WagmiProvider>
  );
}
