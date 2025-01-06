# [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > application-access-token

<pre>Usage: settlemint platform create application-access-token|aat 
Examples:

  # Create an application access token and save as default
  $ bunx @settlemint/sdk-cli@latest platform create application-access-token my-token --accept-defaults -d

  # Create an application access token with custom validity period
  $ bunx @settlemint/sdk-cli@latest platform create application-access-token my-token --validity-period ONE_DAY -a -d

  # Create an application access token (shorthand)
  $ bunx @settlemint/sdk-cli@latest platform create aat my-token

Create a new application access token in the SettleMint platform.

Arguments:
  name                             The application access token name

Options:
  -a, --accept-defaults            Accept the default values
  -d, --default                    Save as default application access token
  -w, --wait                       Wait until deployed
  -r, --restart-if-timeout         Restart if wait time is exceeded
  --prod                           Connect to production environment
  -a, --application <application>  The application unique name to create the
                                   application access token for (defaults to
                                   application from env)
  -v, --validity-period <period>   The validity period for the token (choices:
                                   "DAYS_7", "DAYS_30", "DAYS_60", "DAYS_90",
                                   "NONE", default: "DAYS_7")
  -h, --help                       display help for command
</pre>