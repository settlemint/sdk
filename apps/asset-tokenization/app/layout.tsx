import { SettleMintProvider } from "@/components/providers/settlemint-provider";
import { getConfig } from "@/lib/settlemint";
import { cn } from "@/lib/utils";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import type { ViewportLayout } from "next/dist/lib/metadata/types/extra-types";
import { Figtree as FontSans } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SettleMint Asset Tokenization Starter Kit",
  description: "SettleMint Asset Tokenization Starter Kit",
  keywords: ["asset tokenization", "blockchain", "SettleMint", "blockchain transformation"],
  authors: [{ name: "SettleMint" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL,
    siteName: "SettleMint Asset Tokenization Starter Kit",
  },
  other: {
    "darkreader-lock": "",
  },
};

export const viewport: ViewportLayout = {
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const wConfig = getConfig();
  const initialState = cookieToInitialState(wConfig, headers().get("cookie"));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
        <SettleMintProvider initialState={initialState}>{children}</SettleMintProvider>
      </body>
    </html>
  );
}
