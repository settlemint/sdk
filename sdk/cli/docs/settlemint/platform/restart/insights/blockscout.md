# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [insights](../insights.md) > blockscout

<pre>Usage: settlemint platform restart insights blockscout|bs 
Examples:

  # Restarts the specified insights by id
  $ bunx @settlemint/sdk-cli@latest platform restart blockscout blockscout <insights-id>

  # Restarts the default insights in the production environment
  $ bunx @settlemint/sdk-cli@latest platform restart blockscout blockscout default --prod

Restart a insights in the SettleMint platform. Provide the insights ID or use
'default' to restart the default insights from your .env file.

Arguments:
  uniqueName             The unique name of the insights, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>