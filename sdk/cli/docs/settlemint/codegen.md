<h1 id="home"><a href="../settlemint.md">SettleMint CLI</a> > Codegen</h1>

<pre>Usage: settlemint codegen 
Examples:

  # Generate GraphQL types and queries for your dApp
  $ settlemint codegen

  # Generate GraphQL types and queries for specific TheGraph subgraphs
  $ settlemint codegen --thegraph-subgraph-names subgraph1 subgraph2

  # Generate Viem resources
  $ settlemint codegen --generate-viem

Generate GraphQL and REST types and queries

Options:
  --prod                                         Connect to your production environment
  --thegraph-subgraph-names &lt;subgraph-names...&gt;  The name(s) of the TheGraph subgraph(s) to generate (skip if you want to generate all)
  --generate-viem                                Generate Viem resources
  --bun                                          Generate Bun SQL code instead of PostgreSQL pool for Hasura
  -h, --help                                     display help for command
</pre>

