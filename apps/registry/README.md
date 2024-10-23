## Setting up a new Asset Tokenization project

Create a new Next.js project:

```bash
bunx create-next-app@15.0.1 \
  --typescript \
  --tailwind \
  --eslint \
  --src-dir \
  --turbopack \
  --import-alias '@/*' \
  --empty \
  --use-bun \
  --app <project-name>

cd <project-name>
```

Install `shadcn/ui`:

```bash
bunx shadcn@latest init \
  --defaults \
  --src-dir \
  --yes
```

For now, fix recharts in Next.js 15 / React 19:

```bash
export REACT_VERSION=$(jq -r '.dependencies.react' package.json)
bun add react-is@$REACT_VERSION
jq '.overrides = {"react-is": "'$REACT_VERSION'"}' package.json > temp.json && mv temp.json package.json
```

And fix shadcn not setting the content array in tailwind.config.ts:

```bash
  content: ["./{,src/}app/**/*.{js,ts,jsx,tsx,mdx}", "./{,src/}components/**/*.{js,ts,jsx,tsx,mdx}"],
```

Install the components you need

```bash
bunx shadcn@latest add https://settlemint.github.io/sdk/settlemint.json
bunx shadcn@latest add https://settlemint.github.io/sdk/<component>.json
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