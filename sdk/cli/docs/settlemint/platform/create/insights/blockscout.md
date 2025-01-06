# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [insights](../insights.md) > blockscout

<pre>Usage: settlemint platform create insights blockscout|bs 
Examples:

  # Create a Blockscout insights service and save as default
  $ bunx @settlemint/sdk-cli@latest platform create insights blockscout my-blockscout --accept-defaults -d

  # Create a Blockscout insights service in a different application
  $ bunx @settlemint/sdk-cli@latest platform create insights blockscout my-blockscout --application app-123

Create a new insights in the SettleMint platform.

Arguments:
  name                                The insights name

Options:
  -a, --accept-defaults               Accept the default values
  -d, --default                       Save as default insights
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
  --load-balancer <loadBalancer>      Load Balancer unique name (mutually
                                      exclusive with blockchain-node)
  --blockchain-node <blockchainNode>  Blockchain Node unique name (mutually
                                      exclusive with load-balancer)
  -h, --help                          display help for command
</pre>