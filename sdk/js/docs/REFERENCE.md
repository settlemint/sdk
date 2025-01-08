**@settlemint/sdk-js**

***

# @settlemint/sdk-js

## Interfaces

### BlockchainNetwork

Defined in: [sdk/js/src/graphql/blockchain-network.ts:31](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/blockchain-network.ts#L31)

Type representing a blockchain network entity.

#### Extends

- `Pick`\<`BlockchainNetworkGraphql`, `"id"` \| `"uniqueName"` \| `"name"` \| `"status"`\>

#### Properties

##### \_\_typename

> **\_\_typename**: `"ArbitrumBlockchainNetwork"` \| `"ArbitrumGoerliBlockchainNetwork"` \| `"ArbitrumSepoliaBlockchainNetwork"` \| `"AvalancheBlockchainNetwork"` \| `"AvalancheFujiBlockchainNetwork"` \| `"BesuIbftv2BlockchainNetwork"` \| `"BesuQBFTBlockchainNetwork"` \| `"BscPoWBlockchainNetwork"` \| `"BscPoWTestnetBlockchainNetwork"` \| `"CordaBlockchainNetwork"` \| `"FabricRaftBlockchainNetwork"` \| `"FantomMainnetBlockchainNetwork"` \| `"FantomTestnetBlockchainNetwork"` \| `"GethCliqueBlockchainNetwork"` \| `"GethGoerliBlockchainNetwork"` \| `"GethPoSRinkebyBlockchainNetwork"` \| `"GethPoWBlockchainNetwork"` \| `"GethVenidiumBlockchainNetwork"` \| `"HederaMainnetBlockchainNetwork"` \| `"HederaTestnetBlockchainNetwork"` \| `"HoleskyBlockchainNetwork"` \| `"OptimismBlockchainNetwork"` \| `"OptimismGoerliBlockchainNetwork"` \| `"OptimismSepoliaBlockchainNetwork"` \| `"PolygonAmoyBlockchainNetwork"` \| `"PolygonBlockchainNetwork"` \| `"PolygonEdgePoABlockchainNetwork"` \| `"PolygonMumbaiBlockchainNetwork"` \| `"PolygonSupernetBlockchainNetwork"` \| `"PolygonZkEvmBlockchainNetwork"` \| `"PolygonZkEvmTestnetBlockchainNetwork"` \| `"QuorumQBFTBlockchainNetwork"` \| `"SepoliaBlockchainNetwork"` \| `"SoneiumMinatoBlockchainNetwork"` \| `"TezosBlockchainNetwork"` \| `"TezosTestnetBlockchainNetwork"`

Defined in: [sdk/js/src/graphql/blockchain-network.ts:32](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/blockchain-network.ts#L32)

##### blockchainNodes

> **blockchainNodes**: `object`[]

Defined in: [sdk/js/src/graphql/blockchain-network.ts:33](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/blockchain-network.ts#L33)

###### id

> **id**: `string`

###### name

> **name**: `string`

###### uniqueName

> **uniqueName**: `string`

##### id

> **id**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:32](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L32)

###### Inherited from

`Pick.id`

##### name

> **name**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:32](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L32)

###### Inherited from

`Pick.name`

##### status

> **status**: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:32](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L32)

###### Inherited from

`Pick.status`

##### uniqueName

> **uniqueName**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:32](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L32)

###### Inherited from

`Pick.uniqueName`

***

### BlockchainNode

