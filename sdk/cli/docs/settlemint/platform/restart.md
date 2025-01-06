## [settlemint](../../settlemint.md) > [platform](../platform.md) > restart

<pre>Usage: settlemint platform restart [options] [command]

Restart a resource in the SettleMint platform

Options:
  -h, --help                                    display help for command

Commands:
  <a href="./restart/blockchain-network.md">blockchain-network|bn</a> [options] <uniqueName>  Restart a blockchain network in the SettleMint platform. Provide the blockchain network ID or use 'default' to restart the default blockchain network from your .env file.
  <a href="./restart/custom-deployment.md">custom-deployment|cd</a> [options] <uniqueName>   Restart a custom deployment in the SettleMint platform. Provide the custom deployment ID or use 'default' to restart the default custom deployment from your .env file.
  <a href="./restart/insights.md">insights|in</a>                                   Restart an insights service in the SettleMint platform
  <a href="./restart/integration-tool.md">integration-tool|it</a>                           Restart an integration tool service in the SettleMint platform
  <a href="./restart/middleware.md">middleware|mw</a>                                 Restart a middleware service in the SettleMint platform
  <a href="./restart/private-key.md">private-key|pk</a>                                Restart a private key in the SettleMint platform
  <a href="./restart/storage.md">storage|st</a>                                    Restart a storage service in the SettleMint platform
  help [command]                                display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > blockchain-network

<pre>Usage: settlemint platform restart blockchain-network|bn 
Examples:

  # Restarts the specified blockchain network by id
  $ settlemint platform restart blockchain-network <blockchain network-id>

  # Restarts the default blockchain network in the production environment
  $ settlemint platform restart blockchain-network default --prod

Restart a blockchain network in the SettleMint platform. Provide the blockchain
network ID or use 'default' to restart the default blockchain network from your
.env file.

Arguments:
  uniqueName             The unique name of the blockchain network, use
                         'default' to restart the default one from your .env
                         file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > custom-deployment

<pre>Usage: settlemint platform restart custom-deployment|cd 
Examples:

  # Restarts the specified custom deployment by id
  $ settlemint platform restart custom-deployment <custom deployment-id>

  # Restarts the default custom deployment in the production environment
  $ settlemint platform restart custom-deployment default --prod

Restart a custom deployment in the SettleMint platform. Provide the custom
deployment ID or use 'default' to restart the default custom deployment from
your .env file.

Arguments:
  uniqueName             The unique name of the custom deployment, use
                         'default' to restart the default one from your .env
                         file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > insights

<pre>Usage: settlemint platform restart insights|in [options] [command]

Restart an insights service in the SettleMint platform

Options:
  -h, --help                            display help for command

Commands:
  <a href="./insights/blockscout.md">blockscout|bs</a> [options] <uniqueName>  Restart a insights in the SettleMint
                                        platform. Provide the insights ID or
                                        use 'default' to restart the default
                                        insights from your .env file.
  help [command]                        display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [insights](../insights.md) > blockscout

<pre>Usage: settlemint platform restart insights blockscout|bs 
Examples:

  # Restarts the specified insights by id
  $ settlemint platform restart blockscout blockscout <insights-id>

  # Restarts the default insights in the production environment
  $ settlemint platform restart blockscout blockscout default --prod

Restart a insights in the SettleMint platform. Provide the insights ID or use
'default' to restart the default insights from your .env file.

Arguments:
  uniqueName             The unique name of the insights, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > integration-tool

<pre>Usage: settlemint platform restart integration-tool|it [options] [command]

Restart an integration tool service in the SettleMint platform

Options:
  -h, --help                        display help for command

Commands:
  <a href="./integration-tool/hasura.md">hasura|ha</a> [options] <uniqueName>  Restart a integration tool in the
                                    SettleMint platform. Provide the
                                    integration tool ID or use 'default' to
                                    restart the default integration tool from
                                    your .env file.
  help [command]                    display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [integration-tool](../integration-tool.md) > hasura

<pre>Usage: settlemint platform restart integration-tool hasura|ha 
Examples:

  # Restarts the specified integration tool by id
  $ settlemint platform restart hasura hasura <integration tool-id>

  # Restarts the default integration tool in the production environment
  $ settlemint platform restart hasura hasura default --prod

Restart a integration tool in the SettleMint platform. Provide the integration
tool ID or use 'default' to restart the default integration tool from your .env
file.

Arguments:
  uniqueName             The unique name of the integration tool, use 'default'
                         to restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > middleware

