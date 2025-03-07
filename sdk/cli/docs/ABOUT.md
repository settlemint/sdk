The SettleMint CLI provides a command-line interface for interacting with the SettleMint platform. It enables you to manage your blockchain networks, deploy smart contracts, configure your SettleMint infrastructure directly from the terminal.

## Usage

### As a dependency in your package.json

```bash
# npm
npm install @settlemint/sdk-cli
npx settlemint --version

# bun
bun add @settlemint/sdk-cli
bunx settlemint --version

# pnpm
pnpm add @settlemint/sdk-cli
pnpm dlx settlemint --version

# yarn
yarn add @settlemint/sdk-cli
yarn create settlemint --version
```

### Globally install the CLI

```bash
# npm
npm install -g @settlemint/sdk-cli

# bun
bun install -g @settlemint/sdk-cli

# pnpm
pnpm add -g @settlemint/sdk-cli

# yarn
yarn global add @settlemint/sdk-cli
```

You can access the CLI globally by running `settlemint` in your terminal.

## GitHub Action

Execute SettleMint CLI commands directly in your GitHub Actions workflows using our official GitHub Action.

For detailed setup and usage instructions, check out our [documentation](https://github.com/settlemint/settlemint-action/blob/main/README.md).

Basic example:

```yaml
steps:
  - name: Get SettleMint CLI version
    uses: settlemint/settlemint-action@main
    with:
      access-token: ${{=<% %>=}}{{ secrets.SETTLEMINT_ACCESS_TOKEN }}<%={{ }}=%>
      command: "--version"
```

## Examples

### Get the version of the CLI

```bash
settlemint --version
```

### Get help for a command

The CLI uses a hierarchical command structure. You can navigate through available commands and subcommands using the `--help` flag at any level.

```bash
settlemint --help
settlemint platform --help
settlemint platform create --help
```

### Login to the platform

To use the SettleMint CLI, you first need to authenticate with the platform. Create a Personal Access Token (PAT) on the SettleMint platformand paste it when prompted by the login command.

Visit [the documentation](https://console.settlemint.com/documentation/docs/using-platform/personal-access-tokens/) to learn how to create a Personal Access Token.

Then run the login command and paste your token when prompted:

```bash
settlemint login
```

### Creating a new project from a template

To create a new project from a template, use the `create` command with the `--template` flag:

```bash
settlemint create --project-name <project-name> --template <template-name>
```

#### Installing dependencies

To install the dependencies for your project, use the `dependencies` command.

```bash
# bun
bun install
bun run dependencies

# npm
npm install
npm run dependencies

# yarn
yarn install
yarn run dependencies

# pnpm
pnpm install
pnpm run dependencies
```

#### Connecting to your SettleMint infrastructure

After creating your project, you'll need to connect it to your SettleMint infrastructure. This requires setting up environment variables with your SettleMint credentials and infrastructure details.

You can use the `connect` command to automatically configure your project and select the services you want to connect to.

```bash
settlemint connect
```

#### Deploying your smart contracts and subgraphs

To deploy your smart contracts and subgraphs, you can use the `deploy` command.

```bash
settlemint scs hardhat deploy remote --accept-defaults
```

To deploy your subgraphs, use the `subgraph` command.

```bash
settlemint scs subgraph deploy --accept-defaults <subgraph-name>
```

#### Generating code for your dApp

After deploying your smart contracts and subgraphs, you can generate TypeScript code for your dApp to interact with them. The `codegen` command will generate type-safe code for your integrations with the services selected in the `connect` command.

```bash
settlemint codegen
```

#### Start your dApp in development mode

```bash
# bun
bun run dev

# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

### Creating a new project from a smart contract template

To create a new project from a smart contract template, use the `create` command with the `--use-case` flag:

```bash
settlemint scs create --project-name <project-name> --use-case <use-case-name>
```

#### Testing your smart contracts

To test your smart contracts, you can use the `test` command.

```bash
settlemint scs foundry test
```

#### Deploying your smart contracts and subgraphs

To deploy your smart contracts and subgraphs, you can use the `deploy` command.

```bash
settlemint scs hardhat deploy remote --accept-defaults
```

To deploy your subgraphs, use the `subgraph` command.

```bash
settlemint scs subgraph deploy --accept-defaults <subgraph-name>
```