Defined in: [sdk/js/src/graphql/blockchain-node.ts:50](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/blockchain-node.ts#L50)

Type representing a blockchain node entity.

#### Extends

- `Pick`\<`BlockchainNodeGraphql`, `"id"` \| `"uniqueName"` \| `"name"` \| `"status"` \| `"isEvm"` \| `"endpoints"` \| `"credentials"`\>

#### Properties

##### \_\_typename

> **\_\_typename**: `"ArbitrumBlockchainNode"` \| `"ArbitrumGoerliBlockchainNode"` \| `"ArbitrumSepoliaBlockchainNode"` \| `"AvalancheBlockchainNode"` \| `"AvalancheFujiBlockchainNode"` \| `"BesuIbftv2BlockchainNode"` \| `"BesuQBFTBlockchainNode"` \| `"BscBlockchainNode"` \| `"BscTestnetBlockchainNode"` \| `"CordaBlockchainNode"` \| `"FabricBlockchainNode"` \| `"FantomMainnetBlockchainNode"` \| `"FantomTestnetBlockchainNode"` \| `"GethBlockchainNode"` \| `"GethCliqueBlockchainNode"` \| `"GethGoerliBlockchainNode"` \| `"GethRinkebyBlockchainNode"` \| `"GethVenidiumBlockchainNode"` \| `"HederaMainnetBlockchainNode"` \| `"HederaTestnetBlockchainNode"` \| `"HoleskyBlockchainNode"` \| `"OptimismBlockchainNode"` \| `"OptimismGoerliBlockchainNode"` \| `"OptimismSepoliaBlockchainNode"` \| `"PolygonAmoyBlockchainNode"` \| `"PolygonBlockchainNode"` \| `"PolygonEdgeBlockchainNode"` \| `"PolygonMumbaiBlockchainNode"` \| `"PolygonSupernetBlockchainNode"` \| `"PolygonZkEvmBlockchainNode"` \| `"PolygonZkEvmTestnetBlockchainNode"` \| `"QuorumQBFTBlockchainNode"` \| `"SepoliaBlockchainNode"` \| `"SoneiumMinatoBlockchainNode"` \| `"TezosBlockchainNode"` \| `"TezosTestnetBlockchainNode"`

Defined in: [sdk/js/src/graphql/blockchain-node.ts:52](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/blockchain-node.ts#L52)

##### blockchainNetwork

> **blockchainNetwork**: `object`

Defined in: [sdk/js/src/graphql/blockchain-node.ts:53](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/blockchain-node.ts#L53)

###### id

> **id**: `string`

###### name

> **name**: `string`

###### uniqueName

> **uniqueName**: `string`

##### credentials

> **credentials**: `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:44](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L44)

###### Inherited from

`Pick.credentials`

##### endpoints

> **endpoints**: `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:44](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L44)

###### Inherited from

`Pick.endpoints`

##### id

> **id**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:44](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L44)

###### Inherited from

`Pick.id`

##### isEvm

> **isEvm**: `boolean`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:44](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L44)

###### Inherited from

`Pick.isEvm`

##### name

> **name**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:44](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L44)

###### Inherited from

`Pick.name`

##### privateKeys

> **privateKeys**: `null` \| `object`[]

Defined in: [sdk/js/src/graphql/blockchain-node.ts:58](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/blockchain-node.ts#L58)

##### status

> **status**: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:44](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L44)

###### Inherited from

`Pick.status`

##### uniqueName

> **uniqueName**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:44](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L44)

###### Inherited from

`Pick.uniqueName`

***

### Insights

Defined in: [sdk/js/src/graphql/insights.ts:36](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/insights.ts#L36)

Type representing an insights entity.

#### Extends

- `Pick`\<`InsightsGraphql`, `"id"` \| `"uniqueName"` \| `"name"` \| `"status"` \| `"insightsCategory"` \| `"endpoints"` \| `"credentials"`\>

#### Properties

##### \_\_typename

> **\_\_typename**: `"BlockchainExplorer"` \| `"HyperledgerExplorer"` \| `"OtterscanBlockchainExplorer"`

Defined in: [sdk/js/src/graphql/insights.ts:41](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/insights.ts#L41)

##### credentials

> **credentials**: `object`[] \| `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:72](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L72)

###### Inherited from

`Pick.credentials`

##### endpoints

> **endpoints**: `object`[] \| `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:72](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L72)

###### Inherited from

`Pick.endpoints`

##### id

> **id**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:72](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L72)

###### Inherited from

`Pick.id`

##### insightsCategory

