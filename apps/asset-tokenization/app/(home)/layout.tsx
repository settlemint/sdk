import { PublicFooter } from "@/components/public/footer";
import { PublicHeader } from "@/components/public/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      <div className="absolute inset-0 z-[-1] bg-[url('/background-lm.svg')] dark:bg-[url('/background-dm.svg')] bg-cover bg-center" />
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
