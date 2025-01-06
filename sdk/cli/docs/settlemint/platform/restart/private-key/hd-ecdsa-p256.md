# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [private-key](../private-key.md) > hd-ecdsa-p256

<pre>Usage: settlemint platform restart private-key hd-ecdsa-p256|hd 
Examples:

  # Restarts the specified private key by id
  $ bunx @settlemint/sdk-cli@latest platform restart hd-ecdsa-p256 hd-ecdsa-p256 <private key-id>

  # Restarts the default private key in the production environment
  $ bunx @settlemint/sdk-cli@latest platform restart hd-ecdsa-p256 hd-ecdsa-p256 default --prod

Restart a private key in the SettleMint platform. Provide the private key ID or
use 'default' to restart the default private key from your .env file.

Arguments:
  uniqueName             The unique name of the private key, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>