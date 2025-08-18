<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../platform.md">Platform</a> > Resume</h1>

<pre>Usage: settlemint platform resume [options] [command]

Resume a resource in the SettleMint platform

Options:
  -h, --help                                      display help for command

Commands:
  <a href="#resume-blockchain-node">blockchain-node|bn</a> [options] &lt;unique-name&gt;      Resume a blockchain node in the SettleMint platform. Provide the blockchain node unique name or use &#039;default&#039; to resume the default blockchain node from your .env file.
  <a href="#resume-blockchain-network">blockchain-network|bnw</a> [options] &lt;unique-name&gt;  Resume a blockchain network in the SettleMint platform. Provide the blockchain network unique name or use &#039;default&#039; to resume the default blockchain network from your .env file.
  <a href="#resume-custom-deployment">custom-deployment|cd</a> [options] &lt;unique-name&gt;    Resume a custom deployment in the SettleMint platform. Provide the custom deployment unique name or use &#039;default&#039; to resume the default custom deployment from your .env file.
  <a href="#resume-insights">insights|in</a>                                     Resume an insights service in the SettleMint platform
  <a href="#resume-integration-tool">integration-tool|it</a>                             Resume an integration tool service in the SettleMint platform
  <a href="#resume-load-balancer">load-balancer|lb</a> [options] &lt;unique-name&gt;        Resume a load balancer in the SettleMint platform. Provide the load balancer unique name or use &#039;default&#039; to resume the default load balancer from your .env file.
  <a href="#resume-middleware">middleware|mw</a>                                   Resume a middleware service in the SettleMint platform
  <a href="#resume-private-key">private-key|pk</a> [options] &lt;unique-name&gt;          Resume a private key in the SettleMint platform. Provide the private key unique name or use &#039;default&#039; to resume the default private key from your .env file.
  <a href="#resume-storage">storage|st</a>                                      Resume a storage service in the SettleMint platform
  help [command]                                  display help for command
</pre>

<h2 id="resume-blockchain-node"><a href="#home">Resume</a> > Blockchain node</h2>

<pre>Usage: settlemint platform resume blockchain-node|bn 
Examples:

  # Resumes the specified blockchain node by unique name
  $ settlemint platform resume blockchain-node &lt;unique-name&gt;

  # Resumes the default blockchain node in the production environment
  $ settlemint platform resume blockchain-node default --prod

Resume a blockchain node in the SettleMint platform. Provide the blockchain node
unique name or use &#039;default&#039; to resume the default blockchain node from your
.env file.

Arguments:
  unique-name            The unique name of the blockchain node, use &#039;default&#039;
                         to resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h2 id="resume-blockchain-network"><a href="#home">Resume</a> > Blockchain network</h2>

<pre>Usage: settlemint platform resume blockchain-network|bnw 
Examples:

  # Resumes the specified blockchain network by unique name
  $ settlemint platform resume blockchain-network &lt;unique-name&gt;

  # Resumes the default blockchain network in the production environment
  $ settlemint platform resume blockchain-network default --prod

Resume a blockchain network in the SettleMint platform. Provide the blockchain
network unique name or use &#039;default&#039; to resume the default blockchain network
from your .env file.

Arguments:
  unique-name            The unique name of the blockchain network, use
                         &#039;default&#039; to resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h2 id="resume-custom-deployment"><a href="#home">Resume</a> > Custom deployment</h2>

<pre>Usage: settlemint platform resume custom-deployment|cd 
Examples:

  # Resumes the specified custom deployment by unique name
  $ settlemint platform resume custom-deployment &lt;unique-name&gt;

  # Resumes the default custom deployment in the production environment
  $ settlemint platform resume custom-deployment default --prod

Resume a custom deployment in the SettleMint platform. Provide the custom
deployment unique name or use &#039;default&#039; to resume the default custom deployment
from your .env file.

Arguments:
  unique-name            The unique name of the custom deployment, use &#039;default&#039;
                         to resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h2 id="resume-insights"><a href="#home">Resume</a> > Insights</h2>

