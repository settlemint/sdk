# [settlemint](../../../../settlemint.md) > [smart-contract-set](../../../smart-contract-set.md) > [hardhat](../../hardhat.md) > [deploy](../deploy.md) > remote

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