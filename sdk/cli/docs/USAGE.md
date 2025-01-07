### Login to the platform

To use the SettleMint CLI, you first need to authenticate with the platform. Create a Personal Access Token (PAT) on the SettleMint platformand paste it when prompted by the login command.

Visit [the documentation](https://console.settlemint.com/documentation/docs/using-platform/personal-access-tokens/) to learn how to create a Personal Access Token.

Then run the login command and paste your token when prompted:

```bash
settlemint login
```

### Creating a new project from a starter kit template

To create a new project from a starter kit template, use the `create` command with the `--template` flag:

```bash
settlemint create --project-name <project-name> --template <template-name>
```

### Installing dependencies

To install the dependencies for your project, use the `dependencies` command.

#### Using bun

```bash
bun install
bun run dependencies
```

#### Using npm

```bash
npm install
npm run dependencies
```

####   Using yarn

```bash
yarn install
yarn run dependencies
```

#### Using pnpm

```bash
pnpm install
pnpm run dependencies
```

### Connecting to your SettleMint infrastructure

After creating your project, you'll need to connect it to your SettleMint infrastructure. This requires setting up environment variables with your SettleMint credentials and infrastructure details.

You can use the `connect` command to automatically configure your project and select the services you want to connect to.

```bash
settlemint connect
```

### Deploying your smart contracts and subgraphs

To deploy your smart contracts and subgraphs, you can use the `deploy` command.

```bash
settlemint scs hardhat deploy remote --accept-defaults
```

To deploy your subgraphs, use the `subgraph` command.

```bash
settlemint scs subgraph deploy --accept-defaults <subgraph-name>
```

## Generating code for your dApp

After deploying your smart contracts and subgraphs, you can generate TypeScript code for your dApp to interact with them. The `codegen` command will generate type-safe code for your integrations with the services selected in the `connect` command.

```bash
settlemint codegen
```

### Start your dApp in development mode

```bash
bun run dev
```

## Creating a new project from a smart contract template

To create a new project from a smart contract template, use the `create` command with the `--use-case` flag:

```bash
settlemint scs create --project-name <project-name> --use-case <use-case-name>
```

## Testing your smart contracts on a local network

To test your smart contracts, you can use the `test` command.

```bash
settlemint scs foundry test
```

### Deploying your smart contracts and subgraphs

To deploy your smart contracts and subgraphs, you can use the `deploy` command.

```bash
settlemint scs hardhat deploy remote --accept-defaults
```

To deploy your subgraphs, use the `subgraph` command.

```bash
settlemint scs subgraph deploy --accept-defaults <subgraph-name>
```