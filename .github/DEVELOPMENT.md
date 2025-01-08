## Development

### Debugging

To debug the CLI with interactive input you need to start the command from the terminal and then attach the debugger.

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
SETTLEMINT_ACCESS_TOKEN_E2E_TESTS="sm_pat_xxx"
SETTLEMINT_INSTANCE="https://me.settlemint.be"
DISABLE_WORKSPACE_DELETE=true
```
