<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../platform.md">Platform</a> > Resume</h1>

<pre>Usage: settlemint platform resume [options] [command]

Resume a resource in the SettleMint platform

Options:
  -h, --help                                         display help for command

Commands:
  <a href="#resume-blockchain-node">blockchain-node|bn</a> [options] &lt;unique-name&gt;         Resume a blockchain node in the SettleMint platform. Provide the blockchain node unique name or use &#039;default&#039; to resume the default blockchain node from your .env file.
  <a href="#resume-blockchain-network">blockchain-network|bnw</a> [options] &lt;unique-name&gt;     Resume a blockchain network in the SettleMint platform. Provide the blockchain network unique name or use &#039;default&#039; to resume the default blockchain network from your .env file.
  <a href="#resume-custom-deployment">custom-deployment|cd</a> [options] &lt;unique-name&gt;       Resume a custom deployment in the SettleMint platform. Provide the custom deployment unique name or use &#039;default&#039; to resume the default custom deployment from your .env file.
  <a href="#resume-blockscout">blockscout|bs</a> [options] &lt;unique-name&gt;              Resume a insights in the SettleMint platform. Provide the insights unique name or use &#039;default&#039; to resume the default insights from your .env file.
  <a href="#resume-hasura">hasura|ha</a> [options] &lt;unique-name&gt;                  Resume a integration tool in the SettleMint platform. Provide the integration tool unique name or use &#039;default&#039; to resume the default integration tool from your .env file.
  <a href="#resume-evm">evm|lb</a> [options] &lt;unique-name&gt;                     Resume a load balancer in the SettleMint platform. Provide the load balancer unique name or use &#039;default&#039; to resume the default load balancer from your .env file.
  <a href="#resume-graph">graph|gr</a> [options] &lt;unique-name&gt;                   Resume a middleware in the SettleMint platform. Provide the middleware unique name or use &#039;default&#039; to resume the default middleware from your .env file.
  <a href="#resume-smart-contract-portal">smart-contract-portal|scp</a> [options] &lt;unique-name&gt;  Resume a middleware in the SettleMint platform. Provide the middleware unique name or use &#039;default&#039; to resume the default middleware from your .env file.
  <a href="#resume-accessible-ecdsa-p256">accessible-ecdsa-p256|acc</a> [options] &lt;unique-name&gt;  Resume a private key in the SettleMint platform. Provide the private key unique name or use &#039;default&#039; to resume the default private key from your .env file.
  <a href="#resume-hd-ecdsa-p256">hd-ecdsa-p256|hd</a> [options] &lt;unique-name&gt;           Resume a private key in the SettleMint platform. Provide the private key unique name or use &#039;default&#039; to resume the default private key from your .env file.
  <a href="#resume-ipfs">ipfs|ip</a> [options] &lt;unique-name&gt;                    Resume a storage in the SettleMint platform. Provide the storage unique name or use &#039;default&#039; to resume the default storage from your .env file.
  <a href="#resume-minio">minio|m</a> [options] &lt;unique-name&gt;                    Resume a storage in the SettleMint platform. Provide the storage unique name or use &#039;default&#039; to resume the default storage from your .env file.
  help [command]                                     display help for command
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

<h2 id="resume-blockscout"><a href="#home">Resume</a> > Blockscout</h2>

<pre>Usage: settlemint platform resume blockscout|bs 
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

<h2 id="resume-hasura"><a href="#home">Resume</a> > Hasura</h2>

<pre>Usage: settlemint platform resume hasura|ha 
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

<h2 id="resume-evm"><a href="#home">Resume</a> > Evm</h2>

<pre>Usage: settlemint platform resume evm|lb 
Examples:

  # Resumes the specified load balancer by unique name
  $ settlemint platform resume load-balancer evm &lt;unique-name&gt;

  # Resumes the default load balancer in the production environment
  $ settlemint platform resume load-balancer evm default --prod

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

<h2 id="resume-graph"><a href="#home">Resume</a> > Graph</h2>

<pre>Usage: settlemint platform resume graph|gr 
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

<h2 id="resume-smart-contract-portal"><a href="#home">Resume</a> > Smart contract portal</h2>

<pre>Usage: settlemint platform resume smart-contract-portal|scp 
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

<h2 id="resume-accessible-ecdsa-p256"><a href="#home">Resume</a> > Accessible ecdsa p256</h2>

<pre>Usage: settlemint platform resume accessible-ecdsa-p256|acc 
Examples:

  # Resumes the specified private key by unique name
  $ settlemint platform resume private-key accessible-ecdsa-p256 &lt;unique-name&gt;

  # Resumes the default private key in the production environment
  $ settlemint platform resume private-key accessible-ecdsa-p256 default --prod

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

<h2 id="resume-hd-ecdsa-p256"><a href="#home">Resume</a> > Hd ecdsa p256</h2>

<pre>Usage: settlemint platform resume hd-ecdsa-p256|hd 
Examples:

  # Resumes the specified private key by unique name
  $ settlemint platform resume private-key hd-ecdsa-p256 &lt;unique-name&gt;

  # Resumes the default private key in the production environment
  $ settlemint platform resume private-key hd-ecdsa-p256 default --prod

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

<h2 id="resume-ipfs"><a href="#home">Resume</a> > Ipfs</h2>

<pre>Usage: settlemint platform resume ipfs|ip 
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

<h2 id="resume-minio"><a href="#home">Resume</a> > Minio</h2>

<pre>Usage: settlemint platform resume minio|m 
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

