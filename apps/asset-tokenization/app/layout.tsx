import { SettleMintProvider } from "@/components/providers/settlemint-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import type { ViewportLayout } from "next/dist/lib/metadata/types/extra-types";
import { Figtree as FontSans } from "next/font/google";
import { headers } from "next/headers";
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
    url: process.env.SETTLEMINT_APP_URL,
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
  const cookie = headers().get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
        <SettleMintProvider cookie={cookie}>{children}</SettleMintProvider>
      </body>
    </html>
  );
}
