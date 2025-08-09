<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../smart-contract-set.md">Smart contract set</a> > Foundry</h1>

<pre>Usage: settlemint smart-contract-set foundry|f [options] [command]

Foundry commands for building and testing smart contracts

Options:
  -h, --help                        display help for command

Commands:
  <a href="#foundry-build">build</a> [options] [operands...]     Build the smart contracts using
                                    Foundry/forge
  <a href="#foundry-format">format</a> [options] [operands...]    Format the smart contracts using
                                    Foundry/forge
  <a href="#foundry-network">network</a> [options] [operands...]   Start a development network Foundry/anvil
  <a href="#foundry-coverage">coverage</a> [options] [operands...]  Generate coverage report using Foundry/forge
  <a href="#foundry-test">test</a> [options] [operands...]      Test the smart contracts using Foundry/forge
  help [command]                    display help for command
</pre>

<h2 id="foundry-build"><a href="#home">Foundry</a> > Build</h2>

<pre>Usage: settlemint smart-contract-set foundry build 
Examples:

  # Build the smart contracts using Foundry
  $ settlemint scs foundry build

  # Get list of possible Forge build options
  $ settlemint scs foundry build --help

  # Build the smart contracts with additional Forge options
  $ settlemint scs foundry build --optimize --force

Build the smart contracts using Foundry/forge

Options:
  -h, --help  Get list of possible forge options
</pre>

<h2 id="foundry-format"><a href="#home">Foundry</a> > Format</h2>

<pre>Usage: settlemint smart-contract-set foundry format 
Examples:

  # Format the smart contracts using Foundry
  $ settlemint scs foundry format

  # Get list of possible Forge format options
  $ settlemint scs foundry format --help

  # Format the smart contracts with additional Forge options
  $ settlemint scs foundry format --check

Format the smart contracts using Foundry/forge

Options:
  -h, --help  Get list of possible forge options
</pre>

<h2 id="foundry-network"><a href="#home">Foundry</a> > Network</h2>

<pre>Usage: settlemint smart-contract-set foundry network 
Examples:

  # Start a development network using Foundry
  $ settlemint scs foundry network

  # Get list of possible Anvil options
  $ settlemint scs foundry network --help

  # Start a development network using Foundry with a specific port
  $ settlemint scs foundry network --port 3000

Start a development network Foundry/anvil

Options:
  -h, --help  Get list of possible anvil options
</pre>

<h2 id="foundry-coverage"><a href="#home">Foundry</a> > Coverage</h2>

<pre>Usage: settlemint smart-contract-set foundry coverage 
Examples:

  # Run coverage using Foundry
  $ settlemint scs foundry coverage

  # Get list of possible Forge coverage options
  $ settlemint scs foundry coverage --help

  # Generate lcov report with additional Forge options
  $ settlemint scs foundry coverage --report lcov

Generate coverage report using Foundry/forge

Options:
  -h, --help  Get list of possible forge options
</pre>

<h2 id="foundry-test"><a href="#home">Foundry</a> > Test</h2>

<pre>Usage: settlemint smart-contract-set foundry test 
Examples:

  # Run tests using Foundry
  $ settlemint scs foundry test

  # Get list of possible Forge test options
  $ settlemint scs foundry test --help

  # Run a specific test function
  $ settlemint scs foundry test --match-test testToken

Test the smart contracts using Foundry/forge

Options:
  -h, --help  Get list of possible forge options
</pre>

