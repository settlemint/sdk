# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [private-key](../private-key.md) > hd-ecdsa-p256

<pre>Usage: settlemint platform create private-key hd-ecdsa-p256|hd 
Examples:

  # Create a private key and save as default
  $ bunx @settlemint/sdk-cli@latest platform create private-key hd-ecdsa-p256 my-key --accept-defaults -d

  # Create a private key in a different application
  $ bunx @settlemint/sdk-cli@latest platform create private-key hd-ecdsa-p256 my-key --application my-app

  # Create a private key linked to a blockchain node
  $ bunx @settlemint/sdk-cli@latest platform create private-key hd-ecdsa-p256 my-key --blockchain-node node-123

Create a new private key in the SettleMint platform.

Arguments:
  name                                The private key name

Options:
  -a, --accept-defaults               Accept the default values
  -d, --default                       Save as default private key
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