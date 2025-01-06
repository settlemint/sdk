## [settlemint](../../settlemint.md) > [platform](../platform.md) > create

<pre>Usage: settlemint platform create|c [options] [command]

Create a resource in the SettleMint platform

Options:
  -h, --help                                     display help for command

Commands:
  <a href="./create/workspace.md">workspace|w</a> [options] <name>                   Create a new workspace in the SettleMint platform.
  <a href="./create/application.md">application|a</a> [options] <name>                 Create a new application in the SettleMint platform.
  <a href="./create/blockchain-network.md">blockchain-network|bnw</a>                         Create a blockchain network in the SettleMint platform
  <a href="./create/blockchain-node.md">blockchain-node|bn</a>                             Create a blockchain node in the SettleMint platform
  <a href="./create/private-key.md">private-key|pk</a>                                 Create a private key in the SettleMint platform
  <a href="./create/middleware.md">middleware|mw</a>                                  Create a middleware service in the SettleMint platform
  <a href="./create/storage.md">storage|st</a>                                     Create a storage service in the SettleMint platform
  <a href="./create/integration-tool.md">integration-tool|it</a>                            Create a new integration tool
  <a href="./create/insights.md">insights|in</a>                                    Create a new insights
  <a href="./create/application.md">application</a>-access-token|aat [options] <name>  Create a new application access token in the SettleMint platform.
  help [command]                                 display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > workspace

<pre>Usage: settlemint platform create workspace|w 
Examples:

  # Create a workspace with company details
  $ settlemint platform create workspace my-workspace --name "SettleMint" --tax-id-type eu_vat --tax-id-value BE0661674810

  # Create a workspace with address details
  $ settlemint platform create workspace my-workspace --line1 "123 Main St" --city "Brussels" --postal-code "1000" --country BE

  # Create a workspace and save as default
  $ settlemint platform create workspace my-workspace -d

Create a new workspace in the SettleMint platform.

Arguments:
  name                                   The workspace name

Options:
  -a, --accept-defaults                  Accept the default values
  -d, --default                          Save as default workspace
  -w, --wait                             Wait until deployed
  -r, --restart-if-timeout               Restart if wait time is exceeded
  --prod                                 Connect to production environment
  --company-name <companyName>           Company name
  --address-line-1 <addressLine1>        Address line 1
  --address-line-2 <addressLine2>        Address line 2
  --city <city>                          City
  --postal-code <code>                   Postal code
  --country <country>                    Country
  --tax-id-value <value>                 Tax ID value
  --tax-id-type <type>                   Tax ID type (e.g. 'eu_vat' for European VAT number like 'ATU12345678', 'us_ein' for US EIN like '12-3456789') (choices: "ad_nrt", "ar_cuit", "au_abn", "au_arn", "eu_vat", "bh_vat", "by_tin", "bo_tin", "br_cnpj", "br_cpf", "bg_uic", "ca_bn", "ca_gst_hst", "ca_pst_bc", "ca_pst_mb", "ca_pst_sk", "ca_qst", "cl_tin", "cn_tin", "co_nit", "cr_tin", "hr_oib", "do_rcn", "ec_ruc", "eg_tin", "sv_nit", "eu_oss_vat", "ge_vat", "de_stn", "hk_br", "hu_tin", "is_vat", "in_gst", "id_npwp", "il_vat", "jp_cn", "jp_rn", "jp_trn", "kz_bin", "ke_pin", "li_uid", "li_vat", "my_frp", "my_itn", "my_sst", "mx_rfc", "md_vat", "ma_vat", "nz_gst", "ng_tin", "no_vat", "no_voec", "om_vat", "pe_ruc", "ph_tin", "ro_tin", "ru_inn", "ru_kpp", "sa_vat", "rs_pib", "sg_gst", "sg_uen", "si_tin", "za_vat", "kr_brn", "es_cif", "ch_uid", "ch_vat", "tw_vat", "tz_vat", "th_vat", "tr_tin", "ua_vat", "ae_trn", "gb_vat", "us_ein", "uy_ruc", "uz_tin", "uz_vat", "ve_rif", "vn_tin")
  --payment-method-id <paymentMethodId>  Payment method ID
  --parent-id <parentId>                 Parent workspace ID
  -h, --help                             display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > application

