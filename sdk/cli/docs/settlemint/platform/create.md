<h1><a href="../../settlemint.md">settlemint</a> > <a href="../platform.md">platform</a> > create</h1>

<pre>Usage: settlemint platform create|c [options] [command]

Create a resource in the SettleMint platform

Options:
  -h, --help                                     display help for command

Commands:
  <a href="#create-workspace">workspace|w</a> [options] &lt;name&gt;                   Create a new workspace in the SettleMint platform.
  <a href="#create-application">application|a</a> [options] &lt;name&gt;                 Create a new application in the SettleMint platform.
  <a href="#create-blockchain-network">blockchain-network|bnw</a>                         Create a blockchain network in the SettleMint platform
  <a href="#create-blockchain-node">blockchain-node|bn</a>                             Create a blockchain node in the SettleMint platform
  <a href="#create-private-key">private-key|pk</a>                                 Create a private key in the SettleMint platform
  <a href="#create-middleware">middleware|mw</a>                                  Create a middleware service in the SettleMint platform
  <a href="#create-storage">storage|st</a>                                     Create a storage service in the SettleMint platform
  <a href="#create-integration-tool">integration-tool|it</a>                            Create a new integration tool
  <a href="#create-insights">insights|in</a>                                    Create a new insights
  <a href="#create-application">application</a>-access-token|aat [options] &lt;name&gt;  Create a new application access token in the SettleMint platform.
  help [command]                                 display help for command
</pre>

<h3 id="create-workspace"><a href="./create.md">create</a> > workspace</h3>

