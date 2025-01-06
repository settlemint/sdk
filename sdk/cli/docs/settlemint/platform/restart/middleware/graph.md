# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [middleware](../middleware.md) > graph

<pre>Usage: settlemint platform restart middleware graph|gr 
Examples:

  # Restarts the specified middleware by id
  $ bunx @settlemint/sdk-cli@latest platform restart graph graph <middleware-id>

  # Restarts the default middleware in the production environment
  $ bunx @settlemint/sdk-cli@latest platform restart graph graph default --prod

Restart a middleware in the SettleMint platform. Provide the middleware ID or
use 'default' to restart the default middleware from your .env file.

Arguments:
  uniqueName             The unique name of the middleware, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>