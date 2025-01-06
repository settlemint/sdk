# [settlemint](../settlemint.md) > login

<pre>Usage: settlemint login 
Examples:

  # Login to your SettleMint account
  $ bunx @settlemint/sdk-cli@latest login

  # Login to your SettleMint account using a token from STDIN
  $ cat ~/my_token.txt | bunx @settlemint/sdk-cli@latest login --token-stdin --accept-defaults

Login to your SettleMint account.

Options:
  -a, --accept-defaults      Accept the default and previously set values
  -d, --default              Set this instance as the default
  --token-stdin              Provide a token using STDIN
  -i, --instance <instance>  The instance to login to (defaults to the instance
                             in the .env file)
  -h, --help                 display help for command
</pre>