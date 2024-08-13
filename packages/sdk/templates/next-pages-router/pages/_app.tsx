import "@/styles/globals.css";
import { SettleMintProvider } from "@settlemint/sdk-react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettleMintProvider wagmi={{ enabled: false }} reactQuery={{ enabled: false }}>
      <Component {...pageProps} />{" "}
    </SettleMintProvider>
  );
}
