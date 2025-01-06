# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [middleware](../middleware.md) > graph

<pre>Usage: settlemint platform create middleware graph|gr 
Examples:

  # Create a graph middleware and save as default
  $ bunx @settlemint/sdk-cli@latest platform create middleware graph my-graph --accept-defaults -d

  # Create a graph middleware in a different application
  $ bunx @settlemint/sdk-cli@latest platform create middleware graph my-graph --application my-app --blockchain-node node-123

Create a new middleware in the SettleMint platform.

Arguments:
  name                                The middleware name

Options:
  -a, --accept-defaults               Accept the default values
  -d, --default                       Save as default middleware
  -w, --wait                          Wait until deployed
  -r, --restart-if-timeout            Restart if wait time is exceeded
  --prod                              Connect to production environment
  --provider <provider>               Network provider
  --region <region>                   Deployment region
  --size <size>                       Network size (choices: "CUSTOM", "LARGE",
                                      "MEDIUM", "SMALL", default: "SMALL")
  --type <type>                       Network type (choices: "DEDICATED",
                                      "SHARED", default: "SHARED")
  --application <application>         Application unique name
  --blockchain-node <blockchainNode>  Blockchain Node unique name
  -h, --help                          display help for command
</pre>