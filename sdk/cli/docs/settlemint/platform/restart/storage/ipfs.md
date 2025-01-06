# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [storage](../storage.md) > ipfs

<pre>Usage: settlemint platform restart storage ipfs|ip 
Examples:

  # Restarts the specified storage by id
  $ bunx @settlemint/sdk-cli@latest platform restart ipfs <storage-id>

  # Restarts the default storage in the production environment
  $ bunx @settlemint/sdk-cli@latest platform restart ipfs default --prod

Restart a storage in the SettleMint platform. Provide the storage ID or use
'default' to restart the default storage from your .env file.

Arguments:
  uniqueName             The unique name of the storage, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>