> **insightsCategory**: `"BLOCKCHAIN_EXPLORER"` \| `"HYPERLEDGER_EXPLORER"` \| `"OTTERSCAN_BLOCKCHAIN_EXPLORER"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:72](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L72)

###### Inherited from

`Pick.insightsCategory`

##### name

> **name**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:72](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L72)

###### Inherited from

`Pick.name`

##### status

> **status**: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:72](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L72)

###### Inherited from

`Pick.status`

##### uniqueName

> **uniqueName**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:72](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L72)

###### Inherited from

`Pick.uniqueName`

***

### IntegrationTool

Defined in: [sdk/js/src/graphql/integration-tool.ts:34](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/integration-tool.ts#L34)

Type representing an integration tool entity.

#### Extends

- `Pick`\<`IntegrationToolGraphql`, `"id"` \| `"uniqueName"` \| `"name"` \| `"status"` \| `"integrationType"` \| `"endpoints"` \| `"credentials"`\>

#### Properties

##### \_\_typename

> **\_\_typename**: `"Chainlink"` \| `"Hasura"` \| `"IntegrationStudio"`

Defined in: [sdk/js/src/graphql/integration-tool.ts:39](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/integration-tool.ts#L39)

##### credentials

> **credentials**: `object`[] \| `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:82](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L82)

###### Inherited from

`Pick.credentials`

##### endpoints

> **endpoints**: `object`[] \| `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:82](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L82)

###### Inherited from

`Pick.endpoints`

##### id

> **id**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:82](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L82)

###### Inherited from

`Pick.id`

##### integrationType

> **integrationType**: `"CHAINLINK"` \| `"HASURA"` \| `"INTEGRATION_STUDIO"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:82](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L82)

###### Inherited from

`Pick.integrationType`

##### name

> **name**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:82](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L82)

###### Inherited from

`Pick.name`

##### status

> **status**: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:82](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L82)

###### Inherited from

`Pick.status`

##### uniqueName

> **uniqueName**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:82](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L82)

###### Inherited from

`Pick.uniqueName`

***

### Middleware

Defined in: [sdk/js/src/graphql/middleware.ts:49](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/middleware.ts#L49)

Type representing a middleware entity.

#### Extends

- `Pick`\<`MiddlewareGraphql`, `"id"` \| `"uniqueName"` \| `"name"` \| `"status"` \| `"interface"` \| `"entityVersion"` \| `"serviceUrl"` \| `"endpoints"` \| `"credentials"`\>

#### Properties

##### \_\_typename

> **\_\_typename**: `"AttestationIndexerMiddleware"` \| `"BesuMiddleware"` \| `"FireflyFabconnectMiddleware"` \| `"GraphMiddleware"` \| `"HAGraphMiddleware"` \| `"SmartContractPortalMiddleware"`

Defined in: [sdk/js/src/graphql/middleware.ts:54](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/middleware.ts#L54)

##### credentials

> **credentials**: `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.credentials`

##### endpoints

> **endpoints**: `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.endpoints`

##### entityVersion

> **entityVersion**: `null` \| `number`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.entityVersion`

##### id

> **id**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.id`

##### interface

> **interface**: `"ATTESTATION_INDEXER"` \| `"BESU"` \| `"FIREFLY_FABCONNECT"` \| `"GRAPH"` \| `"HA_GRAPH"` \| `"SMART_CONTRACT_PORTAL"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.interface`

##### name

> **name**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.name`

##### serviceUrl

> **serviceUrl**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.serviceUrl`

##### specVersion?

> `optional` **specVersion**: `number`

Defined in: [sdk/js/src/graphql/middleware.ts:55](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/middleware.ts#L55)

##### status

> **status**: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.status`

##### subgraphs?

> `optional` **subgraphs**: `object`[]

Defined in: [sdk/js/src/graphql/middleware.ts:56](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/middleware.ts#L56)

###### graphqlQueryEndpoint

> **graphqlQueryEndpoint**: `object`

###### graphqlQueryEndpoint.displayValue

> **displayValue**: `string`

###### graphqlQueryEndpoint.id

> **id**: `string`

###### name

> **name**: `string`

##### uniqueName

> **uniqueName**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L102)

###### Inherited from

`Pick.uniqueName`

***

### PrivateKey

Defined in: [sdk/js/src/graphql/private-key.ts:25](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/private-key.ts#L25)

Type representing a private key entity.

#### Extends

- `Pick`\<`PrivateKeyGraphql`, `"id"` \| `"uniqueName"` \| `"name"` \| `"privateKeyType"` \| `"status"`\>

#### Properties

##### \_\_typename

> **\_\_typename**: `"AccessibleEcdsaP256PrivateKey"` \| `"HdEcdsaP256PrivateKey"` \| `"HsmEcDsaP256PrivateKey"`

Defined in: [sdk/js/src/graphql/private-key.ts:27](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/private-key.ts#L27)

##### id

> **id**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:112](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L112)

###### Inherited from

`Pick.id`

##### name

> **name**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:112](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L112)

###### Inherited from

`Pick.name`

##### privateKeyType

> **privateKeyType**: `"ACCESSIBLE_ECDSA_P256"` \| `"HD_ECDSA_P256"` \| `"HSM_ECDSA_P256"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:112](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L112)

###### Inherited from

`Pick.privateKeyType`

##### status

> **status**: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:112](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L112)

###### Inherited from

`Pick.status`

##### uniqueName

> **uniqueName**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:112](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L112)

