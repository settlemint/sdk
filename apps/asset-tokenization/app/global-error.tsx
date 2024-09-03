"use client";

import { ErrorComponent } from "@/components/global/error";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { env } from "next-runtime-env";
import type { ViewportLayout } from "next/dist/lib/metadata/types/extra-types";
import { Figtree } from "next/font/google";

const fontSans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Error | SettleMint Asset Tokenization Starter Kit",
  description: "SettleMint Asset Tokenization Starter Kit",
  keywords: ["asset tokenization", "blockchain", "SettleMint", "blockchain transformation"],
  authors: [{ name: "SettleMint" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env("NEXT_PUBLIC_SETTLEMINT_APP_URL"),
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

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ErrorComponent error={error} />
      </body>
    </html>
  );
}
