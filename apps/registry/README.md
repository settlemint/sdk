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

Install Biome for linting and formatting:

```bash
bun add -D @biomejs/biome
bun pm trust --all
```

And place this config file in the root of the project:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "organizeImports": {
    "enabled": true
  },
  "files": {
    "ignore": [
      "src/components/ui/**/*"
    ]
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "attributePosition": "auto",
    "indentStyle": "space",
    "indentWidth": 2,
    "lineEnding": "lf",
    "lineWidth": 120
  },
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  }
}
```

Install the components you need

```bash
bunx shadcn@latest add https://settlemint.github.io/sdk/all.json -o -y
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