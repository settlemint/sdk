"use client";

import { ErrorComponent } from "@/components/global/error";
import { cn } from "@/lib/utils";
import { Figtree } from "next/font/google";

const fontSans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Error - SettleMint Asset Tokenization Starter Kit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="darkreader-lock" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ErrorComponent error={error} />
      </body>
    </html>
  );
}
