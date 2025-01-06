# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [integration-tool](../integration-tool.md) > hasura

<pre>Usage: settlemint platform create integration-tool hasura|ha 
Examples:

  # Create a Hasura integration and save as default
  $ bunx @settlemint/sdk-cli@latest platform create integration-tool hasura my-hasura --accept-defaults -d

  # Create a Hasura integration in a different application
  $ bunx @settlemint/sdk-cli@latest platform create integration-tool hasura my-hasura --application app-123

Create a new integration tool in the SettleMint platform.

Arguments:
  name                         The integration tool name

Options:
  -a, --accept-defaults        Accept the default values
  -d, --default                Save as default integration tool
  -w, --wait                   Wait until deployed
  -r, --restart-if-timeout     Restart if wait time is exceeded
  --prod                       Connect to production environment
  --provider <provider>        Network provider
  --region <region>            Deployment region
  --size <size>                Network size (choices: "CUSTOM", "LARGE",
                               "MEDIUM", "SMALL", default: "SMALL")
  --type <type>                Network type (choices: "DEDICATED", "SHARED",
                               default: "SHARED")
  --application <application>  Application unique name
  -h, --help                   display help for command
</pre>