###### Inherited from

`Pick.uniqueName`

***

### SettlemintClient

Defined in: [sdk/js/src/settlemint.ts:94](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L94)

#### Properties

##### application

> **application**: `object`

Defined in: [sdk/js/src/settlemint.ts:102](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L102)

###### create()

> **create**: (`args`) => `Promise`\<\{ `id`: `string`; `name`: `string`; `uniqueName`: `string`; `workspace`: \{ `id`: `string`; `uniqueName`: `string`; \}; \}\>

###### Parameters

###### args

`CreateApplicationArgs`

###### Returns

`Promise`\<\{ `id`: `string`; `name`: `string`; `uniqueName`: `string`; `workspace`: \{ `id`: `string`; `uniqueName`: `string`; \}; \}\>

###### delete()

> **delete**: (`applicationId`) => `Promise`\<\{ `id`: `string`; `name`: `string`; `uniqueName`: `string`; `workspace`: \{ `id`: `string`; `uniqueName`: `string`; \}; \}\>

###### Parameters

###### applicationId

`string`

###### Returns

`Promise`\<\{ `id`: `string`; `name`: `string`; `uniqueName`: `string`; `workspace`: \{ `id`: `string`; `uniqueName`: `string`; \}; \}\>

###### list()

> **list**: (`workspaceUniqueName`) => `Promise`\<`object`[]\>

###### Parameters

###### workspaceUniqueName

`string`

###### Returns

`Promise`\<`object`[]\>

###### read()

> **read**: (`applicationUniqueName`) => `Promise`\<\{ `id`: `string`; `name`: `string`; `uniqueName`: `string`; `workspace`: \{ `id`: `string`; `uniqueName`: `string`; \}; \}\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<\{ `id`: `string`; `name`: `string`; `uniqueName`: `string`; `workspace`: \{ `id`: `string`; `uniqueName`: `string`; \}; \}\>

##### applicationAccessToken

> **applicationAccessToken**: `object`

Defined in: [sdk/js/src/settlemint.ts:161](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L161)

###### create()

> **create**: (`args`) => `Promise`\<`string`\>

###### Parameters

###### args

`CreateApplicationAccessTokenArgs`

###### Returns

`Promise`\<`string`\>

##### blockchainNetwork

> **blockchainNetwork**: `object`

Defined in: [sdk/js/src/settlemint.ts:108](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L108)

###### create()

> **create**: (`args`) => `Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)\>

###### Parameters

###### args

`CreateBlockchainNetworkArgs`

###### Returns

`Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)\>

###### delete()

> **delete**: (`networkUniqueName`) => `Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)\>

###### Parameters

###### networkUniqueName

`string`

###### Returns

`Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)\>

###### list()

> **list**: (`applicationUniqueName`) => `Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)[]\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)[]\>

###### read()

> **read**: (`blockchainNetworkUniqueName`) => `Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)\>

###### Parameters

###### blockchainNetworkUniqueName

`string`

###### Returns

`Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)\>

###### restart()

> **restart**: (`networkUniqueName`) => `Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)\>

