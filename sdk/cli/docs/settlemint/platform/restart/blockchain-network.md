# [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > blockchain-network

<pre>Usage: settlemint platform restart blockchain-network|bn 
Examples:

  # Restarts the specified blockchain network by id
  $ bunx @settlemint/sdk-cli@latest platform restart blockchain-network <blockchain network-id>

  # Restarts the default blockchain network in the production environment
  $ bunx @settlemint/sdk-cli@latest platform restart blockchain-network default --prod

Restart a blockchain network in the SettleMint platform. Provide the blockchain
network ID or use 'default' to restart the default blockchain network from your
.env file.

Arguments:
  uniqueName             The unique name of the blockchain network, use
                         'default' to restart the default one from your .env
                         file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>