import { ClientProvider } from "@/components/providers/ClientProvider";
import { settlemint } from "@/lib/sdk/browser/settlemint";
import { cn } from "@/lib/utils";
import { createRouteMatcher } from "@settlemint/sdk/edge";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
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

const isSecuredRoute = createRouteMatcher(["/s", "/s/(.*)"]);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(settlemint.wagmi.wagmiConfig, headers().get("cookie"));
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ClientProvider initialState={initialState} session={session}>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
