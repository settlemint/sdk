<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../platform.md">Platform</a> > Restart</h1>

<pre>Usage: settlemint platform restart [options] [command]

Restart a resource in the SettleMint platform

Options:
  -h, --help                                      display help for command

Commands:
  <a href="#restart-blockchain-network">blockchain-network|bnw</a> [options] &lt;unique-name&gt;  Restart a blockchain network in the SettleMint platform. Provide the blockchain network unique name or use &#039;default&#039; to restart the default blockchain network from your .env file.
  <a href="#restart-blockchain-node">blockchain-node|bn</a> [options] &lt;unique-name&gt;      Restart a blockchain node in the SettleMint platform. Provide the blockchain node unique name or use &#039;default&#039; to restart the default blockchain node from your .env file.
  <a href="#restart-custom-deployment">custom-deployment|cd</a> [options] &lt;unique-name&gt;    Restart a custom deployment in the SettleMint platform. Provide the custom deployment unique name or use &#039;default&#039; to restart the default custom deployment from your .env file.
  <a href="#restart-insights">insights|in</a>                                     Restart an insights service in the SettleMint platform
  <a href="#restart-integration-tool">integration-tool|it</a>                             Restart an integration tool service in the SettleMint platform
  <a href="#restart-load-balancer">load-balancer|lb</a> [options] &lt;unique-name&gt;        Restart a load balancer in the SettleMint platform. Provide the load balancer unique name or use &#039;default&#039; to restart the default load balancer from your .env file.
  <a href="#restart-middleware">middleware|mw</a>                                   Restart a middleware service in the SettleMint platform
  <a href="#restart-storage">storage|st</a>                                      Restart a storage service in the SettleMint platform
  help [command]                                  display help for command
</pre>

<h2 id="restart-blockchain-network"><a href="#home">Restart</a> > Blockchain network</h2>

<pre>Usage: settlemint platform restart blockchain-network|bnw 
Examples:

  # Restarts the specified blockchain network by id
  $ settlemint platform restart blockchain-network &lt;blockchain network-id&gt;

  # Restarts the default blockchain network in the production environment
  $ settlemint platform restart blockchain-network default --prod

Restart a blockchain network in the SettleMint platform. Provide the blockchain
network unique name or use &#039;default&#039; to restart the default blockchain network
from your .env file.

Arguments:
  unique-name            The unique name of the blockchain network, use
                         &#039;default&#039; to restart the default one from your .env
                         file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h2 id="restart-blockchain-node"><a href="#home">Restart</a> > Blockchain node</h2>

<pre>Usage: settlemint platform restart blockchain-node|bn 
Examples:

  # Restarts the specified blockchain node by id
  $ settlemint platform restart blockchain-node &lt;blockchain node-id&gt;

  # Restarts the default blockchain node in the production environment
  $ settlemint platform restart blockchain-node default --prod

Restart a blockchain node in the SettleMint platform. Provide the blockchain
node unique name or use &#039;default&#039; to restart the default blockchain node from
your .env file.

Arguments:
  unique-name            The unique name of the blockchain node, use &#039;default&#039;
                         to restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h2 id="restart-custom-deployment"><a href="#home">Restart</a> > Custom deployment</h2>

<pre>Usage: settlemint platform restart custom-deployment|cd 
Examples:

  # Restarts the specified custom deployment by id
  $ settlemint platform restart custom-deployment &lt;custom deployment-id&gt;

  # Restarts the default custom deployment in the production environment
  $ settlemint platform restart custom-deployment default --prod

Restart a custom deployment in the SettleMint platform. Provide the custom
deployment unique name or use &#039;default&#039; to restart the default custom deployment
from your .env file.

Arguments:
  unique-name            The unique name of the custom deployment, use &#039;default&#039;
                         to restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h2 id="restart-insights"><a href="#home">Restart</a> > Insights</h2>

<pre>Usage: settlemint platform restart insights|in [options] [command]

Restart an insights service in the SettleMint platform

Options:
  -h, --help                             display help for command

Commands:
  <a href="#insights-blockscout">blockscout|bs</a> [options] &lt;unique-name&gt;  Restart a insights in the SettleMint platform. Provide the insights unique name or use &#039;default&#039; to restart the default insights from your .env file.
  help [command]                         display help for command
</pre>

<h3 id="insights-blockscout"><a href="#home">Restart</a> > <a href="#restart-insights">Insights</a> > Blockscout</h3>

<pre>Usage: settlemint platform restart insights blockscout|bs 
Examples:

  # Restarts the specified insights by id
  $ settlemint platform restart blockscout blockscout &lt;insights-id&gt;

  # Restarts the default insights in the production environment
  $ settlemint platform restart blockscout blockscout default --prod

Restart a insights in the SettleMint platform. Provide the insights unique name
or use &#039;default&#039; to restart the default insights from your .env file.

Arguments:
  unique-name            The unique name of the insights, use &#039;default&#039; to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h2 id="restart-integration-tool"><a href="#home">Restart</a> > Integration tool</h2>

<pre>Usage: settlemint platform restart integration-tool|it [options] [command]

Restart an integration tool service in the SettleMint platform

Options:
  -h, --help                         display help for command

Commands:
  <a href="#integration-tool-hasura">hasura|ha</a> [options] &lt;unique-name&gt;  Restart a integration tool in the
                                     SettleMint platform. Provide the
                                     integration tool unique name or use
                                     &#039;default&#039; to restart the default
                                     integration tool from your .env file.
  help [command]                     display help for command
</pre>