<pre>Usage: settlemint platform create workspace|w 
Examples:

  # Create a workspace with company details
  $ settlemint platform create workspace my-workspace --name &quot;SettleMint&quot; --tax-id-type eu_vat --tax-id-value BE0661674810

  # Create a workspace with address details
  $ settlemint platform create workspace my-workspace --line1 &quot;123 Main St&quot; --city &quot;Brussels&quot; --postal-code &quot;1000&quot; --country BE

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
  --company-name &lt;companyName&gt;           Company name
  --address-line-1 &lt;addressLine1&gt;        Address line 1
  --address-line-2 &lt;addressLine2&gt;        Address line 2
  --city &lt;city&gt;                          City
  --postal-code &lt;code&gt;                   Postal code
  --country &lt;country&gt;                    Country
  --tax-id-value &lt;value&gt;                 Tax ID value
  --tax-id-type &lt;type&gt;                   Tax ID type (e.g. &#039;eu_vat&#039; for European VAT number like &#039;ATU12345678&#039;, &#039;us_ein&#039; for US EIN like &#039;12-3456789&#039;) (choices: &quot;ad_nrt&quot;, &quot;ar_cuit&quot;, &quot;au_abn&quot;, &quot;au_arn&quot;, &quot;eu_vat&quot;, &quot;bh_vat&quot;, &quot;by_tin&quot;, &quot;bo_tin&quot;, &quot;br_cnpj&quot;, &quot;br_cpf&quot;, &quot;bg_uic&quot;, &quot;ca_bn&quot;, &quot;ca_gst_hst&quot;, &quot;ca_pst_bc&quot;, &quot;ca_pst_mb&quot;, &quot;ca_pst_sk&quot;, &quot;ca_qst&quot;, &quot;cl_tin&quot;, &quot;cn_tin&quot;, &quot;co_nit&quot;, &quot;cr_tin&quot;, &quot;hr_oib&quot;, &quot;do_rcn&quot;, &quot;ec_ruc&quot;, &quot;eg_tin&quot;, &quot;sv_nit&quot;, &quot;eu_oss_vat&quot;, &quot;ge_vat&quot;, &quot;de_stn&quot;, &quot;hk_br&quot;, &quot;hu_tin&quot;, &quot;is_vat&quot;, &quot;in_gst&quot;, &quot;id_npwp&quot;, &quot;il_vat&quot;, &quot;jp_cn&quot;, &quot;jp_rn&quot;, &quot;jp_trn&quot;, &quot;kz_bin&quot;, &quot;ke_pin&quot;, &quot;li_uid&quot;, &quot;li_vat&quot;, &quot;my_frp&quot;, &quot;my_itn&quot;, &quot;my_sst&quot;, &quot;mx_rfc&quot;, &quot;md_vat&quot;, &quot;ma_vat&quot;, &quot;nz_gst&quot;, &quot;ng_tin&quot;, &quot;no_vat&quot;, &quot;no_voec&quot;, &quot;om_vat&quot;, &quot;pe_ruc&quot;, &quot;ph_tin&quot;, &quot;ro_tin&quot;, &quot;ru_inn&quot;, &quot;ru_kpp&quot;, &quot;sa_vat&quot;, &quot;rs_pib&quot;, &quot;sg_gst&quot;, &quot;sg_uen&quot;, &quot;si_tin&quot;, &quot;za_vat&quot;, &quot;kr_brn&quot;, &quot;es_cif&quot;, &quot;ch_uid&quot;, &quot;ch_vat&quot;, &quot;tw_vat&quot;, &quot;tz_vat&quot;, &quot;th_vat&quot;, &quot;tr_tin&quot;, &quot;ua_vat&quot;, &quot;ae_trn&quot;, &quot;gb_vat&quot;, &quot;us_ein&quot;, &quot;uy_ruc&quot;, &quot;uz_tin&quot;, &quot;uz_vat&quot;, &quot;ve_rif&quot;, &quot;vn_tin&quot;)
  --payment-method-id &lt;paymentMethodId&gt;  Payment method ID
  --parent-id &lt;parentId&gt;                 Parent workspace ID
  -h, --help                             display help for command
</pre>

<h3 id="create-application"><a href="./create.md">create</a> > application</h3>

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
  -w, --workspace &lt;workspace&gt;  The workspace unique name to create the
                               application in (defaults to workspace from env)
  -h, --help                   display help for command
</pre>

<h3 id="create-blockchain-network"><a href="./create.md">create</a> > blockchain-network</h3>

<pre>Usage: settlemint platform create blockchain-network|bnw [options] [command]

Create a blockchain network in the SettleMint platform

Options:
  -h, --help               display help for command

Commands:
  <a href="#blockchain-network-besu">besu|b</a> [options] &lt;name&gt;  Create a new blockchain network in the SettleMint
                           platform.
  help [command]           display help for command
</pre>

<h3 id="blockchain-network-besu"><a href="./create.md">create</a> > <a href="#create-blockchain-network">blockchain-network</a> > besu</h3>

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
  --provider &lt;provider&gt;            Network provider
  --region &lt;region&gt;                Deployment region
  --size &lt;size&gt;                    Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;,
                                   &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                    Network type (choices: &quot;DEDICATED&quot;,
                                   &quot;SHARED&quot;, default: &quot;SHARED&quot;)
  -a, --application &lt;application&gt;  The unique name of the application to create
                                   the network in (defaults to application from
                                   env)
  --node-name &lt;name&gt;               Name of the node
  --chain-id &lt;chainId&gt;             The chain ID for the network
  --contract-size-limit &lt;limit&gt;    Maximum contract size limit
  --evm-stack-size &lt;size&gt;          EVM stack size
  --gas-limit &lt;limit&gt;              Block gas limit
  --gas-price &lt;price&gt;              Gas price in wei
  --seconds-per-block &lt;seconds&gt;    Block time in seconds
  -h, --help                       display help for command
</pre>

<h3 id="create-blockchain-node"><a href="./create.md">create</a> > blockchain-node</h3>

<pre>Usage: settlemint platform create blockchain-node|bn [options] [command]

Create a blockchain node in the SettleMint platform

Options:
  -h, --help               display help for command

Commands:
  <a href="#blockchain-node-besu">besu|b</a> [options] &lt;name&gt;  Create a new blockchain node in the SettleMint
                           platform.
  help [command]           display help for command
</pre>

<h3 id="blockchain-node-besu"><a href="./create.md">create</a> > <a href="#create-blockchain-node">blockchain-node</a> > besu</h3>

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
  --provider &lt;provider&gt;                     Network provider
  --region &lt;region&gt;                         Deployment region
  --size &lt;size&gt;                             Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;, &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                             Network type (choices: &quot;DEDICATED&quot;, &quot;SHARED&quot;, default: &quot;SHARED&quot;)
  -a, --application &lt;application&gt;           The application unique name to create the node in (defaults to application from env)
  --blockchain-network &lt;blockchainNetwork&gt;  Blockchain network unique name to add this node to
  --node-identity &lt;nodeIdentity&gt;            EC DSA P256 private key to use as the node identity
  --node-type &lt;nodeType&gt;                    Type of the node (choices: &quot;VALIDATOR&quot;, &quot;NON_VALIDATOR&quot;)
  -h, --help                                display help for command
</pre>

<h3 id="create-private-key"><a href="./create.md">create</a> > private-key</h3>

<pre>Usage: settlemint platform create private-key|pk [options] [command]

Create a private key in the SettleMint platform

Options:
  -h, --help                          display help for command

Commands:
  <a href="#private-key-hd-ecdsa-p256">hd-ecdsa-p256|hd</a> [options] &lt;name&gt;   Create a new private key in the
                                      SettleMint platform.
  <a href="#private-key-hsm-ecdsa-p256">hsm-ecdsa-p256|hd</a> [options] &lt;name&gt;  Create a new private key in the
                                      SettleMint platform.
  help [command]                      display help for command
</pre>

<h3 id="private-key-hd-ecdsa-p256"><a href="./create.md">create</a> > <a href="#create-private-key">private-key</a> > hd-ecdsa-p256</h3>

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
  --provider &lt;provider&gt;               Network provider
  --region &lt;region&gt;                   Deployment region
  --size &lt;size&gt;                       Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;,
                                      &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                       Network type (choices: &quot;DEDICATED&quot;,
                                      &quot;SHARED&quot;, default: &quot;SHARED&quot;)
  --application &lt;application&gt;         Application unique name
  --blockchain-node &lt;blockchainNode&gt;  Blockchain Node unique name
  -h, --help                          display help for command
</pre>

<h3 id="private-key-hsm-ecdsa-p256"><a href="./create.md">create</a> > <a href="#create-private-key">private-key</a> > hsm-ecdsa-p256</h3>

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
  --provider &lt;provider&gt;               Network provider
  --region &lt;region&gt;                   Deployment region
  --size &lt;size&gt;                       Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;,
                                      &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                       Network type (choices: &quot;DEDICATED&quot;,
                                      &quot;SHARED&quot;, default: &quot;SHARED&quot;)
  --application &lt;application&gt;         Application unique name
  --blockchain-node &lt;blockchainNode&gt;  Blockchain Node unique name
  -h, --help                          display help for command
</pre>

<h3 id="create-middleware"><a href="./create.md">create</a> > middleware</h3>

<pre>Usage: settlemint platform create middleware|mw [options] [command]

Create a middleware service in the SettleMint platform

Options:
  -h, --help                                  display help for command

Commands:
  <a href="#middleware-graph">graph|gr</a> [options] &lt;name&gt;                   Create a new middleware in the SettleMint platform.
  <a href="#middleware-smart-contract-portal">smart-contract-portal|scp</a> [options] &lt;name&gt;  Create a new middleware in the SettleMint platform.
  help [command]                              display help for command
</pre>

<h3 id="middleware-graph"><a href="./create.md">create</a> > <a href="#create-middleware">middleware</a> > graph</h3>

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
  --provider &lt;provider&gt;               Network provider
  --region &lt;region&gt;                   Deployment region
  --size &lt;size&gt;                       Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;,
                                      &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                       Network type (choices: &quot;DEDICATED&quot;,
                                      &quot;SHARED&quot;, default: &quot;SHARED&quot;)
  --application &lt;application&gt;         Application unique name
  --blockchain-node &lt;blockchainNode&gt;  Blockchain Node unique name
  -h, --help                          display help for command
</pre>

<h3 id="middleware-smart-contract-portal"><a href="./create.md">create</a> > <a href="#create-middleware">middleware</a> > smart-contract-portal</h3>

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
  --provider &lt;provider&gt;                                   Network provider
  --region &lt;region&gt;                                       Deployment region
  --size &lt;size&gt;                                           Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;, &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                                           Network type (choices: &quot;DEDICATED&quot;, &quot;SHARED&quot;, default: &quot;SHARED&quot;)
  --application &lt;application&gt;                             Application unique name
  --load-balancer &lt;loadBalancer&gt;                          Load Balancer unique name (mutually exclusive with blockchain-node)
  --blockchain-node &lt;blockchainNode&gt;                      Blockchain Node unique name (mutually exclusive with load-balancer)
  --abis &lt;abis...&gt;                                        Path to abi file(s)
  --include-predeployed-abis &lt;includePredeployedAbis...&gt;  Include pre-deployed abis (choices: &quot;StarterKitERC20Registry&quot;, &quot;StarterKitERC20Factory&quot;, &quot;StarterKitERC20&quot;, &quot;StarterKitERC20DexFactory&quot;, &quot;StarterKitERC20Dex&quot;)
  -h, --help                                              display help for command
</pre>

<h3 id="create-storage"><a href="./create.md">create</a> > storage</h3>

<pre>Usage: settlemint platform create storage|st [options] [command]

Create a storage service in the SettleMint platform

Options:
  -h, --help                display help for command

Commands:
  <a href="#storage-ipfs">ipfs|ip</a> [options] &lt;name&gt;  Create a new storage in the SettleMint platform.
  <a href="#storage-minio">minio|m</a> [options] &lt;name&gt;  Create a new storage in the SettleMint platform.
  help [command]            display help for command
</pre>

<h3 id="storage-ipfs"><a href="./create.md">create</a> > <a href="#create-storage">storage</a> > ipfs</h3>

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
  --provider &lt;provider&gt;        Network provider
  --region &lt;region&gt;            Deployment region
  --size &lt;size&gt;                Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;,
                               &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                Network type (choices: &quot;DEDICATED&quot;, &quot;SHARED&quot;,
                               default: &quot;SHARED&quot;)
  --application &lt;application&gt;  Application unique name
  -h, --help                   display help for command
</pre>

<h3 id="storage-minio"><a href="./create.md">create</a> > <a href="#create-storage">storage</a> > minio</h3>

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
  --provider &lt;provider&gt;        Network provider
  --region &lt;region&gt;            Deployment region
  --size &lt;size&gt;                Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;,
                               &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                Network type (choices: &quot;DEDICATED&quot;, &quot;SHARED&quot;,
                               default: &quot;SHARED&quot;)
  --application &lt;application&gt;  Application unique name
  -h, --help                   display help for command
</pre>

<h3 id="create-integration-tool"><a href="./create.md">create</a> > integration-tool</h3>

<pre>Usage: settlemint platform create integration-tool|it [options] [command]

Create a new integration tool

Options:
  -h, --help                  display help for command

Commands:
  <a href="#integration-tool-hasura">hasura|ha</a> [options] &lt;name&gt;  Create a new integration tool in the SettleMint
                              platform.
  help [command]              display help for command
</pre>

<h3 id="integration-tool-hasura"><a href="./create.md">create</a> > <a href="#create-integration-tool">integration-tool</a> > hasura</h3>

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
  --provider &lt;provider&gt;        Network provider
  --region &lt;region&gt;            Deployment region
  --size &lt;size&gt;                Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;,
                               &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                Network type (choices: &quot;DEDICATED&quot;, &quot;SHARED&quot;,
                               default: &quot;SHARED&quot;)
  --application &lt;application&gt;  Application unique name
  -h, --help                   display help for command
</pre>

<h3 id="create-insights"><a href="./create.md">create</a> > insights</h3>

<pre>Usage: settlemint platform create insights|in [options] [command]

Create a new insights

Options:
  -h, --help                      display help for command

Commands:
  <a href="#insights-blockscout">blockscout|bs</a> [options] &lt;name&gt;  Create a new insights in the SettleMint
                                  platform.
  help [command]                  display help for command
</pre>

<h3 id="insights-blockscout"><a href="./create.md">create</a> > <a href="#create-insights">insights</a> > blockscout</h3>

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
  --provider &lt;provider&gt;               Network provider
  --region &lt;region&gt;                   Deployment region
  --size &lt;size&gt;                       Network size (choices: &quot;CUSTOM&quot;, &quot;LARGE&quot;,
                                      &quot;MEDIUM&quot;, &quot;SMALL&quot;, default: &quot;SMALL&quot;)
  --type &lt;type&gt;                       Network type (choices: &quot;DEDICATED&quot;,
                                      &quot;SHARED&quot;, default: &quot;SHARED&quot;)
  --application &lt;application&gt;         Application unique name
  --load-balancer &lt;loadBalancer&gt;      Load Balancer unique name (mutually
                                      exclusive with blockchain-node)
  --blockchain-node &lt;blockchainNode&gt;  Blockchain Node unique name (mutually
                                      exclusive with load-balancer)
  -h, --help                          display help for command
</pre>

<h3 id="create-application-access-token"><a href="./create.md">create</a> > application-access-token</h3>

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
  -a, --application &lt;application&gt;  The application unique name to create the
                                   application access token for (defaults to
                                   application from env)
  -v, --validity-period &lt;period&gt;   The validity period for the token (choices:
                                   &quot;DAYS_7&quot;, &quot;DAYS_30&quot;, &quot;DAYS_60&quot;, &quot;DAYS_90&quot;,
                                   &quot;NONE&quot;, default: &quot;DAYS_7&quot;)
  -h, --help                       display help for command
</pre>

