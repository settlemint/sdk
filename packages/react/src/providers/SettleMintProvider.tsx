import { QueryClientProvider, type QueryClientProviderProps } from "@tanstack/react-query";
import type React from "react";

interface SettleMintProviderProps extends QueryClientProviderProps {}

export const SettleMintProvider: React.FC<SettleMintProviderProps> = ({ client, children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
