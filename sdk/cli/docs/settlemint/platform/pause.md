<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../platform.md">Platform</a> > Pause</h1>

<pre>Usage: settlemint platform pause [options] [command]

Pause a resource in the SettleMint platform

Options:
  -h, --help                                      display help for command

Commands:
  <a href="#pause-blockchain-node">blockchain-node|bn</a> [options] &lt;unique-name&gt;      Pause a blockchain node in the SettleMint platform. Provide the blockchain node unique name or use &#039;default&#039; to pause the default blockchain node from your .env file.
  <a href="#pause-blockchain-network">blockchain-network|bnw</a> [options] &lt;unique-name&gt;  Pause a blockchain network in the SettleMint platform. Provide the blockchain network unique name or use &#039;default&#039; to pause the default blockchain network from your .env file.
  <a href="#pause-custom-deployment">custom-deployment|cd</a> [options] &lt;unique-name&gt;    Pause a custom deployment in the SettleMint platform. Provide the custom deployment unique name or use &#039;default&#039; to pause the default custom deployment from your .env file.
  <a href="#pause-insights">insights|in</a>                                     Pause an insights service in the SettleMint platform
  <a href="#pause-integration-tool">integration-tool|it</a>                             Pause an integration tool service in the SettleMint platform
  <a href="#pause-evm">evm|lb</a> [options] &lt;unique-name&gt;                  Pause a load balancer in the SettleMint platform. Provide the load balancer unique name or use &#039;default&#039; to pause the default load balancer from your .env file.
  <a href="#pause-middleware">middleware|mw</a>                                   Pause a middleware service in the SettleMint platform
  <a href="#pause-private-key">private-key|pk</a> [options] &lt;unique-name&gt;          Pause a private key in the SettleMint platform. Provide the private key unique name or use &#039;default&#039; to pause the default private key from your .env file.
  <a href="#pause-storage">storage|st</a>                                      Pause a storage service in the SettleMint platform
  help [command]                                  display help for command
</pre>

<h2 id="pause-blockchain-node"><a href="#home">Pause</a> > Blockchain node</h2>

<pre>Usage: settlemint platform pause blockchain-node|bn 
Examples:

  # Pauses the specified blockchain node by unique name
  $ settlemint platform pause blockchain-node &lt;unique-name&gt;

  # Pauses the default blockchain node in the production environment
  $ settlemint platform pause blockchain-node default --prod

Pause a blockchain node in the SettleMint platform. Provide the blockchain node
unique name or use &#039;default&#039; to pause the default blockchain node from your .env
file.

Arguments:
  unique-name            The unique name of the blockchain node, use &#039;default&#039;
                         to pause the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h2 id="pause-blockchain-network"><a href="#home">Pause</a> > Blockchain network</h2>

<pre>Usage: settlemint platform pause blockchain-network|bnw 
Examples:

  # Pauses the specified blockchain network by unique name
  $ settlemint platform pause blockchain-network &lt;unique-name&gt;

  # Pauses the default blockchain network in the production environment
  $ settlemint platform pause blockchain-network default --prod

Pause a blockchain network in the SettleMint platform. Provide the blockchain
network unique name or use &#039;default&#039; to pause the default blockchain network
from your .env file.

Arguments:
  unique-name            The unique name of the blockchain network, use
                         &#039;default&#039; to pause the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h2 id="pause-custom-deployment"><a href="#home">Pause</a> > Custom deployment</h2>

<pre>Usage: settlemint platform pause custom-deployment|cd 
Examples:

  # Pauses the specified custom deployment by unique name
  $ settlemint platform pause custom-deployment &lt;unique-name&gt;

  # Pauses the default custom deployment in the production environment
  $ settlemint platform pause custom-deployment default --prod

Pause a custom deployment in the SettleMint platform. Provide the custom
deployment unique name or use &#039;default&#039; to pause the default custom deployment
from your .env file.

Arguments:
  unique-name            The unique name of the custom deployment, use &#039;default&#039;
                         to pause the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h2 id="pause-insights"><a href="#home">Pause</a> > Insights</h2>

