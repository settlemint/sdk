<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../smart-contract-set.md">Smart contract set</a> > Subgraph</h1>

<pre>Usage: settlemint smart-contract-set subgraph|sg [options] [command]

Commands for managing TheGraph subgraphs for smart contract indexing

Options:
  -h, --help                        display help for command

Commands:
  <a href="#subgraph-add">add</a> [options]                     Add a contract to the subgraph
  <a href="#subgraph-build">build</a> [options]                   Build the subgraph
  <a href="#subgraph-codegen">codegen</a>                           Codegen the subgraph types
  <a href="#subgraph-deploy">deploy</a> [options] [subgraph-name]  Deploy the subgraph
  <a href="#subgraph-remove">remove</a> [options] [subgraph-name]  Remove a subgraph
  help [command]                    display help for command
</pre>

<h2 id="subgraph-add"><a href="#home">Subgraph</a> > Add</h2>

<pre>Usage: settlemint smart-contract-set subgraph add 
Examples:

  # Add a contract to the subgraph
  $ settlemint scs subgraph add --abi=./abis/bond.json --contract-name=bond

Add a contract to the subgraph

Options:
  --abi &lt;abi&gt;                      Path to the contract ABI.
  --contract-name &lt;contract-name&gt;  Name of the contract.
  --address &lt;contract-address&gt;     Address of the contract (defaults to
                                   0x0000000000000000000000000000000000000000).
  --start-block &lt;start-block&gt;      Start block of the contract (defaults to 0).
  --network &lt;network&gt;              Network name (defaults to settlemint).
  -h, --help                       display help for command
</pre>

<h2 id="subgraph-build"><a href="#home">Subgraph</a> > Build</h2>

<pre>Usage: settlemint smart-contract-set subgraph build 
Examples:

  # Build the subgraph
  $ settlemint scs subgraph build

Build the subgraph

Options:
  --ipfs &lt;ipfs-url&gt;  The IPFS URL to use for the subgraph deployment
  -h, --help         display help for command
</pre>

<h2 id="subgraph-codegen"><a href="#home">Subgraph</a> > Codegen</h2>

<pre>Usage: settlemint smart-contract-set subgraph codegen 
Examples:

  # Generate subgraph types
  $ settlemint scs subgraph codegen

Codegen the subgraph types

Options:
  -h, --help  display help for command
</pre>

<h2 id="subgraph-deploy"><a href="#home">Subgraph</a> > Deploy</h2>

<pre>Usage: settlemint smart-contract-set subgraph deploy 
Examples:

  # Deploy the subgraph
  $ settlemint scs subgraph deploy

  # Deploy the subgraph with a specific name
  $ settlemint scs subgraph deploy my-subgraph

Deploy the subgraph

Arguments:
  subgraph-name          The name of the subgraph to deploy (defaults to value
                         in .env if not provided)

Options:
  --ipfs &lt;ipfs-url&gt;      The IPFS URL to use for the subgraph deployment
                         (defaults to https://ipfs.console.settlemint.com)
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -h, --help             display help for command
</pre>

<h2 id="subgraph-remove"><a href="#home">Subgraph</a> > Remove</h2>

<pre>Usage: settlemint smart-contract-set subgraph remove 
Examples:

  # Remove a subgraph
  $ settlemint scs subgraph remove my-subgraph

Remove a subgraph

Arguments:
  subgraph-name          The name of the subgraph to remove (defaults to value
                         in .env if not provided)

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -f, --force            Force remove the subgraph without confirmation
  -h, --help             display help for command
</pre>

