<h1 id="home"><a href="../settlemint.md">SettleMint CLI</a> > Connect</h1>

<pre>Usage: settlemint connect 
Examples:

  # Connect to your environment
  $ settlemint connect

  # Connect to your environment using defaults from the .env file
  $ settlemint connect --accept-defaults

  # Connect to your production environment
  $ settlemint connect --prod

  # Connect to a standalone environment (when not using the SettleMint platform)
  $ settlemint connect --instance standalone

  # Connect to a local development environment
  $ settlemint connect --instance local

Connects your dApp to your application

Options:
  --prod                     Connect to your production environment
  -a, --accept-defaults      Accept the default and previously set values
  -i, --instance &lt;instance&gt;  The instance to connect to (defaults to the
                             instance in the .env file). Use &#039;standalone&#039; if
                             your resources are not deployed on the SettleMint
                             platform
  -h, --help                 display help for command
</pre>

