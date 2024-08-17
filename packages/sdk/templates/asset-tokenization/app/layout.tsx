import { ClientProvider } from "@/providers/ClientProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create SettleMint App",
  description: "Generated by the SettleMint SDK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientProvider>
        <body className={inter.className}>{children}</body>
      </ClientProvider>
    </html>
  );
}