<pre>Usage: settlemint platform resume insights|in [options] [command]

Resume an insights service in the SettleMint platform

Options:
  -h, --help                             display help for command

Commands:
  <a href="#insights-blockscout">blockscout|bs</a> [options] &lt;unique-name&gt;  Resume a insights in the SettleMint platform. Provide the insights unique name or use &#039;default&#039; to resume the default insights from your .env file.
  help [command]                         display help for command
</pre>

<h3 id="insights-blockscout"><a href="#home">Resume</a> > <a href="#resume-insights">Insights</a> > Blockscout</h3>

<pre>Usage: settlemint platform resume insights blockscout|bs 
Examples:

  # Resumes the specified insights by unique name
  $ settlemint platform resume insights blockscout &lt;unique-name&gt;

  # Resumes the default insights in the production environment
  $ settlemint platform resume insights blockscout default --prod

Resume a insights in the SettleMint platform. Provide the insights unique name
or use &#039;default&#039; to resume the default insights from your .env file.

Arguments:
  unique-name            The unique name of the insights, use &#039;default&#039; to
                         resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h2 id="resume-integration-tool"><a href="#home">Resume</a> > Integration tool</h2>

<pre>Usage: settlemint platform resume integration-tool|it [options] [command]

Resume an integration tool service in the SettleMint platform

Options:
  -h, --help                         display help for command

Commands:
  <a href="#integration-tool-hasura">hasura|ha</a> [options] &lt;unique-name&gt;  Resume a integration tool in the SettleMint
                                     platform. Provide the integration tool
                                     unique name or use &#039;default&#039; to resume the
                                     default integration tool from your .env
                                     file.
  help [command]                     display help for command
</pre>

<h3 id="integration-tool-hasura"><a href="#home">Resume</a> > <a href="#resume-integration-tool">Integration tool</a> > Hasura</h3>

<pre>Usage: settlemint platform resume integration-tool hasura|ha 
Examples:

  # Resumes the specified integration tool by unique name
  $ settlemint platform resume integration-tool hasura &lt;unique-name&gt;

  # Resumes the default integration tool in the production environment
  $ settlemint platform resume integration-tool hasura default --prod

Resume a integration tool in the SettleMint platform. Provide the integration
tool unique name or use &#039;default&#039; to resume the default integration tool from
your .env file.

Arguments:
  unique-name            The unique name of the integration tool, use &#039;default&#039;
                         to resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h2 id="resume-load-balancer"><a href="#home">Resume</a> > Load balancer</h2>

<pre>Usage: settlemint platform resume load-balancer|lb 
Examples:

  # Resumes the specified load balancer by unique name
  $ settlemint platform resume load-balancer &lt;unique-name&gt;

  # Resumes the default load balancer in the production environment
  $ settlemint platform resume load-balancer default --prod

Resume a load balancer in the SettleMint platform. Provide the load balancer
unique name or use &#039;default&#039; to resume the default load balancer from your .env
file.

Arguments:
  unique-name            The unique name of the load balancer, use &#039;default&#039; to
                         resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h2 id="resume-middleware"><a href="#home">Resume</a> > Middleware</h2>

<pre>Usage: settlemint platform resume middleware|mw [options] [command]

Resume a middleware service in the SettleMint platform

Options:
  -h, --help                                         display help for command

Commands:
  <a href="#middleware-graph">graph|gr</a> [options] &lt;unique-name&gt;                   Resume a middleware in the SettleMint platform. Provide the middleware unique name or use &#039;default&#039; to resume the default middleware from your .env file.
  <a href="#middleware-smart-contract-portal">smart-contract-portal|scp</a> [options] &lt;unique-name&gt;  Resume a middleware in the SettleMint platform. Provide the middleware unique name or use &#039;default&#039; to resume the default middleware from your .env file.
  help [command]                                     display help for command
</pre>

<h3 id="middleware-graph"><a href="#home">Resume</a> > <a href="#resume-middleware">Middleware</a> > Graph</h3>

