# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [blockchain-node](../blockchain-node.md) > besu

<pre>Usage: settlemint platform create blockchain-node besu|b 
Examples:

  # Create a Besu blockchain node and save as default
  $ bunx @settlemint/sdk-cli@latest platform create blockchain-node besu my-node --node-type VALIDATOR --accept-defaults -d

  # Create a Besu blockchain node in a different network
  $ bunx @settlemint/sdk-cli@latest platform create blockchain-node besu my-node --blockchain-network-id 12345 --node-type NON_VALIDATOR --accept-defaults

  # Create a Besu blockchain node in a different application
  $ bunx @settlemint/sdk-cli@latest platform create blockchain-node besu my-node --application-id 123456789 --node-type NON_VALIDATOR --accept-defaults

Create a new blockchain node in the SettleMint platform.

Arguments:
  name                                      The blockchain node name

Options:
  -a, --accept-defaults                     Accept the default values
  -d, --default                             Save as default blockchain node
  -w, --wait                                Wait until deployed
  -r, --restart-if-timeout                  Restart if wait time is exceeded
  --prod                                    Connect to production environment
  --provider <provider>                     Network provider
  --region <region>                         Deployment region
  --size <size>                             Network size (choices: "CUSTOM", "LARGE", "MEDIUM", "SMALL", default: "SMALL")
  --type <type>                             Network type (choices: "DEDICATED", "SHARED", default: "SHARED")
  -a, --application <application>           The application unique name to create the node in (defaults to application from env)
  --blockchain-network <blockchainNetwork>  Blockchain network unique name to add this node to
  --node-identity <nodeIdentity>            EC DSA P256 private key to use as the node identity
  --node-type <nodeType>                    Type of the node (choices: "VALIDATOR", "NON_VALIDATOR")
  -h, --help                                display help for command
</pre>