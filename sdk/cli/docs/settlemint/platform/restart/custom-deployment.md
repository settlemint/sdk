# [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > custom-deployment

<pre>Usage: settlemint platform restart custom-deployment|cd 
Examples:

  # Restarts the specified custom deployment by id
  $ bunx @settlemint/sdk-cli@latest platform restart custom-deployment <custom deployment-id>

  # Restarts the default custom deployment in the production environment
  $ bunx @settlemint/sdk-cli@latest platform restart custom-deployment default --prod

Restart a custom deployment in the SettleMint platform. Provide the custom
deployment ID or use 'default' to restart the default custom deployment from
your .env file.

Arguments:
  uniqueName             The unique name of the custom deployment, use
                         'default' to restart the default one from your .env
                         file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>