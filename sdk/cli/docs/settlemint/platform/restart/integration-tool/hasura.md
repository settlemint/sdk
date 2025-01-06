# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [integration-tool](../integration-tool.md) > hasura

<pre>Usage: settlemint platform restart integration-tool hasura|ha 
Examples:

  # Restarts the specified integration tool by id
  $ bunx @settlemint/sdk-cli@latest platform restart hasura hasura <integration tool-id>

  # Restarts the default integration tool in the production environment
  $ bunx @settlemint/sdk-cli@latest platform restart hasura hasura default --prod

Restart a integration tool in the SettleMint platform. Provide the integration
tool ID or use 'default' to restart the default integration tool from your .env
file.

Arguments:
  uniqueName             The unique name of the integration tool, use 'default'
                         to restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>