## Setting up a new Asset Tokenization project

Create a new Next.js project, all defaults are fine.

```bash
bunx create-next-app@latest --reset
cd <project-name>
```

Install shadcn, follow the prompts, if defaults are provided, they are fine.

```bash
bunx shadcn@latest init
```

Install the asset-tokenization template

```bash
bunx shadcn@latest add https://settlemint.github.io/sdk/asset-tokenization.json
```

Remove some NextJS cruft

```bash
rm -Rf app/page.tsx app/fonts
```

Connect to your SettleMint application

```bash
bunx settlemint connect
bunx settlemint codegen
```

And then run it!

```bash
bunx dev
```