"use client";

import { ErrorComponent } from "@/components/global/error";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Figtree as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Error - SettleMint Asset Tokenization Starter Kit",
};

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="darkreader-lock" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ErrorComponent error={error} />
      </body>
    </html>
  );
}
