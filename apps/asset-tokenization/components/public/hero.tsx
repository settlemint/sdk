import Image from "next/image";
import Link from "next/link";

const HERO_CONTENT = {
  title: "Unlock the Power of Asset Tokenization",
  description:
    "This starterkit is pre-configured to leverage your SettleMint application and provide an easy way to get started with your own asset tokenization solution.",
  command: "bunx @settlemint/sdk create -t asset-tokenization",
};

export function PublicHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                {HERO_CONTENT.title}
              </h1>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                {HERO_CONTENT.description.split("SettleMint")[0]}
                <Link href="https://settlemint.com" className="underline hover:text-white transition-colors">
                  SettleMint
                </Link>
                {HERO_CONTENT.description.split("SettleMint")[1]}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="flex justify-center backdrop-blur-2xl static w-auto rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30 overflow-x-auto">
                <code className="font-mono font-bold whitespace-nowrap">{HERO_CONTENT.command}</code>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[350px] sm:h-[450px] lg:h-full max-w-[600px] mx-auto lg:order-last">
            <Image
              src="/platform.png"
              alt="SettleMint Platform"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