<pre>Usage: settlemint platform pause insights|in [options] [command]

Pause an insights service in the SettleMint platform

Options:
  -h, --help                             display help for command

Commands:
  <a href="#insights-blockscout">blockscout|bs</a> [options] &lt;unique-name&gt;  Pause a insights in the SettleMint platform. Provide the insights unique name or use &#039;default&#039; to pause the default insights from your .env file.
  help [command]                         display help for command
</pre>

<h3 id="insights-blockscout"><a href="#home">Pause</a> > <a href="#pause-insights">Insights</a> > Blockscout</h3>

<pre>Usage: settlemint platform pause insights blockscout|bs 
Examples:

  # Pauses the specified insights by unique name
  $ settlemint platform pause insights blockscout &lt;unique-name&gt;

  # Pauses the default insights in the production environment
  $ settlemint platform pause insights blockscout default --prod

Pause a insights in the SettleMint platform. Provide the insights unique name or
use &#039;default&#039; to pause the default insights from your .env file.

Arguments:
  unique-name            The unique name of the insights, use &#039;default&#039; to pause
                         the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h2 id="pause-integration-tool"><a href="#home">Pause</a> > Integration tool</h2>

<pre>Usage: settlemint platform pause integration-tool|it [options] [command]

Pause an integration tool service in the SettleMint platform

Options:
  -h, --help                         display help for command

Commands:
  <a href="#integration-tool-hasura">hasura|ha</a> [options] &lt;unique-name&gt;  Pause a integration tool in the SettleMint
                                     platform. Provide the integration tool
                                     unique name or use &#039;default&#039; to pause the
                                     default integration tool from your .env
                                     file.
  help [command]                     display help for command
</pre>

<h3 id="integration-tool-hasura"><a href="#home">Pause</a> > <a href="#pause-integration-tool">Integration tool</a> > Hasura</h3>

<pre>Usage: settlemint platform pause integration-tool hasura|ha 
Examples:

  # Pauses the specified integration tool by unique name
  $ settlemint platform pause integration-tool hasura &lt;unique-name&gt;

  # Pauses the default integration tool in the production environment
  $ settlemint platform pause integration-tool hasura default --prod

Pause a integration tool in the SettleMint platform. Provide the integration
tool unique name or use &#039;default&#039; to pause the default integration tool from
your .env file.

Arguments:
  unique-name            The unique name of the integration tool, use &#039;default&#039;
                         to pause the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h2 id="pause-evm"><a href="#home">Pause</a> > Evm</h2>

<pre>Usage: settlemint platform pause evm|lb 
Examples:

  # Pauses the specified load balancer by unique name
  $ settlemint platform pause load-balancer evm &lt;unique-name&gt;

  # Pauses the default load balancer in the production environment
  $ settlemint platform pause load-balancer evm default --prod

Pause a load balancer in the SettleMint platform. Provide the load balancer
unique name or use &#039;default&#039; to pause the default load balancer from your .env
file.

Arguments:
  unique-name            The unique name of the load balancer, use &#039;default&#039; to
                         pause the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h2 id="pause-middleware"><a href="#home">Pause</a> > Middleware</h2>

<pre>Usage: settlemint platform pause middleware|mw [options] [command]

Pause a middleware service in the SettleMint platform

Options:
  -h, --help                                         display help for command

Commands:
  <a href="#middleware-graph">graph|gr</a> [options] &lt;unique-name&gt;                   Pause a middleware in the SettleMint platform. Provide the middleware unique name or use &#039;default&#039; to pause the default middleware from your .env file.
  <a href="#middleware-smart-contract-portal">smart-contract-portal|scp</a> [options] &lt;unique-name&gt;  Pause a middleware in the SettleMint platform. Provide the middleware unique name or use &#039;default&#039; to pause the default middleware from your .env file.
  help [command]                                     display help for command
</pre>

<h3 id="middleware-graph"><a href="#home">Pause</a> > <a href="#pause-middleware">Middleware</a> > Graph</h3>

