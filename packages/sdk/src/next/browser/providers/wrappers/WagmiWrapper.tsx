"use client";

import { WagmiProvider, type WagmiProviderProps } from "wagmi";

type WagmiBaseProps = Omit<WagmiProviderProps, "children">;

interface WagmiEnabledProps extends WagmiBaseProps {
  enabled?: true;
}

interface WagmiDisabledProps {
  enabled: false;
}

export type WagmiProps = WagmiEnabledProps | WagmiDisabledProps;

/**
 * Type guard to check if Wagmi is enabled
 * @param props - The WagmiProps to check
 * @returns True if Wagmi is enabled, false otherwise
 */
function isWagmiEnabled(props: WagmiProps): props is WagmiEnabledProps {
  return props.enabled !== false;
}

/**
 * Wrapper component for WagmiProvider
 * @param props - The WagmiProps and children
 * @returns WagmiProvider if enabled, otherwise just the children
 */
export function WagmiWrapper({ children, ...props }: React.PropsWithChildren<WagmiProps>) {
  if (isWagmiEnabled(props)) {
    return <WagmiProvider {...props}>{children}</WagmiProvider>;
  }

  return <>{children}</>;
}
