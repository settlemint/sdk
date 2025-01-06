## [settlemint](../../settlemint.md) > [smart-contract-set](../smart-contract-set.md) > hardhat

<pre>Usage: settlemint smart-contract-set hardhat|h [options] [command]

Hardhat commands for Ethereum development environment

Options:
  -h, --help         display help for command

Commands:
  <a href="./hardhat/build.md">build</a> [options]    Build the smart contracts using Hardhat
  <a href="./hardhat/deploy.md">deploy</a>
  <a href="./hardhat/network.md">network</a> [options]  Start a development network using Hardhat
  <a href="./hardhat/script.md">script</a>
  <a href="./hardhat/test.md">test</a> [options]     Test the smart contracts using Hardhat
  help [command]     display help for command
</pre>

## [settlemint](../../../settlemint.md) > [smart-contract-set](../../smart-contract-set.md) > [hardhat](../hardhat.md) > build

<pre>Usage: settlemint smart-contract-set hardhat build [options]

Build the smart contracts using Hardhat

Options:
  -h, --help  Get list of possible hardhat compile options
</pre>

## [settlemint](../../../settlemint.md) > [smart-contract-set](../../smart-contract-set.md) > [hardhat](../hardhat.md) > deploy

<pre>Usage: settlemint smart-contract-set hardhat deploy [options] [command]

Options:
  -h, --help        display help for command

Commands:
  <a href="./deploy/local.md">local</a> [options]   Deploy the smart contracts using Hardhat/ignition to the
                    local development network
  <a href="./deploy/remote.md">remote</a> [options]  Deploy the smart contracts using Hardhat/ignition to the
                    remote network on the platform
  help [command]    display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [smart-contract-set](../../../smart-contract-set.md) > [hardhat](../../hardhat.md) > [deploy](../deploy.md) > local

<pre>Usage: settlemint smart-contract-set hardhat deploy local [options]

Deploy the smart contracts using Hardhat/ignition to the local development
network

Options:
  -m, --module <ignitionmodule>  The module to deploy with Ignition, defaults
                                 to "ignition/modules/main.ts"
  -r, --reset                    Wipes the existing deployment state before
                                 deploying
  -v, --verify                   Verify the deployment on Etherscan
  -h, --help                     display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [smart-contract-set](../../../smart-contract-set.md) > [hardhat](../../hardhat.md) > [deploy](../deploy.md) > remote

<pre>Usage: settlemint smart-contract-set hardhat deploy remote [options]

Deploy the smart contracts using Hardhat/ignition to the remote network on the
platform

Options:
  -m, --module <ignitionmodule>       The module to deploy with Ignition,
                                      defaults to "ignition/modules/main.ts"
  --deployment-id <deploymentId>      Set the id of the deployment
  -r, --reset                         Wipes the existing deployment state
                                      before deploying
  -v, --verify                        Verify the deployment on Etherscan
  --default-sender <defaultSender>    Set the default sender for the deployment
  --parameters <parameters>           A relative path to a JSON file to use for
                                      the module parameters
  --strategy <strategy>               Set the deployment strategy to use
                                      (default: "basic")
  --blockchain-node <blockchainNode>  Blockchain Node unique name (optional,
                                      defaults to the blockchain node in the
                                      environment)
  --prod                              Connect to your production environment
  -a, --accept-defaults               Accept the default and previously set
                                      values
  -h, --help                          display help for command
</pre>

## [settlemint](../../../settlemint.md) > [smart-contract-set](../../smart-contract-set.md) > [hardhat](../hardhat.md) > network

<pre>Usage: settlemint smart-contract-set hardhat network [options]

Start a development network using Hardhat

Options:
  -h, --help  Get list of possible hardhat node options
</pre>

## [settlemint](../../../settlemint.md) > [smart-contract-set](../../smart-contract-set.md) > [hardhat](../hardhat.md) > script

<pre>Usage: settlemint smart-contract-set hardhat script [options] [command]

Options:
  -h, --help        display help for command

Commands:
  <a href="./script/remote.md">remote</a> [options]  Run a Hardhat script to deploy a contract on the platform
                    or interact with a deployed contract.
  <a href="./script/local.md">local</a> [options]   Run a Hardhat script to deploy a contract on the platform
                    or interact with a deployed contract.
  help [command]    display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [smart-contract-set](../../../smart-contract-set.md) > [hardhat](../../hardhat.md) > [script](../script.md) > remote

<pre>Usage: settlemint smart-contract-set hardhat script remote [options]

Run a Hardhat script to deploy a contract on the platform or interact with a
deployed contract.

Options:
  -s, --script <script>               The script to run with Hardhat , e.g.
                                      "scripts/deploy.ts"
  --blockchain-node <blockchainNode>  Blockchain Node unique name (optional,
                                      defaults to the blockchain node in the
                                      environment)
  --prod                              Connect to your production environment
  -a, --accept-defaults               Accept the default and previously set
                                      values
  --no-compile                        Don't compile before running this task
  -h, --help                          display help for command
</pre>

## [settlemint](../../../../settlemint.md) > [smart-contract-set](../../../smart-contract-set.md) > [hardhat](../../hardhat.md) > [script](../script.md) > local

<pre>Usage: settlemint smart-contract-set hardhat script local [options]

Run a Hardhat script to deploy a contract on the platform or interact with a
deployed contract.

Options:
  -s, --script <script>  The script to run with Hardhat , e.g.
                         "scripts/deploy.ts"
  --no-compile           Don't compile before running this task
  -h, --help             display help for command
</pre>

## [settlemint](../../../settlemint.md) > [smart-contract-set](../../smart-contract-set.md) > [hardhat](../hardhat.md) > test

<pre>Usage: settlemint smart-contract-set hardhat test [options]

Test the smart contracts using Hardhat

Options:
  -h, --help  Get list of possible hardhat test options
</pre>