<h3 id="integration-tool-hasura"><a href="#home">Restart</a> > <a href="#restart-integration-tool">Integration tool</a> > Hasura</h3>

<pre>Usage: settlemint platform restart integration-tool hasura|ha 
Examples:

  # Restarts the specified integration tool by id
  $ settlemint platform restart hasura hasura &lt;integration tool-id&gt;

  # Restarts the default integration tool in the production environment
  $ settlemint platform restart hasura hasura default --prod

Restart a integration tool in the SettleMint platform. Provide the integration
tool unique name or use &#039;default&#039; to restart the default integration tool from
your .env file.

Arguments:
  unique-name            The unique name of the integration tool, use &#039;default&#039;
                         to restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h2 id="restart-load-balancer"><a href="#home">Restart</a> > Load balancer</h2>

<pre>Usage: settlemint platform restart load-balancer|lb 
Examples:

  # Restarts the specified load balancer by id
  $ settlemint platform restart load-balancer &lt;load balancer-id&gt;

  # Restarts the default load balancer in the production environment
  $ settlemint platform restart load-balancer default --prod

Restart a load balancer in the SettleMint platform. Provide the load balancer
unique name or use &#039;default&#039; to restart the default load balancer from your .env
file.

Arguments:
  unique-name            The unique name of the load balancer, use &#039;default&#039; to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h2 id="restart-middleware"><a href="#home">Restart</a> > Middleware</h2>

<pre>Usage: settlemint platform restart middleware|mw [options] [command]

Restart a middleware service in the SettleMint platform

Options:
  -h, --help                                         display help for command

Commands:
  <a href="#middleware-graph">graph|gr</a> [options] &lt;unique-name&gt;                   Restart a middleware in the SettleMint platform. Provide the middleware unique name or use &#039;default&#039; to restart the default middleware from your .env file.
  <a href="#middleware-smart-contract-portal">smart-contract-portal|scp</a> [options] &lt;unique-name&gt;  Restart a middleware in the SettleMint platform. Provide the middleware unique name or use &#039;default&#039; to restart the default middleware from your .env file.
  help [command]                                     display help for command
</pre>

<h3 id="middleware-graph"><a href="#home">Restart</a> > <a href="#restart-middleware">Middleware</a> > Graph</h3>

<pre>Usage: settlemint platform restart middleware graph|gr 
Examples:

  # Restarts the specified middleware by id
  $ settlemint platform restart graph graph &lt;middleware-id&gt;

  # Restarts the default middleware in the production environment
  $ settlemint platform restart graph graph default --prod

Restart a middleware in the SettleMint platform. Provide the middleware unique
name or use &#039;default&#039; to restart the default middleware from your .env file.

Arguments:
  unique-name            The unique name of the middleware, use &#039;default&#039; to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h3 id="middleware-smart-contract-portal"><a href="#home">Restart</a> > <a href="#restart-middleware">Middleware</a> > Smart contract portal</h3>

<pre>Usage: settlemint platform restart middleware smart-contract-portal|scp 
Examples:

  # Restarts the specified middleware by id
  $ settlemint platform restart smart-contract-portal smart-contract-portal &lt;middleware-id&gt;

  # Restarts the default middleware in the production environment
  $ settlemint platform restart smart-contract-portal smart-contract-portal default --prod

Restart a middleware in the SettleMint platform. Provide the middleware unique
name or use &#039;default&#039; to restart the default middleware from your .env file.

Arguments:
  unique-name            The unique name of the middleware, use &#039;default&#039; to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h2 id="restart-storage"><a href="#home">Restart</a> > Storage</h2>

<pre>Usage: settlemint platform restart storage|st [options] [command]

Restart a storage service in the SettleMint platform

Options:
  -h, --help                       display help for command

Commands:
  <a href="#storage-ipfs">ipfs|ip</a> [options] &lt;unique-name&gt;  Restart a storage in the SettleMint platform.
                                   Provide the storage unique name or use
                                   &#039;default&#039; to restart the default storage from
                                   your .env file.
  <a href="#storage-minio">minio|m</a> [options] &lt;unique-name&gt;  Restart a storage in the SettleMint platform.
                                   Provide the storage unique name or use
                                   &#039;default&#039; to restart the default storage from
                                   your .env file.
  help [command]                   display help for command
</pre>

<h3 id="storage-ipfs"><a href="#home">Restart</a> > <a href="#restart-storage">Storage</a> > Ipfs</h3>

<pre>Usage: settlemint platform restart storage ipfs|ip 
Examples:

  # Restarts the specified storage by id
  $ settlemint platform restart ipfs &lt;storage-id&gt;

  # Restarts the default storage in the production environment
  $ settlemint platform restart ipfs default --prod

Restart a storage in the SettleMint platform. Provide the storage unique name or
use &#039;default&#039; to restart the default storage from your .env file.

Arguments:
  unique-name            The unique name of the storage, use &#039;default&#039; to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

<h3 id="storage-minio"><a href="#home">Restart</a> > <a href="#restart-storage">Storage</a> > Minio</h3>

<pre>Usage: settlemint platform restart storage minio|m 
Examples:

  # Restarts the specified storage by id
  $ settlemint platform restart minio &lt;storage-id&gt;

  # Restarts the default storage in the production environment
  $ settlemint platform restart minio default --prod

Restart a storage in the SettleMint platform. Provide the storage unique name or
use &#039;default&#039; to restart the default storage from your .env file.

Arguments:
  unique-name            The unique name of the storage, use &#039;default&#039; to
                         restart the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until restarted
  -h, --help             display help for command
</pre>

