<h1><a href="../../settlemint.md">settlemint</a> > <a href="../smart-contract-set.md">smart-contract-set</a> > hardhat</h1>

<pre>Usage: settlemint smart-contract-set hardhat|h [options] [command]

Hardhat commands for Ethereum development environment

Options:
  -h, --help         display help for command

Commands:
  <a href="#hardhat-build">build</a> [options]    Build the smart contracts using Hardhat
  <a href="#hardhat-deploy">deploy</a>
  <a href="#hardhat-network">network</a> [options]  Start a development network using Hardhat
  <a href="#hardhat-script">script</a>
  <a href="#hardhat-test">test</a> [options]     Test the smart contracts using Hardhat
  help [command]     display help for command
</pre>

<h3 id="hardhat-build"><a href="./hardhat.md">hardhat</a> > build</h3>

<pre>Usage: settlemint smart-contract-set hardhat build [options]

Build the smart contracts using Hardhat

Options:
  -h, --help  Get list of possible hardhat compile options
</pre>

<h3 id="hardhat-deploy"><a href="./hardhat.md">hardhat</a> > deploy</h3>

<pre>Usage: settlemint smart-contract-set hardhat deploy [options] [command]

Options:
  -h, --help        display help for command

Commands:
  <a href="#deploy-local">local</a> [options]   Deploy the smart contracts using Hardhat/ignition to the
                    local development network
  <a href="#deploy-remote">remote</a> [options]  Deploy the smart contracts using Hardhat/ignition to the
                    remote network on the platform
  help [command]    display help for command
</pre>

<h3 id="deploy-local"><a href="./hardhat.md">hardhat</a> > <a href="#hardhat-deploy">deploy</a> > local</h3>

<pre>Usage: settlemint smart-contract-set hardhat deploy local [options]

Deploy the smart contracts using Hardhat/ignition to the local development
network

Options:
  -m, --module &lt;ignitionmodule&gt;  The module to deploy with Ignition, defaults
                                 to &quot;ignition/modules/main.ts&quot;
  -r, --reset                    Wipes the existing deployment state before
                                 deploying
  -v, --verify                   Verify the deployment on Etherscan
  -h, --help                     display help for command
</pre>

<h3 id="deploy-remote"><a href="./hardhat.md">hardhat</a> > <a href="#hardhat-deploy">deploy</a> > remote</h3>

<pre>Usage: settlemint smart-contract-set hardhat deploy remote [options]

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

<h3 id="hardhat-network"><a href="./hardhat.md">hardhat</a> > network</h3>

<pre>Usage: settlemint smart-contract-set hardhat network [options]

Start a development network using Hardhat

Options:
  -h, --help  Get list of possible hardhat node options
</pre>

<h3 id="hardhat-script"><a href="./hardhat.md">hardhat</a> > script</h3>

<pre>Usage: settlemint smart-contract-set hardhat script [options] [command]

Options:
  -h, --help        display help for command

Commands:
  <a href="#script-remote">remote</a> [options]  Run a Hardhat script to deploy a contract on the platform
                    or interact with a deployed contract.
  <a href="#script-local">local</a> [options]   Run a Hardhat script to deploy a contract on the platform
                    or interact with a deployed contract.
  help [command]    display help for command
</pre>

<h3 id="script-remote"><a href="./hardhat.md">hardhat</a> > <a href="#hardhat-script">script</a> > remote</h3>

<pre>Usage: settlemint smart-contract-set hardhat script remote [options]

Run a Hardhat script to deploy a contract on the platform or interact with a
deployed contract.

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

<h3 id="script-local"><a href="./hardhat.md">hardhat</a> > <a href="#hardhat-script">script</a> > local</h3>

<pre>Usage: settlemint smart-contract-set hardhat script local [options]

Run a Hardhat script to deploy a contract on the platform or interact with a
deployed contract.

Options:
  -s, --script &lt;script&gt;  The script to run with Hardhat , e.g.
                         &quot;scripts/deploy.ts&quot;
  --no-compile           Don&#039;t compile before running this task
  -h, --help             display help for command
</pre>

<h3 id="hardhat-test"><a href="./hardhat.md">hardhat</a> > test</h3>

<pre>Usage: settlemint smart-contract-set hardhat test [options]

Test the smart contracts using Hardhat

Options:
  -h, --help  Get list of possible hardhat test options
</pre>

