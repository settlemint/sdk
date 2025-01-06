## [settlemint](../../settlemint.md) > [smart-contract-set](../smart-contract-set.md) > subgraph

<pre>Usage: settlemint smart-contract-set subgraph|sg [options] [command]

Commands for managing TheGraph subgraphs for smart contract indexing

Options:
  -h, --help                       display help for command

Commands:
  <a href="./subgraph/build.md">build</a>                            Build the subgraph
  <a href="./subgraph/codegen.md">codegen</a>                          Codegen the subgraph types
  <a href="./subgraph/deploy.md">deploy</a> [options] [subgraphName]  Deploy the subgraph
  help [command]                   display help for command
</pre>

## [settlemint](../../../settlemint.md) > [smart-contract-set](../../smart-contract-set.md) > [subgraph](../subgraph.md) > build

<pre>Usage: settlemint smart-contract-set subgraph build [options]

Build the subgraph

Options:
  -h, --help  display help for command
</pre>

## [settlemint](../../../settlemint.md) > [smart-contract-set](../../smart-contract-set.md) > [subgraph](../subgraph.md) > codegen

<pre>Usage: settlemint smart-contract-set subgraph codegen [options]

Codegen the subgraph types

Options:
  -h, --help  display help for command
</pre>

## [settlemint](../../../settlemint.md) > [smart-contract-set](../../smart-contract-set.md) > [subgraph](../subgraph.md) > deploy

<pre>Usage: settlemint smart-contract-set subgraph deploy [options] [subgraphName]

Deploy the subgraph

Arguments:
  subgraphName           The name of the subgraph to deploy (defaults to value
                         in .env if not provided)

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -h, --help             display help for command
</pre>