<pre>Usage: settlemint platform resume middleware graph|gr 
Examples:

  # Resumes the specified middleware by unique name
  $ settlemint platform resume middleware graph &lt;unique-name&gt;

  # Resumes the default middleware in the production environment
  $ settlemint platform resume middleware graph default --prod

Resume a middleware in the SettleMint platform. Provide the middleware unique
name or use &#039;default&#039; to resume the default middleware from your .env file.

Arguments:
  unique-name            The unique name of the middleware, use &#039;default&#039; to
                         resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h3 id="middleware-smart-contract-portal"><a href="#home">Resume</a> > <a href="#resume-middleware">Middleware</a> > Smart contract portal</h3>

<pre>Usage: settlemint platform resume middleware smart-contract-portal|scp 
Examples:

  # Resumes the specified middleware by unique name
  $ settlemint platform resume middleware smart-contract-portal &lt;unique-name&gt;

  # Resumes the default middleware in the production environment
  $ settlemint platform resume middleware smart-contract-portal default --prod

Resume a middleware in the SettleMint platform. Provide the middleware unique
name or use &#039;default&#039; to resume the default middleware from your .env file.

Arguments:
  unique-name            The unique name of the middleware, use &#039;default&#039; to
                         resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h2 id="resume-private-key"><a href="#home">Resume</a> > Private key</h2>

<pre>Usage: settlemint platform resume private-key|pk 
Examples:

  # Resumes the specified private key by unique name
  $ settlemint platform resume private-key &lt;unique-name&gt;

  # Resumes the default private key in the production environment
  $ settlemint platform resume private-key default --prod

Resume a private key in the SettleMint platform. Provide the private key unique
name or use &#039;default&#039; to resume the default private key from your .env file.

Arguments:
  unique-name            The unique name of the private key, use &#039;default&#039; to
                         resume the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h2 id="resume-storage"><a href="#home">Resume</a> > Storage</h2>

<pre>Usage: settlemint platform resume storage|st [options] [command]

Resume a storage service in the SettleMint platform

Options:
  -h, --help                       display help for command

Commands:
  <a href="#storage-ipfs">ipfs|ip</a> [options] &lt;unique-name&gt;  Resume a storage in the SettleMint platform.
                                   Provide the storage unique name or use
                                   &#039;default&#039; to resume the default storage from
                                   your .env file.
  <a href="#storage-minio">minio|m</a> [options] &lt;unique-name&gt;  Resume a storage in the SettleMint platform.
                                   Provide the storage unique name or use
                                   &#039;default&#039; to resume the default storage from
                                   your .env file.
  help [command]                   display help for command
</pre>

<h3 id="storage-ipfs"><a href="#home">Resume</a> > <a href="#resume-storage">Storage</a> > Ipfs</h3>

<pre>Usage: settlemint platform resume storage ipfs|ip 
Examples:

  # Resumes the specified storage by unique name
  $ settlemint platform resume storage ipfs &lt;unique-name&gt;

  # Resumes the default storage in the production environment
  $ settlemint platform resume storage ipfs default --prod

Resume a storage in the SettleMint platform. Provide the storage unique name or
use &#039;default&#039; to resume the default storage from your .env file.

Arguments:
  unique-name            The unique name of the storage, use &#039;default&#039; to resume
                         the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

<h3 id="storage-minio"><a href="#home">Resume</a> > <a href="#resume-storage">Storage</a> > Minio</h3>

<pre>Usage: settlemint platform resume storage minio|m 
Examples:

  # Resumes the specified storage by unique name
  $ settlemint platform resume storage minio &lt;unique-name&gt;

  # Resumes the default storage in the production environment
  $ settlemint platform resume storage minio default --prod

Resume a storage in the SettleMint platform. Provide the storage unique name or
use &#039;default&#039; to resume the default storage from your .env file.

Arguments:
  unique-name            The unique name of the storage, use &#039;default&#039; to resume
                         the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -w, --wait             Wait until resumed
  -h, --help             display help for command
</pre>