<pre>Usage: settlemint platform pause middleware graph|gr 
Examples:

  # Pauses the specified middleware by unique name
  $ settlemint platform pause middleware graph &lt;unique-name&gt;

  # Pauses the default middleware in the production environment
  $ settlemint platform pause middleware graph default --prod

Pause a middleware in the SettleMint platform. Provide the middleware unique
name or use &#039;default&#039; to pause the default middleware from your .env file.

Arguments:
  unique-name            The unique name of the middleware, use &#039;default&#039; to
                         pause the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h3 id="middleware-smart-contract-portal"><a href="#home">Pause</a> > <a href="#pause-middleware">Middleware</a> > Smart contract portal</h3>

<pre>Usage: settlemint platform pause middleware smart-contract-portal|scp 
Examples:

  # Pauses the specified middleware by unique name
  $ settlemint platform pause middleware smart-contract-portal &lt;unique-name&gt;

  # Pauses the default middleware in the production environment
  $ settlemint platform pause middleware smart-contract-portal default --prod

Pause a middleware in the SettleMint platform. Provide the middleware unique
name or use &#039;default&#039; to pause the default middleware from your .env file.

Arguments:
  unique-name            The unique name of the middleware, use &#039;default&#039; to
                         pause the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h2 id="pause-private-key"><a href="#home">Pause</a> > Private key</h2>

<pre>Usage: settlemint platform pause private-key|pk 
Examples:

  # Pauses the specified private key by unique name
  $ settlemint platform pause private-key &lt;unique-name&gt;

  # Pauses the default private key in the production environment
  $ settlemint platform pause private-key default --prod

Pause a private key in the SettleMint platform. Provide the private key unique
name or use &#039;default&#039; to pause the default private key from your .env file.

Arguments:
  unique-name            The unique name of the private key, use &#039;default&#039; to
                         pause the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h2 id="pause-storage"><a href="#home">Pause</a> > Storage</h2>

<pre>Usage: settlemint platform pause storage|st [options] [command]

Pause a storage service in the SettleMint platform

Options:
  -h, --help                       display help for command

Commands:
  <a href="#storage-ipfs">ipfs|ip</a> [options] &lt;unique-name&gt;  Pause a storage in the SettleMint platform.
                                   Provide the storage unique name or use
                                   &#039;default&#039; to pause the default storage from
                                   your .env file.
  <a href="#storage-minio">minio|m</a> [options] &lt;unique-name&gt;  Pause a storage in the SettleMint platform.
                                   Provide the storage unique name or use
                                   &#039;default&#039; to pause the default storage from
                                   your .env file.
  help [command]                   display help for command
</pre>

<h3 id="storage-ipfs"><a href="#home">Pause</a> > <a href="#pause-storage">Storage</a> > Ipfs</h3>

<pre>Usage: settlemint platform pause storage ipfs|ip 
Examples:

  # Pauses the specified storage by unique name
  $ settlemint platform pause storage ipfs &lt;unique-name&gt;

  # Pauses the default storage in the production environment
  $ settlemint platform pause storage ipfs default --prod

Pause a storage in the SettleMint platform. Provide the storage unique name or
use &#039;default&#039; to pause the default storage from your .env file.

Arguments:
  unique-name            The unique name of the storage, use &#039;default&#039; to pause
                         the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

<h3 id="storage-minio"><a href="#home">Pause</a> > <a href="#pause-storage">Storage</a> > Minio</h3>

<pre>Usage: settlemint platform pause storage minio|m 
Examples:

  # Pauses the specified storage by unique name
  $ settlemint platform pause storage minio &lt;unique-name&gt;

  # Pauses the default storage in the production environment
  $ settlemint platform pause storage minio default --prod

Pause a storage in the SettleMint platform. Provide the storage unique name or
use &#039;default&#039; to pause the default storage from your .env file.

Arguments:
  unique-name            The unique name of the storage, use &#039;default&#039; to pause
                         the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until paused
  -h, --help             display help for command
</pre>

