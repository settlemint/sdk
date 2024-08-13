import "@/styles/globals.css";
import { SettleMintProvider } from "@settlemint/sdk-next";
import { QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettleMintProvider client={queryClient}>
      <Component {...pageProps} />{" "}
    </SettleMintProvider>
  );
}