<pre>Usage: settlemint platform restart middleware|mw [options] [command]

Restart a middleware service in the SettleMint platform

Options:
  -h, --help                                        display help for command

Commands:
  <a href="./middleware/graph.md">graph|gr</a> [options] <uniqueName>                   Restart a middleware in the SettleMint platform. Provide the middleware ID or use 'default' to restart the default middleware from your .env file.
  <a href="./middleware/smart-contract-portal.md">smart-contract-portal|scp</a> [options] <uniqueName>  Restart a middleware in the SettleMint platform. Provide the middleware ID or use 'default' to restart the default middleware from your .env file.
  help [command]                                    display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [middleware](../middleware.md) > graph

<pre>Usage: settlemint platform restart middleware graph|gr 
Examples:

  # Restarts the specified middleware by id
  $ settlemint platform restart graph graph <middleware-id>

  # Restarts the default middleware in the production environment
  $ settlemint platform restart graph graph default --prod

Restart a middleware in the SettleMint platform. Provide the middleware ID or
use 'default' to restart the default middleware from your .env file.

Arguments:
  uniqueName             The unique name of the middleware, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [middleware](../middleware.md) > smart-contract-portal

<pre>Usage: settlemint platform restart middleware smart-contract-portal|scp 
Examples:

  # Restarts the specified middleware by id
  $ settlemint platform restart smart-contract-portal smart-contract-portal <middleware-id>

  # Restarts the default middleware in the production environment
  $ settlemint platform restart smart-contract-portal smart-contract-portal default --prod

Restart a middleware in the SettleMint platform. Provide the middleware ID or
use 'default' to restart the default middleware from your .env file.

Arguments:
  uniqueName             The unique name of the middleware, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > private-key

<pre>Usage: settlemint platform restart private-key|pk [options] [command]

Restart a private key in the SettleMint platform

Options:
  -h, --help                               display help for command

Commands:
  <a href="./private-key/hd-ecdsa-p256.md">hd-ecdsa-p256|hd</a> [options] <uniqueName>  Restart a private key in the SettleMint platform. Provide the private key ID or use 'default' to restart the default private key from your .env file.
  help [command]                           display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [private-key](../private-key.md) > hd-ecdsa-p256

<pre>Usage: settlemint platform restart private-key hd-ecdsa-p256|hd 
Examples:

  # Restarts the specified private key by id
  $ settlemint platform restart hd-ecdsa-p256 hd-ecdsa-p256 <private key-id>

  # Restarts the default private key in the production environment
  $ settlemint platform restart hd-ecdsa-p256 hd-ecdsa-p256 default --prod

Restart a private key in the SettleMint platform. Provide the private key ID or
use 'default' to restart the default private key from your .env file.

Arguments:
  uniqueName             The unique name of the private key, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

## [settlemint](../../../settlemint.md) > [platform](../../platform.md) > [restart](../restart.md) > storage

<pre>Usage: settlemint platform restart storage|st [options] [command]

Restart a storage service in the SettleMint platform

Options:
  -h, --help                      display help for command

Commands:
  <a href="./storage/ipfs.md">ipfs|ip</a> [options] <uniqueName>  Restart a storage in the SettleMint platform.
                                  Provide the storage ID or use 'default' to
                                  restart the default storage from your .env
                                  file.
  <a href="./storage/minio.md">minio|m</a> [options] <uniqueName>  Restart a storage in the SettleMint platform.
                                  Provide the storage ID or use 'default' to
                                  restart the default storage from your .env
                                  file.
  help [command]                  display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [storage](../storage.md) > ipfs

<pre>Usage: settlemint platform restart storage ipfs|ip 
Examples:

  # Restarts the specified storage by id
  $ settlemint platform restart ipfs <storage-id>

  # Restarts the default storage in the production environment
  $ settlemint platform restart ipfs default --prod

Restart a storage in the SettleMint platform. Provide the storage ID or use
'default' to restart the default storage from your .env file.

Arguments:
  uniqueName             The unique name of the storage, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [restart](../../restart.md) > [storage](../storage.md) > minio

<pre>Usage: settlemint platform restart storage minio|m 
Examples:

  # Restarts the specified storage by id
  $ settlemint platform restart minio <storage-id>

  # Restarts the default storage in the production environment
  $ settlemint platform restart minio default --prod

Restart a storage in the SettleMint platform. Provide the storage ID or use
'default' to restart the default storage from your .env file.

Arguments:
  uniqueName             The unique name of the storage, use 'default' to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

