"use client";

import type { FC, PropsWithChildren } from "react";
import { WagmiProvider, type WagmiProviderProps } from "wagmi";

type WagmiBaseProps = Omit<WagmiProviderProps, "children">;

interface WagmiEnabledProps extends WagmiBaseProps {
  enabled?: true;
}

interface WagmiDisabledProps {
  enabled: false;
}

export type WagmiProps = PropsWithChildren<WagmiEnabledProps | WagmiDisabledProps>;

function isWagmiEnabled(props: WagmiProps): props is PropsWithChildren<WagmiEnabledProps> {
  return props.enabled !== false;
}

export const WagmiWrapper: FC<WagmiProps> = (props) => {
  const { children } = props;

  if (isWagmiEnabled(props)) {
    const { ...wagmiProps } = props;
    return <WagmiProvider {...wagmiProps}>{children}</WagmiProvider>;
  }

  return <>{children}</>;
};