<pre>Usage: settlemint platform create application|a 
Examples:

  # Create an application in a workspace
  $ settlemint platform create application my-app --accept-defaults

  # Create an application and save as default
  $ settlemint platform create application my-app -d

  # Create an application in a specific workspace
  $ settlemint platform create application my-app --workspace my-workspace

Create a new application in the SettleMint platform.

Arguments:
  name                         The application name

Options:
  -a, --accept-defaults        Accept the default values
  -d, --default                Save as default application
  -w, --wait                   Wait until deployed
  -r, --restart-if-timeout     Restart if wait time is exceeded
  --prod                       Connect to production environment
  -w, --workspace <workspace>  The workspace unique name to create the
                               application in (defaults to workspace from env)
  -h, --help                   display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > blockchain-network

<pre>Usage: settlemint platform create blockchain-network|bnw [options] [command]

Create a blockchain network in the SettleMint platform

Options:
  -h, --help               display help for command

Commands:
  <a href="./blockchain-network/besu.md">besu|b</a> [options] <name>  Create a new blockchain network in the SettleMint
                           platform.
  help [command]           display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [blockchain-network](../blockchain-network.md) > besu

<pre>Usage: settlemint platform create blockchain-network besu|b 
Examples:

  # Create a Besu blockchain network and save as default
  $ settlemint platform create blockchain-network besu my-network --node-name validator-1 --accept-defaults -d

  # Create a Besu blockchain network in a different application
  $ settlemint platform create blockchain-network besu my-network --application app-123 --node-name validator-1 --chain-id 12345 --gas-limit 10000000 --seconds-per-block 5

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

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > blockchain-node

<pre>Usage: settlemint platform create blockchain-node|bn [options] [command]

Create a blockchain node in the SettleMint platform

Options:
  -h, --help               display help for command

Commands:
  <a href="./blockchain-node/besu.md">besu|b</a> [options] <name>  Create a new blockchain node in the SettleMint
                           platform.
  help [command]           display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [blockchain-node](../blockchain-node.md) > besu

<pre>Usage: settlemint platform create blockchain-node besu|b 
Examples:

  # Create a Besu blockchain node and save as default
  $ settlemint platform create blockchain-node besu my-node --node-type VALIDATOR --accept-defaults -d

  # Create a Besu blockchain node in a different network
  $ settlemint platform create blockchain-node besu my-node --blockchain-network-id 12345 --node-type NON_VALIDATOR --accept-defaults

  # Create a Besu blockchain node in a different application
  $ settlemint platform create blockchain-node besu my-node --application-id 123456789 --node-type NON_VALIDATOR --accept-defaults

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

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > private-key

<pre>Usage: settlemint platform create private-key|pk [options] [command]

Create a private key in the SettleMint platform

Options:
  -h, --help                          display help for command

Commands:
  <a href="./private-key/hd-ecdsa-p256.md">hd-ecdsa-p256|hd</a> [options] <name>   Create a new private key in the
                                      SettleMint platform.
  <a href="./private-key/hsm-ecdsa-p256.md">hsm-ecdsa-p256|hd</a> [options] <name>  Create a new private key in the
                                      SettleMint platform.
  help [command]                      display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [private-key](../private-key.md) > hd-ecdsa-p256

<pre>Usage: settlemint platform create private-key hd-ecdsa-p256|hd 
Examples:

  # Create a private key and save as default
  $ settlemint platform create private-key hd-ecdsa-p256 my-key --accept-defaults -d

  # Create a private key in a different application
  $ settlemint platform create private-key hd-ecdsa-p256 my-key --application my-app

  # Create a private key linked to a blockchain node
  $ settlemint platform create private-key hd-ecdsa-p256 my-key --blockchain-node node-123

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

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [private-key](../private-key.md) > hsm-ecdsa-p256

<pre>Usage: settlemint platform create private-key hsm-ecdsa-p256|hd 
Examples:

  # Create a private key and save as default
  $ settlemint platform create private-key hsm-ecdsa-p256 my-key --accept-defaults -d

  # Create a private key in a different application
  $ settlemint platform create private-key hsm-ecdsa-p256 my-key --application 123456789

  # Create a private key linked to a blockchain node
  $ settlemint platform create private-key hsm-ecdsa-p256 my-key --blockchain-node node-123

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

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > middleware

<pre>Usage: settlemint platform create middleware|mw [options] [command]

Create a middleware service in the SettleMint platform

Options:
  -h, --help                                  display help for command

