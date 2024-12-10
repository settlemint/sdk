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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-cli" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-cli" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-cli" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-cli">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Getting started

First we will create a new Next JS project using the following command.

```bash
# Using npx
npx @settlemint/sdk-cli@latest create

# Using bun
bunx @settlemint/sdk-cli@latest create

# Using pnpm
pnpm dlx @settlemint/sdk-cli@latest create
```

Then following the next steps in your terminal.


## Local development

### Debugging

To debug with interactive input you need to start the command from the terminal and then attach the debugger.

```bash
bun --inspect-wait=localhost:6499/ sdk/cli/src/cli.ts create
# Attach the debugger using the "SDK: Attach to process" configuration

# Run from the directory created by the create command
bun --inspect-wait=localhost:6499/ sdk/cli/src/cli.ts connect
# Attach the debugger using the "SDK: Attach to process" configuration
```

### e2e tests

Create a ".env" file in the root folder of this project.

```env
SETTLEMINT_ACCESS_TOKEN="sm_pat_xxx"
SETTLEMINT_INSTANCE="https://me.settlemint.be"
DISABLE_WORKSPACE_DELETE=true
```