import { ClientProvider } from "@/providers/ClientProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <Component {...pageProps} />{" "}
    </ClientProvider>
  );
}
