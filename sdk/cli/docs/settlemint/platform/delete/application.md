# [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [delete](../delete.md) > application

<pre>Usage: settlemint platform delete application|a 
Examples:

  # Deletes the specified application by unique name
  $ bunx @settlemint/sdk-cli@latest platform delete application <application-unique-name>

  # Deletes the default application in the production environment
  $ bunx @settlemint/sdk-cli@latest platform delete application default --prod

  # Force deletes the specified application without confirmation
  $ bunx @settlemint/sdk-cli@latest platform delete application <application-unique-name> --force

Delete a application in the SettleMint platform. Provide the application unique
name or use 'default' to delete the default application from your .env file.

Arguments:
  uniqueName             The unique name of the application, use 'default' to
                         delete the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until destroyed
  -f, --force            Force delete the application without confirmation
  -h, --help             display help for command
</pre>