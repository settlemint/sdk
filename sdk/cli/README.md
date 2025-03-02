<p align="center">
  <img src="https://github.com/settlemint/sdk/blob/main/logo.svg" width="200px" align="center" alt="SettleMint logo" />
  <h1 align="center">SettleMint SDK</h1>
  <p align="center">
    ✨ <a href="https://settlemint.com">https://settlemint.com</a> ✨
    <br/>
    Integrate SettleMint into your application with ease.
  </p>
</p>

<p align="center">
<a href="https://github.com/settlemint/sdk/actions?query=branch%3Amain"><img src="https://github.com/settlemint/sdk/actions/workflows/build.yml/badge.svg?event=push&branch=main" alt="CI status" /></a>
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-cli" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-cli" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-cli" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/docs/using-platform/dev-tools/SDK/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-cli">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [Usage](#usage)
  - [As a dependency in your package.json](#as-a-dependency-in-your-package.json)
  - [Globally install the CLI](#globally-install-the-cli)
- [GitHub Action](#github-action)
- [Examples](#examples)
  - [Get the version of the CLI](#get-the-version-of-the-cli)
  - [Get help for a command](#get-help-for-a-command)
  - [Login to the platform](#login-to-the-platform)
  - [Creating a new project from a starter kit template](#creating-a-new-project-from-a-starter-kit-template)
    - [Installing dependencies](#installing-dependencies)
    - [Connecting to your SettleMint infrastructure](#connecting-to-your-settlemint-infrastructure)
    - [Deploying your smart contracts and subgraphs](#deploying-your-smart-contracts-and-subgraphs)
    - [Generating code for your dApp](#generating-code-for-your-dapp)
    - [Start your dApp in development mode](#start-your-dapp-in-development-mode)
  - [Creating a new project from a smart contract template](#creating-a-new-project-from-a-smart-contract-template)
    - [Testing your smart contracts](#testing-your-smart-contracts)
    - [Deploying your smart contracts and subgraphs](#deploying-your-smart-contracts-and-subgraphs)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## About

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
      access-token: ${{ secrets.SETTLEMINT_ACCESS_TOKEN }}
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

### Creating a new project from a starter kit template

To create a new project from a starter kit template, use the `create` command with the `--template` flag:

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

## API Reference

See the [documentation](https://github.com/settlemint/sdk/tree/v1.1.12/sdk/cli/docs/settlemint.md) for available commands.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
