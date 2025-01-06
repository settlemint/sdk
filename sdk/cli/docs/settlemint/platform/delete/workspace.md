# [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [delete](../delete.md) > workspace

<pre>Usage: settlemint platform delete workspace|w 
Examples:

  # Deletes the specified workspace by unique name
  $ bunx @settlemint/sdk-cli@latest platform delete workspace <workspace-unique-name>

  # Deletes the default workspace in the production environment
  $ bunx @settlemint/sdk-cli@latest platform delete workspace default --prod

  # Force deletes the specified workspace without confirmation
  $ bunx @settlemint/sdk-cli@latest platform delete workspace <workspace-unique-name> --force

Delete a workspace in the SettleMint platform. Provide the workspace unique
name or use 'default' to delete the default workspace from your .env file.

Arguments:
  uniqueName             The unique name of the workspace, use 'default' to
                         delete the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until destroyed
  -f, --force            Force delete the workspace without confirmation
  -h, --help             display help for command
</pre>