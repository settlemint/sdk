import Image from "next/image";
import Link from "next/link";

export function PublicHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                Unlock the Power of Asset Tokenization
              </h1>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                This starterkit is pre-configured to leverage your <Link href="https://settlemint.com">SettleMint</Link>{" "}
                application and provide an easy way to get started with your own asset tokenization solution.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <p className="flex justify-center backdrop-blur-2xl static w-auto rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
                <code className="font-mono font-bold">bunx @settlemint/sdk create -t asset-tokenization</code>
              </p>
            </div>
          </div>
          <Image
            src="/platform.png"
            width="550"
            height="550"
            alt="SettleMint Platform"
            className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
}
