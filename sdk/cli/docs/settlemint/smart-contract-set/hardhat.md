<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../smart-contract-set.md">Smart contract set</a> > Hardhat</h1>

<pre>Usage: settlemint smart-contract-set hardhat|h [options] [command]

Hardhat commands for building, testing and deploying smart contracts

Options:
  -h, --help         display help for command

Commands:
  <a href="#hardhat-build">build</a> [options]    Build the smart contracts using Hardhat
  <a href="#hardhat-deploy">deploy</a>             Deploy the smart contracts using Hardhat
  <a href="#hardhat-network">network</a> [options]  Start a development network using Hardhat
  <a href="#hardhat-script">script</a>             Run a script using Hardhat
  <a href="#hardhat-test">test</a> [options]     Test the smart contracts using Hardhat
  help [command]     display help for command
</pre>

<h2 id="hardhat-build"><a href="#home">Hardhat</a> > Build</h2>

<pre>Usage: settlemint smart-contract-set hardhat build 
Examples:

  # Build the smart contracts using Hardhat
  $ settlemint scs hardhat build

  # Get list of possible Hardhat compile options
  $ settlemint scs hardhat build --help

  # Build the smart contracts using additional options to the Hardhat compile command
  $ settlemint scs hardhat build --concurrency 2

Build the smart contracts using Hardhat

Options:
  -h, --help  Get list of possible hardhat compile options
</pre>

<h2 id="hardhat-deploy"><a href="#home">Hardhat</a> > Deploy</h2>

<pre>Usage: settlemint smart-contract-set hardhat deploy [options] [command]

Deploy the smart contracts using Hardhat

Options:
  -h, --help        display help for command

Commands:
  <a href="#deploy-local">local</a> [options]   Deploy the smart contracts using Hardhat/ignition to the
                    local development network
  <a href="#deploy-remote">remote</a> [options]  Deploy the smart contracts using Hardhat/ignition to the
                    remote network on the platform
  help [command]    display help for command
</pre>

<h3 id="deploy-local"><a href="#home">Hardhat</a> > <a href="#hardhat-deploy">Deploy</a> > Local</h3>

<pre>Usage: settlemint smart-contract-set hardhat deploy local 
Examples:

  # Deploy smart contracts to local network using Hardhat/Ignition
  $ settlemint scs hardhat deploy local

  # Deploy a specific Ignition module
  $ settlemint scs hardhat deploy local --module ignition/modules/custom.ts

  # Deploy with a clean deployment state
  $ settlemint scs hardhat deploy local --reset

  # Deploy and verify contracts on Etherscan
  $ settlemint scs hardhat deploy local --verify

Deploy the smart contracts using Hardhat/ignition to the local development
network

Options:
  -m, --module &lt;ignitionmodule&gt;   The module to deploy with Ignition, defaults
                                  to &quot;ignition/modules/main.ts&quot;
  --deployment-id &lt;deploymentId&gt;  Set the id of the deployment
  -r, --reset                     Wipes the existing deployment state before
                                  deploying
  -v, --verify                    Verify the deployment on Etherscan
  -h, --help                      display help for command
</pre>

<h3 id="deploy-remote"><a href="#home">Hardhat</a> > <a href="#hardhat-deploy">Deploy</a> > Remote</h3>

<pre>Usage: settlemint smart-contract-set hardhat deploy remote 
Examples:

  # Deploy smart contracts to remote network using Hardhat/Ignition
  $ settlemint scs hardhat deploy remote

  # Deploy a specific Ignition module to remote network
  $ settlemint scs hardhat deploy remote --module ignition/modules/custom.ts

  # Deploy with a clean deployment state to remote network
  $ settlemint scs hardhat deploy remote --reset

  # Deploy and verify contracts on remote network
  $ settlemint scs hardhat deploy remote --verify

  # Deploy to remote network with specific blockchain node
  $ settlemint scs hardhat deploy remote --blockchain-node my-node

  # Deploy to production environment
  $ settlemint scs hardhat deploy remote --prod

Deploy the smart contracts using Hardhat/ignition to the remote network on the
platform

