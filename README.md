<p align="center">
  <img src="https://github.com/settlemint/sdk/blob/main/logo.svg" width="200px" align="center" alt="SettleMint logo" />
  <h1 align="center">SettleMint SDK</h1>
  <p align="center">
    ✨ <a href="https://settlemint.com">https://settlemint.com</a> ✨
    <br/>
    Integrate SettleMint into your application with ease.
  </p>
</p>
<br/>
<p align="center">
<a href="https://github.com/settlemint/sdk/actions?query=branch%3Amain"><img src="https://github.com/settlemint/sdk/actions/workflows/build.yml/badge.svg?event=push&branch=main" alt="CI status" /></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/settlemint/sdk" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/btp-sdk-cli">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Start a new project (Next JS)

First we will create a new Next JS project using the following command.

```bash
# Using npx
npx create-next-app@latest

# Using bun
bunx create-next-app@latest
```

And we recommend the following settings:

```text
What is your project named? my-app
Would you like to use TypeScript? Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory? No
Would you like to use App Router? (recommended) Yes
Would you like to customize the default import alias (@/*)? No
```

Then we will install the `@settlemint/btp-sdk-cli` package.

```bash
cd my-app;

# Using npm
npm install -D@settlemint/btp-sdk-cli

# Using bun
bun add -D @settlemint/btp-sdk-cli
```

Now we can start the setup process by running the following command.

```bash
# Using npm
npmx btp-sdk-cli init

# Using bun
bunx btp-sdk-cli init
```

This will create a new configuration file in your project's root directory.

As the last step we will generate the SDK code for the first time:

```bash
# Using npm
npmx btp-sdk-cli codegen

# Using bun
bunx btp-sdk-cli codegen
```

Anytime we want to update the generated SDK (when you have updated the portal or created new graphql queries) you need to repeat the command.