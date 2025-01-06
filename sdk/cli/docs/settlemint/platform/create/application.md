# [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > application

<pre>Usage: settlemint platform create application|a 
Examples:

  # Create an application in a workspace
  $ bunx @settlemint/sdk-cli@latest platform create application my-app --accept-defaults

  # Create an application and save as default
  $ bunx @settlemint/sdk-cli@latest platform create application my-app -d

  # Create an application in a specific workspace
  $ bunx @settlemint/sdk-cli@latest platform create application my-app --workspace my-workspace

Create a new application in the SettleMint platform.

Arguments:
  name                         The application name

Options:
  -a, --accept-defaults        Accept the default values
  -d, --default                Save as default application
  -w, --wait                   Wait until deployed
  -r, --restart-if-timeout     Restart if wait time is exceeded
  --prod                       Connect to production environment
  -w, --workspace <workspace>  The workspace unique name to create the
                               application in (defaults to workspace from env)
  -h, --help                   display help for command
</pre>