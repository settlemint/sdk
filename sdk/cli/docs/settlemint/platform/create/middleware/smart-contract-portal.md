# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [middleware](../middleware.md) > smart-contract-portal

<pre>Usage: settlemint platform create middleware smart-contract-portal|scp 
Examples:

  # Create a smart contract portal middleware and save as default
  $ bunx @settlemint/sdk-cli@latest platform create middleware smart-contract-portal my-portal --accept-defaults -d

  # Create a smart contract portal middleware in a different application
  $ bunx @settlemint/sdk-cli@latest platform create middleware smart-contract-portal my-portal --application my-app --blockchain-node node-123

Create a new middleware in the SettleMint platform.

Arguments:
  name                                                    The middleware name

Options:
  -a, --accept-defaults                                   Accept the default values
  -d, --default                                           Save as default middleware
  -w, --wait                                              Wait until deployed
  -r, --restart-if-timeout                                Restart if wait time is exceeded
  --prod                                                  Connect to production environment
  --provider <provider>                                   Network provider
  --region <region>                                       Deployment region
  --size <size>                                           Network size (choices: "CUSTOM", "LARGE", "MEDIUM", "SMALL", default: "SMALL")
  --type <type>                                           Network type (choices: "DEDICATED", "SHARED", default: "SHARED")
  --application <application>                             Application unique name
  --load-balancer <loadBalancer>                          Load Balancer unique name (mutually exclusive with blockchain-node)
  --blockchain-node <blockchainNode>                      Blockchain Node unique name (mutually exclusive with load-balancer)
  --abis <abis...>                                        Path to abi file(s)
  --include-predeployed-abis <includePredeployedAbis...>  Include pre-deployed abis (choices: "StarterKitERC20Registry", "StarterKitERC20Factory", "StarterKitERC20", "StarterKitERC20DexFactory", "StarterKitERC20Dex")
  -h, --help                                              display help for command
</pre>