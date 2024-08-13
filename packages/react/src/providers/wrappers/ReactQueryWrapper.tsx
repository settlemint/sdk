"use client";

import { QueryClientProvider, type QueryClientProviderProps } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

interface ReactQueryBaseProps extends QueryClientProviderProps {}
interface ReactQueryEnabledProps extends ReactQueryBaseProps {
  enabled: true;
}
interface ReactQueryDisabledProps extends Partial<ReactQueryBaseProps> {
  enabled: false;
}

export type ReactQueryProps = PropsWithChildren<ReactQueryEnabledProps | ReactQueryDisabledProps>;

function isReactQueryEnabled(props: ReactQueryProps): props is PropsWithChildren<ReactQueryEnabledProps> {
  return props.enabled === true;
}

export const ReactQueryWrapper: FC<ReactQueryProps> = (props: ReactQueryProps) => {
  const { children } = props;

  if (isReactQueryEnabled(props)) {
    const { ...reactQueryProps } = props;
    return <QueryClientProvider {...reactQueryProps}>{children}</QueryClientProvider>;
  }

  return <>{children}</>;
};