Options:
  -m, --module &lt;ignitionmodule&gt;       The module to deploy with Ignition,
                                      defaults to &quot;ignition/modules/main.ts&quot;
  --deployment-id &lt;deploymentId&gt;      Set the id of the deployment
  -r, --reset                         Wipes the existing deployment state
                                      before deploying
  -v, --verify                        Verify the deployment on Etherscan
  --default-sender &lt;defaultSender&gt;    Set the default sender for the deployment
  --parameters &lt;parameters&gt;           A relative path to a JSON file to use for
                                      the module parameters
  --strategy &lt;strategy&gt;               Set the deployment strategy to use
                                      (default: &quot;basic&quot;)
  --blockchain-node &lt;blockchainNode&gt;  Blockchain Node unique name (optional,
                                      defaults to the blockchain node in the
                                      environment)
  --prod                              Connect to your production environment
  -a, --accept-defaults               Accept the default and previously set
                                      values
  -h, --help                          display help for command
</pre>

<h2 id="hardhat-network"><a href="#home">Hardhat</a> > Network</h2>

<pre>Usage: settlemint smart-contract-set hardhat network 
Examples:

  # Start a development network using Hardhat
  $ settlemint scs hardhat network

  # Get list of possible Hardhat node options
  $ settlemint scs hardhat network --help

  # Start a development network using Hardhat with a specific port
  $ settlemint scs hardhat network --port 3000

Start a development network using Hardhat

Options:
  -h, --help  Get list of possible hardhat node options
</pre>

<h2 id="hardhat-script"><a href="#home">Hardhat</a> > Script</h2>

<pre>Usage: settlemint smart-contract-set hardhat script [options] [command]

Run a script using Hardhat

Options:
  -h, --help        display help for command

Commands:
  <a href="#script-remote">remote</a> [options]  Run a Hardhat script on a remote network on the platform.
  <a href="#script-local">local</a> [options]   Run a Hardhat script on a local development network.
  help [command]    display help for command
</pre>

<h3 id="script-remote"><a href="#home">Hardhat</a> > <a href="#hardhat-script">Script</a> > Remote</h3>

<pre>Usage: settlemint smart-contract-set hardhat script remote 
Examples:

  # Run a Hardhat script on a remote network
  $ settlemint hardhat script remote --script scripts/deploy.ts

  # Run a Hardhat script on a remote network with a specific blockchain node
  $ settlemint hardhat script remote --script scripts/deploy.ts --blockchain-node my-blockchain-node

  # Run a Hardhat script on a remote network without compiling
  $ settlemint hardhat script remote --script scripts/deploy.ts --no-compile

Run a Hardhat script on a remote network on the platform.

Options:
  -s, --script &lt;script&gt;               The script to run with Hardhat , e.g.
                                      &quot;scripts/deploy.ts&quot;
  --blockchain-node &lt;blockchainNode&gt;  Blockchain Node unique name (optional,
                                      defaults to the blockchain node in the
                                      environment)
  --prod                              Connect to your production environment
  -a, --accept-defaults               Accept the default and previously set
                                      values
  --no-compile                        Don&#039;t compile before running this task
  -h, --help                          display help for command
</pre>

<h3 id="script-local"><a href="#home">Hardhat</a> > <a href="#hardhat-script">Script</a> > Local</h3>

<pre>Usage: settlemint smart-contract-set hardhat script local 
Examples:

  # Run a Hardhat script on a local network
  $ settlemint hardhat script local --script scripts/deploy.ts

Run a Hardhat script on a local development network.

Options:
  -s, --script &lt;script&gt;  The script to run with Hardhat , e.g.
                         &quot;scripts/deploy.ts&quot;
  --no-compile           Don&#039;t compile before running this task
  -h, --help             display help for command
</pre>

<h2 id="hardhat-test"><a href="#home">Hardhat</a> > Test</h2>

<pre>Usage: settlemint smart-contract-set hardhat test 
Examples:

  # Run tests using Hardhat
  $ settlemint scs hardhat test

  # Get list of possible Hardhat test options
  $ settlemint scs hardhat test --help

  # Run tests and stop on the first test that fails
  $ settlemint scs hardhat test --bail

  # Run a specific test file
  $ settlemint scs hardhat test test/token.test.ts

Test the smart contracts using Hardhat

Options:
  -h, --help  Get list of possible hardhat test options
</pre>