Commands:
  <a href="./middleware/graph.md">graph|gr</a> [options] <name>                   Create a new middleware in the SettleMint platform.
  <a href="./middleware/smart-contract-portal.md">smart-contract-portal|scp</a> [options] <name>  Create a new middleware in the SettleMint platform.
  help [command]                              display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [middleware](../middleware.md) > graph

<pre>Usage: settlemint platform create middleware graph|gr 
Examples:

  # Create a graph middleware and save as default
  $ settlemint platform create middleware graph my-graph --accept-defaults -d

  # Create a graph middleware in a different application
  $ settlemint platform create middleware graph my-graph --application my-app --blockchain-node node-123

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

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [middleware](../middleware.md) > smart-contract-portal

<pre>Usage: settlemint platform create middleware smart-contract-portal|scp 
Examples:

  # Create a smart contract portal middleware and save as default
  $ settlemint platform create middleware smart-contract-portal my-portal --accept-defaults -d

  # Create a smart contract portal middleware in a different application
  $ settlemint platform create middleware smart-contract-portal my-portal --application my-app --blockchain-node node-123

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

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > storage

<pre>Usage: settlemint platform create storage|st [options] [command]

Create a storage service in the SettleMint platform

Options:
  -h, --help                display help for command

Commands:
  <a href="./storage/ipfs.md">ipfs|ip</a> [options] <name>  Create a new storage in the SettleMint platform.
  <a href="./storage/minio.md">minio|m</a> [options] <name>  Create a new storage in the SettleMint platform.
  help [command]            display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [storage](../storage.md) > ipfs

<pre>Usage: settlemint platform create storage ipfs|ip 
Examples:

  # Create an IPFS storage and save as default
  $ settlemint platform create storage ipfs my-storage --accept-defaults -d

  # Create an IPFS storage in a different application
  $ settlemint platform create storage ipfs my-storage --application app-123

Create a new storage in the SettleMint platform.

Arguments:
  name                         The storage name

Options:
  -a, --accept-defaults        Accept the default values
  -d, --default                Save as default storage
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

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [storage](../storage.md) > minio

<pre>Usage: settlemint platform create storage minio|m 
Examples:

  # Create a MinIO storage and save as default
  $ settlemint platform create storage minio my-storage --accept-defaults -d

  # Create a MinIO storage in a different application
  $ settlemint platform create storage minio my-storage --application app-123

Create a new storage in the SettleMint platform.

Arguments:
  name                         The storage name

Options:
  -a, --accept-defaults        Accept the default values
  -d, --default                Save as default storage
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

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > integration-tool

<pre>Usage: settlemint platform create integration-tool|it [options] [command]

Create a new integration tool

Options:
  -h, --help                  display help for command

Commands:
  <a href="./integration-tool/hasura.md">hasura|ha</a> [options] <name>  Create a new integration tool in the SettleMint
                              platform.
  help [command]              display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [integration-tool](../integration-tool.md) > hasura

<pre>Usage: settlemint platform create integration-tool hasura|ha 
Examples:

  # Create a Hasura integration and save as default
  $ settlemint platform create integration-tool hasura my-hasura --accept-defaults -d

  # Create a Hasura integration in a different application
  $ settlemint platform create integration-tool hasura my-hasura --application app-123

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

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > insights

<pre>Usage: settlemint platform create insights|in [options] [command]

Create a new insights

Options:
  -h, --help                      display help for command

Commands:
  <a href="./insights/blockscout.md">blockscout|bs</a> [options] <name>  Create a new insights in the SettleMint
                                  platform.
  help [command]                  display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [insights](../insights.md) > blockscout

<pre>Usage: settlemint platform create insights blockscout|bs 
Examples:

  # Create a Blockscout insights service and save as default
  $ settlemint platform create insights blockscout my-blockscout --accept-defaults -d

  # Create a Blockscout insights service in a different application
  $ settlemint platform create insights blockscout my-blockscout --application app-123

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

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [create](../create.md) > application-access-token

<pre>Usage: settlemint platform create application-access-token|aat 
Examples:

  # Create an application access token and save as default
  $ settlemint platform create application-access-token my-token --accept-defaults -d

  # Create an application access token with custom validity period
  $ settlemint platform create application-access-token my-token --validity-period ONE_DAY -a -d

  # Create an application access token (shorthand)
  $ settlemint platform create aat my-token

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

