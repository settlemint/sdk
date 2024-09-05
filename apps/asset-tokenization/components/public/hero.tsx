import * as m from "@/paraglide/messages.js";

export function PublicHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {m.arable_orange_ant_persist()}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{m.kind_mean_iguana_agree()}</p>
          </div>
          <div className="space-x-4">
            <div className="flex justify-center backdrop-blur-2xl static w-auto rounded-xl border bg-muted p-4 overflow-x-auto">
              <code className="font-mono font-bold whitespace-nowrap">
                bunx @settlemint/sdk create -t asset-tokenization
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