###### Parameters

###### networkUniqueName

`string`

###### Returns

`Promise`\<[`BlockchainNetwork`](REFERENCE.md#blockchainnetwork)\>

##### blockchainNode

> **blockchainNode**: `object`

Defined in: [sdk/js/src/settlemint.ts:115](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L115)

###### create()

> **create**: (`args`) => `Promise`\<[`BlockchainNode`](REFERENCE.md#blockchainnode)\>

###### Parameters

###### args

`CreateBlockchainNodeArgs`

###### Returns

`Promise`\<[`BlockchainNode`](REFERENCE.md#blockchainnode)\>

###### list()

> **list**: (`applicationUniqueName`) => `Promise`\<[`BlockchainNode`](REFERENCE.md#blockchainnode)[]\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<[`BlockchainNode`](REFERENCE.md#blockchainnode)[]\>

###### read()

> **read**: (`blockchainNodeUniqueName`) => `Promise`\<[`BlockchainNode`](REFERENCE.md#blockchainnode)\>

###### Parameters

###### blockchainNodeUniqueName

`string`

###### Returns

`Promise`\<[`BlockchainNode`](REFERENCE.md#blockchainnode)\>

###### restart()

> **restart**: (`nodeUniqueName`) => `Promise`\<[`BlockchainNode`](REFERENCE.md#blockchainnode)\>

###### Parameters

###### nodeUniqueName

`string`

###### Returns

`Promise`\<[`BlockchainNode`](REFERENCE.md#blockchainnode)\>

##### customDeployment

> **customDeployment**: `object`

Defined in: [sdk/js/src/settlemint.ts:151](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L151)

###### create()

> **create**: (`args`) => `Promise`\<\{ `credentials`: `object`[]; `endpoints`: `object`[]; `id`: `string`; `name`: `string`; `status`: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`; `uniqueName`: `string`; \}\>

###### Parameters

###### args

`CreateCustomDeploymentArgs`

###### Returns

`Promise`\<\{ `credentials`: `object`[]; `endpoints`: `object`[]; `id`: `string`; `name`: `string`; `status`: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`; `uniqueName`: `string`; \}\>

###### list()

> **list**: (`applicationUniqueName`) => `Promise`\<`object`[]\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<`object`[]\>

###### read()

> **read**: (`customDeploymentUniqueName`) => `Promise`\<\{ `credentials`: `object`[]; `endpoints`: `object`[]; `id`: `string`; `name`: `string`; `status`: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`; `uniqueName`: `string`; \}\>

###### Parameters

###### customDeploymentUniqueName

`string`

###### Returns

`Promise`\<\{ `credentials`: `object`[]; `endpoints`: `object`[]; `id`: `string`; `name`: `string`; `status`: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`; `uniqueName`: `string`; \}\>

###### restart()

> **restart**: (`customDeploymentUniqueName`) => `Promise`\<\{ `credentials`: `object`[]; `endpoints`: `object`[]; `id`: `string`; `name`: `string`; `status`: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`; `uniqueName`: `string`; \}\>

###### Parameters

###### customDeploymentUniqueName

`string`

###### Returns

`Promise`\<\{ `credentials`: `object`[]; `endpoints`: `object`[]; `id`: `string`; `name`: `string`; `status`: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`; `uniqueName`: `string`; \}\>

###### update()

> **update**: (`customDeploymentUniqueName`, `imageTag`) => `Promise`\<\{ `credentials`: `object`[]; `endpoints`: `object`[]; `id`: `string`; `name`: `string`; `status`: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`; `uniqueName`: `string`; \}\>

###### Parameters

###### customDeploymentUniqueName

`string`

###### imageTag

`string`

###### Returns

`Promise`\<\{ `credentials`: `object`[]; `endpoints`: `object`[]; `id`: `string`; `name`: `string`; `status`: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`; `uniqueName`: `string`; \}\>

##### foundry

> **foundry**: `object`

Defined in: [sdk/js/src/settlemint.ts:158](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L158)

###### env()

> **env**: (`blockchainNodeUniqueName`) => `Promise`\<`Record`\<`string`, `string`\>\>

###### Parameters

###### blockchainNodeUniqueName

`string`

###### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

##### insights

> **insights**: `object`

Defined in: [sdk/js/src/settlemint.ts:145](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L145)

###### create()

> **create**: (`args`) => `Promise`\<[`Insights`](REFERENCE.md#insights)\>

###### Parameters

###### args

`CreateInsightsArgs`

###### Returns

`Promise`\<[`Insights`](REFERENCE.md#insights)\>

###### list()

> **list**: (`applicationUniqueName`) => `Promise`\<[`Insights`](REFERENCE.md#insights)[]\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<[`Insights`](REFERENCE.md#insights)[]\>

###### read()

> **read**: (`insightsUniqueName`) => `Promise`\<[`Insights`](REFERENCE.md#insights)\>

###### Parameters

###### insightsUniqueName

`string`

###### Returns

`Promise`\<[`Insights`](REFERENCE.md#insights)\>

###### restart()

> **restart**: (`insightsUniqueName`) => `Promise`\<[`Insights`](REFERENCE.md#insights)\>

###### Parameters

###### insightsUniqueName

`string`

###### Returns

`Promise`\<[`Insights`](REFERENCE.md#insights)\>

##### integrationTool

> **integrationTool**: `object`

Defined in: [sdk/js/src/settlemint.ts:127](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L127)

###### create()

> **create**: (`args`) => `Promise`\<[`IntegrationTool`](REFERENCE.md#integrationtool)\>

###### Parameters

###### args

`CreateIntegrationToolArgs`

###### Returns

`Promise`\<[`IntegrationTool`](REFERENCE.md#integrationtool)\>

###### list()

> **list**: (`applicationUniqueName`) => `Promise`\<[`IntegrationTool`](REFERENCE.md#integrationtool)[]\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<[`IntegrationTool`](REFERENCE.md#integrationtool)[]\>

###### read()

> **read**: (`integrationToolUniqueName`) => `Promise`\<[`IntegrationTool`](REFERENCE.md#integrationtool)\>

###### Parameters

###### integrationToolUniqueName

`string`

###### Returns

`Promise`\<[`IntegrationTool`](REFERENCE.md#integrationtool)\>

###### restart()

> **restart**: (`integrationToolUniqueName`) => `Promise`\<[`IntegrationTool`](REFERENCE.md#integrationtool)\>

###### Parameters

###### integrationToolUniqueName

`string`

###### Returns

`Promise`\<[`IntegrationTool`](REFERENCE.md#integrationtool)\>

##### middleware

> **middleware**: `object`

Defined in: [sdk/js/src/settlemint.ts:121](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L121)

###### create()

> **create**: (`args`) => `Promise`\<[`Middleware`](REFERENCE.md#middleware)\>

###### Parameters

###### args

`CreateMiddlewareArgs`

###### Returns

`Promise`\<[`Middleware`](REFERENCE.md#middleware)\>

###### list()

> **list**: (`applicationUniqueName`) => `Promise`\<[`Middleware`](REFERENCE.md#middleware)[]\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<[`Middleware`](REFERENCE.md#middleware)[]\>

###### read()

> **read**: (`middlewareUniqueName`) => `Promise`\<[`Middleware`](REFERENCE.md#middleware)\>

###### Parameters

###### middlewareUniqueName

`string`

###### Returns

`Promise`\<[`Middleware`](REFERENCE.md#middleware)\>

###### restart()

> **restart**: (`middlewareUniqueName`) => `Promise`\<[`Middleware`](REFERENCE.md#middleware)\>

###### Parameters

###### middlewareUniqueName

`string`

###### Returns

`Promise`\<[`Middleware`](REFERENCE.md#middleware)\>

##### privateKey

> **privateKey**: `object`

Defined in: [sdk/js/src/settlemint.ts:139](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L139)

###### create()

> **create**: (`args`) => `Promise`\<[`PrivateKey`](REFERENCE.md#privatekey)\>

###### Parameters

###### args

`CreatePrivateKeyArgs`

###### Returns

`Promise`\<[`PrivateKey`](REFERENCE.md#privatekey)\>

###### list()

> **list**: (`applicationUniqueName`) => `Promise`\<[`PrivateKey`](REFERENCE.md#privatekey)[]\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<[`PrivateKey`](REFERENCE.md#privatekey)[]\>

###### read()

> **read**: (`privateKeyUniqueName`) => `Promise`\<[`PrivateKey`](REFERENCE.md#privatekey)\>

###### Parameters

###### privateKeyUniqueName

`string`

###### Returns

`Promise`\<[`PrivateKey`](REFERENCE.md#privatekey)\>

###### restart()

> **restart**: (`privateKeyUniqueName`) => `Promise`\<[`PrivateKey`](REFERENCE.md#privatekey)\>

###### Parameters

###### privateKeyUniqueName

`string`

###### Returns

`Promise`\<[`PrivateKey`](REFERENCE.md#privatekey)\>

##### storage

> **storage**: `object`

Defined in: [sdk/js/src/settlemint.ts:133](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L133)

###### create()

> **create**: (`args`) => `Promise`\<[`Storage`](REFERENCE.md#storage-1)\>

###### Parameters

###### args

`CreateStorageArgs`

###### Returns

`Promise`\<[`Storage`](REFERENCE.md#storage-1)\>

###### list()

> **list**: (`applicationUniqueName`) => `Promise`\<[`Storage`](REFERENCE.md#storage-1)[]\>

###### Parameters

###### applicationUniqueName

`string`

###### Returns

`Promise`\<[`Storage`](REFERENCE.md#storage-1)[]\>

###### read()

> **read**: (`storageUniqueName`) => `Promise`\<[`Storage`](REFERENCE.md#storage-1)\>

###### Parameters

###### storageUniqueName

`string`

###### Returns

`Promise`\<[`Storage`](REFERENCE.md#storage-1)\>

###### restart()

> **restart**: (`storageUniqueName`) => `Promise`\<[`Storage`](REFERENCE.md#storage-1)\>

###### Parameters

###### storageUniqueName

`string`

###### Returns

`Promise`\<[`Storage`](REFERENCE.md#storage-1)\>

##### workspace

> **workspace**: `object`

Defined in: [sdk/js/src/settlemint.ts:95](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L95)

###### addCredits()

> **addCredits**: (`workspaceId`, `amount`) => `Promise`\<`boolean`\>

###### Parameters

###### workspaceId

`string`

###### amount

`number`

###### Returns

`Promise`\<`boolean`\>

###### create()

> **create**: (`args`) => `Promise`\<\{ `applications`: `object`[]; `id`: `string`; `name`: `string`; `uniqueName`: `string`; \}\>

###### Parameters

###### args

###### addressLine1

`null` \| `string`

###### addressLine2

`null` \| `string`

###### city

`null` \| `string`

###### companyName

`null` \| `string`

###### country

`null` \| `string`

###### name

`string`

###### parentId

`null` \| `string`

###### paymentMethodId

`null` \| `string`

###### postalCode

`null` \| `string`

###### taxIdType

`null` \| `string`

###### taxIdValue

`null` \| `string`

###### Returns

`Promise`\<\{ `applications`: `object`[]; `id`: `string`; `name`: `string`; `uniqueName`: `string`; \}\>

###### delete()

> **delete**: (`workspaceUniqueName`) => `Promise`\<\{ `applications`: `object`[]; `id`: `string`; `name`: `string`; `uniqueName`: `string`; \}\>

###### Parameters

###### workspaceUniqueName

`string`

###### Returns

`Promise`\<\{ `applications`: `object`[]; `id`: `string`; `name`: `string`; `uniqueName`: `string`; \}\>

###### list()

> **list**: () => `Promise`\<`object`[]\>

###### Returns

`Promise`\<`object`[]\>

###### read()

> **read**: (`workspaceUniqueName`) => `Promise`\<\{ `applications`: `object`[]; `id`: `string`; `name`: `string`; `uniqueName`: `string`; \}\>

###### Parameters

###### workspaceUniqueName

`string`

###### Returns

`Promise`\<\{ `applications`: `object`[]; `id`: `string`; `name`: `string`; `uniqueName`: `string`; \}\>

***

### Storage

Defined in: [sdk/js/src/graphql/storage.ts:34](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/storage.ts#L34)

Type representing a storage entity.

#### Extends

- `Pick`\<`StorageGraphql`, `"id"` \| `"uniqueName"` \| `"name"` \| `"status"` \| `"storageProtocol"` \| `"endpoints"` \| `"credentials"`\>

#### Properties

##### \_\_typename

> **\_\_typename**: `"IPFSStorage"` \| `"MinioStorage"`

Defined in: [sdk/js/src/graphql/storage.ts:39](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/storage.ts#L39)

##### credentials

> **credentials**: `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:92](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L92)

###### Inherited from

`Pick.credentials`

##### endpoints

> **endpoints**: `object`[] \| `object`[]

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:92](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L92)

###### Inherited from

`Pick.endpoints`

##### id

> **id**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:92](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L92)

###### Inherited from

`Pick.id`

##### name

> **name**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:92](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L92)

###### Inherited from

`Pick.name`

##### status

> **status**: `"AUTO_PAUSED"` \| `"AUTO_PAUSING"` \| `"COMPLETED"` \| `"CONNECTING"` \| `"DEPLOYING"` \| `"DESTROYING"` \| `"FAILED"` \| `"PAUSED"` \| `"PAUSING"` \| `"RESTARTING"` \| `"RESUMING"` \| `"RETRYING"` \| `"SCALING"` \| `"WAITING"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:92](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L92)

###### Inherited from

`Pick.status`

##### storageProtocol

> **storageProtocol**: `"IPFS"` \| `"MINIO"`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:92](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L92)

###### Inherited from

`Pick.storageProtocol`

##### uniqueName

> **uniqueName**: `string`

Defined in: [sdk/js/src/helpers/graphql-cache.d.ts:92](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/helpers/graphql-cache.d.ts#L92)

###### Inherited from

`Pick.uniqueName`

## Type Aliases

### Application

> **Application**: `ResultOf`\<*typeof* `ApplicationFragment`\>

Defined in: [sdk/js/src/graphql/application.ts:23](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/application.ts#L23)

Type representing an application entity.

***

### CustomDeployment

> **CustomDeployment**: `ResultOf`\<*typeof* `CustomDeploymentFragment`\>

Defined in: [sdk/js/src/graphql/custom-deployment.ts:30](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/custom-deployment.ts#L30)

Type representing a custom deployment entity.

***

### Workspace

> **Workspace**: `ResultOf`\<*typeof* `WorkspaceFragment`\>

Defined in: [sdk/js/src/graphql/workspace.ts:26](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/graphql/workspace.ts#L26)

Type representing a workspace entity.

## Functions

### createSettleMintClient()

> **createSettleMintClient**(`options`): [`SettlemintClient`](REFERENCE.md#settlemintclient)

Defined in: [sdk/js/src/settlemint.ts:188](https://github.com/settlemint/sdk/blob/7f0dc753505b5c817e6025ca7057b0cbeb765c96/sdk/js/src/settlemint.ts#L188)

Creates a SettleMint client with the provided options. The client provides methods to interact with
various SettleMint resources like workspaces, applications, blockchain networks, blockchain nodes, middleware,
integration tools, storage, private keys, insights and custom deployments.

#### Parameters

##### options

Configuration options for the client including access token and instance URL

###### accessToken

`string` = `AccessTokenSchema`

###### instance

`string` = `UrlSchema`

#### Returns

[`SettlemintClient`](REFERENCE.md#settlemintclient)

A SettleMint client object with resource-specific methods

#### Throws

If options are invalid or if called in browser environment

#### Throws

If provided options fail schema validation

#### Example

```ts
const client = createSettleMintClient({
  accessToken: 'btp_aat_xxxxxxxxxxxxxxxxxxxxxxxx',
  instance: 'https://console.settlemint.com'
});

// List all workspaces
const workspaces = await client.workspace.list();

// Read a specific blockchain network
const network = await client.blockchainNetwork.read('network-unique-name');
```
