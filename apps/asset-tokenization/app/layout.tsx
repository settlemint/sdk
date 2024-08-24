import { ClientProvider } from "@/components/providers/ClientProvider";
import { settlemint } from "@/lib/settlemint";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SettleMint Asset Tokenization Starter Kit",
  description: "SettleMint Asset Tokenization Starter Kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(settlemint.wagmi.wagmiConfig, headers().get("cookie"));

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ClientProvider initialState={initialState}>{children}</ClientProvider>
      </body>
    </html>
  );
}
