# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [blockchain-network](../blockchain-network.md) > besu

<pre>Usage: settlemint platform create blockchain-network besu|b 
Examples:

  # Create a Besu blockchain network and save as default
  $ bunx @settlemint/sdk-cli@latest platform create blockchain-network besu my-network --node-name validator-1 --accept-defaults -d

  # Create a Besu blockchain network in a different application
  $ bunx @settlemint/sdk-cli@latest platform create blockchain-network besu my-network --application app-123 --node-name validator-1 --chain-id 12345 --gas-limit 10000000 --seconds-per-block 5

Create a new blockchain network in the SettleMint platform.

Arguments:
  name                             The blockchain network name

Options:
  -a, --accept-defaults            Accept the default values
  -d, --default                    Save as default blockchain network
  -w, --wait                       Wait until deployed
  -r, --restart-if-timeout         Restart if wait time is exceeded
  --prod                           Connect to production environment
  --provider <provider>            Network provider
  --region <region>                Deployment region
  --size <size>                    Network size (choices: "CUSTOM", "LARGE",
                                   "MEDIUM", "SMALL", default: "SMALL")
  --type <type>                    Network type (choices: "DEDICATED",
                                   "SHARED", default: "SHARED")
  -a, --application <application>  The unique name of the application to create
                                   the network in (defaults to application from
                                   env)
  --node-name <name>               Name of the node
  --chain-id <chainId>             The chain ID for the network
  --contract-size-limit <limit>    Maximum contract size limit
  --evm-stack-size <size>          EVM stack size
  --gas-limit <limit>              Block gas limit
  --gas-price <price>              Gas price in wei
  --seconds-per-block <seconds>    Block time in seconds
  -h, --help                       display help for command
</pre>